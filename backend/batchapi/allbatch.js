
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

function createRandomUser() {
    return {
        userId: faker.string.uuid(),
    };
}



let allbatch = async (req, res) => {

    
    try {
        await connection.promise().query("SELECT * FROM batch")
            .then((result) => {
               
                res.send({  result });
            })
    }
    catch (e) {
        res.send({ status: false, message: e });
    }

   


}


export default allbatch;