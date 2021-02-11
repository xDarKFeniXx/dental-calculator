
import {Schema, model, Types, Document} from 'mongoose';
import {IUser} from "./user-model";
export interface IProduct extends Document {
    title:string,
    price:number,
    count:number,
    user:IUser['_id']
}
const ProductSchema = new Schema({
    title:{
        required: true,
        type: String
    },
    price:{
        required: true,
        type: Number
    },
    count:{
        required: true,
        type: Number,
        default: 0
    },
    category:{type: Types.ObjectId, ref: 'Category'},

    user:{
        type: Types.ObjectId, ref: 'User'
    }

})
export const ProductModel = model<IProduct>('Product', ProductSchema)

