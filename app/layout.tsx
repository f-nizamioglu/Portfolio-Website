import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fnizamioglu.com"),
  title: "FM | Portfolio",
  description: "Full-Stack Engineer portfolio focused on robust software systems, product engineering, and low-level C/C++ problem solving.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "FM | Portfolio",
    description: "Full-Stack Engineer portfolio focused on robust software systems, product engineering, and low-level C/C++ problem solving.",
    url: "https://fnizamioglu.com",
    siteName: "FM | Portfolio",
    images: [
      {
        url: "/og-image.jpeg", 
        width: 1200,
        height: 630,
        alt: "Developer Console Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
