'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = ["/dashboard", "/profile"].some((path) => pathname.startsWith(path));

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
