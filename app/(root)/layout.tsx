import LeftSidebar from "@/components/navigation/LeftSidebar";
import Navbar from "@/components/navigation/navbar";
import RightSidebar from "@/components/navigation/RightSidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 realtive">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="mx-auto w-full max-w-5xl px-6 pb-6 pt-36 max-md:pb-14 sm:px-14  ">
          {children}
        </section>

        <RightSidebar />
      </div>
    </main>
  );
};

export default layout;
