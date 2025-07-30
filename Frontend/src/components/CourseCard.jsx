import React from "react";
import './card.css'
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';

export function Card({data}){
 let { token } = Cookies.get();

    //  toastcontainer
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })
    async function buy(batch_id) {
       
        if (token) {
            try {
                const { data } = await axios.post(
                    "https://edusphere-k3kh.onrender.com/buy",
                    { batch_id,  token }

                );
                
                const { status, message } = data;
                if (status) {
                    handleSuccess(message);
                    
                } else {
                    handleError(message);
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        else{
            handleError("you are not log in please log in");
        }
    }
   
    
    return(
        <div className="m-5 rounded-t-lg card cursor-pointer" style={{backgroundColor:"#d5e2f7"}} >
            <div>
                <img className="w-md h-64 rounded-t-lg" src={data.image} alt="" />
            </div>
            <div className="p-5 " >
                <h2 className="text-2xl mb-6 font-bold " style={{color:"black"}}>{data.batch_name}</h2>
                <h4 className="text-xl mb-6 tracking-wide" style={{color:"black"}}>Owner: {data.owner}</h4>
                <h4 className="text-xl mb-6 tracking-wide" style={{color:"black"}}>₹ {data.price}</h4>
            </div>
           <div className="p-2">
           <button type="submit" onClick={()=>{buy(data.batch_id)}} class="w-60 cursor-pointer flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Buy</button>
           </div>
           <ToastContainer />
        </div>
    )
}
