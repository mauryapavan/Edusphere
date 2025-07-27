import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';






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


let newauth = async(req, res, next) => {
    let data = req.body;
    
   
    
    if (data.token) {
         let cleanedToken = data.token.replace(/^"|"$/g, '');
        try {
            var decoded = jwt.verify(cleanedToken, process.env.secret);
            
             await connection.promise().query(`SELECT * FROM user WHERE email=?`, [decoded.email])
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
