import { pool } from "../helper/db.js";

const CreateGroup = async (groupName, Name, Email) => {
  return await pool.query(
    'with first_insert as ( insert into "group"("groupName") values($1) RETURNING id, "groupName"), second_insert as (select id from "user" where "Name"=$2 and "Email"=$3)  insert into "Role"("groupId","userId","is_admin","is_user")  values ( (select id from first_insert), (select id from second_insert),' +
      "true" +
      "," +
      "false" +
      ') Returning (select "groupName" from first_insert)',

    [groupName, Name, Email]
  );
};

const AskToJoinGroup = async (name, groupName) => {
  return await pool.query(
    'with first_insert as (select id from "user" where "Name" = $1), second_insert as (select id, "groupName" from "group" where "groupName" = $2) insert into "Role" ("groupId", "userId", "is_admin", "is_user") values ((select id from second_insert), (select id from first_insert), false, false) returning (select "groupName" from "group" where "groupName" = $2)',
    [name, groupName]
  );
};

const AcceptUserToGroup = async (name, groupName) => {
  return await pool.query(
    'with first_insert as(select id from "user" where "Name"=$1),second_insert as(select id,"groupName" from "group" where "groupName"=$2),third_insert as (update "Role" set "is_user"=true where "groupId"=(select id from second_insert) and "userId"=(select id from first_insert))select "groupName" from "group" where "groupName"=(select "groupName" from second_insert)',
    [name, groupName]
  );
};

const RefuseUserToGroup = async (name, groupName) => {
  return await pool.query(
    'with first_insert as(select id,"Name" from "user" where "Name"=$1),second_insert as(select id from "group" where "groupName"=$2),third_insert as(delete from "Role" where "groupId"=(select id from second_insert) and "userId"=(select id from first_insert) and "is_admin"=false)select "Name" from "user" where "Name"=(select "Name" from first_insert) ',
    [name, groupName]
  );
};

const GetGroupsForUser = async (userId) => {
  return await pool.query(
    'SELECT "group".id, "group"."groupName", "Role"."is_admin", "Role"."is_user" FROM "group" JOIN "Role" ON "group".id = "Role"."groupId" WHERE "Role"."userId" = $1;',
    [userId]
  );
};

const GetUsersForGroup = async (groupName) => {
  return await pool.query(
    'SELECT "user".id, "user"."Name", "user"."Email", "Role".is_admin, "Role".is_user FROM "user" JOIN "Role" ON "user".id = "Role"."userId" JOIN "group" ON "Role"."groupId" = "group".id WHERE "group"."groupName" = $1;',
    [groupName]
  );
};

const sendUserMessageToGroup = async (name, groupName, message) => {
  return await pool.query(
    'WITH first_insert AS (SELECT id AS userId FROM "user" WHERE "Name" = $1), second_insert AS (SELECT id AS groupId FROM "group" WHERE "groupName" = $2) INSERT INTO "chat" ("userId", "groupId", "content", "date") SELECT userId, groupId, $3, NOW() FROM first_insert, second_insert RETURNING id, content, date',
    [name, groupName, message]
  );
};

const GetGroupsWhereNoUser = async (userId) => {
  return await pool.query(
    'SELECT "group".id, "group"."groupName" FROM "group" WHERE NOT EXISTS (SELECT 1  FROM "Role" WHERE "Role"."groupId" = "group".id AND "Role"."userId" = $1)',
    [userId]
  );
};

const GetJoinRequestsForGroup = async (groupId) => {
  return await pool.query(
    'select "Role"."userId", "user"."Name", "Role"."groupId", "group"."groupName" from "Role" join "user" on "Role"."userId" = "user".id join "group" on "Role"."groupId" = "group".id where "Role"."is_user" = false and "Role"."is_admin" = false and "Role"."groupId" = $1',
    [groupId]
  );
};

const getMessages = async (groupId) => {
  return await pool.query(
    'SELECT c.id AS message_id, c.content AS message_content, c.date AS message_date, u."Name" AS sender_name FROM public.chat c JOIN public."user" u ON c."userId" = u.id JOIN public."group" g ON c."groupId" = g.id WHERE g."groupName" = $1 ORDER BY c.date',
    [groupId]
  );
};

export {
  CreateGroup,
  AskToJoinGroup,
  AcceptUserToGroup,
  RefuseUserToGroup,
  GetGroupsForUser,
  GetUsersForGroup,
  sendUserMessageToGroup,
  GetGroupsWhereNoUser,
  GetJoinRequestsForGroup,
  getMessages,
};
