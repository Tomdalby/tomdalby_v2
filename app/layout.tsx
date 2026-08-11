import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import SiteLogo from "@/components/SiteLogo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thomas Dalby Photography",
  description: "Photography portfolio by Thomas Dalby."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <SiteLogo />
        {children}
      </body>
    </html>
  );
}
