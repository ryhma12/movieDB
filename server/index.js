import express from 'express'
import cors from 'cors'
import { pool } from './helper/db.js'
import dotenv from 'dotenv'
import userRouter  from './Routers/userRouter.js'
import doRouter from './Routers/doRouter.js'
import GroupRouter from './Routers/GroupRouter.js'


dotenv.config()
const port = process.env.PORT

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/',doRouter)
app.use('/user', userRouter)
app.use('/group', GroupRouter)

app.use((err,req,res,next) => {
   const statusCode=err.statusCode || 500
   res.status(statusCode).json({error: err.message});
})

app.listen(port)
