import { hash, compare } from "bcrypt";
import {
  CreateGroup,
  AcceptUserToGroup,
  AskToJoinGroup,
  RefuseUserToGroup,
  GetGroupsForUser,
} from "../models/Group.js";
import { ApiError } from "../helper/ApiError.js";
import jwt from "jsonwebtoken";
import { selectUserByEmail } from "../models/User.js";
const { sign } = jwt;

const postcreateGroup = async (req, res, next) => {
  try {
    //    if (req.body.GroupName === '') return next(Error('GroupName too small'))
    const userFromDb = await selectUserByEmail(req.body.Email);
    const user = userFromDb.rows[0];
    if (!user) return next(new ApiError("Invalid credentials", 401));

    const match = await compare(req.body.Password, user.Password);
    if (!match) return next(new Error("Invalid credentials", 401));
    const result = await CreateGroup(
      req.body.groupName,
      req.body.AdminName,
      user.Password
    );
    return res.status(201).json({ groupName: result.rows[0].groupName });
  } catch (error) {
    return next(error);
  }
};
const AcceptUser = async (req, res, next) => {
  try {
    const result = await AcceptUserToGroup(req.body.name, req.body.groupName);
    return res.status(200).json({
      message: "You've been accepted to the group " + result.rows[0].groupName,
    });
  } catch (error) {
    return next(error);
  }
};
const AskToJoin = async (req, res, next) => {
  try {
    const result = await AskToJoinGroup(req.body.name, req.body.groupName);
    return res.status(200).json({
      message:
        "Your request to group " + result.rows[0].groupName + "have been sent",
    });
  } catch (error) {
    return next(error);
  }
};

const RefuseUser = async (req, res, next) => {
  try {
    const result = await RefuseUserToGroup(req.body.name, req.body.groupName);
    return res.status(200).json({
      message: "You refused user " + result.rows[0].Name + " from the group",
    });
  } catch (error) {
    return next(error);
  }
};

const sendUserMessage = async (req, res, next) => {
  try {
    const result = await sendUserMessageToGroup(
      req.body.name,
      req.body.groupName
    );
    return res.status(200).json({
      message:
        "Your message to group " + result.rows[0].Name + " has been sent",
    });
  } catch (error) {
    return next(error);
  }
};

const getGroups = async (req, res, next) => {
  try {
    const result = await GetGroupsForUser(req.query.id);
    return res.status(200).json({
      result: result.rows,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  postcreateGroup,
  AcceptUser,
  AskToJoin,
  RefuseUser,
  sendUserMessage,
  getGroups,
};
