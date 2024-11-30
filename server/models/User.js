import { pool } from "../helper/db.js";

const insertUser = async (name, hashedPassword, email) => {
  return await pool.query(
    'insert into "user" ("Name","Password","Email") values ($1,$2,$3) returning *',
    [name, email, hashedPassword]
  );
};

const selectUserByEmail = async (email) => {
  return await pool.query('select * from "user" where "Email"=$1 ', [email]);
};

const deleteuser = async (id) => {
  return await pool.query('delete from "user" where "id"=$1', [id]);
};

export { insertUser, selectUserByEmail, deleteuser };
