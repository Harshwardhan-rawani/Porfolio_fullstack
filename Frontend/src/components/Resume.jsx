import React, { useEffect, useState } from 'react';
import photo from "../assets/resume.jpg";
import { motion } from "framer-motion";
import { IoMdDownload } from 'react-icons/io';
import axios from 'axios';

function Resume() {
  const [resumes, setResumes] = useState([]);
  console.log(resumes)
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/resumes`);
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    fetchResumes();
  }, []);

  return (
    <>
      <div className="mt-5">
        <div className="flex md:flex-row flex-col-reverse">
          <div className="md:w-1/2 w-full drop-shadow-lg p-5 flex">
            <motion.img
              src={photo}
              className="w-1/2 -rotate-3"
              alt="Resume Preview"
            />
            <motion.img
              src={photo}
              className="w-1/2 rotate-3"
              alt="Resume Preview"
            />
            <motion.img
              initial={{ scale: 1, translateX: "-150%" }}
              whileInView={{ scale: [1.2, 1.1, 1.2, 1.1], translateX: "-150%" }}
              transition={{ duration: 1 }}
              src={photo}
              className="w-1/2 shadow-lg"
              alt="Resume Preview"
            />
          </div>
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
                Resume
              </motion.div>
              <div className="lg:mt-5 mt-2 text-center">
                {resumes.length > 0 && (
                  <a
                    href={`${import.meta.env.VITE_URL}/${resumes[0].resume}`}
                    download={`${resumes[0].name}.pdf`}
                    target='_blank'
                    className="inline-block w-full h-full text-center text-white font-serif"
                  >
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
                      className="bg-[#CBA35C] text-white p-2 rounded-lg shadow-md"
                    >
                      Download CV | <IoMdDownload className="text-lg text-white inline" />
                    </motion.button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume;
