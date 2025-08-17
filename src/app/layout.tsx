import type { Metadata } from "next";
import { Rubik, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StartupGuideSchema } from "@/components/StructuredData";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ThemeProvider } from "next-themes";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "دليل الشركات الناشئة | كيفية بناء شركة ناشئة ناجحة",
  description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ. تعلم أساسيات ريادة الأعمال، تطوير المنتجات، بناء الفرق والحصول على التمويل.",
  keywords: "شركة ناشئة، ريادة أعمال، تطوير منتج، تمويل، فريق عمل، نمو شركة، أعمال",
  authors: [{ name: "دليل الشركات الناشئة" }],
  creator: "دليل الشركات الناشئة",
  publisher: "دليل الشركات الناشئة",
  robots: "index, follow",
  openGraph: {
    title: "دليل الشركات الناشئة | كيفية بناء شركة ناشئة ناجحة",
    description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ",
    type: "website",
    locale: "ar_SA",
    siteName: "دليل الشركات الناشئة",
  },
  twitter: {
    card: "summary_large_image",
    title: "دليل الشركات الناشئة | كيفية بناء شركة ناشئة ناجحة",
    description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${rubik.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StartupGuideSchema />
          <PerformanceMonitor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
