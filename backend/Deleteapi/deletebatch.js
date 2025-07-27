import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import pool from '../bd.js';
dotenv.config();


async function delaetsub(sub_id) {
    try {
        await pool.query(`SELECT * FROM chapter WHERE subject_id=?`, [sub_id])
            .then(async (result) => {
 
                result[0].forEach(async (el) => {
                      console.log(el)
                    await pool.query(`delete FROM lecture WHERE  chapter_id =?`, [el.chapter_id])

                })

                await pool.query(`delete FROM chapter WHERE subject_id=?`, [sub_id])
                    .then(async (result1) => {
                        
                        await pool.query(`delete FROM subject WHERE subject_id=?`, [sub_id])

                    })

            })


    }
    catch (e) {
        res.send({ status: false, message: e });
    }
}


let deletebatch = async (req, res) => {
    console.log(req.body)
    let { batch_id } = req.body;
    try {
        await pool.query(`SELECT * FROM subject WHERE batch_id=?`, [batch_id])
            .then((result) => {

                result[0].forEach((el) => {
                    delaetsub(el.subject_id)

                })
            })
        await pool.query(`delete FROM batch WHERE batch_id=?`, [batch_id])
        .then(()=>{
             res.send({ status: true, message: "batch deleted succesfully" });
        })
    }
    catch (e) {
        res.send({ status: false, message: e })
    }

}

export default deletebatch;
