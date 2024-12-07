import { hash, compare } from "bcrypt";
import {
  insertUser,
  selectUserByEmail,
  deleteuser,
  insertReview,
  getReviews,
} from "../models/User.js";
import { ApiError } from "../helper/ApiError.js";
import { auth } from "../helper/Auth.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const postRegistration = async (req, res, next) => {
  const no_result = "no results found/email already in use";
  console.log(req.body);
  try {
    if (!req.body.Name || req.body.Name.length === 0)
      return next(new ApiError("Invalid name for user", 400));
    if (!req.body.Email || req.body.Email.length === 0)
      return next(new ApiError("Invalid email for user", 400));
    if (!req.body.Password || req.body.Password.length < 8)
      return next(new ApiError("Invalid password for user", 400));

    const hashedPassword = await hash(req.body.Password, 10);

    console.log(hashedPassword);
    const userFromDb = await insertUser(
      req.body.Name,
      req.body.Email,
      hashedPassword
    );
    const user = userFromDb.rows[0];
    console.log(user);
    if (!user) return next(new ApiError(no_result, 401));

    return res
      .status(201)
      .json(
        createUserObject(user.Name, user.id, user.Email, user.CreationDate)
      );
  } catch (error) {
    return next(error);
  }
};

const postLogin = async (req, res, next) => {
  const invalid_message = "Invalid credentials";

  try {
    const userFromDb = await selectUserByEmail(req.body.Email);
    const user = userFromDb.rows[0];
    if (!user) return next(new ApiError(invalid_message, 401));

    const match = await compare(req.body.Password, user.Password);
    if (!match) return next(new Error(invalid_message, 401));

    const token = sign(
      { id: user.id, email: user.Email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json(
        createUserObject(
          user.Name,
          user.id,
          user.Email,
          user.CreationDate,
          token
        )
      );
  } catch (error) {
    return next(error);
  }
};

//auth middleware on jo olemassa ja pitää vaan lisätä siihen routeriin ennen DeleteUseria

const DeleteUser = async (req, res, next) => {
  try {
    const result = await deleteuser(req.body.email);
    return res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    return next(error);
  }
};

const postReview = async (req, res, next) => {
  try {
    const { userId, movieId, content, stars } = req.body;

    const result = await insertReview(userId, movieId, content, stars);
    if (!result.rows[0]) return next(new Error("Something went wrong", 500));

    res.status(200).json({ message: "Review submitted succesfully" });
  } catch (err) {
    return next(err);
  }
};

const getReviewsForAMovie = async (req, res, next) => {
  try {
    const movieId = req.query.movieId;
    const result = await getReviews(movieId);
    console.log(result.rows);
    return res.status(200).json({ result: result.rows });
  } catch (err) {
    return next(err);
  }
};

const createUserObject = (name, id, email, CreationDate, token = undefined) => {
  return {
    Name: name,
    id: id,
    Email: email,
    CreationDate: CreationDate,
    ...(token !== undefined && { token: token }),
  };
};

export {
  postRegistration,
  postLogin,
  DeleteUser,
  postReview,
  getReviews,
  getReviewsForAMovie,
};
