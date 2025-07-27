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


let addsub = async (req, res) => {


    let data = req.body;
    
    try {
        let p = "INSERT INTO subject(subject_id,subject_name,owner,batch_id) VALUES (?,?,?,?)";
        let user = [createRandomUser().userId, data.subname, data.email, data.batch_id];
        await connection.promise().query(p, user)
            .then((result) => {
               
                res.send({ status: true, message: "subject add succesfully" });
            })
    }
    catch {
        (e) => {
            res.send({ status: false, message: e });
        }
    }
    // console.log(req.body);

}

export default addsub;
