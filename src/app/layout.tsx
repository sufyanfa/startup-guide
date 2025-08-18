import type { Metadata } from "next";
import { Rubik, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StartupGuideSchema } from "@/components/StructuredData";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://startup-guide.vercel.app'),
  title: "دليل الشركات الناشئة | كيفية بناء شركة ناشئة ناجحة",
  description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ. تعلم أساسيات ريادة الأعمال، تطوير المنتجات، بناء الفرق والحصول على التمويل.",
  keywords: "شركة ناشئة، ريادة أعمال، تطوير منتج، تمويل، فريق عمل، نمو شركة، أعمال",
  authors: [{ name: "Sufyan Farea" }],
  creator: "Sufyan Farea",
  publisher: "Sufyan Farea",
  robots: "index, follow",
  openGraph: {
    title: "دليل الشركات الناشئة | كيفية بناء شركة ناشئة ناجحة",
    description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ",
    type: "website",
    locale: "ar_SA",
    siteName: "دليل الشركات الناشئة",
    images: [{
      url: "/startup.jpg",
      width: 1200,
      height: 630,
      alt: "دليل الشركات الناشئة",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "دليل الشركات الناشئة | كيفية بناء شركة ناشئة ناجحة",
    description: "دليلك المبسّط والعملي لبناء شركة ناشئة ناجحة من الفكرة إلى التنفيذ",
    images: ["/startup.jpg"],
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
