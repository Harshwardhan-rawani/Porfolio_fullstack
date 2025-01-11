import React from 'react'
import  { useEffect, useState } from 'react';
import "./css/Indicator.css"
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { Link, Element, animateScroll as scroll } from 'react-scroll';
function Indicator() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(scrollPercent);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollPercentage / 100) * circumference;
  return (
    <>
    <div className="circle-indicator z-50">
    <svg className="progress-ring" width="100" height="100">
      <circle 
           className="progress-ring__circle z-50"
           stroke="#FFF2C2"
           strokeWidth="3"
           fill="transparent"
           r={radius}
           cx="50"
           cy="50"
           pathLength="0"
      />
      <circle
        className="progress-ring__circle z-50"
        stroke="#CBA35C"
        strokeWidth="3"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
        
        style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
      />
        <foreignObject x="38" y="38" width="100" height="100" transform='rotate(90,50,50)' >
          <Link to='home' className='text-gray-800 hover:text-gray-800'><MdOutlineKeyboardDoubleArrowUp className='text-2xl text-[#CBA35C]'/></Link>

  </foreignObject>
    </svg>
     
  </div>
  </>
  )
}

export default Indicator
