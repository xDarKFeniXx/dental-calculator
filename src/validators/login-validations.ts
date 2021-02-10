import {check} from 'express-validator';

export const loginValidations=[
    check('email', 'Введите вашу почту').isString().isEmail().withMessage('не корректные данные'),
    check('password', "Введите пароль").isString().withMessage('Не корректные данные')
        .isLength({min: 6}).withMessage('Пароль не может быть короче 6 символов'),
]
