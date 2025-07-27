import React from "react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";

export function Chapters({data}){
    let navigate=useNavigate()
     let [chap,setchap]=useState([]);
     let location=useLocation();
    
      useEffect(() => {
        axios.post("https://edusphere-k3kh.onrender.com/chap", { subject_id: location.state.sub_id })
            .then((res) => {
                setchap(res.data.data[0]);
                

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function lecture(chap_id){
        navigate("/video",{replace:true,state:{chap_id:chap_id}})
    }

    return(
         <div className="flex flex-col m-10  h-full justify-center  " >
            {
                chap.map((el, ind) => {
                   
                    return (
                        <div className="p-5 m-5 text-center rounded-xl subject w-60 sm:w-80" onClick={()=>{lecture(el.chapter_id)}} key={ind} style={{backgroundColor:"#d5e2f7",color:"black"}}>
                            <i class="fa-solid fa-bars text-xl"></i>
                            <h3>{el.chapter_name}</h3>
                        </div>
                    )

                })
            }

        </div>
    )
}
