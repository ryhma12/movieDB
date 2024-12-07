import { insertUserFavourite, selectUserFavourites, removeUserFavourite } from "../models/Favourites.js";

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
      favourite: result.rows[0],
      message: `${result.rows[0].movieName} added to user ${req.user.email} favourites`,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUserFavourite = async (req, res, next) => {
  try {
    const result = await removeUserFavourite(
      req.body.movieId, 
      req.user.id
    );
    return res.status(200).json({
      favourite: result.rows[0],
      message: `${result.rows[0].movieName} removed from user ${req.user.email} favourites`,
    });
  } catch (error) {
    return next(error);
  }
};

export { postUserFavourite, getUserFavourites, deleteUserFavourite };
