import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FooterComponent from "./components/FooterComponent";

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
  title: "Vacinação contra a Raiva 2024 - Goiânia | Proteja seu Pet",
  description: "Encontre o ponto mais próximo para vacinar seu cachorro contra a raiva na campanha de vacinação de 2024 em Goiânia. Cuide da saúde do seu pet!",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "vacina contra raiva, campanha de vacinação 2024, vacina cachorro, cuidados com pet, vacinar cachorro contra raiva, onde vacinar cachorro, vacinação raiva Goiânia",
  openGraph: {
    title: "Campanha de Vacinação Contra Raiva 2024 - Proteja Seu Cachorro",
    description: "Participe da campanha de vacinação contra raiva em 2024. Descubra os pontos de vacinação mais próximos para proteger seu pet em Goiânia.",
    url: "https://rabies-vaccine-location-finder-gyn.vercel.app/",
    type: "website",
    images: [
      {
        url: "/images/vacinacao-raiva.jpg",
        width: 800,
        height: 600,
        alt: "Campanha de Vacinação contra Raiva para Pets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacinação contra a Raiva 2024 - Cuide do seu Pet",
    description: "Participe da campanha de vacinação contra raiva em Goiânia. Proteja seu Pet!",
    images: ["/images/vacinacao-raiva.jpg"],
  },
  alternates: {
    canonical: "https://rabies-vaccine-location-finder-gyn.vercel.app/",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Campanha de Vacinação Raiva 2024" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://rabies-vaccine-location-finder-gyn.vercel.app/" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1800200285181005" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
