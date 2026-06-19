import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import './globals.css';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-red-hat-display',
});

export const metadata: Metadata = {
  title: 'Yusuf Arif | Frontend Developer Portfolio',
  description:
    'Portfolio of Yusuf Arif, a Frontend Developer building responsive, fast, and scalable websites.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${redHatDisplay.variable} font-display`}>
        {children}
      </body>
    </html>
  );
}
