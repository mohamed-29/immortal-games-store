import Image from "next/image"
import Link from "next/link"

import { getWhatsappUrl, Locale, storeCopy } from "@/content/catalog"
import { ArrowUpRight } from "./icons"

type FooterProps = {
  locale: Locale
}

export default function ImmortalFooter({ locale }: FooterProps) {
  const copy = storeCopy[locale]
  const catalogBase = `/${locale}/catalog`

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <div className="site-footer__brand">
          <Link className="footer-lockup" href={`/${locale}`}>
            <Image
              alt="Immortal Games Store"
              height={78}
              src="/immortal-games-logo.jpg"
              width={78}
            />
            <span>
              <strong>IMMORTAL</strong>
              <small>GAMES STORE</small>
            </span>
          </Link>
          <p>{copy.footerCopy}</p>
          <span className="footer-note">{copy.noCheckout}</span>
        </div>

        <div>
          <h2>{copy.quickLinks}</h2>
          <div className="footer-links">
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
          </div>
        </div>

        <div>
          <h2>{copy.contact}</h2>
          <div className="footer-links footer-links--contact">
            <a
              href={getWhatsappUrl(undefined, locale)}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp <ArrowUpRight />
            </a>
            <a
              href="https://www.facebook.com/Immortal.G.Store"
              rel="noreferrer"
              target="_blank"
            >
              Facebook <ArrowUpRight />
            </a>
            <a href="tel:+201552346010" dir="ltr">
              +20 15 52346010
            </a>
          </div>
        </div>
      </div>

      <div className="page-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} {copy.rights}</span>
        <span>Powered by Medusa + Next.js</span>
      </div>
    </footer>
  )
}
