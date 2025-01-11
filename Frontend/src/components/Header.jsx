import React, { useEffect, useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import "./css/Header.css"
import port from "../assets/port.png"
import { Link, Element, animateScroll as scroll } from 'react-scroll';
function Header() {
  const [show, setShow] = useState(false);
  const [focus , setfocus]= useState({
    home:false,
    about:false,
    service:false,
    contact:false,
    resume:false,
    portfolio:false,
  })
  const handlefocus=(section)=>{
    setfocus({
      home:false,
      about:false,
      service:false,
      contact:false,
      resume:false,
      portfolio:false,
      [section]:true,
    })
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 350) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className={`w-[100%] z-50 fixed bg-white flex justify-center transition-all duration-300 ease-in-out ${show ? "":"py-8"} `}>
        <div className={`flex justify-between fixed bg-white w-[90vw]  transition-all duration-0 ease-in-out ${show ? 'border-b-2 p-2' : 'border-b-0'}`}>
          <div className="font-serif flex space-x-2 items-center text-lg lg:text-xl font-bold text-gray-600">
           <div><img src={port} className='w-10' alt="" /></div>
           <div>Portfolio</div>
          </div>
          <button className="lg:hidden block text-xl" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <IoMdMenu /> : <IoMdMenu />}
          </button>
          <ul className="lg:flex lg:space-x-6 hidden ">
          <Link className={`hover:text-[#FCC737] hover:overline cursor-pointer ${focus.home? "lg:overline text-[#FF9D23]":"text-[#CBA35C]"}`} smooth={true} duration={300} onClick={()=>handlefocus("home")} to="home"><li className="text-lg font-serif">Home</li></Link>  
          <Link className={`hover:text-[#FCC737] hover:overline cursor-pointer ${focus.about? "lg:overline text-[#FF9D23]":"text-[#CBA35C]"}`}  smooth={true} duration={300} onClick={()=>handlefocus("about")} to="about"><li className="text-lg font-serif">About</li></Link>
          <Link className={` hover:text-[#FCC737] hover:overline cursor-pointer ${focus.service? "lg:overline text-[#FF9D23]":"text-[#CBA35C]"}`} smooth={true} duration={300} onClick={()=>handlefocus("service")} to="service"> <li className="text-lg font-serif">Skills</li></Link>
          <Link className={` hover:text-[#FCC737] hover:overline cursor-pointer ${focus.resume? "lg:overline text-[#FF9D23]":"text-[#CBA35C]"}`} smooth={true} duration={300} onClick={()=>handlefocus("resume")} to="resume"><li className="text-lg font-serif">Resume</li></Link>
          <Link className={` hover:text-[#FCC737] hover:overline cursor-pointer ${focus.project? "lg:overline text-[#FF9D23]":"text-[#CBA35C]"}`} smooth={true} duration={300} onClick={()=>handlefocus("project")} to="project"><li className="text-lg font-serif">Projects</li></Link>
          <Link className={` hover:text-[#FCC737] hover:overline cursor-pointer ${focus.contact? "lg:overline text-[#FF9D23]":"text-[#CBA35C]"}`}  smooth={true} duration={300} onClick={()=>handlefocus("contact")} to="contact"><li className="text-lg font-serif">Contact</li></Link>
          </ul>
        </div>
      </header>
      
        <div className={`lg:hidden w-screen fixed  ${show ? "mt-2":"mt-14"} transition-all duration-200 ease-in ${mobileMenuOpen?"translate-y-9 opacity-100":" -translate-y-full opacity-0"}  left-0 w-full flex flex-col z-40 animatenav`}>

          <ul className={`bg-[#fff] rounded-b-lg  px-8 py-3 shadow-md w-[90vw] mx-auto ${show?"border-t-0":"border-t-2"}`}>
          <Link className='hover:text-[#FCC737] text-[#CBA35C] hover:overline cursor-pointer' smooth={true} duration={300} to="home"><li className="text-lg font-serif">Home</li></Link>  
          <Link className='hover:text-[#FCC737] text-[#CBA35C] hover:overline cursor-pointer' smooth={true} duration={300} to="about"><li className="text-lg font-serif">About</li></Link>
          <Link className='hover:text-[#FCC737] text-[#CBA35C] hover:overline cursor-pointer' smooth={true} duration={300} to="service"> <li className="text-lg font-serif">Skills</li></Link>
          <Link className='hover:text-[#FCC737] text-[#CBA35C] hover:overline cursor-pointer' smooth={true} duration={300} to="resume"><li className="text-lg font-serif">Resume</li></Link>
          <Link className='hover:text-[#FCC737] text-[#CBA35C] hover:overline cursor-pointer' smooth={true} duration={300} to="project"><li className="text-lg font-serif">Projects</li></Link>
          <Link className='hover:text-[#FCC737] text-[#CBA35C] hover:overline cursor-pointer ' smooth={true} duration={300} to="contact"><li className="text-lg font-serif">Contact</li></Link>
           
            
            
            
          </ul>
        </div>

    
    </>
  );
}

export default Header;
