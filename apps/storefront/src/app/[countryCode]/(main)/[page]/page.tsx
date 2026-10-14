import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getWhatsappUrl, isLocale, supportedLocales } from "@/content/catalog"
import { getStorePage, storePageCopy, storePages } from "@/content/store-pages"
import { policySource } from "@/content/account-policies"
import { ArrowUpRight, WhatsAppIcon } from "@/modules/immortal/components/icons"

type StorePageProps = {
  params: Promise<{ countryCode: string; page: string }>
}

export function generateStaticParams() {
  return supportedLocales.flatMap((countryCode) =>
    storePages.map((page) => ({ countryCode, page: page.slug }))
  )
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { countryCode, page: slug } = await params
  const page = getStorePage(slug)

  if (!isLocale(countryCode) || !page) {
    return { title: "Page not found" }
  }

  const title = page.title[countryCode]
  const description = page.description[countryCode]

  return {
    title,
    description,
    alternates: {
      canonical: `/${countryCode}/${slug}`,
      languages: { en: `/en/${slug}`, ar: `/ar/${slug}` },
    },
    openGraph: {
      title: `${title} | Immortal Games Store`,
      description,
      url: `/${countryCode}/${slug}`,
      locale: countryCode === "ar" ? "ar_EG" : "en_US",
      images: [{ url: "/brand/immortal-logo-wide.png", alt: "Immortal Games Store" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Immortal Games Store`,
      description,
      images: ["/brand/immortal-logo-wide.png"],
    },
  }
}

export default async function StoreInformationPage({ params }: StorePageProps) {
  const { countryCode, page: slug } = await params
  const page = getStorePage(slug)

  if (!isLocale(countryCode) || !page) {
    notFound()
  }

  const locale = countryCode
  const copy = storePageCopy[locale]
  const alternateLocale = locale === "en" ? "ar" : "en"

  return (
    <div className="store-info page-shell">
      <header className="store-info__heading">
        <p className="eyebrow"><span />{copy.eyebrow}</p>
        <h1>{page.title[locale]}</h1>
        <p>{page.description[locale]}</p>
        <div className="store-info__meta">
          <span>{copy.updated}: <time dateTime="2026-10-15">{locale === "ar" ? "١٥ أكتوبر ٢٠٢٦" : "15 October 2026"}</time></span>
          <Link href={`/${alternateLocale}/${slug}`} hrefLang={alternateLocale}>
            {copy.alternate}
          </Link>
        </div>
        {(slug === "terms-and-conditions" || slug === "warranty") && (
          <a className="text-link store-info__source" href={policySource} rel="noreferrer" target="_blank">
            {locale === "ar" ? "منشور شروط إيمورتال الرسمي" : "Immortal's official policy post"}<ArrowUpRight />
          </a>
        )}
      </header>

      <div className="store-info__layout">
        <aside className="store-info__sidebar">
          <nav aria-label={copy.importantLinks} className="store-info__navigation">
            <h2>{copy.importantLinks}</h2>
            {storePages.map((item) => (
              <Link
                aria-current={item.slug === slug ? "page" : undefined}
                href={`/${locale}/${item.slug}`}
                key={item.slug}
              >
                {item.title[locale]}<ArrowUpRight />
              </Link>
            ))}
          </nav>
          <div className="store-info__help">
            <h2>{copy.helpTitle}</h2>
            <p>{copy.helpCopy}</p>
            <a href={getWhatsappUrl(undefined, locale)} rel="noreferrer" target="_blank">
              <WhatsAppIcon />{copy.whatsapp}
            </a>
          </div>
        </aside>

        <article className="store-info__article" aria-label={page.title[locale]}>
          <nav aria-label={copy.onThisPage} className="store-info__contents">
            <h2>{copy.onThisPage}</h2>
            {page.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title[locale]}</a>
            ))}
          </nav>
          {slug === "contact" && (
            <div className="store-contact-links">
              <a href={getWhatsappUrl(undefined, locale)} rel="noreferrer" target="_blank">
                <WhatsAppIcon /><strong>WhatsApp</strong><span dir="ltr">+20 15 52346010</span><ArrowUpRight />
              </a>
              <a href="https://www.facebook.com/Immortal.G.Store" rel="noreferrer" target="_blank">
                <strong>Facebook</strong><span>Immortal Games Store</span><ArrowUpRight />
              </a>
              <a href="tel:+201552346010">
                <strong>{locale === "ar" ? "الهاتف" : "Phone"}</strong><span dir="ltr">+20 15 52346010</span><ArrowUpRight />
              </a>
            </div>
          )}
          {page.sections.map((section, index) => (
            <section className="store-info__section" id={section.id} key={section.id}>
              <span aria-hidden="true" className="store-info__number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title[locale]}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph[locale]}</p>
              ))}
            </section>
          ))}
          <Link className="text-link" href={`/${locale}/contact`}>
            {copy.contact}<ArrowUpRight />
          </Link>
        </article>
      </div>
    </div>
  )
}
