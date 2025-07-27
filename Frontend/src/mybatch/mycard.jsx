import React from "react";
import "../components/card.css"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export function Mycard({ data }) {
 
    const navigate = useNavigate();
     const handleError = (err) =>
            toast.error(err, {
                position: "bottom-left",
            });
        const handleSuccess = (msg) =>
            toast.success(msg, {
                position: "bottom-right",
            })

   async function deletebatch(){
      
        let result= await axios.put("https://edusphere-k3kh.onrender.com/batch",{batch_id:data.batch_id});
         const { status, message } = result.data;
        if (status) {
            handleSuccess(message);
            setTimeout(() => { window.location.href = "/salebatch"; }, 2000);


        } else {
            handleError(message);
        }

    }

    function subject() {
        navigate(`/mysubject`, { replace: true, state: { batch_id: data.batch_id } })
    }
    return (
        <div className="m-5 rounded-t-lg card cursor-pointer" style={{ backgroundColor: "#d5e2f7" }} >
            <div>
                <img className="w-md h-64 rounded-t-lg" src={data.image} alt="" />
            </div>
            <div className="p-5 " >
                <h2 className="text-2xl mb-6 font-bold " style={{ color: "black" }}>{data.batch_name}</h2>

                <h4 className="text-xl mb-6 tracking-wide" style={{ color: "black" }}>₹ {data.price}</h4>
            </div>
            <div className="p-2">
                <button type="submit" onClick={subject} class="w-60 cursor-pointer flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">open</button>
                <button type="submit" onClick={deletebatch} class="w-40 m-2 cursor-pointer flex-none sm:px-3.5 rounded-md bg-pink-500  px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-pink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">delete</button>

            </div>
               <ToastContainer />
        </div>
    )
}
