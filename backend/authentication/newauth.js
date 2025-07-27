import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';
import pool from '../bd.js';









let newauth = async(req, res, next) => {
    let data = req.body;
    
   
    
    if (data.token) {
         let cleanedToken = data.token.replace(/^"|"$/g, '');
        try {
            var decoded = jwt.verify(cleanedToken, process.env.secret);
            
             await pool.query(`SELECT * FROM user WHERE email=?`, [decoded.email])
             .then((result)=>{
                
                 res.send({ status: true, data: result[0][0] });
             })
            
        }
        catch (e) {
            console.log(e)
            res.send({ status: false, message: e })
        }
    }
    else {
        res.send({ status: false, });
    }

}

export default newauth;