import React, { useEffect, useState } from "react";
import { Lectureform } from "../creatbatch/Lectureform";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function Myvideo() {
    const [side, setSide] = useState(false);
    const [showAddLecture, setShowAddLecture] = useState(false);
    const [lectures, setLectures] = useState([]);
    const [live, setLive] = useState({ i: 0, link: "" });
    const location = useLocation();

    const handleError = (err) => toast.error(err, { position: "bottom-left" });
    const handleSuccess = (msg) => toast.success(msg, { position: "bottom-right" });

    async function deletelec(lec_id) {
        try {
            const { data } = await axios.put(
                "https://edusphere-k3kh.onrender.com/lec",
                { lec_id }
            );
            const { status, message } = data;
            if (status) {
                handleSuccess(message);
                const res = await axios.post(
                    "https://edusphere-k3kh.onrender.com/lec",
                    { chapter_id: location.state.chap_id }
                );
                if (res.data.data[0].length > 0) {
                    setLectures(res.data.data[0]);
                    setLive({
                        i: 0,
                        link: res.data.data[0][0].lecture_link,
                    });
                }
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError("Delete failed");
        }
    }

    function golive(idx) {
        setLive({ i: idx, link: lectures[idx].lecture_link });
    }

    useEffect(() => {
        async function fetchLectures() {
            try {
                const res = await axios.post(
                    "https://edusphere-k3kh.onrender.com/lec",
                    { chapter_id: location.state.chap_id }
                );
                if (res.data.data[0].length > 0) {
                    setLectures(res.data.data[0]);
                    setLive({
                        i: 0,
                        link: res.data.data[0][0].lecture_link,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchLectures();
    }, []);

    return (
        <div className="flex">
            <div className="p-1 m-2 sm:p-3 sm:m-2 sm:text-5xl">
                <button
                    onClick={() => setSide(!side)}
                    className="sidebarvideo"
                >
                    {side ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-bars"></i>
                    )}
                </button>
            </div>

            {side && (
                <div
                    className="flex flex-col w-1/2 p-1 m-1 sm:p-5 sm:m-5 videosummery"
                    style={{ backgroundColor: "black" }}
                >
                    <button
                        onClick={() => setSide(!side)}
                        className="sidebarvideo"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {lectures.map((el, ind) => (
                        <div
                            key={ind}
                            className="p-1 m-2 sm:p-3 sm:m-2 videodes"
                            onClick={() => golive(ind)}
                            style={
                                live.i === ind
                                    ? { backgroundColor: "#505c70" }
                                    : { backgroundColor: "#f2f7ff" }
                            }
                        >
                            <h3
                                className="text-lg font-semibold"
                                style={{ color: "black" }}
                            >
                                {el.lecture_name}
                            </h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletelec(el.lecture_id);
                                }}
                                type="button"
                                className="w-30 m-2 cursor-pointer flex-none sm:px-3.5 rounded-md bg-pink-500 px-1.5 py-2.5 text-sm text-white shadow-xs hover:bg-pink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                delete
                            </button>
                        </div>
                    ))}

                    <div
                        className="p-1 m-2 sm:p-3 sm:m-2 videodes"
                        style={{ backgroundColor: "#f2f7ff" }}
                        onClick={() => setShowAddLecture(!showAddLecture)}
                    >
                        <i
                            className="fa-solid fa-plus text-lg font-semibold"
                            style={{ color: "black" }}
                        ></i>
                        <h3
                            className="text-lg font-semibold"
                            style={{ color: "black" }}
                        >
                            Add new lecture
                        </h3>
                    </div>
                </div>
            )}

            {showAddLecture && (
                <Lectureform
                    setLectures={setLectures}
                    setShowAddLecture={setShowAddLecture}
                    chapter_id={location.state.chap_id}
                />
            )}

            <div
                className="w-4/5 text-center p-2 m-2 sm:p-5 sm:m-5 mainvideo"
                style={{ backgroundColor: "black" }}
            >
                {live.link.length > 1 && (
                    <video
                        className="h-150 w-4/5 justify-self-center-safe"
                        src={live.link}
                        controls
                    ></video>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}
