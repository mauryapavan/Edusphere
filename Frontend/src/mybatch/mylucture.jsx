import React, { useEffect, useState } from "react";
import { Lectureform } from "../creatbatch/Lectureform";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function Myvideo() {
    let [side, setside] = useState(false);
    let [addlec, setlec] = useState(false);

    let [lec, setlec2] = useState([]);
    let location = useLocation();
    let [live, setlive] = useState({ i: 0, link: "" });
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })

    async function deletelec(lec_id) {

        let {data} = await axios.put("https://edusphere-k3kh.onrender.com/lec", { lec_id });
        
        const { status, message } = data;
        if (status) {
            handleSuccess(message);
            setTimeout(() => { window.location.href = "/myvideo"; }, 2000);


        } else {
            handleError(message);
        }


    }

    function golive(idx) {
        setlive({ i: idx, link: lec[idx].lecture_link })
    }

    useEffect(async () => {
        await axios.post("https://edusphere-k3kh.onrender.com/lec", { chapter_id: location.state.chap_id })
            .then((res) => {

                setlec2(res.data.data[0]);
                //golive(0);
                setlive({ i: 0, link: res.data.data[0][0].lecture_link })

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="flex  "  >
            <div className="p-1 m-2 sm:p-3 sm:m-2 sm:text-5xl">
                <button onClick={() => { setside(!side) }} className="sidebarvideo">
                    {side == true ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-bars"></i>}

                </button>
            </div>
            {side && <div className=" flex flex-col w-1/2 p-1 m-1 sm:p-5 sm:m-5 videosummery" style={{ backgroundColor: "black", }} >
                <button onClick={() => { setside(!side) }} className="sidebarvideo">
                    <i class="fa-solid fa-xmark"></i>

                </button>
                {
                    lec.map((el, ind) => {
                        return (
                            <div className=" p-1 m-2 sm:p-3 sm:m-2 videodes " onClick={() => { golive(ind) }} key={ind} style={live.i == ind ? { backgroundColor: "#505c70" } : { backgroundColor: "#f2f7ff" }}>
                                <h3 className="text-lg font-semibold " style={{ color: "black" }}>
                                    {el.lecture_name}
                                </h3>
                                <button onClick={() => { deletelec(el.lecture_id) }} type="submit" class="w-30 m-2 cursor-pointer flex-none sm:px-3.5 rounded-md bg-pink-500  px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-pink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">delete</button>

                            </div>
                        )
                    })


                }
                <div className=" p-1 m-2 sm:p-3 sm:m-2 videodes " style={{ backgroundColor: "#f2f7ff" }} onClick={() => { setlec(!addlec) }}>
                    <i class="fa-solid fa-plus text-lg font-semibold  " style={{ color: "black" }}></i>
                    <h3 className="text-lg font-semibold " style={{ color: "black" }}>Add new lecture</h3>
                </div>
            </div>}
            {addlec && <Lectureform setlec={setlec} chapter_id={location.state.chap_id} />}
            <div className="w-4/5 text-center p-2 m-2 sm:p-5 sm:m-5 mainvideo" style={{ backgroundColor: "black" }}>
                {live.link.length > 1 && <video className="h-150 w-4/5 justify-self-center-safe" src={live.link} controls  ></video>}
            </div>

            <ToastContainer />

        </div>

    )
}
