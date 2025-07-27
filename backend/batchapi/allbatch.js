
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



let allbatch = async (req, res) => {

    
    
    try {
        await pool.query("SELECT * FROM batch")
            .then((result) => {
               console.log(result)
                res.send({  result });
            })
    }
    catch (e) {
        res.send({ status: false, message: e });
    }

   


}


export default allbatch;
