import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import './globals.css';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-red-hat-display',
});

export const metadata: Metadata = {
  title: 'Edwin Anderson | Frontend Developer Portfolio',
  description:
    'Portfolio of Edwin Anderson, a Frontend Developer building responsive, fast, and scalable websites.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${redHatDisplay.variable}`}>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
