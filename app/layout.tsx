import type { Metadata } from "next";
import "../styles/variables.css";
import "../styles/globals.css";
import { fonts } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Tracker",
    default: "Tracker",
  },
  description: "This is a portfolio tracker web application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.sans.variable} ${fonts.mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
