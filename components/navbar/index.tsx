import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between p-6 max-sm:p-8 background-light900_dark200 fixed z-50 w-full top-0 gap-5 shadow-light-300 text-dark-100 dark:text-light-900">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/images/site-logo.svg"}
          alt="DevFlow logo"
          height={23}
          width={23}
        />

        <p className="h2-bold font-space-grotesk  max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <div>Search</div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
