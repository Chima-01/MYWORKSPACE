import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div className='py-16'>
      <div className="mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-2 gap-10m items-center">
        <div  data-aos="fade-right" data-aos-anchor-placement="top-center">
          <Image src="/images/a.png" width={800} height={500} alt='Image' />
        </div>
        <div>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-8 md:leading-12'>
            We Deliver Our Products As Fast As Superman Can
          </h1>
          <p className="mt-4 leading-6 text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima animi repellat corporis voluptatum tempora in, nihil eveniet sed officiis, praesentium consequuntur ratione quae doloribus a quidem sint hic? Optio, animi?
          </p>
          <div className="mt-8">
            <div className="flex mt-8 items-center space-x-6">
              <p className="text-3xl md:text-5xl opacity-40 font-bold">01</p>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold">
                  Easy To Use Application
                </h1>
                <p className="mt-2 text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-base">
                  We're driven beyond just finishing the projects. We want to find solutions using our website & apps
                </p>
              </div>
            </div>
            <div className="flex mt-8 items-center space-x-6">
              <p className="text-3xl md:text-5xl opacity-40 font-bold">02</p>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold">
                   Deliver Food Within 30 min
                </h1>
                <p className="mt-2 text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-base">
                  We're driven beyond just finishing the projects. We want to find solutions using our website & apps
                </p>
              </div>
            </div>
            <div className="flex mt-8 items-center space-x-6">
              <p className="text-3xl md:text-5xl opacity-40 font-bold">03</p>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold">
                 100% Reliable With Privacy
                </h1>
                <p className="mt-2 text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-base">
                  We're driven beyond just finishing the projects. We want to find solutions using our website & apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;