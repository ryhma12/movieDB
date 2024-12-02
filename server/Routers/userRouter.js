import { Router } from "express";
import {
  postRegistration,
  postLogin,
  DeleteUser,
  postReview,
  getReviewsForAMovie,
} from "../controllers/UserController.js";
import { getUserFavourites } from "../controllers/FavouritesController.js";
import { auth } from "../helper/Auth.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);
router.post("/review", postReview);

router.get("/favourites", auth, getUserFavourites);

router.get("/review", getReviewsForAMovie);
router.delete("/delete", auth, DeleteUser);

export default router;
