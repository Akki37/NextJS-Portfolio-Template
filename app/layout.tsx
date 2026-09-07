import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ORIGINAL_SITE_URL } from "@/data/attribution";
import { getStrings } from "@/strings";
import ThemeProvider from "@/components/theme/ThemeProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const { metadata: siteMeta } = getStrings();

export const metadata: Metadata = {
  metadataBase: new URL(ORIGINAL_SITE_URL),
  title: siteMeta.title,
  description: siteMeta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.add("light");document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");document.documentElement.classList.remove("light");}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground selection:bg-neutral-500/20 transition-colors duration-300">
        <ThemeProvider>
          <div className="fixed right-4 top-4 z-[60] md:right-6 md:top-6">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
