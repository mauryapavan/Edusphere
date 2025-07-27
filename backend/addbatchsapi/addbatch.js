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


let addbatch=async (req, res) => {
  let data = req.body;
  
  try { 
   
    let p = "INSERT INTO batch(batch_id,batch_name,owner,image,price) VALUES (?,?,?,?,?)";
    let user = [createRandomUser().userId, data.batch[0], data.email,req.file.path, data.batch[1]];
  
    await pool.query(p, user)
      .then((result) => {
        
        res.send({ status: true, message: "new batch add succesfully" });
      })
  }
  catch {
    (e) => {

      console.log(e);
      res.send({ status: false, message: e });
    }
  }


}


export default addbatch;
