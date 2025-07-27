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

let salebatches=async (req, res) => {
  let data=req.body;

  try {
    await pool.query(`SELECT * FROM batch WHERE owner=?`, [data.email])
    .then((result)=>{
      
      res.send({  result });
      
    })
  }
  catch (e) {
    res.send({ status: false, message: e })
  }
}

export default salebatches;