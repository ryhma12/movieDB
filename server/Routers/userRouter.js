import { Router } from "express";
import {
  postRegistration,
  postLogin,
  deleteAccount,
} from "../controllers/UserController.js";

const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);
router.delete("/delete", deleteAccount);

export default router;
