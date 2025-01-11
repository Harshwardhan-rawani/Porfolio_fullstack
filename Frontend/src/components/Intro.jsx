import React, { useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion, spring, useScroll } from "framer-motion";
import photo from "../assets/photo.png"
import { IoMdDownload } from "react-icons/io";
import resumeFile from "../assets/Harshwardhan_Rawani.pdf"
import Aos from 'aos';
import email from "../assets/gmail.png"
import mobile from "../assets/mobile.png"
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
function Intro() {
  useEffect(() => {
    Aos.init({
      duration: 1200, 
      easing: 'ease', 
      once: true, 
      mirror: false,
    });
  }, []);
  return (
    <>
    
   <div>
    <div className='xl:px-32 px-10 flex justify-between relative font-serif bg-[#FEF9E1]'>
      <div className='lg:my-14 md:my-10 my-8'>
        <p className='  text-gray-800 font-bold xl:text-5xl text-4xl' data-aos = "fade-in" data-aos-delay= "0">Hello! I Am </p>
        <br />
        <p className=' text-[#FF9D23] font-bold xl:text-4xl text-3xl  ' data-aos = "fade-in" data-aos-delay= "400">Harshwardhan Rawani</p>
        <div data-aos = "fade-in"
        data-aos-delay = "700">

<TypeAnimation
    
    sequence={[
    'I am Software Engineer',
    1000,
      'I am  Frontend developer',
      1000, 
      'I am backend developer',
      1000
    ]}
    wrapper="span"
    speed={20}
    style={{ fontSize: '1.5em', display: 'inline-block', fontStyle:"italic"}}
    repeat={Infinity}
  />
        </div>
        <a
            href={resumeFile}
            download="Harshwardhan_Rawani.pdf"
            
          >
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 1, delay: 0.5 },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.2 },
          }}
          viewport={{ amount: 0.1, once: true }}
          className="bg-[#CBA35C] text-white p-2  rounded-lg shadow-md mt-4"
        >
        
            Download CV | <IoMdDownload className='text-lg text-white inline'/>

        </motion.button>
        </a>
        <div className='lg:space-x-5 space-y-3 lg:space-y-0 mt-3 lg:flex'>
        <div className='flex space-x-2'>
  <img className='w-5 h-5' src={mobile} alt="Phone Icon" />
  <a href="tel:+919122895021" className='text-sm font-sans underline hover:text-green-500'>
    +91-9122895021
  </a>
</div>

<div className='flex space-x-2'>
  <img className='w-5 h-5' src={email} alt="Email Icon" />
  <a 
    href="mailto:harshwardhan.rawani@gmail.com" 
    className='text-sm font-sans underline hover:text-red-500'
  >
    harshwardhan.rawani@gmail.com
  </a>
</div>

        </div>
      </div>
      <div className='md:block hidden absolute bottom-0  right-10'>
        <img src={photo} alt="" className='xl:w-[26vw] lg:w-[28vw] md:w-[32vw] ' data-aos = "fade-in" data-aos-delay="300"/>
      </div>
    </div>
   </div>
    </>
  )
}

export default Intro
