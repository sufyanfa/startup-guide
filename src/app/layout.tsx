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
  metadataBase: new URL('https://startup.sufyanfa.com'),
  title: "دليل الشركات الناشئة | تعلم بناء Startup ناجح خطوة بخطوة",
  description: "دليل تفاعلي شامل لتعلم ريادة الأعمال وبناء الشركات الناشئة الناجحة. 8 فصول عملية + اختبارات تفاعلية. ابدأ رحلتك الآن مجاناً!",
  keywords: "شركة ناشئة، ريادة أعمال، تطوير منتج، تمويل، فريق عمل، نمو شركة، أعمال",
  authors: [{ name: "Sufyan Farea" }],
  creator: "Sufyan Farea",
  publisher: "Sufyan Farea",
  robots: "index, follow",
  openGraph: {
    title: "دليل الشركات الناشئة | تعلم بناء Startup ناجح",
    description: "دليل تفاعلي شامل لتعلم ريادة الأعمال وبناء الشركات الناشئة الناجحة. 8 فصول عملية + اختبارات تفاعلية.",
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
    title: "دليل الشركات الناشئة | تعلم بناء Startup ناجح",
    description: "دليل تفاعلي شامل لتعلم ريادة الأعمال وبناء الشركات الناشئة الناجحة. 8 فصول عملية + اختبارات تفاعلية.",
    images: ["/startup.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/badge-check.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3395d308-5729-4f57-bde5-bf4e5f24d58f"></script>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
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
