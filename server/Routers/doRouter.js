import { pool } from '../helper/db.js'
import { Router } from "express"
import { emptyOrRows } from '../helper/utils.js'

const router = Router()

// mahdollisesti vaihtaa kaikista samanlainen ,kuin tuosta router.get

router.get('/',(req,res,next) => {
        pool.query('select * from "user" ', (error, result)=>{
            if (error) return next(error)
            return res.status(200).json(emptyOrRows(result))
        })
    })

export default router    