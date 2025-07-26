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
});
let deletesub = async (req, res) => {
    let { sub_id } = req.body;
    try {
        await connection.promise().query(`SELECT * FROM chapter WHERE subject_id=?`, [sub_id])
            .then(async(result) => {

                result[0].forEach(async (el) => {
                   
                    await connection.promise().query(`delete FROM lecture WHERE  chapter_id =?`, [el.chapter_id])
                    
                })
                
             await connection.promise().query(`delete FROM chapter WHERE subject_id=?`, [sub_id])
                    .then(async(result1)=>{
                        
                         await connection.promise().query(`delete FROM subject WHERE subject_id=?`, [sub_id])
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