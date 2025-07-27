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


let addsub = async (req, res) => {


    let data = req.body;
    
    try {
        let p = "INSERT INTO subject(subject_id,subject_name,owner,batch_id) VALUES (?,?,?,?)";
        let user = [createRandomUser().userId, data.subname, data.email, data.batch_id];
        await pool.query(p, user)
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