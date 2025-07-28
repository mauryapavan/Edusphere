import React from "react";

import Cookies from 'js-cookie';
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

import { Mycard } from "./mycard";
import { Formbatch } from "../creatbatch/batchform";

export function Mybatch() {
     let {token}=Cookies.get();

    let [addbatch, setaddbatch] = useState(false);

    let [data1, setdata1] = useState([]);
    useEffect(() => {
        axios.post("https://edusphere-k3kh.onrender.com/salebatch",{token})
            .then((res) => {

                setdata1(res.data.result[0]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [addbatch])



    return (
        <div>

            <div className="flex flex-wrap m-10 justify-center">

                {
                    data1.map((el, ind) => {
                       
                        return (
                            <div>
                                <Mycard key={ind} data={el} setaddbatch={setaddbatch} />
                            </div>
                        )

                    })
                }
                {addbatch && <Formbatch setaddbatch={setaddbatch} />}
                <div className="p-5 m-5 flex flex-col addnewbatch text-center" onClick={() => { setaddbatch(!addbatch) }} >
                    <div className="p-5 m-5"><i class="fa-solid fa-plus text-7xl"></i></div>
                    <div className="p-5 m-5"><h3 className="text-xl">Add new batch</h3></div>
                </div>
            </div>
        </div>
    )
}
