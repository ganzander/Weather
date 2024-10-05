"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function About() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen pt-28">
      <div className="w-full flex items-center justify-evenly h-1/2 p-10 gap-5 bg-[#258db3]">
        <div className="w-1/2">
          <h2 className="text-white text-2xl md:text-5xl text-center">
            Ganesh Mangla
          </h2>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image
            alt="Ganesh"
            width={150}
            height={150}
            src="/Ganesh.jpeg"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-evenly h-1/2 p-10 gap-5 bg-white">
        <div className="w-1/2 flex justify-center">
          <Image
            alt="Lokesh"
            width={150}
            height={150}
            src="/Lokesh.jpeg"
            className="rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-black text-2xl md:text-5xl text-center">
            Lokesh Yadav
          </h2>
        </div>
      </div>
    </div>
  );
}
