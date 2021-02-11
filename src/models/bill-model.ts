import {Schema, model, Types, Document} from 'mongoose';
import {IUser} from './user-model';
import {ICategory} from "./category-model";
import {IPatient} from "./patient-model";

export interface IBill extends Document {
    title: string,
    fullPrice: number,
    discount: number,
    user: IUser['_id'],
    categories: Array<ICategory['_id']>,
    patient: IPatient['_id']
}

const BillSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    categories:[{type: Types.ObjectId, ref: 'Category'}],
    products:[{type: Types.ObjectId, ref: 'Product'}],
    user: {type: Types.ObjectId, ref: 'User'},
    patient:{type: Types.ObjectId, ref: 'Patient'}

})
export const BillModel = model<IBill>('Bill', BillSchema)

