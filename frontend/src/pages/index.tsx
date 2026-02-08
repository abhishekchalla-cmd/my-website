import BaseLayout from "@/components/layouts/base";
import { PAGE_PATHS } from "@/consts";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
      <Head>
        <title>Abhishek Challa - Software Developer</title>
      </Head>
      <div className="flex flex-col h-full">
        <div
          className="font-bold"
          style={{ fontSize: "42px", lineHeight: "3rem" }}
        >
          <b>
            Hi! I am
            <br /> Abhishek
          </b>
        </div>
        <p className="mt-5 w-40 md:w-80 font-semibold text-gray-500">
          ...and I would love to help you out with your{" "}
          <b className="underline">Software Dev</b> needs!
        </p>
        <ul className="mt-16 text-2xl flex flex-col gap-y-3">
          <li className="mt-10">
            <Link href={PAGE_PATHS.about}>About Me</Link>
          </li>
          <li className="mt-10">
            <Link href={PAGE_PATHS.offerings}>My Offerings</Link>
          </li>
          <li className="mt-10">
            <Link href={PAGE_PATHS.projects}>My Portfolio</Link>
          </li>
          <li className="mt-10">
            <Link href={PAGE_PATHS.skills}>My Skills</Link>
          </li>
          <li className="mt-10">
            <Link href={PAGE_PATHS.experience}>My Experience</Link>
          </li>
        </ul>
      </div>
    </BaseLayout>
  );
}
