import { Router } from "express";
import { postRegistration, postLogin, DeleteUser } from '../controllers/UserController.js'
import { deleteuser } from "../models/User.js";

const router = Router();

router.post('/register', postRegistration);

router.post('/login', postLogin);

router.post('/delete', DeleteUser)

export default router;

