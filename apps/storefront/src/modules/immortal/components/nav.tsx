import Image from "next/image"
import Link from "next/link"

import { getWhatsappUrl, Locale, storeCopy } from "@/content/catalog"
import { ArrowUpRight, MenuIcon, WhatsAppIcon } from "./icons"

type NavProps = {
  locale: Locale
}

export default function ImmortalNav({ locale }: NavProps) {
  const copy = storeCopy[locale]
  const alternateLocale = locale === "en" ? "ar" : "en"
  const catalogBase = `/${locale}/catalog`

  return (
    <>
      <div className="announcement-bar">
        <span>{copy.announcement}</span>
        <a href="tel:+201552346010">+20 15 52346010</a>
      </div>
      <header className="site-header">
        <nav aria-label="Primary navigation" className="site-nav page-shell">
          <details className="mobile-menu">
            <summary aria-label="Open navigation">
              <MenuIcon />
            </summary>
            <div className="mobile-menu__panel">
              <Link href={catalogBase}>{copy.navigation.catalog}</Link>
              <Link href={`${catalogBase}?category=playstation`}>
                {copy.navigation.playstation}
              </Link>
              <Link href={`${catalogBase}?category=pc`}>{copy.navigation.pc}</Link>
              <Link href={`${catalogBase}?category=codes`}>
                {copy.navigation.codes}
              </Link>
              <Link href={`${catalogBase}?category=subscriptions`}>
                {copy.navigation.subscriptions}
              </Link>
              <Link href={`/${locale}#about`}>{copy.navigation.about}</Link>
            </div>
          </details>

          <div className="site-nav__links site-nav__links--start">
            <Link href={catalogBase}>{copy.navigation.catalog}</Link>
            <Link href={`${catalogBase}?category=playstation`}>
              {copy.navigation.playstation}
            </Link>
            <Link href={`${catalogBase}?category=pc`}>{copy.navigation.pc}</Link>
          </div>

          <Link className="brand-lockup" href={`/${locale}`}>
            <Image
              alt="Immortal Games Store"
              height={56}
              priority
              src="/immortal-games-logo.jpg"
              width={56}
            />
            <span>
              <strong>IMMORTAL</strong>
              <small>GAMES STORE</small>
            </span>
          </Link>

          <div className="site-nav__links site-nav__links--end">
            <Link href={`${catalogBase}?category=codes`}>
              {copy.navigation.codes}
            </Link>
            <Link href={`${catalogBase}?category=subscriptions`}>
              {copy.navigation.subscriptions}
            </Link>
          </div>

          <div className="site-nav__actions">
            <Link
              aria-label={copy.languageLabel}
              className="language-switch"
              href={`/${alternateLocale}`}
              hrefLang={alternateLocale}
            >
              {copy.language}
            </Link>
            <a
              aria-label={copy.whatsapp}
              className="nav-whatsapp"
              href={getWhatsappUrl(undefined, locale)}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
              <ArrowUpRight />
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}
