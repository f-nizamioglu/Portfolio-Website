import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
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
  title: "Fikrat Mammadov | Full-Stack Software Engineer",
  description: "4th-Year Computer Engineering student at Yildiz Technical University specializing in multi-tenant SaaS, FastAPI, and C/C++ systems.",
  openGraph: {
    title: "Fikrat Mammadov | Full-Stack Software Engineer",
    description: "4th-Year Computer Engineering student at Yildiz Technical University specializing in multi-tenant SaaS, FastAPI, and C/C++ systems.",
    url: "https://fnizamioglu.com",
    siteName: "Fikrat Mammadov Portfolio",
    images: [
      {
        url: "/og-image.jpeg", 
        width: 1200,
        height: 630,
        alt: "Fikrat Mammadov - Developer Console",
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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
