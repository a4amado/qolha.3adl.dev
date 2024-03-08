import "~/styles/globals.css";
 
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import Header from "./_components/header";

import NextAuthProvider from "~/Auth/Provider";
if (typeof document !== "undefined") {
  const modalRoot = document.querySelector(".ant-modal-root");
  if (modalRoot) {
    modalRoot.addEventListener("click", (e) => e.stopPropagation())
  }
}
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "قلها",
  description: "قاموس صوتي",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${inter.variable} overflow-y-scroll`}>
        <TRPCReactProvider>
          <NextAuthProvider>
            <AntdRegistry>
              <Header />
              {children}
             </AntdRegistry>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
