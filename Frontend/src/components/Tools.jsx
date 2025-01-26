import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./css/Tools.css";
import axios from "axios";

function Tools() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/tools`);
        setTools(response.data); // Assuming the response contains tool details (e.g., name and image URL).
      } catch (error) {
        console.error("Error fetching tools:", error);
        setTools([]); // Set an empty array if the API fails.
      }
    };
    fetchTools();
  }, []);

  return (
    <div className="px-10 py-3 font-serif">
      {/* Section Header */}
      <div className="flex justify-start items-center">
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
            Tools
          </motion.div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-4 grid-cols-3 gap-10 mt-2">
        {tools.length > 0 ? (
          tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ amount: 0.1, once: true }}
              className="flex justify-center animate_r"
            >
              <img
                src={tool.image}// Assuming each tool has an `image` property.
                alt={tool.name || `Tool ${index + 1}`}
                className="xl:w-24 lg:w-22 md:w-20 w-16"
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            {tools.length === 0
              ? "No tools available."
              : "Error fetching tools. Please try again later."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tools;
