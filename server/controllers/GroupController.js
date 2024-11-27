import { hash, compare } from 'bcrypt'
import { CreateGroup } from '../models/Group.js'
import { ApiError } from '../helper/ApiError.js'
import jwt from 'jsonwebtoken'
const { sign } = jwt

const postcreateGroup= async (req,res,next) =>{
    try{
    //    if (req.body.GroupName === '') return next(Error('GroupName too small'))
       const result = await CreateGroup(req.body.groupName)    
        return res.status(201).json({groupName: result.rows[0].groupName, id:result.rows[0].id })
    } catch (error){
        return next (error)
    }
}

export { postcreateGroup }