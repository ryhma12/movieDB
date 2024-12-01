import { Router } from "express";
import {
  postRegistration,
  postLogin,
  DeleteUser,
  postReview,
} from "../controllers/UserController.js";
import { auth } from "../helper/Auth.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);
router.post("/review", postReview);

router.delete("/delete", auth, DeleteUser);

export default router;
