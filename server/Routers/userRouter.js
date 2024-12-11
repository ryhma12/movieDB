import { Router } from "express";
import {
  postRegistration,
  postLogin,
  DeleteUser,
  postReview,
  getReviewsForAMovie,
} from "../controllers/UserController.js";
import { postUserFavourite, getUserFavourites, deleteUserFavourite } from "../controllers/FavouritesController.js";
import { auth } from "../helper/Auth.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);
router.post("/review", auth,postReview);

router.get("/favourites/get", auth, getUserFavourites);
router.post("/favourites/post", auth, postUserFavourite);
router.delete("/favourites/delete", auth, deleteUserFavourite)

router.get("/review",getReviewsForAMovie);
router.delete("/delete", auth, DeleteUser);

export default router;
