import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';
import axios from "axios";
import { useLocation } from "react-router-dom";


export function Formbatch({ setaddbatch }) {
    let [batch, setbatch] = useState({ batch_name: "", price: 0 });
    let [file, setfile] = useState(null);
    let [loading, setloading]=useState(false);
    function handle(e) {
        let { name, value } = e.target;

        setbatch({ ...batch, [name]: value });
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
        setloading(!loading);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('batch', batch.batch_name);
        formData.append('batch', batch.price);
        formData.append('token', token);

        e.preventDefault();
        if (token) {
            try {

                
                const { data } = await axios.post(
                    "https://edusphere-k3kh.onrender.com/addbatch",formData );
                const { status, message } = data;
                if (status) {
                    handleSuccess(message);
                    setTimeout(() => { window.location.href = "/salebatch"; }, 2000);


                } else {
                    handleError(message);
                }
            } catch (error) {
                console.log(error);
            }
            setbatch({ batch_name: "", price: 0 })
        }
        else {
            handleError("you are not log in please log in");
        }
        setloading(!loading);
    }
    return (
        <div className="flex-col justify-self-center   "  >
         {loading==true ? <div><h1 className="text-3xl">uploading</h1></div>: 
            <div className=" flex-col justify-items-center  align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                <div className="sm:p-3 sm:m-5 p-2 m-2 flex">
                    <div className="sm:w-50 w-35">
                        <h1 className="font-serif text-xl">creat  new  batch</h1>
                    </div>

                    <div className="mx-9"><i class="fa-solid fa-xmark text-2xl" onClick={() => { setaddbatch(false) }}></i> </div>

                </div>
                <form action="" onSubmit={submit} encType="multipart/form-data">
                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label for="batch_name" class="sr-only">batch name</label>
                        <input id="batch_name" onChange={handle} value={batch.batch_name} name="batch_name" type="text" required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder="set your batch name" />

                    </div>
                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label for="image_link" class="sr-only">upload image</label>
                        <input id="image_link" onChange={e => setfile(e.target.files[0])} type="file" required class="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" />

                    </div>
                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label for="price" class="sr-only">price</label>
                        <input id="price" name="price" value={batch.price} onChange={handle} type="number" required class="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" placeholder="add batch price" />

                    </div>
                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button><button type="submit" class="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">add batch</button></button>
                    </div>
                </form>


            </div>}
            <ToastContainer />
        </div>
    )
}
