import express from "express";
import {StatusCodeEnum, StatusResultEnum} from "./consts";
import {Result, ValidationError} from "express-validator";


class ApiError extends Error{
    private status: StatusCodeEnum;
    constructor(status:StatusCodeEnum, message="Что то пошло не так") {
        super();
        this.status = status
        this.message = message

    }

    static badRequest(message:string) {
        return new ApiError(404, message)
    }

    static internal(message:string) {
        return new ApiError(500, message)
    }

    static forbidden(message:string) {
        return new ApiError(403, message)
    }
    static customStatusError(status:StatusCodeEnum, message:string){
        return new ApiError(status, message)
    }
}

export default ApiError
export const handlerError=(res:express.Response, statusCode=StatusCodeEnum.BAD_REQUEST, message:string| string[] |Result<ValidationError>='Что то пошло не так')=>{
    return res.status(statusCode).json({status: StatusResultEnum.ERROR, message})
}
