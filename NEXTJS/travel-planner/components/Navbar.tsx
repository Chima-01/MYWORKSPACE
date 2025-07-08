import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      {" "}
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="logo" width={50} height={50}/>
        <span className="text-2xl font-bold text-gray-800">{" "}Travel Map</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/trips" className="text-slate-900 hover:text-sky-500">My Trips</Link>
          <Link href={"/globr"} className="text-slate-900 hover:text-sky-500">
          Globe
          </Link>
          <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-md cursor-pointer text-center">
          Sign in
          <FaGithub className="ml-2 w-6 h-6"/>
        </button>
        </div>
      </div>
    </nav>)
}

export default Navbar;