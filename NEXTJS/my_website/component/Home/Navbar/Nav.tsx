"use client";
import { MdDeliveryDining } from "react-icons/md";
import { Navlinks } from "@/constants/constant";
import Link from 'next/link';
import { HiBars3BottomRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import ThemeToggler from "@/component/Helper/ThemeToggler";


type Props = {
  openNav: () => void;
};

const Nav = ({openNav}: Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
    if (window.scrollY >= 90)
      setNavBg(true);
    if (window.scrollY < 90)
      setNavBg(false);
  }

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
   <nav className={ `transition-all duration-200 h-[12vh] z-[100] fixed w-full ${navBg ? 'bg-white shadow-md dark:bg-gray-900' : '' }` }>
    <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
    <div className="flex items-center space-x-2">
      <div className="flex rounded-full w-10 h-10 bg-blue-950 dark:bg-white items-center justify-center flex-col">
        <MdDeliveryDining className="w-6 h-6 text-white dark:text-black" />
      </div>
 
    <h1 className="text-xl md:text-3xl text-black font-bold dark:text-white">
      Foodie
    </h1>
    </div>
    <ul className=" hidden lg:flex items-center space-x-10 list-none">
      {Navlinks.map((value) => (
       <li key={value.id} >
        <Link href={value.url} className="text-black dark:text-white dark:hover:text-green-400 text-xl hover:text-green-700 font-bold transition-all duration-all">{value.label}</Link>
       </li> 
      ))}
    </ul>
    <div className="flex items-center space-x-4">
    <button className="bg-blue-950 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg text-white font-bold px-7 py-3 hover:bg-black transition-all duration-300">
      Join Now
    </button>
    <ThemeToggler />
    <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-blue-950 lg:hidden dark:bg-white"/>
    </div>
    </div>
   </nav>
  );
}

export default Nav;