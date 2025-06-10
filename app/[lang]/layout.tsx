import { type Locale, locales } from "@/lib/dictionaries/client";
import { getDictionary } from "@/lib/dictionaries/server";
import { fonts } from "@/lib/fonts";
import type { Metadata } from "next";
import "../../styles/variables.css";
import "../../styles/globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const dict = await getDictionary(params);

  return {
    title: {
      template: `%s | ${dict.common.title}`,
      default: dict.common.title,
    },
    description: dict.common.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  return (
    <html lang={(await params).lang}>
      <body className={`${fonts.sans.variable} ${fonts.mono.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
