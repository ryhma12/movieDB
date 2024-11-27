import { pool } from '../helper/db.js'

const insertUser = async (name, hashedPassword, email, CreationDate) => {
    return await pool.query('insert into "user" ("Name","Password","Email","CreationDate") values ($1,$2,$3,$4) returning *', [name, email,hashedPassword,CreationDate])
}

const selectUserByEmail = async (email) => {
    return await pool.query('select * from "user" where "Email"=$1', [email])
}


export { insertUser, selectUserByEmail }