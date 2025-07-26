import React, { useEffect, useState } from "react";
import { Subform } from "../creatbatch/subjectform";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";


export function Mysubject() {
    let [subname, setsubname] = useState("");
    let [addsub, setsub] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let batch_id = location.state.batch_id;

    let [sub, setsub2] = useState([]);

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })

    async function deletesub(sub_id) {

        let { data } = await axios.put("http://localhost:9999/sub", { sub_id });
        const { status, message } = data;
        if (status) {
            handleSuccess(message);
            setTimeout(() => { window.location.href = "/mysubject"; }, 2000);


        } else {
            handleError(message);
        }

    }

    useEffect(() => {
        axios.post("http://localhost:9999/sub", { batch_id: batch_id })
            .then((res) => {
                setsub2(res.data.data[0]);


            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function chapter(sub_id) {

        navigate("/mychapters", { replace: true, state: { sub_id: sub_id } })
    }

    return (
        <div className="flex flex-wrap m-10  h-full" >
            {
                sub.map((el, ind) => {

                    return (
                        <div className="p-5 m-5 text-center rounded-xl subject " key={ind} style={{ backgroundColor: "#d5e2f7", color: "black" }}>
                            <i onClick={() => { chapter(el.subject_id) }} class="fa-solid fa-book-open-reader text-8xl"></i>
                            <h3 onClick={() => { chapter(el.subject_id) }}>{el.subject_name}</h3>
                            <button onClick={() => { deletesub(el.subject_id) }} type="submit" class="w-30 m-2 cursor-pointer flex-none sm:px-3.5 rounded-md bg-pink-500  px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-pink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">delete</button>

                        </div>
                    )

                })
            }

            {addsub && <Subform setsub={setsub} batch_id={batch_id} />}

            <div className="p-5 m-5 text-center rounded-xl mysubject" onClick={() => { setsub(!addsub) }} >
                <i class="fa-solid fa-plus text-7xl"></i>
                <h3>Add new subject</h3>
            </div>
            <ToastContainer />
        </div>
    )
}