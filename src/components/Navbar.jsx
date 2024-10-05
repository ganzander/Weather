"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }) {
  const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
  };
  const [active, setActive] = useState(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <div className="w-1/2 flex items-center justify-center">
          <Link href="/">
            <div className="relative ">
              <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-sm sm:text-lg md:text-2xl font-normal md:font-semibold text-black hover:opacity-[0.9] dark:text-white"
              >
                <div className="md:w-[60px] md:h-[60px] w-[35px] h-[35px]">
                  <Image
                    src="/gif3.gif"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.p>
            </div>
          </Link>
        </div>
        <div className="w-1/2 flex items-center justify-evenly">
          <Link href="/about">
            <MenuItem setActive={setActive} active={active} item="About" />
          </Link>
        </div>
      </Menu>
    </div>
  );
}
