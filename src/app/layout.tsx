import type { Metadata } from "next";
import { Providers } from "./Providers";
import { barlowElastic } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Plantpal - Entdecke köstliche vegane Rezepte",
  description:
    "Plantpal ist deine Quelle für leckere vegane Rezepte. Entdecke einfache, nährstoffreiche und umweltfreundliche Gerichte. Teile deine Kreationen und werde Teil unserer grünen Kochcommunity.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌱</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={barlowElastic.variable}>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
