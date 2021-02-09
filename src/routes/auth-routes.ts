import {Router, Request, Response} from 'express';

import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {AuthRoutesEnum} from "../utils/consts";
import {UserModel} from "../models/user-model";


const router = Router()

router.post(AuthRoutesEnum.REGISTRATION, [
    check('username', 'Your username must be longer than 3 and shorter than 12').isLength({min:3, max:12}),
    check('email', "Incorrect email").isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
],
    async (req:Request, res:Response)=>{
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request", errors})
            }
            const {email, password, } = req.body
            const candidate = await UserModel.findOne({email})
            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new UserModel({email, password: hashPassword})
            await user.save()
        }catch (e) {

        }
    }
    )
