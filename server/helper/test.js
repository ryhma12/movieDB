import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import {hash, compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { error } from 'console'
const { sign } = jwt

const testDelete = (name,groupName) => {
    pool.query('with first_insert as(select id from "user" where "Name"=$1),second_insert as(INSERT INTO public."Favourites" ("movieId", "movieName", "userId") VALUES ('+'1'+','+'testmovie'+', (select id from first_insert))),third_insert as(select id from "group" where "groupName" = $2)insert into "chat" ("content","userId","groupId") values ('+'{sdadw}'+',(select id from first_insert),(select id from third_insert))',[name,groupName])
}

export {testDelete}