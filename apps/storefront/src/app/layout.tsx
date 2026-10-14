import { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Noto_Kufi_Arabic, Rajdhani } from "next/font/google"

import { getBaseURL } from "@lib/util/env"
import "styles/globals.css"
import "styles/brand-refresh.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-body" })

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
})

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Immortal Games Store | Games, Codes & Subscriptions",
    template: "%s | Immortal Games Store",
  },
  description:
    "Browse PlayStation and PC games, digital codes, wallet cards, and subscriptions. Confirm availability and order personally on WhatsApp.",
  applicationName: "Immortal Games Store",
  icons: {
    icon: "/brand/immortal-logo-primary.png",
    apple: "/brand/immortal-logo-primary.png",
  },
  keywords: [
    "Immortal Games Store",
    "PS5 games Egypt",
    "PS4 games Egypt",
    "PC games",
    "PlayStation Store cards",
    "gaming subscriptions",
  ],
  openGraph: {
    title: "Immortal Games Store",
    description: "Your next game lives here.",
    images: [
      {
        url: "/brand/immortal-logo-wide.png",
        width: 2058,
        height: 764,
        alt: "Immortal Games Store — Games, Digital Codes, Subscriptions",
      },
    ],
    siteName: "Immortal Games Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Immortal Games Store",
    description: "Games, digital codes, and subscriptions with personal support.",
    images: ["/brand/immortal-logo-wide.png"],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const headerStore = await headers()
  const locale = headerStore.get("x-immortal-locale") === "ar" ? "ar" : "en"

  return (
    <html data-mode="dark" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <body className={`${inter.variable} ${rajdhani.variable} ${notoKufiArabic.variable}`}>
        <main>{props.children}</main>
      </body>
    </html>
  )
}
