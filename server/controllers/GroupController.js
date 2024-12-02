import { hash, compare } from 'bcrypt'
import { CreateGroup,AcceptUserToGroup,AskToJoinGroup,RefuseUserToGroup } from '../models/Group.js'
import { ApiError } from '../helper/ApiError.js'
import jwt from 'jsonwebtoken'
const { sign } = jwt

const postcreateGroup= async (req,res,next) =>{
    try{
    //    if (req.body.GroupName === '') return next(Error('GroupName too small'))
       const result = await CreateGroup(req.body.groupName,req.body.AdminName,req.body.Password)    
        return res.status(201).json({groupName: result.rows[0].groupName})
    } catch (error){
        return next (error)
    }
}
const AcceptUser = async (req,res,next) => {
    try{
       const result= await AcceptUserToGroup(req.body.name,req.body.groupName)
        return res.status(200).json({message: "You've been accepted to the group "+result.rows[0].groupName})
    }catch(error){
        return next (error)
    }
}
const AskToJoin = async (req,res,next) => {
    try{
        const result =await AskToJoinGroup(req.body.name,req.body.groupName)
        return res.status(200).json({message: "Your request to group "+result.rows[0].groupName+"have been sent"})
    }catch(error){
        return next (error)
    }
}

const RefuseUser = async (req,res,next) => {
    try{
        const result =await RefuseUserToGroup(req.body.name,req.body.groupName)
        return res.status(200).json({message: "You refused user "+result.rows[0].Name+ " from the group"})
    }catch(error){
        return next (error)
    }
}


export { postcreateGroup,AcceptUser,AskToJoin,RefuseUser }