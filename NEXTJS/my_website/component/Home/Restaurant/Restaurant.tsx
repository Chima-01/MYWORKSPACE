import React from 'react';
import RestaurantCard from './RestaurantCard';
import { RestaurantInfo } from '@/constants/constant';

const Restaurant = () => {
  return (
    <div>
      <p className="text-xl sm:text-3xl text-center font-extrabold">
        Available Restaurant Nearby Area
      </p>
      <div className="mx-auto w-[80%] grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-14">
          { RestaurantInfo.map(({id, image, title}) => (
            <div key={id} data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-delay={(id - 1) * 100 } >
              <RestaurantCard image={image} title={title} />
            </div>
          )) }
      </div>
      <div className="mt-16 text-center">
        <button className="px-9 py-2.5 sm:px-12 sm:py-3.5 cursor-pointer rounded-full font-bold text-base sm:text-lg bg-cyan-700 text-white hover:bg-cyan-950 transition-all duration-300 dark:bg-cyan-300 dark:hover:bg-cyan-200 dark:hover:text-black">
          Discover More &rarr;
        </button>
      </div>
    </div>
  )
}

export default Restaurant;