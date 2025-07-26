import React from "react";
import { useLocation, useNavigate } from "react-router-dom";4
import Cookies from 'js-cookie';


export function Profile() {


 let location = useLocation();
 let navigate=useNavigate();
 
 let  user= location.state.user;
 function sale(){
    navigate("/salebatch");
 }
 function buy(){
    navigate("/buybatch");
 }

 function logout(){
    
    Cookies.remove('token');
   window.location.href = "/"; // causes full page reload

 }
    return (
        <div className="flex flex-col justify-items-center align-items-center p-5 m-5 text-center">
            <div className="flex flex-col sm:p-5 sm:m-5 p-1 mb-5 mr-1 ml-1 ">
                <div className=" sm:p-5 sm:m-3 p-3 m-2">
                    <i class="fa-solid fa-circle-user text-7xl sm:text-9xl"></i>
                </div>
                <div>
                    <h2>{user.username}  | {user.email}
                    </h2>

                </div>
            </div>
            <div className="flex  text-center justify-center  sm:flex-nowrap flex-wrap">
            
                <div className="m-5 p-5 w-1/2 profile" onClick={buy} >
                    <i class="fa-solid fa-book-atlas text-7xl"></i>
                    <p>bought batch</p>
                </div>
                <div className="m-5 p-5 w-1/2 profile" onClick={sale}>
                    <i class="fa-solid fa-money-bill text-7xl"></i>
                    <p>sold batch</p>
                </div>
            </div>
            <button type="button" onClick={logout} class="w-60 cursor-pointer flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log out</button>
        </div>
    )
}