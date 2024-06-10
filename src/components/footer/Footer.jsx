import { Copyright } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { Instagram,Linkedin,Mail } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#83D0FF] px-10 py-5 flex justify-evenly items-center bottom-0 flex-col lg:flex-row gap-y-1">
      {/* logo and copyright */}
      <div className=" container font-bold text-[#27399b] ">
       <Link to={'/'}> 
       <div className="flex flex-col items-center gap-1 lg:flex-row">

        <div className="flex items-center">
        <img className="w-12 h-12" src="https://github.com/yashsehgal29/images/blob/main/namaste.png?raw=true"/>
         <span className="text-xl">Namaste-Mart | </span>
        </div>
        
         <div>
          <span className="">  &#169; 2024 Namaste-Mart. All Rights Reserved 2024 </span>
         </div>
        
       </div>
      
       </Link>

      </div>
      {/* social media handles
       */}
       <div className="flex gap-5 text-2xl ">
        <Link><Instagram size={35} strokeWidth={3}/></Link>
        <Link><Linkedin size={35} strokeWidth={3} /></Link>
        <Link><Mail size={35} strokeWidth={3}/></Link>
       </div>
      
    </footer>
    </div>
    
  ); 
};

export default Footer;
