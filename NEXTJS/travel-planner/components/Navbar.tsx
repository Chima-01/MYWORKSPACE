"use client";
import Image from "next/image";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import { SignOutButton } from "./sign_out_button";


const Navbar = ({ session }: { session: Session | null}) => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      {" "}
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="logo" width={50} height={50}/>
        <span className="text-2xl font-bold text-gray-800">{" "}Travel Map</span>
        </Link>
          {session ?
            <div className="flex items-center space-x-4">
              <Link href="/trips" className={`text-slate-900 hover:text-sky-500`}>My Trips</Link>
              <Link href={"/globe"} className={`text-slate-900 hover:text-sky-500`}>Globe</Link>
              <SignOutButton />
            </div> :
            <Link href="/signin" className="text-center bg-gray-800  hover:bg-gray-900 p-2 rounded-md text-white">Sign in to continue</Link>
          }
      </div>
    </nav>)
}

export default Navbar;