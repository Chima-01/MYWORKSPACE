import { Navlinks } from "@/constants/constant";
import Link from "next/link";
import { CgClose } from "react-icons/cg";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav}: Props) => {
  const navOpen = showNav ? 'translate-x-0': 'translate-x-[-100%]';

  return (
    <div>
    <div className={` ${navOpen} fixed inset-0 transform transition-all duration-500 z-[1002] bg-black opacity-70 w-full h-screen`}></div>
    <ul className={`${navOpen} text-white fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-blue-950 space-y-6 z-[1050] list-none`}>
      {Navlinks.map((value) => (
        <li key={value.id}>
          <Link href={value.url} className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
          {value.label}
          </Link>
        </li>
      ))}
      <CgClose onClick={closeNav} className="absolute top-[0.7rem] right-[1.2rem] sm:w-8 sm:h-8 w-6 h-6" />
    </ul>
    </div>
  )
}

export default MobileNav;