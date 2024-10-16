import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import Providers from "./providers";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  variable: "--ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "TERMFAI CO2",
  description: "TERMFAI CO2 Exchange.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSansThai.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
