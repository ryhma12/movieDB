import {
  insertUserFavourite,
  removeUserFavourite,
  selectUserFavourites,
  selectPublicStatus,
  selectPublicUserFavourites,
  updatePublicStatus,
} from "../models/Favourites.js";

const getUserFavourites = async (req, res, next) => {
  try {
    const result = await selectUserFavourites(req.user.id);
    if (!result) return new ApiError("Public favourites not found", 404);
    return res.status(200).json({
      favourites: result.rows,
    });
  } catch (error) {
    return next(error);
  }
};

const getPublicUserFavourites = async (req, res, next) => {
  try {
    const publicUser = req.query.publicUser;
    if (!publicUser) return next(new ApiError("Public user not found", 404));
    const result = await selectPublicUserFavourites(publicUser);
    if (!result) return new ApiError("Public favourites not found", 404);
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
    const result = await removeUserFavourite(req.body.movieId, req.user.id);
    return res.status(200).json({
      favourite: result.rows[0],
      message: `${result.rows[0].movieName} removed from user ${req.user.email} favourites`,
    });
  } catch (error) {
    return next(error);
  }
};

const putUserStatus = async (req, res, next) => {
  try {
    const result = await updatePublicStatus(req.body.isPublic, req.user.id);
    return res
      .status(200)
      .json(
        `user ${req.user.email} public status updated to ${result.rows[0].ispublic}`
      );
  } catch (error) {
    return next(error);
  }
};

const getUserStatus = async (req, res, next) => {
  try {
    const result = await selectPublicStatus(req.user.id);
    const isPublic = result.rows[0]?.ispublic;
    if (isPublic === undefined)
      return next(new ApiError("Public status not found", 404));
    return res.status(200).json({ isPublic });
  } catch (error) {
    return next(error);
  }
};

export {
  putUserStatus,
  getUserStatus,
  postUserFavourite,
  getUserFavourites,
  getPublicUserFavourites,
  deleteUserFavourite,
};
