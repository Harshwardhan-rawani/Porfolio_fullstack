import React, { useEffect } from 'react';
import { motion, spring, useScroll } from "framer-motion";
import 'aos/dist/aos.css';
import photo from "../assets/photo.png";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";
import github from "../assets/github.svg";
import { Link } from 'react-scroll';

function About() {
  const image = [
    [linkedin, "https://www.linkedin.com/in/harshwardhan-rawani-a0697b24a/"],
    [instagram, "https://www.instagram.com/harshwardhan_rawani/"],
    [github, "https://github.com/Harshwardhan-rawani?tab=repositories"],
  ];


  return (
    <div className="font-serif">
      <div className="xl:flex justify-between">
        {/* Left Section */}
        <div className="xl:w-1/2">
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-fit p-4 overflow-hidden">
              <motion.div
               initial={{ opacity: 0, x: 50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               transition={{
                 duration: 1,
                 delay: 0.2, 
                 type: "spring",
                 stiffness: 100,
                 damping: 10,
               }}
               viewport={{ once: true }} 
                className="font-serif lg:text-4xl text-3xl overline text-[#CBA35C]"
              >
                About Me
              </motion.div>
            </div>
          </div>
          <div className="w-fit overflow-hidden">
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
                className="lg:pb-10 pb-5 mt-3"
              >
                <div className="flex justify-center">
                <img src={photo} alt="" className="w-3/4 px-2" />
              </div>
              <div className="flex justify-center">
                <div className="border-2 w-3/4 border-t-0 p-2 shadow-md">
                  <div className="text-center italic">
                    Harshwardhan Rawani
                  </div>
                </div>
              </div>
              </motion.div>
  
          </div>
        </div>

        {/* Right Section */}
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
                     className="lg:border-l-2 p-5 flex flex-col items-center justify-center xl:w-3/4 w-full lg:shadow-lg overflow-hidden"
              >
                <div className=''>
            <div className="text-2xl border-b-2 text-gray-600 w-fit text-center">
              Profile
            </div>
            <br />
            <table className="table text-gray-600">
              <tbody>
                <tr>
                  <td>Age :</td>
                  <td>21</td>
                </tr>
                <tr>
                  <td className="w-32 lg:w-56">Occupation : </td>
                  <td>Btech 3rd year</td>
                </tr>
                <tr>
                  <td>College :</td>
                  <td>Aditya College of Engineering and Technology</td>
                </tr>
                <tr>
                  <td>DOB :</td>
                  <td>20/02/2003</td>
                </tr>
                <tr>
                  <td>Work :</td>
                  <td>Web Developer</td>
                </tr>
              </tbody>
            </table>
            <Link to="contact" className='flex justify-center'>
            <motion.button
                      initial={{ opacity: 0 }}
                      whileInView={{
                        opacity: 1,
                        transition: { duration: 1, delay: 0.5 },
                      }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.2 },
                      }}
                      viewport={{ amount: 0.1, once: true }}
                      className="bg-[#CBA35C] text-white p-2  rounded-lg shadow-md mt-4"
                    >
                    
                        Contact me
            
                    </motion.button>
            </Link>
             
          </div>

                <div
            className="flex mt-5"
            data-aos="fade-up"
            data-aos-offset="250" // Trigger slightly earlier
          >
            --------
            {image.map((e, index) => (
              <a
                href={e[1]}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <img src={e[0]} alt="" className="w-5 mx-2" />
              </a>
            ))}
            --------
          </div>
              </motion.div>
       
      </div>
    </div>
  );
}

export default About;
