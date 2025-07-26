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
});

function createRandomUser() {
    return {
        userId: faker.string.uuid(),
    };
}

let salebatches=async (req, res) => {
  let data=req.body;

  try {
    await connection.promise().query(`SELECT * FROM batch WHERE owner=?`, [data.email])
    .then((result)=>{
      
      res.send({  result });
      
    })
  }
  catch (e) {
    res.send({ status: false, message: e })
  }
}

export default salebatches;