import React from 'react';
import resume from '../assets/portfolio.png';
import ecom from "../assets/ecom.png";
import photogallery from "../assets/photogallery.png";
import space from "../assets/space.png";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function Project() {
  const project = [
    [resume, "Frontend", "Portfolio", "https://portfolio-mu-ten-25.vercel.app/"],
    [ecom, "FullStack", "E-Commerce", "https://ecommerce-coral-five-60.vercel.app/"],
    [space, "Frontend", "Blog", "https://space-pro-five.vercel.app/"],
    [photogallery, "Frontend", "Photogallery", "https://frontendphoto.vercel.app/"]
  ];

  return (
    <>
      <div className='mt-5 font-serif lg:mb-20'>
        <div className='flex md:flex-row flex-col '>
          <div className='w-1/2  flex justify-center items-center'>
            <div className='w-fit p-4 overflow-hidden'>
              <motion.div
                initial={{ translateX: "100%" }}
                whileInView={{ translateX: "0" }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                viewport={{ once: true }}
                className='font-serif lg:text-4xl text-3xl overline text-[#CBA35C]'>
                Project
              </motion.div>
            </div>
          </div>

          <div className='md:w-3/4 grid lg:grid-cols-4 grid-cols-2 gap-4 mt-3'>
            {project.map((e, index) => {
              return (
                <Link to={e[3]} key={index}>
                  <motion.div
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{
                    duration: 1,
                    delay: 0.2, 
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  viewport={{ once: true }} 
                  
                    className='shadow-md h-38 hover:bg-gray-200 pb-2'>
                    <img src={e[0]} className='w-full' alt="" />
                    <div className='text-gray-500 text-center mb-3 text-sm mt-2'>
                      {e[1]}
                    </div>
                    <div className='text-gray-500 text-center mb-1 font-semibold'>
                      {e[2]}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
