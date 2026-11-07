import Navbar from "@abhishekchalla/frontend/components/navbar";
import Head from "next/head";

export default function BaseLayout({
  children,
  title,
}: {
  readonly children: React.ReactNode;
  readonly title?: string;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Head>
        <title>Abhishek Challa {title && `- ${title}`}</title>
      </Head>
      <Navbar />
      <div className="w-full max-w-250 mx-auto px-8 h-full">
        {title && <h1 className="mb-6">{title}</h1>}
        {children}
      </div>
    </div>
  );
}
