import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2'
import pool from '../bd.js';








function createRandomUser() {
    return {
        userId: faker.string.uuid(),
    };
}


let addchap=async (req, res) => {
  let data = req.body;
  console.log(data);
  try { 
    let p = "INSERT INTO chapter(chapter_id,chapter_name,owner,subject_id) VALUES (?,?,?,?)";
    let user = [createRandomUser().userId, data.chapname, data.email, data.subject_id];
   
    await pool.query(p, user)
      .then((result) => {
       
        res.send({ status: true, message: "chapter add succesfully" });
      })
  }
  catch {
    (e) => {
      console.log(e);
      res.send({ status: false, message: e });
    }
  }


}


export default addchap;
