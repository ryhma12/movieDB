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
    const no_result='no results found'
            try{
              const result =  pool.query('insert into "user" ("Name","Password","CreationDate","Email") values ($1,$2,$3,$4) returning *',[req.body.Name,req.body.Password,req.body.CreationDate,req.body.Email], 
              (error,result) => {
                if (error) return next(error)
                    if (result.rows[0].Email === '') return next(new Error(no_result))
                return res.status(201).json({Name: result.rows[0].Name, id: result.rows[0].id, CreationDate: result.rows[0].CreationDate, Email: result.rows[0].Email})    
            }
        )   
            } catch(error){
                return res.status(500).json({error: error.message})
            }
})


router.post('/login',(req,res,next)=>{
    const invalid_message = 'Invalid credentials'
    const no_result='no results found'
    try{
        const result = pool.query('select * from "user" where "Email"=$1',[req.body.Email],
        (error,result)=>{
            if (error) return next(error)
            if (result.length === 0) return next(new Error(no_result))
            if(req.body.Password === result.rows[0].Password){
                const user = result.rows[0]
                return res.status(200).json({"id":user.id,"Email": user.Email})
            }else{
                return next(new Error(invalid_message))
            }    
        })
    }catch(error){
        return res.status(500).json({error: error.message})
    }

})


/*

router.post('/login',(req,res,next)=>{
    const invalid_message = 'Invalid credentials'
    const no_result='no results found'
    try{
        pool.query('select * from "user" where "Email"=($1) AND "Password"=($2)',[req.body.Email, req.body.Password],
            (error,result)=>{
                if (error) return next(error)
                if (result.length === 0) return next(new Error(no_result))
                       compare(req.body.Password, result.rows[0].Password,(error,match)=>{
                        if (error) return next(error)
                        if(!match) return next(new Error(invalid_message))   
                        const user = result.rows[0]
                        return res.status(200).json(
                            {
                                "id":user.id,
                                "Email": user.Email
                            }
                            )
                        })
            })
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})


*/




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