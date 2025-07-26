import React from "react";
import { Card } from "./CourseCard";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

export function Wholecard() {

let [data1, setdata1] = useState([]);
  useEffect(()=>{
     axios.post("http://localhost:9999/")
   .then((res)=>{
   
    setdata1(res.data.result[0]);
     })
   .catch((err)=>{
    console.log(err);
   })
  },[])
    
 


    return (
        <div className="flex flex-wrap m-10 justify-center">
            {
                data1.map((el, ind) => {
                    return (
                        <div>
                            <Card key={ind} data={el} />
                        </div>
                    )

                })
            }

        </div>
    )
}