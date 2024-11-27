import { Router } from "express";
import { postcreateGroup } from "../controllers/GroupController.js";

const router = Router()

router.post('/create', postcreateGroup);

export default router