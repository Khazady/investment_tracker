import { getDictionary } from "@/lib/dictionaries/server";
import { fonts } from "@/lib/fonts";
import type { Metadata } from "next";
import "../../styles/variables.css";
import "../../styles/globals.css";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = await getDictionary(lang as "en" | "be");

  return {
    title: {
      template: `%s | ${dict.common.title}`,
      default: dict.common.title,
    },
    description: dict.common.description,
  };
}

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang}>
      <body className={`${fonts.sans.variable} ${fonts.mono.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
