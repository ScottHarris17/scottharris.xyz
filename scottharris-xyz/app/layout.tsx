import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Figtree } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AmbientBackground from "@/components/AmbientBackground";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Scott C. Harris, PhD — Neuroscientist & Inventor",
  description: "Portfolio of Scott C. Harris, PhD — Neuroscientist & Inventor",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${figtree.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "'Figtree', sans-serif" }}
      >
        <ThemeProvider>
          <AmbientBackground />
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
