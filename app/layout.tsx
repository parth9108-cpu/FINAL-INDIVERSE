import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import Providers from "./providers";
import RazorpayScript from "@/components/shared/RazorpayScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndieVerse - The All-in-One Indian Commerce Ecosystem",
  description: "Discover, Buy, and Sell Authentic Indian Products — powered by AI, verified by Blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <RazorpayScript />
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
