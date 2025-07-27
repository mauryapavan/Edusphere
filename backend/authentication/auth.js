import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


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



let login = async (req, res) => {
    let data = req.body;
    try {
        await connection.promise().query(`SELECT * FROM user WHERE email=?`, [data.email])
            .then((result1) => {
              
                if (result1[0].length >= 1) {
                    
                   
                    bcrypt.compare(data.password, result1[0][0].password, function (err, result) {

                        if (result) {
                            let token = jwt.sign({email: data.email }, process.env.secret, { expiresIn: '24h' });
                        
                           
                            res.send({ status: true, message: "welcome back to Edusphere",userdata:result1[0][0],token:token });
                            return;
                        }
                        else {
                           
                            res.send({ status: false, message: "your email or password is wrong" });
                        }
                    });

                }
                else {
                    res.send({ status: false, message: "you have not an acount please ragister" });
                    return;
                }
            })


    }
    catch (e) {
        console.log(e);
        res.send({ status: false, message: e });
        return;
    }


    //    var decoded = jwt.verify(token, process.env.secret);
    //       res.send(decoded);
}

export default login;
