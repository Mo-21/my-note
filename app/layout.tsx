import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "atropos/css";
import { Providers } from "./providers/providers";
import NavigationBar from "./NavigationBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>My Note</title>
      </head>
      <body className={inter.className}>
        <Providers>
          <NavigationBar />
          <main className="h-screen">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
