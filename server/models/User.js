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
  return await pool.query('with first_insert as ( select id from "user" where "Email"=$1 and "Password"=$2),second_insert as(select "groupId" from "Role" where "userId"=(select id from first_insert)),third_insert as(delete from "group" where id = (select "groupId" from second_insert)),fourth_insert as (delete from "chat" where "accId"=(select id from first_insert)),fifth_insert as (delete from "Role" where "userId" = (select id from first_insert)),sixth_insert as (delete from "Favourites" where "userId" = (select id from first_insert)),seventh_insert as (delete from "review" where "id"=(select id from first_insert))delete from "user" where id=(select id from first_insert) Returning "Email","Name"',[email,password])
}

export { insertUser, selectUserByEmail, deleteuser };
