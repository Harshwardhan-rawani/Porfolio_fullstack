import React, { useEffect, useState } from "react";
import Progressbar from "./Progressbar";
import { motion } from "framer-motion";
import axios from "axios";

function Skill() {
  const [skills, setSkills] = useState([]);
  // Fetch skills from the backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/skills`);
        setSkills(response.data); // Assuming each skill has `name`, `percentage`, and `icon` properties
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkills([]); // Set to an empty array if fetching fails
      }
    };
    fetchSkills();
  }, []);

  return (
    <>
      <div className="lg:flex justify-between space-y-4 lg:space-y-0 lg:px-10 xl:px-32 p-4 lg:mt-20">
        {/* Header Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
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
              className="font-serif lg:text-4xl text-3xl text-[#CBA35C] overline"
            >
              Skill
            </motion.div>
          </div>
        </div>

        {/* Skill Cards Section */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-10">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }} // Start from transparent and below
                whileInView={{ opacity: 1, y: 0 }} // Smooth pop-up to full opacity and position
                transition={{
                  duration: 0.8,
                  delay: index * 0.2, // Stagger animation for each card
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                viewport={{ once: true }} // Trigger animation only once when in view
                className="flex justify-center"
              >
                <Progressbar value={skill.percentage} text={skill.skill} icon={skill.image} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {skills.length === 0
                ? "No skills available at the moment."
                : "Error loading skills. Please try again later."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Skill;
