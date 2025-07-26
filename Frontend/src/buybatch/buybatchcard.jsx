import React from "react";
import '../components/card.css'
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Buybatchcard({data}){
  
   const navigate=useNavigate();

   function subject(){
    navigate(`/subjects`,{replace:true,state:{batch_id:data.batch_id}})
   }

    
    return(
        <div className="m-5 rounded-t-lg card cursor-pointer" style={{backgroundColor:"#d5e2f7"}} onClick={subject}>
            <div>
                <img className="w-md h-64 rounded-t-lg" src={data.image} alt="" />
            </div>
            <div className="p-5 " >
                <h2 className="text-2xl mb-6 font-bold " style={{color:"black"}}>{data.batch_name}</h2>
                <h4 className="text-xl mb-6 tracking-wide" style={{color:"black"}}>Owner: {data.owner}</h4>
                <h4 className="text-xl mb-6 tracking-wide" style={{color:"black"}}>₹ {data.price}</h4>
            </div>
           <div className="p-2">
           <button type="submit" class="w-60 cursor-pointer flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">study</button>
           </div>
        </div>
    )
}