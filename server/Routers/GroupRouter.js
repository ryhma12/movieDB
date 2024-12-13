import { Router } from "express";
import {
  postcreateGroup,
  AcceptUser,
  AskToJoin,
  RefuseUser,
  sendUserMessage,
  getGroups,
  getUsersOfAGroup,
  getGroupsWhereUserIsNot,
  GetRequestsToJoinGroup,
  getMessagesOfAGroup,
} from "../controllers/GroupController.js";
import { auth } from "../helper/Auth.js";

const router = Router();

router.post("/create", auth, postcreateGroup);
router.patch("/acceptuser", AcceptUser);
router.post("/asktojoin", auth, AskToJoin);
router.delete("/refuseuser", RefuseUser);
router.post("/sendusermessage", sendUserMessage);
router.get("/getgroups", getGroups);
router.get("/usersofgroup", getUsersOfAGroup);
router.get("/browsegroups", getGroupsWhereUserIsNot);
router.get("/getjoinrequests", GetRequestsToJoinGroup);
router.get("/getmessages", getMessagesOfAGroup);

export default router;
