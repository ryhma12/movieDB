import { insertUserFavourite, selectUserFavourites } from "../models/Favourites.js";

const getUserFavourites = async (req, res, next) => {
  try {
    const result = await selectUserFavourites(req.user.id);
    return res.status(200).json({
      favourites: result.rows,
    });
  } catch (error) {
    return next(error);
  }
};

const postUserFavourite = async (req, res, next) => {
  try {
    const result = await insertUserFavourite(
      req.body.movieId, 
      req.body.movieName, 
      req.user.id
    );
    return res.status(201).json({
      message: `${result.movieName} added to favourites`,
    });
  } catch (error) {
    return next(error);
  }
};

export { postUserFavourite, getUserFavourites };
