import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import MobileNav from "@/components/landingPage/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Homes",
  description: "Find your perfect vacation home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="pb-16 md:pb-0">
        <AuthProvider>
          {children}
          </AuthProvider>
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
