import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors'
import router from './routes';
import { dbConnect } from './core/db';
import { passport } from './core/passport';
import {AuthRoutesEnum} from "./utils/consts";
import userController from './controllers/user-controller';

const PORT = process.env.SERVER_PORT??5000;

const app:express.Application=express()


// app.use(cors())
app.use(express.json())
app.use(passport.initialize());

const API_URL=process.env.API_URL??'/api'

app.use(API_URL, router)
app.get(API_URL+'/test', (req, res) => res.json('test api url'))
app.get('/test', (req, res) => res.json('test url'))

const start = async () => {
    try {
        await dbConnect()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
