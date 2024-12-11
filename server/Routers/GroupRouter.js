import { Router } from "express";
import {
  postcreateGroup,
  AcceptUser,
  AskToJoin,
  RefuseUser,
  sendUserMessage,
  getGroups,
  getUsersOfAGroup,
} from "../controllers/GroupController.js";
import { auth } from "../helper/Auth.js";



const router = Router();

router.post("/create", auth,postcreateGroup);
router.patch("/acceptuser", auth,AcceptUser);
router.post("/asktojoin", auth,AskToJoin);
router.delete("/refuseuser", auth,RefuseUser);
router.post("/sendusermessage", auth,sendUserMessage);
router.get("/getgroups", auth,getGroups);
router.get("/usersofgroup", auth,getUsersOfAGroup);

export default router;
