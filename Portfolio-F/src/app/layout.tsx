import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainProvider } from "@/providers/MainProvider";

import TopLoader from "@/components/ui/animation/TopLoader";

// Plus Jakarta Sans Variants
const jakartaRegular = localFont({
  src: "../fonts/PlusJakartaSans-Regular.ttf",
  variable: "--font-jakarta-regular",
  weight: "400",
});

const jakartaMedium = localFont({
  src: "../fonts/PlusJakartaSans-Medium.ttf",
  variable: "--font-jakarta-medium",
  weight: "500",
});

const jakartaSemiBold = localFont({
  src: "../fonts/PlusJakartaSans-SemiBold.ttf",
  variable: "--font-jakarta-semibold",
  weight: "600",
});

const jakartaBoldItalic = localFont({
  src: "../fonts/PlusJakartaSans-BoldItalic.ttf",
  variable: "--font-jakarta-italic",
  weight: "700",
});

const jakartaBold = localFont({
  src: "../fonts/PlusJakartaSans-Bold.ttf",
  variable: "--font-jakarta-bold",
  weight: "700",
});

const jakartaExtraBold = localFont({
  src: "../fonts/PlusJakartaSans-ExtraBold.ttf",
  variable: "--font-jakarta-extrabold",
  weight: "800",
});

// Yanone Kaffeesatz Variants
const yanoneRegular = localFont({
  src: "../fonts/YanoneKaffeesatz-Regular.ttf",
  variable: "--font-yanone-regular",
  weight: "400",
});

const yanoneMedium = localFont({
  src: "../fonts/YanoneKaffeesatz-Medium.ttf",
  variable: "--font-yanone-medium",
  weight: "500",
});

const yanoneSemiBold = localFont({
  src: "../fonts/YanoneKaffeesatz-SemiBold.ttf",
  variable: "--font-yanone-semibold",
  weight: "600",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rohan Mohammad",
    default: "Rohan Mohammad",
  },
};

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.classList.add(theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        jakartaRegular.variable,
        jakartaMedium.variable,
        jakartaSemiBold.variable,
        jakartaBoldItalic.variable,
        jakartaBold.variable,
        jakartaExtraBold.variable,
        yanoneRegular.variable,
        yanoneMedium.variable,
        yanoneSemiBold.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="min-h-full flex flex-col font-sans">
        <TopLoader />
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}