import Router from 'express'
import userRouter from './auth-routes'
import {AuthRoutesEnum} from "../utils/consts";


const router = Router()
router.use(AuthRoutesEnum.AUTH, userRouter)


export default router
