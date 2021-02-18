import Router from 'express'
import authRouter from './auth-routes'
import {AuthRoutesEnum} from "../utils/consts";


const router = Router()
router.use(AuthRoutesEnum.AUTH, authRouter)


export default router
