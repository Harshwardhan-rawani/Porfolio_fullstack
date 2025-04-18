import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from 'react-loading';

function Project() {
  const [projects, setProjects] = useState([]);  // Store fetched projects data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch project data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/projects`);
        setProjects(response.data);  // Set the fetched projects to state
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false); // Stop loading after API call (success or error)
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <div className='mt-5 font-serif lg:mb-20'>
        <div className='w-1/2 '>
          <div className='w-fit p-4 overflow-hidden'>
            <motion.div
              initial={{ translateX: "100%" }}
              whileInView={{ translateX: "0" }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              viewport={{ once: true }}
              className='font-serif lg:text-4xl text-3xl overline text-[#CBA35C]'
            >
              Project
            </motion.div>
          </div>
        </div>

        {/* Loading State */}
        <div className="mt-3">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loading type="spin" color="#CBA35C" height={50} width={50} />
           
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={index}
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
                    className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6"
                  >
                    <div className="m-2.5 overflow-hidden rounded-md h-52 flex justify-center items-center">
                      <img
                        src={project.image}
                        className="w-full h-full object-cover"
                        alt={project.name}
                      />
                    </div>

                    <div className="p-6 text-center">
                      <h4 className="mb-1 text-xl font-semibold text-slate-800">
                        {project.name}
                      </h4>
                      <p className="text-sm font-semibold text-slate-500 uppercase">
                        {project.type}
                      </p>
                      <p className="text-base text-slate-600 mt-4 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex justify-center p-6 pt-2 gap-7">
                      <Link
                        to={project.projectLink}
                        className="min-w-32 rounded-md bg-[#CBA35C] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-[#e5b86a] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Visit Project
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No projects available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Project;
