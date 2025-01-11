import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useInView } from 'react-intersection-observer';
import { motion, spring, useScroll } from "framer-motion";
function Progressbar({value,text,icon}) {
    const [progress, setProgress] = useState(0);
    const { ref, inView } = useInView({
      triggerOnce: true, 
      threshold: 0.2, 
    })
    useEffect(() => {
      const interval = setInterval(() => {
        if(inView)   setProgress((prevProgress) => (prevProgress < value ? prevProgress + 1 : prevProgress));
      }, 30);
      
      return () => clearInterval(interval);
    }, [inView]);
  return (
   <>
    <motion.div 
      initial = {{rotate:0}}
      whileHover={{rotate:[5,0,-5,0,5,0,-5,0]}}
      transition={{duration:0.5}}
    ref={ref} style={{  position: 'relative' }} className=' hover:bg-gray-200 shadow-md lg:py-3 lg:px-4 lg:w-[1/4] w-[1/5]  pt-2 pb-2 rounded-md'>
    <div className='text-center font-semibold text-gray-400'>
        {text}
      </div>
      
      <CircularProgressbar
      className='p-3'
        value={progress}
        styles={buildStyles({
          pathColor: `orange`,
          trailColor: '#d6d6d6',

        })}
      />
      <div
    
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
           // Customize the icon size
           // Customize the icon color
        }}
      >
     <img src={`${import.meta.env.VITE_URL}/${icon}`} alt="" className='lg:w-16 w-12'/>
  
      </div>
    
      <div className='text-center font-semibold text-gray-400'>
        Completed
      </div>
      <div className='text-center font-bold'>
        {progress}%
      </div>
    </motion.div>
   </>
  )
}

export default Progressbar
