import { Router } from "express";
import { postcreateGroup,AcceptUser,AskToJoin,RefuseUser } from "../controllers/GroupController.js";

const router = Router()

router.post('/create', postcreateGroup);
router.patch('/acceptuser', AcceptUser);
router.post('/asktojoin', AskToJoin);
router.delete('/refuseuser', RefuseUser);


export default router