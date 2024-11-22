import { pool } from '../helper/db.js'
import { Router } from "express"
import { emptyOrRows } from '../helper/utils.js'
import {hash,compare} from 'bcrypt'
import  CurrentDate  from '../helper/CurrentDate.js'

const CreationDate = CurrentDate

const router = Router()

router.post('/register',(req,res,next)=>{
    hash(req.body.password,10,(error,hashedPassword)=>{
        if(error) next(error)
            try{
                pool.query('insert into user (Name,Password,CreationDate,Email) values ($1,$2,$3,$4) returning *',
                    [req.body.Name,hashedPassword,CreationDate,Email],
                    (error,result) => {
                        if (error) return next(error)
                        return res.status(201).json({Name: result.rows[0].Name, id: result.rows[0].id,Email: result.rows[0].Email})    
                    }

                )
            } catch(error){
                return next(error)
            }
    })


})

router.post('/login',(req,res,next)=>{
    const invalid_message = 'Invalid credentials'
    try{
        pool.query('select * from user where Name=$1',
            [req.body.Name],
            (error,result)=>{
                if (error) next(error)
                if (result.rowCount === 0) return next(new Error(invalid_message))
                        compare(req.body.password,result.rows[0].password,(error,match)=>{
                        if (error) return next(error)
                        if(!match) return next(new Error(invalid_message))
                       // const token = sign({user: req.body.Name})        
                        const user = result.rows[0]
                        return res.status(200).json(
                            {
                                'id':user.id,
                                'Name': user.Name
                            }
                            )
                        })
            })

    } catch (error){
        return next(error)
    }


})

export default router