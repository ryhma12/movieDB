import { pool } from "../helper/db.js";

const insertUser = async (name, hashedPassword, email) => {
  return await pool.query(
    'insert into "user" ("Name","Password","Email") values ($1,$2,$3) ON CONFLICT ("Email") DO NOTHING returning *  ',
    [name, email, hashedPassword]
  );
};

const selectUserByEmail = async (email) => {
  return await pool.query('select * from "user" where "Email"=$1 ', [email]);
};

const deleteuser = async (email) => {

  return await pool.query('with first_insert as( select id from "user" where "Email"=$1),second_insert as(delete from "Favourites" where "userId"=(select id from first_insert)),third_insert as(delete from "Role" where "userId"=(select id from first_insert)),fourth_insert as(delete from "chat" where "userId"=(select id from first_insert)),fifth_insert as(delete from "review" where "userId"=(select id from first_insert))delete from "user" where id=(select id from first_insert)',
     [email]
    );

};

const insertReview = async (userId, movieId, content, stars) => {
  return await pool.query(
    'INSERT INTO "review" ("movieId", "content", "stars", "userId")	VALUES ($1, $2, $3, $4) returning *',
    [movieId, content, stars, userId]
  );
};

const getReviews = async (movieId) => {
  return await pool.query('select * from "review" where "movieId"=$1', [
    movieId,
  ]);
};

const getUsers = async () => {
  return await pool.query('SELECT "Name", id, "Email" FROM public."user"');
};

export {
  insertUser,
  selectUserByEmail,
  deleteuser,
  insertReview,
  getReviews,
  getUsers,
};
