import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'

const PORT = process.env.SERVER_PORT??5000;
const MONGO_URL=process.env.MONGO_URL??"mongodb://localhost:27017"
const app:express.Application=express()
app.use(cors())
app.use(express.json())

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
