import { pool } from '../helper/db.js'

const selectUserFavourites = async (userId) => {
    return await pool.query('SELECT * FROM public."Favourites" WHERE "userId" = $1', [userId])
}

const insertUserFavourite = async (movieId, movieName, userId) => {
    return await pool.query('INSERT INTO public."Favourites" ("movieId", "movieName", "userId") VALUES ($1, $2, $3) returning *', [movieId, movieName, userId]);
}

const removeFavourite = async (id, userId) => {
    return await pool.query('DELETE FROM public."Favourites" WHERE id = $1 AND "userId" = $2', [id, userId]);
};

export { selectUserFavourites, insertUserFavourite, removeFavourite }