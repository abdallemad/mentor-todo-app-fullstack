import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme/provider";
import ReactQueryProvider from "@/react-query/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mentor Todo App | Abdalla Emad",
  description:
    "This is a solution for the todo app challenge on front-end mentor",
  icons: {
    icon: "/images/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen overflow-x-hidden`}
        >
          <ThemeProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
