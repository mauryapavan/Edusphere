import React from "react";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { Buybatchcard } from "./buybatchcard";

export function Buybatch() {
    let { token } = Cookies.get();

    let [data1, setdata1] = useState([]);
    if (token) {
        useEffect(() => {
            axios.post("https://edusphere-k3kh.onrender.com/purchased", { token })
                .then((res) => {
                    console.log(res)
                    setdata1(res.data.allbatch);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, [])
    }





    return (
        <div className="flex flex-wrap m-10 justify-center">
            {
                data1.map((el, ind) => {
                    return (
                        <div>
                            <Buybatchcard key={ind} data={el} />
                        </div>
                    )

                })
            }

        </div>
    )
}
