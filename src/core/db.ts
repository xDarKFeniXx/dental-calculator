import mongoose from "mongoose";
const MONGO_HOSTNAME=process.env.MONGO_HOSTNAME
const MONGO_PORT=process.env.MONGO_PORT
const MONGO_DB=process.env.MONGO_DB
let MONGO_URL=''
if(process.env.NODE_ENV !== 'production'){
    MONGO_URL=`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
} else {
    MONGO_URL=process.env.MONGO_URL??"mongodb://localhost:27017"
}
export const dbConnect=async ()=>{
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}
