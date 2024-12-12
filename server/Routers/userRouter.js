import { Router } from "express";
import {
  postRegistration,
  postLogin,
  DeleteUser,
  postReview,
  getReviewsForAMovie,
  getAllUsers,
} from "../controllers/UserController.js";

import { postUserFavourite, getUserFavourites, deleteUserFavourite, getPublicUserFavourites, putUserStatus } from "../controllers/FavouritesController.js";

import { auth } from "../helper/Auth.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);
router.post("/review", auth,postReview);

router.get("/favourites/get", auth, getUserFavourites);
router.post("/favourites/post", auth, postUserFavourite);
router.delete("/favourites/delete", auth, deleteUserFavourite)
router.put("/favourites/status", auth, putUserStatus)
router.get("/publicFavourites/get", getPublicUserFavourites)

router.get("/review",getReviewsForAMovie);
router.delete("/delete", auth, DeleteUser);
router.get("/allusers", getAllUsers);

export default router;
