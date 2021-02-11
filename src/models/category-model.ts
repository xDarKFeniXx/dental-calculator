
import {Schema, model, Types, Document} from 'mongoose';
import {IProduct} from "./product-model";
import {IUser} from "./user-model";
export interface ICategory extends Document {
    title:string,
    products: Array<IProduct['_id']>,
    user: IUser['_id']
}
const CategorySchema = new Schema({
    title:{
        required: true,
        type: String
    },
    products:[{type: Types.ObjectId, ref: 'Product'}],
    user:{type: Types.ObjectId, ref: 'User'}

})
export const CategoryModel = model<ICategory>('Category', CategorySchema)

