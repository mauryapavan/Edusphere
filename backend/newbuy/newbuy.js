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


let newbuybatch = async (req, res) => {
    let data = req.body;
    try {

        await pool.query(`SELECT * FROM purchased WHERE student_email=?`, [data.email])
            .then((result) => {

                if (result[0].length > 0) {
                    result[0].forEach((el, ind) => {
                       
                        if (el.batch_id == data.batch_id) {
                            res.send({ status: false, message: "you have already buy that batch" })
                            return;
                        }
                    })


                }



            })
        let p = "INSERT INTO purchased(purchased_id,student_email,batch_id) VALUES (?,?,?)";
        let user = [createRandomUser().userId, data.email, data.batch_id,];

        await pool.query(p, user)
            .then((result) => {
                
                res.send({ status: true, message: " batch buy succesfully" });
            })

    }
    catch {
        (e) => {

            console.log(e);
            res.send({ status: false, message: e });
        }
    }

}

export default newbuybatch;
