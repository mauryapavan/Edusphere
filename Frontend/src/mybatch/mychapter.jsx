import React, { useEffect, useState } from "react";
import { Chapterform } from "../creatbatch/chapterform";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


export function Mychapters() {

    let [addchap, setchap] = useState(false);
    let navigate = useNavigate()
    let [chap, setchap2] = useState([]);
    let location = useLocation();

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })

    async function deletechap(chap_id) {

        let { data } = await axios.put("https://edusphere-k3kh.onrender.com/chap", { chap_id });

        const { status, message } = data;
        if (status) {
            handleSuccess(message);
            setTimeout(() => { window.location.href = "/mychapters"; }, 2000);


        } else {
            handleError(message);
        }


    }


    useEffect(() => {
        axios.post("https://edusphere-k3kh.onrender.com/chap", { subject_id: location.state.sub_id })
            .then((res) => {
                setchap2(res.data.data[0]);


            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function lecture(chap_id) {
        navigate("/myvideo", { replace: true, state: { chap_id: chap_id } })
    }

    return (
        <div>
            <div className="flex flex-col m-10  h-full justify-center  " >
                {
                    chap.map((el, ind) => {
                        return (
                            <div className="p-5 m-5 text-center rounded-xl subject w-60 sm:w-80" key={ind} style={{ backgroundColor: "#d5e2f7", color: "black" }}>
                                <i onClick={() => { lecture(el.chapter_id) }} class="fa-solid fa-bars text-xl"></i>
                                <h3 onClick={() => { lecture(el.chapter_id) }}>{el.chapter_name}</h3>
                                <button onClick={() => { deletechap(el.chapter_id) }} type="submit" class="w-30 m-2 cursor-pointer flex-none sm:px-3.5 rounded-md bg-pink-500  px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-pink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">delete</button>

                            </div>
                        )

                    })
                }
            </div>
            <div>


                {addchap && <Chapterform setchap={setchap} subject_id={location.state.sub_id} />}

                <div className="p-5 m-5 text-center rounded-xl mysubject" onClick={() => { setchap(!addchap) }} >
                    <i class="fa-solid fa-plus text-7xl"></i>
                    <h3>Add new chapter</h3>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
