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


let lecture = async (req, res) => {
    let data = req.body

    try {
        await connection.promise().query(`SELECT * FROM lecture WHERE chapter_id=?`, [data.chapter_id])
            .then((result) => {
                
                res.send({ status: true, message: "succes", data: result });
            })
    }
    catch (e) {
        res.send({ status: false, message: e });
    }


}


export default lecture;