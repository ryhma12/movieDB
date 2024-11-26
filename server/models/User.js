import { pool } from '../helper/db.js'

const insertUser = async (name, hashedPassword, email) => {
    return await pool.query('insert into "user" ("Name","Password","Email") values ($1,$2,$3) returning *', [name, email,hashedPassword])
}

const selectUserByEmail = async (email) => {
    return await pool.query('select * from "user" where "Email"=$1', [email])
}

export { insertUser, selectUserByEmail }