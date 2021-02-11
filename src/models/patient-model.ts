import {Schema, model, Types, Document} from 'mongoose';
import {IUser} from './user-model';
import {ICategory} from "./category-model";

export interface IPatient extends Document {
    name: string,
    number: number,
    user: IUser['_id'],
}

const PatientSchema = new Schema({
    name: {
        required: true,
        type: String,
        default:"Пациент"
    },
    number: {
        required: true,
        type: Number,
        default: 0
    },
    bills:[{type: Types.ObjectId, ref: 'Bill'}],
    user: {type: Types.ObjectId, ref: 'User'}

})
export const PatientModel = model<IPatient>('Patient', PatientSchema)

