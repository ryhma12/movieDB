import { pool } from '../helper/db.js'

const CreateGroup = async (groupName,AdminName,Password) => {
    return await pool.query('with first_insert as ( insert into "group"("groupName") values($1) RETURNING id, "groupName"), second_insert as (select id from "user" where "Name"=$2 and "Password"=$3)  insert into "Role"("groupId","userId","admin","user")  values ( (select id from first_insert), (select id from second_insert),'+'true'+','+'false'+') Returning (select "groupName" from first_insert)',[groupName,AdminName,Password])
}

const AskToJoinGroup = async(name, groupName) =>{
    return await pool.query('with first_insert as(select id from "user" where "Name"=$1),second_insert as(select id,"groupName" from "group" where "groupName"=$2),third_insert as(insert into "Role" ("groupId","userId","admin","user") values ((select id from second_insert),(select id from first_insert),false,false))select "groupName" from "group" where "groupName"=(select "groupName" from second_insert)',[name,groupName])
}

const AcceptUserToGroup =async(name, groupName)=>{
    return await pool.query('with first_insert as(select id from "user" where "Name"=$1),second_insert as(select id,"groupName" from "group" where "groupName"=$2),third_insert as (update "Role" set "user"=true where "groupId"=(select id from second_insert) and "userId"=(select id from first_insert))select "groupName" from "group" where "groupName"=(select "groupName" from second_insert)',[name,groupName])
}

const RefuseUserToGroup = async(name, groupName)=>{
    return await pool.query('with first_insert as(select id,"Name" from "user" where "Name"=$1),second_insert as(select id from "group" where "groupName"=$2),third_insert as(delete from "Role" where "groupId"=(select id from second_insert) and "userId"=(select id from first_insert))select "Name" from "user" where "Name"=(select "Name" from first_insert) ',[name,groupName])
}

export { CreateGroup,AskToJoinGroup,AcceptUserToGroup,RefuseUserToGroup }