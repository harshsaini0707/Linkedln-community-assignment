import './globals.css';
import { Metadata } from 'next';
import LayoutWrapper from '../../components/LayWrapper';

export const metadata: Metadata = {
  title: 'LinkedIn',
  description: 'Created by harsh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
