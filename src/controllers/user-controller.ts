import express, {Request, Response} from 'express';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {IUser, UserModel} from "../models/user-model";
import {SECRET_KEY, StatusCodeEnum, StatusResultEnum} from "../utils/consts";
import {IResBody} from "../utils/types";
import {handlerError} from "../utils/error";


const generateJwt = (id:IUser['_id'], email:IUser['email'], username:IUser['username']) => {
    return jwt.sign(
        {id, email, username},
        SECRET_KEY,
        {expiresIn: '24h'}
    )
}
type RegistrationBodyRes=IResBody<IUser>
type LoginBodyRes=IResBody<IUser&{token:string}>
type RegistrationBodyReq={
    email:IUser['email'],
    password:IUser['password'],
    username:IUser['username']
}
type LoginBodyReq={
    email:IUser['email'],
    password:IUser['password']
}
// interface CustomRequest<T> extends Request {
//     body: T
// }

class UserController {
    // async registration(req:CustomRequest<RegistrationBodyResReq>, res:Response<RegistrationBodyRes>) {
    async registration(req:Request<any, any, RegistrationBodyReq>, res:Response<RegistrationBodyRes>) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ status: StatusResultEnum.ERROR, errors: errors.array() } as RegistrationBodyRes);
                return;
            }
            const {email, password, username} = req.body

            const candidate = await UserModel.findOne({$or: [{email}, {username}]})
            if (candidate) {
                return handlerError(res, StatusCodeEnum.BAD_REQUEST, "Пользователь с таким email или логином уже существует")
            }

            const hashPassword = await bcrypt.hash(password, 1)

            const user = await UserModel.create({email, username, password: hashPassword})
            // const token = generateJwt(user.id, user.email, user.username)
            // return res.json({data:token, status:StatusResultEnum.SUCCESS})
            res.status(201).json({
                status: StatusResultEnum.SUCCESS,
                data: user,
            });
        }catch (e) {
            return handlerError(res, StatusCodeEnum.BAD_REQUEST, e)
        }
    }


    async afterLogin(req: express.Request<any, any, LoginBodyReq>, res: express.Response<LoginBodyRes>): Promise<void> {

        try {
            const user = req.user ? (req.user as IUser).toJSON() : undefined;
            res.json({
                status: StatusResultEnum.SUCCESS,
                data: {
                    ...user,
                    token: jwt.sign({ data: req.user }, SECRET_KEY, {
                        expiresIn: '2 days',
                    }),
                } as IUser &{token:string},
            });
        } catch (error) {
            res.status(500).json({
                status: StatusResultEnum.ERROR,
                message: error,
            });
        }
    }
    async check(req:Request, res:Response<IResBody<IUser>>) {
        try {
            const user = req.user ? (req.user as IUser).toJSON() : undefined;
            console.log(user)
            res.json({
                status: StatusResultEnum.SUCCESS,
            // @ts-ignore
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: StatusResultEnum.ERROR,
                message: error,
            });
        }
    }

}

export default new UserController()
