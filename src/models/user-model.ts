import {Schema, model, Types, Document} from 'mongoose';
import {ICategory} from "./category-model";
import {IProduct} from "./product-model";
import {IBill} from "./bill-model";
import {IPatient} from "./patient-model";
export interface IUser extends Document{
    email: string,
    password:string,
    fullName:string,
    username:string,
    position:string,
    categories:Array<ICategory['_id']>,
    products:Array<IProduct['_id']>,
    bills:Array<IBill['_id']>,
    patients: Array<IPatient['_id']>
}

const UserSchema = new Schema({
    email: {
        unique: true,
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fullName: {
        type: String,
        default: ""
    },
    username: {
        unique: true,
        required: true,
        type: String
    },
    position: {
        type: String,
        default: 'Врач'
    },
    categories: [{type: Types.ObjectId, ref: 'Category'}],
    products: [{type: Types.ObjectId, ref: 'Product'}],
    bills: [{type: Types.ObjectId, ref: 'Bill'}],
    patients: [{type: Types.ObjectId, ref: 'Patient'}],
})
UserSchema.set('toJSON', {
    transform: function(_:any, ret:IUser) {

        // @ts-ignore
        delete ret.password
        return ret
    }
})

export const UserModel = model<IUser>('User', UserSchema)

