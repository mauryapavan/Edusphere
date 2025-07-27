import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2'
import pool from '../bd.js';







let deletesub = async (req, res) => {
    let { sub_id } = req.body;
    try {
        await pool.query(`SELECT * FROM chapter WHERE subject_id=?`, [sub_id])
            .then(async(result) => {

                result[0].forEach(async (el) => {
                   
                    await pool.query(`delete FROM lecture WHERE  chapter_id =?`, [el.chapter_id])
                    
                })
                
             await pool.query(`delete FROM chapter WHERE subject_id=?`, [sub_id])
                    .then(async(result1)=>{
                        
                         await pool.query(`delete FROM subject WHERE subject_id=?`, [sub_id])
                         .then(() => {
                        
                        res.send({ status: true, message: "subject deleted succesfully" })
                    })
                    })

                })

            
    }
    catch (e) {
        res.send({ status: false, message: e });
    }
}

export default deletesub;
