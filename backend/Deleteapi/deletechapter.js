import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2'
import pool from '../bd.js';







let deletechap = async (req, res) => {

    let { chap_id } = req.body;
    try {
        await pool.query(`delete FROM lecture WHERE  chapter_id =?`, [chap_id])
            .then(async () => {
                await pool.query(`delete FROM chapter WHERE  chapter_id =?`, [chap_id])
                    .then((result) => {
                        
                        res.send({ status: true, message: "chapter deleted succesfully" })
                    })

            })

    }
    catch (e) {
        console.log(e);
        res.send({ status: false, message: e })
    }
}

export default deletechap;
