import {Router} from 'express';
import {AuthRoutesEnum} from "../utils/consts";
import userController from '../controllers/user-controller'
import {registerValidations} from "../validators/register-validations";
import {loginValidations} from "../validators/login-validations";
import { passport } from '../core/passport';

const router = Router()

router.post(AuthRoutesEnum.REGISTRATION, registerValidations, userController.registration)
router.post(AuthRoutesEnum.LOGIN,loginValidations, passport.authenticate('local'), userController.afterLogin)
router.get(AuthRoutesEnum.ME, passport.authenticate('jwt', { session: false }), userController.check)


export default router
