import { PAGE_PATHS } from "@/consts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <div
        className="w-full flex justify-between sticky top-0 items-center px-4 pt-4 pb-16 mx-auto max-w-[1000px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff, #ffffff, #ffffff, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))",
        }}
      >
        <button onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
          <Image
            src={require("../assets/hamburger.svg")}
            alt="hamburger"
            height={25}
          />
        </button>
        <Link href={PAGE_PATHS.contact}>
          <button className="btn-primary">Contact Me</button>
        </Link>
      </div>

      <div
        className="fixed top-0 w-screen h-screen z-10"
        style={{
          transition: "0.2s",
          backgroundColor: "var(--primary)",
          left: isNavbarOpen ? "0" : "-100vw",
        }}
      >
        <div className="h-screen flex justify-center items-center w-full mx-auto max-w-[1000px] relative">
          <button
            className="absolute top-3 left-2"
            onClick={() => setIsNavbarOpen(false)}
          >
            <IoClose color="#fff" size={45} />
          </button>

          <div
            className="flex flex-col gap-y-8 text-3xl"
            onClick={() => setIsNavbarOpen(false)}
          >
            <Link style={{ color: "#fff" }} href={PAGE_PATHS.home}>
              Home
            </Link>
            <Link style={{ color: "#fff" }} href={PAGE_PATHS.about}>
              About Me
            </Link>
            <Link style={{ color: "#fff" }} href={PAGE_PATHS.offerings}>
              My Offerings
            </Link>
            <Link style={{ color: "#fff" }} href={PAGE_PATHS.projects}>
              My Portfolio
            </Link>
            <Link style={{ color: "#fff" }} href={PAGE_PATHS.skills}>
              My Skills
            </Link>
            <Link style={{ color: "#fff" }} href={PAGE_PATHS.experience}>
              My Experience
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
