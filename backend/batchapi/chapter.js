import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2'
import pool from '../bd.js';





let chapter = async (req, res) => {
    let data = req.body

    try {
        await pool.query(`SELECT * FROM chapter WHERE subject_id=?`, [data.subject_id])
            .then((result) => {

                res.send({ status: true, message: "succes", data: result });
            })
    }
    catch (e) {
        res.send({ status: false, message: e });
    }


}

export default chapter;
