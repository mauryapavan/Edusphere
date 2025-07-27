import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2'
import pool from '../bd.js';







let deletelec=async(req,res)=>{
    let {lec_id}=req.body
   try{
     await pool.query(`delete FROM lecture WHERE  lecture_id =?`, [lec_id])
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
