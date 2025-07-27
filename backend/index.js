import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import mysql from 'mysql2';
import methodOverride from 'method-override';

import multer from 'multer';

import bodyParser from 'body-parser';
import { faker } from '@faker-js/faker';

import cookieParser from 'cookie-parser';
import { cloudinary, storage } from './addbatchsapi/cloudConfig.js';


const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use('/uploads', express.static('uploads'));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() +file.originalname)
// });

const upload = multer({ storage });





import data from './batchdata.js';
import signin from './authentication/signin.js';
import login from './authentication/auth.js';
import newauth from './authentication/newauth.js';
import allbatch from './batchapi/allbatch.js';
import subject from './batchapi/subject.js';
import chapter from './batchapi/chapter.js';
import lecture from './batchapi/lecture.js';
import addsub from './addbatchsapi/addsub.js';
import addchap from './addbatchsapi/addchap.js';
import addlec from './addbatchsapi/addlec.js';
import authrization from './addbatchsapi/authrization.js';
import addbatch from './addbatchsapi/addbatch.js';
import newbuybatch from './newbuy/newbuy.js';
import salebatches from './addbatchsapi/salebatch.js';
import deletebatch from './Deleteapi/deletebatch.js';
import deletesub from './Deleteapi/deletesubject.js';
import deletechap from './Deleteapi/deletechapter.js';
import deletelec from './Deleteapi/deletelecture.js';
import imgupload from './addbatchsapi/imageupload.js';
import pool from './bd.js';









function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    // email: faker.internet.email(),

    //password: faker.internet.password(), 

  };
}



app.get("/", (req, res) => {
  res.send("hii i am pawan maurya ")
})



//     batch api
app.post("/", allbatch);
app.post("/sub", subject);
app.post("/chap", chapter);
app.post("/lec", lecture);



app.post("/auth", newauth)
app.post("/signin", signin)
app.post("/login", login)


// creat batch api
app.post("/salebatch", authrization, salebatches);

app.post("/addbatch", upload.single('file'), authrization, addbatch);
app.post("/addsub", authrization, addsub);
app.post("/addchap", authrization, addchap);
app.post("/addlec", authrization, addlec);

// purchase batch
app.post("/buy", authrization, newbuybatch)
// purschased bacth
app.post("/purchased", authrization, async (req, res) => {
  let data = req.body;
  let i = 0;
  let allbatch = [];
  try {
    await pool.query(`SELECT * FROM purchased WHERE student_email=?`, [data.email])
      .then(async (result) => {
        let b = result[0].length;
        await result[0].forEach(async (el) => {
          await pool.query(`SELECT * FROM batch WHERE batch_id=?`, el.batch_id)
            .then((result) => {
              allbatch.push(result[0][0])
            })
          if (i == b - 1) {
            res.send({ allbatch })
          }
          i++;
        })
      }
      )
  }
  catch (e) {
    console.log(e)
  }
})


// delete api
app.put("/batch", deletebatch);
app.put("/sub", deletesub);
app.put("/chap", deletechap);
app.put("/lec", deletelec);



app.listen(process.env.port, () => {
  console.log("app is listen on " + process.env.port)
})
