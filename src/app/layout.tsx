"use client";
import './globals.css'
import { usePathname } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = ["/dashboard", "/profile"].some((path) => pathname.startsWith(path));

  return (
    <html lang="en">
      <body>
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
