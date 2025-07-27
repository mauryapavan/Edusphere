import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2'





const connection = await mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user, 
   port: process.env.db_port,
  database: process.env.db_database,
  password: process.env.db_password,
   waitForConnections: true,
  connectionLimit: 5, // adjust as per host limit
  queueLimit: 0,
});

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
   
    await connection.promise().query(p, user)
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
