"use client";
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isvisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false);
     }

     window.addEventListener('scroll', toggleVisibility);
     return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

   const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
   };



  return (
    <div className='fixed bottom-4 animate-pulse right-4'>
      {
        isvisible && (
          <button className=' bg-cyan-500 cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none'
          onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        )
      }
    </div>
  )
}

export default ScrollToTop;