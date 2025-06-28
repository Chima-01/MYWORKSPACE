"use client";

import Nav from "./Nav";
import MobileNav from "./mobile_nav";
import { useState } from "react";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);

  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);
  return (
    <div>
      <Nav openNav={openNavHandler} />
      <MobileNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  )
}

export default ResponsiveNav;