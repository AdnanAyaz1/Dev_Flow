import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./Theme";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/userAvatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex-between p-6 max-sm:p-8 background-light900_dark200 fixed z-50 w-full top-0 gap-5 max-sm:shadow-light-300 text-dark-100 dark:text-light-900 border-b dark:border-0">
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
      <div className="flex-between gap-5">
        <ModeToggle />
        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
