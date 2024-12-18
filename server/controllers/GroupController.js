import { hash, compare } from "bcrypt";
import {
  CreateGroup,
  AcceptUserToGroup,
  AskToJoinGroup,
  RefuseUserToGroup,
  GetGroupsForUser,
  GetUsersForGroup,
  GetGroupsWhereNoUser,
  GetJoinRequestsForGroup,
  sendUserMessageToGroup,
  getMessages,
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
    console.log(req.body.groupName, req.body.Name, user.Email);
    const result = await CreateGroup(
      req.body.groupName,

      req.body.Name,
      user.Email
    );
    console.log(result);

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
    console.log(req.body.name);
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
      req.body.groupName,
      req.body.message
    );
    console.log(result);
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
    if (!req.query.id) throw new ApiError("No user id provided");

    const result = await GetGroupsForUser(req.query.id);
    console.log(result);
    return res.status(200).json({
      result: result.rows,
    });
  } catch (error) {
    return next(error);
  }
};

const getGroupsWhereUserIsNot = async (req, res, next) => {
  try {
    if (!req.query.id) throw new ApiError("No user id provided");

    const result = await GetGroupsWhereNoUser(req.query.id);
    if (result.rowCount === 0) throw new ApiError("No groups found");

    return res.status(200).json({
      result: result.rows,
    });
  } catch (err) {
    return next(err);
  }
};

const getUsersOfAGroup = async (req, res, next) => {
  try {
    const result = await GetUsersForGroup(req.query.group);
    return res.status(200).json({
      result: result.rows,
    });
  } catch (error) {
    return next(error);
  }
};

const GetRequestsToJoinGroup = async (req, res, next) => {
  try {
    const result = await GetJoinRequestsForGroup(req.query.groupId);
    return res.status(200).json({
      result: result.rows,
    });
  } catch (err) {
    return next(err);
  }
};

const getMessagesOfAGroup = async (req, res, next) => {
  try {
    const result = await getMessages(req.query.groupName);
    console.log(result);
    return res.status(200).json({
      result: result.rows,
    });
  } catch (err) {
    return next(err);
  }
};

export {
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
};
