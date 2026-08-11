import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import SiteLogo from "@/components/SiteLogo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thomas Dalby Photography",
  description: "Photography portfolio by Thomas Dalby.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  }
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
