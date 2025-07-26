import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import axios from 'axios';
import { replace, useLocation, useNavigate } from "react-router-dom";

export function Subject() {
    let navigate=useNavigate();
    let location = useLocation()

    let [sub, setsub] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:9999/sub", { batch_id: location.state.batch_id })
            .then((res) => {
                setsub(res.data.data[0]);
                console.log(res.data.data[0])

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function chapter(sub_id){
        console.log(sub_id)
        navigate("/chapters",{replace:true,state:{sub_id:sub_id}})
    }




    return (
        <div className="flex flex-wrap m-10  h-full" >
            {
                sub.map((el, ind) => {
                    return (
                        <div className="p-5 m-5 text-center rounded-xl subject " onClick={()=>{chapter(el.subject_id)}} key={ind} style={{ backgroundColor: "#d5e2f7", color: "black" }}>
                            <i class="fa-solid fa-book-open-reader text-8xl"></i>
                            <h3>{el.subject_name}</h3>
                        </div>
                    )

                })
            }

        </div>
    )
}