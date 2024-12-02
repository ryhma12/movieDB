import { selectUserFavourites } from "../models/Favourites.js";

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

export { getUserFavourites };
