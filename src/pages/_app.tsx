import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <main className={`font-sans ${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
