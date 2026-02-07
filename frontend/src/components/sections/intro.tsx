import { motion } from "motion/react";
import Image from "next/image";
import hero from "@/assets/hero.svg";
import {
  ScrollSectionComponent,
  createScrollSection,
} from "@/utils/scroll-section";

const Intro: ScrollSectionComponent = () => {
  return (
    <motion.div
      className="h-[100dvh] w-full flex flex-col justify-center items-center relative"
      initial={{
        opacity: 0,
        translateY: -100,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        type: "spring",
        duration: 1,
        stiffness: 150,
        damping: 12, // Some damping to control bounce
        mass: 1, // A standard mass
      }}
    >
      <div className="w-full flex flex-col justify-center">
        <Image
          src={hero}
          alt="Intro"
          width={200}
          height={200}
          priority={true}
          className="mx-8"
        />
        <motion.div
          className="w-max-[400px] w-full px-10 mt-7"
          initial={{
            opacity: 0,
            translateY: -100,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <div className="text-4xl font-bold">
            Hi! 👋
            <br /> I am Abhishek
          </div>
          <div className="mt-5 mb-5 text-xl font-bold text-gray-500 w-[220px] leading-tight">
            ...and I would love to help you out with your{" "}
            <span className="text-black underline">software dev</span> needs
          </div>
        </motion.div>
        <motion.div
          className="font-bold absolute bottom-10 left-0 right-0 w-full text-center"
          initial={{ opacity: 0, translateY: -5 }}
          animate={{ opacity: 1, translateY: 5 }}
          transition={{
            duration: 0.5,
            translateY: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.5,
            },
          }}
        >
          <span className="text-xl">👇</span> Scroll to know what I offer
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Intro;

createScrollSection(
  Intro,
  [],
  {
    value: 100,
    unit: "dvh",
  },
  "intro"
);
