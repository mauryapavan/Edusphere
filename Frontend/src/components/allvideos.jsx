import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Video() {
    
    let [side, setside] = useState(false);
    let [lec, setlec] = useState([]);
    let location = useLocation();
    let [live,setlive]=useState({i:0,link:""})

    function golive(idx){
        setlive({i:idx,link:lec[idx].lecture_link})
    }

    useEffect(() => {
        axios.post("https://edusphere-k3kh.onrender.com/lec", { chapter_id: location.state.chap_id })
            .then((res) => {

               if(res.data.data[0].length>0){
                    setlec(res.data.data[0]);
                  //golive(0);
                   setlive({ i: 0, link: res.data.data[0][0].lecture_link })
                }

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
                        console.log(el)
                        return (
                            <div className=" p-1 m-2 sm:p-3 sm:m-2 videodes " onClick={()=>{golive(ind)}} key={ind} style={live.i==ind ?{ backgroundColor: "#505c70"}:{ backgroundColor: "#f2f7ff" }}>
                                <h3 className="text-lg font-semibold " style={{ color: "black" }}>
                                    {el.lecture_name}
                                </h3>
                            </div>
                        )
                    })
                }
            </div>}
            <div className="w-4/5 text-center p-2 m-2 sm:p-5 sm:m-5 mainvideo" style={{ backgroundColor: "black" }}>
                <video className="h-150 w-4/5 justify-self-center-safe" src={live.link} controls  ></video>
            </div>



        </div>

    )
}
