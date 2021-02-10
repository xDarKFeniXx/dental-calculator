import {Router} from 'express';
import {AuthRoutesEnum} from "../utils/consts";
import userController from '../controllers/user-controller'
import {registerValidations} from "../validators/register-validations";
import {loginValidations} from "../validators/login-validations";

const router = Router()

router.post(AuthRoutesEnum.REGISTRATION, registerValidations, userController.registration)
router.post(AuthRoutesEnum.LOGIN, loginValidations, userController.login)
router.get(AuthRoutesEnum.ME, userController.check)


export default router
