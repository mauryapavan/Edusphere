import React, { useEffect, useState } from "react";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


import { data } from "./batchdata";
import { Navbar } from "./Navbar";

import { Footer } from "./Footer";
import { Wholecard } from "./wholecard";
import { Subject } from "./subject";
import { Chapters } from "./chapters";
import { Video } from "./allvideos";
import { Login } from "./Loignpage";
import { Signup } from "./Signuppage";
import { Profile } from "./profilepage";
import { Lectureform } from "../creatbatch/Lectureform";
import { Mybatch } from "../mybatch/mybatch";
import { Mysubject } from "../mybatch/mysubject";
import { Mychapters } from "../mybatch/mychapter";
import { Myvideo } from "../mybatch/mylucture";
import { Buybatch } from "../buybatch/buybatch";

export default function Dashboard() {

   let [user,setuser]=useState([]);

 
 let {token}=Cookies.get();

   useEffect(() => {
        axios.post("http://localhost:9999/auth",{token})
            .then((res) => {
                
                if(res.data.data){
                    setuser(res.data.data);
                }
                
                

            })
            .catch((err) => {
                console.log(err);
            })
    },[])
  
  
       
    return (
        <div>
            <BrowserRouter>
            <div>
                <Navbar user={user} />
            </div>
    

            <Routes>
                
                <Route path="/" element={<Wholecard/>}></Route>
                <Route path="/login" element={<Login setuser={setuser} />  }></Route>
                <Route path="/signin" element={<Signup/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/subjects" element={<Subject/> }></Route>
                <Route path="/chapters" element={<Chapters />}></Route>
                <Route path="/video" element={<Video />}></Route>
                <Route path="/buybatch" element={<Buybatch/>}></Route>
                <Route path="/salebatch" element={<Mybatch  />}></Route>
                <Route path="/mysubject" element={<Mysubject />}></Route>
                <Route path="/mychapters" element={<Mychapters />}></Route>
                <Route path="/myvideo" element={<Myvideo />}></Route>
            </Routes>
            
          
           

            <div className="mt-5" style={{ backgroundColor: "#241e2e" }}>
                <Footer />
            </div>
            </BrowserRouter>
        </div>
    )

}