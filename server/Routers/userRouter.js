import { Router } from "express";
import {
  postRegistration,
  postLogin,
  DeleteUser,
} from "../controllers/UserController.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);

router.delete("/delete", DeleteUser);

export default router;
