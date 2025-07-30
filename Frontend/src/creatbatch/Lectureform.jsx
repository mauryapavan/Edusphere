import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function Lectureform({ setLectures,setShowAddLecture, chapter_id }) {
    const location = useLocation();
    const [lecname, setlecname] = useState({ name: "", link: "" });
    const token = Cookies.get("token"); // ✅ fixed

    const handle = (e) => {
        const { name, value } = e.target;
        setlecname({ ...lecname, [name]: value });
    };

    const handleError = (err) =>
        toast.error(err, { position: "bottom-left" });
    const handleSuccess = (msg) =>
        toast.success(msg, { position: "bottom-right" });

    const submit = async (e) => {
        e.preventDefault();
        if (!token) {
            return handleError("You are not logged in, please login.");
        }

        try {
            const { data } = await axios.post(
                "https://edusphere-k3kh.onrender.com/addlec",
                { lecname, chapter_id, token }
            );
            const { status, message } = data;

            if (status) {
                handleSuccess(message);
                setaddlec(false); // ✅ closes the form
            } else {
                handleError(message);
            }
        } catch (error) {
            console.error(error);
            handleError("Server error while adding lecture.");
        }

        setlecname({ name: "", link: "" });
    };

    return (
        <div className="flex-col justify-self-center">
            <div className="flex-col justify-items-center align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130">
                <div className="sm:p-3 sm:m-5 p-2 m-2 flex">
                    <div className="sm:w-50 w-35">
                        <h1 className="font-serif text-xl">Add new lecture</h1>
                    </div>
                    <div className="mx-9">
                        <i
                            className="fa-solid fa-xmark text-2xl cursor-pointer"
                            onClick={() => setaddlec(false)}
                        ></i>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label htmlFor="name" className="sr-only">
                            Lecture name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={lecname.name}
                            onChange={handle}
                            type="text"
                            required
                            className="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl"
                            placeholder="Enter lecture name"
                        />
                    </div>

                    <div className="sm:p-3 sm:m-3 p-1 m-1">
                        <label htmlFor="link" className="sr-only">
                            Lecture link
                        </label>
                        <input
                            id="link"
                            name="link"
                            value={lecname.link}
                            onChange={handle}
                            type="text"
                            required
                            className="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl"
                            placeholder="Add lecture video link"
                        />
                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button
                            type="submit"
                            className="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Add Lecture
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
