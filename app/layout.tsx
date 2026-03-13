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
  description: "The Personal Portfolio and Project Archive of Fikrat Mammadov.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "FM | Portfolio",
    description: "The Personal Portfolio and Project Archive of Fikrat Mammadov.",
    url: "https://fnizamioglu.com",
    siteName: "FM | Portfolio",
    images: [
      {
        url: "/headshot.jpeg",
        width: 1024,
        height: 1024,
        alt: "Fikrat Mammadov Headshot",
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
