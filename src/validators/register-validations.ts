import {body} from 'express-validator';

export const registerValidations=[
    body('email', 'Введите вашу почту')
        .isEmail().withMessage('Не корректные данные')
        .isLength({min: 3, max:40}).withMessage('Допустимое кол-во символов в почте от 3 до 40'),
    body('username', 'Введите ваш логин')
        .isString().withMessage('Не корректные данные')
        .isLength({min: 3, max:40}).withMessage('Допустимое кол-во символов в логине от 3 до 40'),
    body('password', 'Введите ваш пароль')
        .isString().withMessage('Не корректные данные')
        .isLength({min: 6}).withMessage('Пароль не может быть короче 6 символов'),
]
