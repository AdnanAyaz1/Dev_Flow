import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Routes } from "@/constants/routes";
import NavLinks from "./Navlinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <div className="flex flex-col min-h-screen  mt-[-10px]">
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/site-logo.svg"
              width={23}
              height={23}
              alt="Logo"
            />

            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Flow</span>
            </p>
          </Link>

          <div className="no-scrollbar  flex-1 flex-col flex justify-between overflow-y-auto ">
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>

            <div className="flex flex-col gap-3 mb-[50px]">
              <SheetClose asChild>
                <Link href={Routes.SignIn}>
                  <Button className="small-bold btn-secondary min-h-[51px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={Routes.SignUp}>
                  <Button className="small-bold light-border-2 btn-tertiary text-dark400_light900 min-h-[51px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
