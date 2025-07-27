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

let signin = async (req, res) => {


    let data = req.body
    console.log(data);
    try {
        const [result] = await pool.query(`SELECT * FROM user WHERE email=?`, [data.email]);


        if (result.length > 0) {
            res.send({ status: false, message: "you have already an acount" });
        }
        else {
            // const user= await connection.promise().query()

            // Store hash in your password DB.
            bcrypt.genSalt(10, function async(err, salt) {
                bcrypt.hash(data.password, salt, async function (err, hash) {
                    // Store hash in your password DB.
                    let p = "INSERT INTO user(user_id,username,email,password) VALUES (?,?,?,?)";
                    let user = [createRandomUser().userId, data.name, data.email, hash];
                    await pool.promise().query(p, user)
                        .then(() => {

                           res.send({ status: true, message: "ragister succesfullt"});
                        })



                });
            });

        }

    }
    catch (e) {
        console.error(e);
        res.send({ status: false, message: e });
        return;
    }

}

export default signin;