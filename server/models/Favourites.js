import { pool } from "../helper/db.js";

const selectUserFavourites = async (userId) => {
  return await pool.query(
    'SELECT * FROM public."Favourites" WHERE "userId" = $1',
    [userId]
  );
};

const selectPublicUserFavourites = async (userName) => {
  return await pool.query(
    'SELECT "Favourites".* FROM public."Favourites" JOIN "user" ON "Favourites"."userId" = "user"."id" WHERE "user"."Name" = $1 AND isPublic = TRUE',
    [userName]
  );
};

const insertUserFavourite = async (movieId, movieName, userId) => {
  return await pool.query(
    'INSERT INTO public."Favourites" ("movieId", "movieName", "userId") VALUES ($1, $2, $3) returning *',
    [movieId, movieName, userId]
  );
};

const removeUserFavourite = async (movieId, userId) => {
  return await pool.query(
    'DELETE FROM public."Favourites" WHERE "movieId" = $1 AND "userId" = $2 returning *',
    [movieId, userId]
  );
};

const selectPublicStatus = async (userId) => {
  return await pool.query('SELECT "user"."ispublic" FROM public."user" WHERE id = $1', [
    userId,
  ]);
};

const updatePublicStatus = async (isPublic, userId) => {
  return await pool.query('UPDATE "user" SET "ispublic" = $1 WHERE id = $2 returning *', [isPublic, 
    userId,
  ]);
};

export {
  selectUserFavourites,
  selectPublicUserFavourites,
  selectPublicStatus,
  insertUserFavourite,
  removeUserFavourite,
  updatePublicStatus,
};
