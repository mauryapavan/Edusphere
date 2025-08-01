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


let addlec=async (req, res) => {
  let data = req.body;
  
  try { 
   
    let p = "INSERT INTO lecture(lecture_id,lecture_name,owner,lecture_link,chapter_id) VALUES (?,?,?,?,?)";
    let user = [createRandomUser().userId, data.lecname.name, data.email,data.lecname.link, data.chapter_id];
    console.log(req.body);
    await pool.query(p, user)
      .then((result) => {
        
        res.send({ status: true, message: "lecture add succesfully" });
      })
  }
  catch {
    (e) => {

      console.log(e);
      res.send({ status: false, message: e });
    }
  }


}


export default addlec;
