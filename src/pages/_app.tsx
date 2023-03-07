import "@/styles/globals.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import "@fontsource/roboto";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("preline");
  }, []);
  return <Component {...pageProps} />;
}
