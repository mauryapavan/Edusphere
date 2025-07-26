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

let deletechap = async (req, res) => {

    let { chap_id } = req.body;
    try {
        await connection.promise().query(`delete FROM lecture WHERE  chapter_id =?`, [chap_id])
            .then(async () => {
                await connection.promise().query(`delete FROM chapter WHERE  chapter_id =?`, [chap_id])
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