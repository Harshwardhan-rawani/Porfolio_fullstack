import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";

function Contact() {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_etkc6xl", // Replace with your EmailJS service ID
        "template_ahkgemv", // Replace with your EmailJS template ID
        form.current,
        "TD2imwkJMxuxNh1Ml" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMessage("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setSuccessMessage("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <>
      <div className="mt-5">
        <div className="flex lg:flex-row flex-col-reverse font-serif">
          <div className="lg:w-1/2 flex overflow-hidden justify-center items-center shadow-md scale-110 bg-[#FEF9E1]">
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
              className="lg:text-5xl font-bold text-3xl text-center text-[#CBA35C]"
            >
              Get In Touch
            </motion.div>
          </div>
          <div className="lg:w-1/2 px-4">
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
                Contact
              </motion.div>
            </div>
            <div className="lg:w-1/2 mx-auto py-3 overflow-hidden">
              <motion.form
                ref={form}
                onSubmit={sendEmail}
                initial={{ opacity: 0, y: 50 }} 
               whileInView={{ opacity:1, y: 0 }} 
               transition={{
                 duration: 1,
                 delay: 0.2, 
                 type: "spring",
                 stiffness: 100,
                 damping: 10,
               }}
               viewport={{ once: true }} 
                className="space-y-6 w-full"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="bg-transparent border-b-2 w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent border-b-2 w-full"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="bg-transparent border-b-2 w-full"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-2 py-1"
                  >
                    Submit
                  </button>
                </div>
              </motion.form>
              {successMessage && (
                <div className="text-center text-green-600 mt-3">
                  {successMessage}
                </div>
              )}
              <br />
              <div className="text-center text-gray-600">-----or------</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
                viewport={{ amount: 0.2, once: true }}
                className="flex text-gray-600 justify-center"
              >
                <div className="m-2 text-xl">
                    <Link to={"https://github.com/Harshwardhan-rawani?tab=repositories"}>  <FaGithub /></Link>
                
                </div>
                <div className="m-2 text-xl">
                <Link to={"https://www.linkedin.com/in/harshwardhan-rawani/"}>  <FaLinkedin /></Link>
                  
                </div>
                <div className="m-2 text-xl">
                <Link to={"https://www.instagram.com/harshwardhan_rawani/"}>  <FaInstagram /></Link>
                  
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
