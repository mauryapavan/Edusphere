import React from "react";
import { useNavigate } from "react-router-dom";

export  function Navbar({user}){
  let navigate=useNavigate();
  function  navprof(){
    navigate("/profile",{replace:true,state:{user:user}})
  }
  
    
  return(
    <>
    <nav class="flex items-center justify-between p-3 sm:p-6 lg:px-8" aria-label="Global" style={{color:"aliceblue"}}>
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5 text-3xl sm:text-5xl icon">
          <span class="sr-only">Your Company</span>
          <i class="fa-solid fa-graduation-cap"></i>
        </a>
      </div>
      <div class="mt-6 flex max-w-md gap-x-4">
          <label for="email-address" class="sr-only">Batch name</label>
          <input id="email-address" name="batch" type="text"  required class="w-30 sm:w-60 bg-white/5  px-3.5" placeholder="search batch name"/>
          <button type="submit" class="flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Search</button>
        </div>
      
      {user.length<1?<div class="md-flex lg:flex lg:flex-1 lg:justify-end mr-5">
        <div className="mr-1  sm:mr-5 signin">
        <a href="/signin" class=" text-base sm:text-lg  ">Sign in <span aria-hidden="true">&rarr;</span></a>
        </div>
      <div className="mr-1 sm:mr-5 login">
      <a href="/login" class="text-lg ">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
        
      </div>
      :
      <div className="md-flex lg:flex lg:flex-1 lg:justify-end mr-5 "><a onClick={navprof} className="profileicon"><i class="fa-solid fa-user text-2xl sm:text-4xl"></i></a></div>}
      
    </nav>

    </>
  )
}