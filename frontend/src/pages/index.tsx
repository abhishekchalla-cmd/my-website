import Intro from "@/components/intro";
import Navbar from "@/components/navbar";
import Offerings from "@/components/offerings";
import { config } from "@/config";
import { initialiseScrollSectionsHandler } from "@/utils/scroll-section";
import Head from "next/head";
import { useMemo } from "react";

const { sections, registerSection, getSectionById } =
  initialiseScrollSectionsHandler();

export default function Home() {
  const rootSection = useMemo(() => getSectionById(), []);

  return (
    <div
      className={`w-full mx-auto h-[2000px]`}
      style={{
        maxWidth: `${config.pageMaxWidth}px`,
      }}
    >
      <Head>
        <title>Abhishek Challa - Software Developer</title>
      </Head>
      <Navbar />
      {Object.values(rootSection.children).map((section) => (
        <section.component section={section} key={section.sectionId} />
      ))}
      <Intro />
      <Offerings />
    </div>
  );
}
