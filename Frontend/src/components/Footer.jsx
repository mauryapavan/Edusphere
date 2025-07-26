import React from "react";

export function Footer(){
    return(
        <div className="flex mt-3 p-3 sm:mt-5 sm:p-5 ">
            <div className="m-2 p-2 sm:mt-5 sm:p-5  w-1/2 justify-center flex flex-col items-center">
                <img  className="myphoto w-sm h-sm" src="https://res.cloudinary.com/dop3yq9to/image/upload/v1753532469/Edusphere/rnyognn68qnpnx9rh7b2.jpg" alt="" />
                <h4 className="mt-5 text-2xl">maurya pawan</h4>
                <div className="flex">
                    <a href="https://www.instagram.com/mauryapavan662/" className="m-2 text-2xl contact"><i class="fa-brands fa-square-instagram"></i></a>
                    <a href="www.linkedin.com/in/pawan-maurya-494455339" className="m-2 text-2xl contact"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/mauryapavan?tab=repositories" className="m-2 text-2xl contact"><i class="fa-brands fa-github"></i></a>

                </div>
            </div>
          <div className="m-2 p-2 sm:m-5 sm:p-5 w-1/2">
             <div>
                <p className="text-sm sm:text-base">
                EduSphere is a online learninng plateform
                where student can read  with their favorite teachers
                and that plateform is very useful for teachers they can sale his 
                online courses and also teachers can learn any other courses
            
                </p><br />
                <a href=""  className="policy">Terms & Condition</a>
                <a href=""  className="policy"> | Privacy & Policy</a>

             </div>
          </div>
        </div>
    )
}