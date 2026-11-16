import "@abhishekchalla/frontend/styles/globals.css";
import "react-notion-x/styles.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
