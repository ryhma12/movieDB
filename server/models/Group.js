import { pool } from '../helper/db.js'

const CreateGroup = async (groupName) => {
    return await pool.query('Insert into "group" ("groupName") values ($1) returning "groupName",id', [groupName])
}

export { CreateGroup }