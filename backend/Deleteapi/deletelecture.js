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
   waitForConnections: true,
  connectionLimit: 5, // adjust as per host limit
  queueLimit: 0,
});
let deletelec=async(req,res)=>{
    let {lec_id}=req.body
   try{
     await connection.promise().query(`delete FROM lecture WHERE  lecture_id =?`, [lec_id])
     .then((result)=>{
        console.log(result);
        res.send({status:true,message:"lecture deleted succesfully"})
     })

   }
   catch(e){
    console.log(e);
    res.send({status:false,message:e})
   }
}

export default deletelec
