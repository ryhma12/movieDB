import { pool } from "../helper/db.js";

const insertUser = async (name, hashedPassword, email, CreationDate) => {
  return await pool.query(
    'insert into "user" ("Name","Password","Email","CreationDate") values ($1,$2,$3,$4) returning *',
    [name, email, hashedPassword,CreationDate]
  );
};

const selectUserByEmail = async (email) => {
  return await pool.query('select * from "user" where "Email"=$1 ', [email]);
};

const deleteuser = async (email, password) => {
  return await pool.query('delete * from "user" where "Email"=$1 and "Password" = $2 returning "Name","Email","CreationDate"',[email,password])
}

export { insertUser, selectUserByEmail, deleteuser };
