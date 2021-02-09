import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors'

const PORT = process.env.SERVER_PORT??5000;

const app:express.Application=express()
app.use(cors())
app.use(express.json())

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
