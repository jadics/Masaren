import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic, Space_Grotesk } from "next/font/google"
import "./globals.css"

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans-arabic",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "مَسَارِن - نظام موحّد لرصد وتشخيص وتشغيل الصيانة الوقائية للطرق",
  description:
    "منصة ذكية تعتمد على الرؤية الحاسوبية والتنبؤ الاستباقي، لتحويل بيانات الطرق إلى قرارات عملية ترفع السلامة وتخفض تكاليف الصيانة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
