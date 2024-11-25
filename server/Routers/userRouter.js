import { pool } from '../helper/db.js'
import { Router } from "express"
import { emptyOrRows } from '../helper/utils.js'
import {hash,compare} from 'bcrypt'
//import  CurrentDate  from '../helper/CurrentDate.js'

const today = new Date();
const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    const currentDate = '2014-04-04';
const CreationDate= currentDate 

const router = Router()

router.post('/register',(req,res,next)=>{
            try{
              const result =  pool.query('insert into "user" ("Name","Password","CreationDate","Email") values ($1,$2,$3,$4) returning *',[req.body.Name,req.body.Password,req.body.CreationDate,req.body.Email], 
              (error,result) => {
                if (error) return next(error)
                return res.status(201).json({Name: result.rows[0].Name, id: result.rows[0].id, CreationDate: result.rows[0].CreationDate, Email: result.rows[0].Email})    
            }
        )   
            } catch(error){
                return res.status(500).json({error: error.message})
            }
})


export default router

/*
password hash kanssa

router.post('/register',(req,res,next)=>{
    hash(req.body.Password,10,(error,hashedPassword)=>{
        if(error) next(error)
            try{
                pool.query('insert into "user" ("Name","Password","CreationDate","Email") values ($1,$2,$3,$4) returning *',
                    [req.body.Name,hashedPassword,CreationDate,Email],
                    (error,result) => {
                        if (error) return next(error)
                        return res.status(201).json({Name: result.rows[0].Name, id: result.rows[0].id, CreationDate: result.rows[0].CreationDate, Email: result.rows[0].Email})    
                    }
                )
            } catch(error){
                return next(error)
            }
    })
})
*/