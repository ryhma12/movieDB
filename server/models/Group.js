import { pool } from '../helper/db.js'

const CreateGroup = async (groupName,AdminName,Password) => {
    return await pool.query('with first_insert as ( insert into "group"("groupName") values($1) RETURNING id, "groupName"), second_insert as (select id from "user" where "Name"=$2 and "Password"=$3)  insert into "Role"("groupId","userId","admin","user")  values ( (select id from first_insert), (select id from second_insert),'+'true'+','+'false'+') Returning (select "groupName" from first_insert)',[groupName,AdminName,Password])
}

export { CreateGroup }