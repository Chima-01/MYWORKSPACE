import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";


const MobileApp = () => {
  return (
    <div className="py-16">
      <div className="mx-auto w-[80%] mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <Image 
          src="/images/app.png"
          alt="app"
          width={800}
          height={800}
          className="object-cover"
           data-aos="zoom-in" data-aos-anchor-placement="top-center" data-aos-delay="0"
        />
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold leading-8 sm:leading-12">
            Connecting our user with IOS & Andriod apps. Download from Itune & Play store
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-800 leading-6 sm:leading-8 dark:text-gray-400">
            Pick one of our stock themes, or create your custom theme with the most advanced theme editor on any online survey building tool. We're driven beyond just finishing the projects. 
            we want to find solutions using our website & apps. 
          </p>
          <div className="sm:flex space-y-3 sm:space-y-0 space-x-4 mt-8">
            <a href="#_"  className="flex w-fit items-center ground border border-gray-400 px-4 py-3 rounded-md bg-gray-950 transition">
              <FaApple className="text-2xl mr-2 text-white transition-all duration-300" />
              <div>
                <p className="text-xs text-white transition-all duration-300">Download on the</p>
                <p className="text-sm font-semibold text-white transition-all duration-300">App Store</p>
              </div>
            </a>
            <a href="#_"  className="flex w-fit items-center ground border border-gray-400 px-4 py-3 rounded-md bg-gray-950 transition">
              <FaGooglePlay className="text-2xl mr-2 text-white transition-all duration-300" />
              <div>
                <p className="text-xs text-white transition-all duration-300">Download on the</p>
                <p className="text-sm font-semibold text-white transition-all duration-300">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileApp;