import {Schema, model, Types} from 'mongoose';

const UserSchema=new Schema({
    // _id

    email:{
        unique: true,
        required: true,
        type: String
    },

    password:{
        required: true,
        type: String
    },

    fullName:{
        type: String,
        default:""
    },

    username:{
        unique: true,
        required: true,
        type: String
    },

    position:{
        type: String,
        default: 'Врач'
    },

    categories: [{type: Types.ObjectId, ref: 'Category'}],

    products:[{type: Types.ObjectId, ref: 'Product'}],

    bills:[{type: Types.ObjectId, ref: 'Bill'}],

    patients:[{type: Types.ObjectId, ref: 'Patient'}],


})
export const UserModel=model('User', UserSchema)

