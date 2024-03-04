import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "atropos/css";
import { Providers } from "./providers/providers";

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
      <body className={inter.className}>
        <Providers>
          <main className="h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
