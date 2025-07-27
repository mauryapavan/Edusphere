import React, { useState } from "react";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login({ setuser }) {
    let navigate = useNavigate();


    let [input, setinput] = useState({ email: "", password: "" })
    const handleinput = (e) => {

        let { name, value } = e.target


        setinput({
            ...input,
            [name]: value,
        });
    };

    //  toastcontainer
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })

    async function login(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "https://edusphere-k3kh.onrender.com/login",
                {
                    ...input,
                }

            );
            console.log(data);
            const { status, message, token,userdata } = data;
            if (token) {
                Cookies.set("token", JSON.stringify(token), { expires: 1 }); // 7 days
            }

           
            if (status) {
                setuser(userdata);
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setinput({
            ...input,
            email: "",
            password: "",

        })
    }




    return (
        <div className="flex-col justify-self-center  "  >
            <div className=" flex-col justify-items-center align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                <div className="sm:p-3 sm:m-5 p-2 m-2">
                    <h1 className="font-serif text-4xl">Login</h1>
                </div>
                <form action="" onSubmit={login}>
                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" onChange={handleinput} value={input.email} name="email" type="email" required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder="Enter your email" />

                    </div>
                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="password" class="sr-only">password</label>
                        <input id="password" onChange={handleinput} value={input.password} name="password" type="password" required class="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" placeholder="Enter your password" />

                    </div>
                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button><button type="submit" class="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log in</button></button>
                    </div>
                </form>

                <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                    <p> you have not an acount on EduSphere then please <a href="/signin" style={{ color: "blue" }}>Sign in <span aria-hidden="true">&rarr;</span></a></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
