"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen pt-28">
      <div className="w-full flex items-center justify-evenly h-1/2 p-10 gap-5 bg-[#258db3]">
        <div className="w-1/2">
          <Link href="https://ganesh-mangla-portfolio.vercel.app/">
            <h2 className="text-white text-2xl md:text-5xl text-center">
              Ganesh Mangla
            </h2>
          </Link>
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
          <Link href="https://portfolio-five-rho.vercel.app/">
            <h2 className="text-black text-2xl md:text-5xl text-center">
              Lokesh Yadav
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
