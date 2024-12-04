import { Router } from "express";
import { postcreateGroup,AcceptUser,AskToJoin,RefuseUser,sendUserMessage } from "../controllers/GroupController.js";

const router = Router()

router.post('/create', postcreateGroup);
router.patch('/acceptuser', AcceptUser);
router.post('/asktojoin', AskToJoin);
router.delete('/refuseuser', RefuseUser);
router.post('/sendusermessage', sendUserMessage);

export default router