"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import "@/assets/about-section.css";
import Image from "next/image";

export default function About() {
  const router = useRouter();
  return (
    <div style={{ height: "100vh", backgroundColor: "#258db3" }}>
      <Navbar />
      <div className="about-section d-flex justify-content-around">
        <div className="ps-5 pe-5">
          <h2 style={{ fontWeight: "bold" }}>Ganesh Mangla</h2>
          <p className="p-2 ">
            I'm Ganesh Kumar Mangla, an enthusiastic undergraduate pursuing a
            Bachelor of Technology in Computer Engineering with a focus on Full
            Stack Web Development (MERN) and Data Structures & Algorithms (DSA).
            With a keen interest in both front-end and back-end technologies,
            I've honed my skills in Next.js, React.js, Reduxjs, Node.js, HTML,
            CSS, JavaScript. On the backend, I'm proficient in server-side
            languages like Node.js and databases like MongoDB and MySQL.
          </p>
        </div>
        <div className="pe-5 align-self-center">
          <Image
            alt="Ganesh"
            width={225}
            height={150}
            src="/Ganesh.jpeg"
            className="rounded"
            style={{ height: "15vw" }}
          />
        </div>
      </div>

      <div
        className="about-section d-flex justify-content-around "
        style={{ backgroundColor: "white" }}
      >
        <div className="ps-5 align-self-center">
          <Image
            alt="Lokesh"
            width={250}
            height={150}
            src="/Lokesh.jpeg"
            className="rounded"
            style={{ height: "15vw" }}
          />
        </div>
        <div className="ps-5 pe-5">
          <h2 style={{ fontWeight: "bold" }}>Lokesh Yadav</h2>
          <p className="p-2">
            I'm Lokesh Yadav, a Bachelor of Technology student specializing in
            Computer Engineering. I've focus on full-stack web development and
            DevOps with expertise in frontend. I leverage technologies like
            React, Next.js, Three.js, GSAP, and UI frameworks such as Bootstrap
            and Tailwind CSS to incorporate dynamic animations. On the backend,
            I'm adept at Node.js, Express.js, and technologies like WebSockets,
            Redis, and Prisma, enabling robust server-side functionality and
            real-time communication. My DevOps expertise encompasses Monorepo
            strategies,CI/CD, monitoring systems using Prometheus and Grafana,
            and the fundamentals of scaling.
          </p>
        </div>
      </div>
    </div>
  );
}
