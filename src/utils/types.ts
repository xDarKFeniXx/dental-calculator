import { Result, ValidationError } from "express-validator";
import {StatusResultEnum} from "./consts";

export interface IResBody<DataType>{
    status: StatusResultEnum
    message?: string| string[] |Result<ValidationError>|ValidationError[]
    data?:DataType
}
