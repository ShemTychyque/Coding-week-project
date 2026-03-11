import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PediAppend - AI-Powered Pediatric Appendicitis Diagnosis",
  description: "Advanced clinical decision support system for pediatric appendicitis diagnosis. AI-powered predictions with SHAP explainability for transparent clinical decisions.",
  keywords: ["pediatric", "appendicitis", "diagnosis", "AI", "medical", "clinical decision support", "SHAP", "healthcare"],
  authors: [{ name: "PediAppend Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "PediAppend - Pediatric Appendicitis Diagnosis",
    description: "AI-powered clinical decision support for pediatric appendicitis diagnosis",
    url: "https://pediappend.com",
    siteName: "PediAppend",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PediAppend - AI-Powered Pediatric Diagnosis",
    description: "Clinical decision support with interpretable AI insights",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
