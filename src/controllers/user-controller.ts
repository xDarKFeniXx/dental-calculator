import {Request, Response} from 'express';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {IUser, UserModel} from "../models/user-model";
import {StatusCodeEnum, StatusResultEnum} from "../utils/consts";
import {IResBody} from "../utils/types";
import {handlerError} from "../utils/error";

const SECRET_KEY=process.env.SECRET_KEY??"secret_key"
const SALT=process.env.SECRET_SALT??5

const generateJwt = (id:IUser['_id'], email:IUser['email'], username:IUser['username']) => {
    return jwt.sign(
        {id, email, username},
        SECRET_KEY,
        {expiresIn: '24h'}
    )
}
type RegistrationBodyRes=IResBody<string>
type RegistrationBodyReq={
    email:IUser['email'],
    password:IUser['password'],
    username:IUser['username']
}
interface CustomRequest<T> extends Request {
    body: T
}
interface LoginReqBody{
    email:IUser['email'],
    password:IUser['password'],
    username?:IUser['username']
}
class UserController {
    // async registration(req:CustomRequest<RegistrationBodyResReq>, res:Response<RegistrationBodyRes>) {
    async registration(req:Request<any, any, RegistrationBodyReq>, res:Response<RegistrationBodyRes>) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return handlerError(res, StatusCodeEnum.BAD_REQUEST, errors)

        }
        const {email, password, username} = req.body

        const candidateEmail = await UserModel.findOne({email})
        const candidateUsername = await UserModel.findOne({username})
        if (candidateEmail||candidateUsername) {
            return handlerError(res, StatusCodeEnum.BAD_REQUEST, "Пользователь с таким email или логином уже существует")
        }
        const hashPassword = await bcrypt.hash(password, SALT)
        const user = await UserModel.create({email, username, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.username)
        return res.json({data:token, status:StatusResultEnum.SUCCESS})
    }

    async login(req:Request<any, any, LoginReqBody>, res:Response<RegistrationBodyRes>) {
        const {email, password, username} = req.body
        const user = await UserModel.findOne({$or:[{email}, {username}]})
        if (!user) {
            return handlerError(res, StatusCodeEnum.INTERNAL_SERVER_ERROR, 'Пользователь не найден')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return handlerError(res, StatusCodeEnum.INTERNAL_SERVER_ERROR, 'Указан неверный пароль')
        }
        const token = generateJwt(user.id, user.email, user.username)
        return res.json({data:token, status:StatusResultEnum.SUCCESS})
    }

    async check(req:Request, res:Response<RegistrationBodyRes>) {
        const token = generateJwt(req.body.user.id, req.body.user.email, req.body.user.username)
        return res.json({data:token, status:StatusResultEnum.SUCCESS})
    }
}

export default new UserController()
