import React from 'react';
import { Categories } from '@/constants/constant';

const Categority = () => {
  return (
    <div className='py-16'>
      <h1 className="text-xl sm:text-2xl text-center font-extrabold">
        Popular Categories By Food
      </h1>
      <div className="w-[80%] mx-auto mt-10">
        <div className="flex flex-wrap gap-4 justify-center">
          { Categories.map(({ name }, index) => (
            <span
              data-aos="zoom-in" data-aos-anchor-placement="top-center" data-aos-delay={index * 100}
              key={index} 
              className='px-6 p-3 rounded-full cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900 font-semibold text-lg'>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categority;