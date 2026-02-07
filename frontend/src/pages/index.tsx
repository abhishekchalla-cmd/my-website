import Home from "@/components/home";
import Navbar from "@/components/navbar";
import { config } from "@/config";
import { ScrollSectionHandlerContextProvider } from "@/contexts/scroll-section-handler";
import Head from "next/head";

export default function App() {
  return (
    <ScrollSectionHandlerContextProvider indexSectionComponent={Home}>
      {({ body, maxScrollY }) => (
        <div
          className={`w-full mx-auto`}
          style={{
            maxWidth: `${config.pageMaxWidth}px`,
            height: `${maxScrollY}px`,
          }}
        >
          <Head>
            <title>Abhishek Challa - Software Developer</title>
          </Head>
          <Navbar />
          {body}
        </div>
      )}
    </ScrollSectionHandlerContextProvider>
  );
}
