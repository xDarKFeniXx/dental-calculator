import {Request, Response, NextFunction} from 'express';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import ApiError from "../utils/error";
import {UserModel} from "../models/user-model";

const SECRET_KEY=process.env.SECRET_KEY??"secret_key"
const SALT=process.env.SECRET_SALT??5

const generateJwt = (id:string, email:string, username:string) => {
    return jwt.sign(
        {id, email, username},
        SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req:Request, res:Response, next:NextFunction) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Incorrect request", errors}) //TODO сделать через обработчик ошибок
        }
        const {email, password, username} = req.body

        const candidateEmail = await UserModel.findOne({email})
        const candidateUsername = await UserModel.findOne({username})
        if (candidateEmail||candidateUsername) {
            return next(ApiError.badRequest('Пользователь с таким email или логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, SALT)
        const user = await UserModel.create({email, username, password: hashPassword})
        // const user = await UserModel.create({email, username, password})
        const token = generateJwt(user.id, user.email, user.username)
        return res.json({token})
    }

    async login(req:Request, res:Response, next:NextFunction) {
        const {email, password} = req.body
        const user = await UserModel.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.username)
        return res.json({token})
    }

    async check(req:Request, res:Response, next:NextFunction) {
        const token = generateJwt(req.body.user.id, req.body.user.email, req.body.user.username)
        return res.json({token})
    }
}

export default new UserController()
