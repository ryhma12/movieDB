import { Router } from "express";
import {
  postRegistration,
  postLogin,
  DeleteUser,
} from "../controllers/UserController.js";
import { getUserFavourites } from "../controllers/favouritesController.js";
import { auth } from "../helper/Auth.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);

router.delete("/delete", auth, DeleteUser);

router.get("/favourites", auth, getUserFavourites);

export default router;
