import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";

import Footer from "@/components/Footer";


import AddProject from "@/components/helper/AddProject";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

export async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Nav />
          <div >{children}</div>
          <Footer/>
          <AddProject />
        </AuthContextProvider>
      </body>
    </html>
  );
}