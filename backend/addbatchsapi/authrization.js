import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';
import pool from '../bd.js';










let authrization = async(req, res, next) => {
    let data = req.body;
     
    if (data.token) {
        
         let cleanedToken = data.token.replace(/^"|"$/g, '');
        try {
            var decoded = jwt.verify(cleanedToken, process.env.secret);
            
             await pool.query(`SELECT * FROM user WHERE email=?`, [decoded.email])
             .then((result)=>{
                //console.log(result)

                 req.body.email=result[0][0].email;
                 next()

             })
            
        }
        catch (e) {
            console.log(e)
            res.send({ status: false, message: e })
        }
    }
    else {
        res.send({ status: false, message:"you are not log in or ragistred"});
    }

}

export default authrization;
