import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes';

const PORT = process.env.SERVER_PORT??5000;
const MONGO_HOSTNAME=process.env.MONGO_HOSTNAME
const MONGO_PORT=process.env.MONGO_PORT
const MONGO_DB=process.env.MONGO_DB
let MONGO_URL=''
if(process.env.NODE_ENV !== 'production'){
    MONGO_URL=`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
} else {
    MONGO_URL=process.env.MONGO_URL??"mongodb://localhost:27017"
}
const app:express.Application=express()
app.use(cors())
app.use(express.json())

const API_URL=process.env.API_URL??'/api'

app.use(API_URL, router)
app.use(API_URL+'/some', (req, res) => res.json('some'))
const start = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
