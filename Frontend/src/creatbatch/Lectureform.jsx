import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export function Lectureform({ setaddlec, chapter_id }) {
    let location = useLocation()


    let [lecname, setlecname] = useState({ name: "", link: "" });
    function handle(e) {
        let { name, value } = e.target
        setlecname({ ...lecname, [name]: value })

    }
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
    async function submit(e) {
        e.preventDefault();
        if (token) {
           
            try {
                const { data } = await axios.post(
                    "https://edusphere-k3kh.onrender.com/addlec",
                    { lecname, chapter_id, token }

                );
                const { status, message } = data;
                if (status) {
                    handleSuccess(message);
                 setaddlec(false);


                } else {
                    handleError(message);
                }
            } catch (error) {
                console.log(error);
            }
            setlecname({ name: "", link: "" })
        }
        else{
            handleError("you are not log in please login ");
        }
    }

    return (
        <div className="flex-col justify-self-center  "  >
            <div className=" flex-col justify-items-center align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                <div className="sm:p-3 sm:m-5 p-2 m-2 flex">
                    <div className="sm:w-50 w-35">
                        <h1 className="font-serif text-xl">add new lecture</h1>
                    </div>

                    <div className="mx-9  "><i class="fa-solid fa-xmark text-2xl" onClick={() => setaddlec(false)}></i> </div>

                </div>
                <form action="" onSubmit={submit}>
                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label for="name" class="sr-only">lecture name</label>
                        <input id="name" name="name" value={lecname.name} onChange={handle} type="text" required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder="set your lecture_ name" />

                    </div>
                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label for="link" class="sr-only">lecture link</label>
                        <input id="link" name="link" value={lecname.link} onChange={handle} type="text" required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder="add your lecture video link" />

                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button><button type="submit" class="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">add lecture</button></button>
                    </div>
                </form>


            </div>
            <ToastContainer />
        </div>
    )
}
