import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  getWhatsappUrl,
  isLocale,
  storeCopy,
} from "@/content/catalog"
import { getImmortalCatalog } from "@/lib/data/immortal-catalog"
import { ArrowUpRight, WhatsAppIcon } from "@/modules/immortal/components/icons"
import ProductCard from "@/modules/immortal/components/product-card"

type HomeProps = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { countryCode } = await params
  const isArabic = countryCode === "ar"

  return {
    title: isArabic
      ? "متجر ألعاب وأكواد واشتراكات"
      : "Games, Codes & Subscriptions",
    description: isArabic
      ? "تصفح ألعاب بلايستيشن والكمبيوتر والأكواد الرقمية والاشتراكات وتواصل معنا عبر واتساب."
      : "Browse PlayStation and PC games, digital codes, and subscriptions, then order personally on WhatsApp.",
  }
}

export default async function Home({ params }: HomeProps) {
  const { countryCode } = await params

  if (!isLocale(countryCode)) {
    notFound()
  }

  const locale = countryCode
  const copy = storeCopy[locale]
  const catalogProducts = await getImmortalCatalog()
  const featuredProducts = catalogProducts.filter((product) => product.featured)
  const categoryCards = [
    { key: "playstation", mark: "PS", number: "01" },
    { key: "pc", mark: "PC", number: "02" },
    { key: "codes", mark: "#", number: "03" },
    { key: "subscriptions", mark: "+", number: "04" },
  ] as const

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-section__media">
          <Image
            alt="Immortal Games Store dark fantasy artwork"
            fill
            priority
            sizes="100vw"
            src="/immortal-games-logo.jpg"
          />
          <span className="hero-section__veil" />
          <span className="hero-section__scanlines" />
        </div>

        <div className="page-shell hero-section__content">
          <div className="hero-section__copy">
            <p className="eyebrow eyebrow--bright">
              <span />
              {copy.heroEyebrow}
            </p>
            <h1>{copy.heroTitle}</h1>
            <p className="hero-section__description">{copy.heroDescription}</p>
            <div className="button-row">
              <Link className="button button--primary" href={`/${locale}/catalog`}>
                {copy.browse}
                <ArrowUpRight />
              </Link>
              <a
                className="button button--ghost"
                href={getWhatsappUrl(undefined, locale)}
                rel="noreferrer"
                target="_blank"
              >
                <WhatsAppIcon />
                {copy.whatsapp}
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="hero-section__crest">
            <span className="hero-section__crest-line" />
            <Image alt="" height={154} src="/immortal-games-logo.jpg" width={154} />
            <span>EST. ON FACEBOOK</span>
          </div>
        </div>

        <div className="hero-section__index" aria-hidden="true">
          <span>IMMORTAL / 001</span>
          <span>CAIRO, EGYPT</span>
        </div>
      </section>

      <section aria-label="Store benefits" className="benefit-strip">
        <div className="page-shell benefit-strip__grid">
          <article>
            <span>01</span>
            <div><h2>{copy.directSupport}</h2><p>{copy.directSupportCopy}</p></div>
          </article>
          <article>
            <span>02</span>
            <div><h2>{copy.flexiblePricing}</h2><p>{copy.flexiblePricingCopy}</p></div>
          </article>
          <article>
            <span>03</span>
            <div><h2>{copy.digitalFirst}</h2><p>{copy.digitalFirstCopy}</p></div>
          </article>
        </div>
      </section>

      <section className="section page-shell" id="trending">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><span />{copy.trendingEyebrow}</p>
            <h2>{copy.trendingTitle}</h2>
          </div>
          <div className="section-heading__aside">
            <p>{copy.trendingCopy}</p>
            <Link className="text-link" href={`/${locale}/catalog`}>
              {copy.viewAll}<ArrowUpRight />
            </Link>
          </div>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.handle} locale={locale} product={product} />
          ))}
        </div>
      </section>

      <section className="category-section">
        <div className="page-shell">
          <div className="section-heading">
            <p className="eyebrow"><span />{copy.categoriesEyebrow}</p>
            <h2>{copy.categoriesTitle}</h2>
            <p className="section-heading__copy">{copy.categoriesCopy}</p>
          </div>

          <div className="category-grid">
            {categoryCards.map((category) => (
              <Link
                className={`category-card category-card--${category.key}`}
                href={`/${locale}/catalog?category=${category.key}`}
                key={category.key}
              >
                <span className="category-card__number">{category.number}</span>
                <span className="category-card__mark">{category.mark}</span>
                <span className="category-card__content">
                  <strong>{copy.filters[category.key]}</strong>
                  <small>{copy.categoryDescriptions[category.key]}</small>
                </span>
                <span className="category-card__action">
                  {copy.explore}<ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section page-shell">
        <div className="process-section__intro">
          <p className="eyebrow"><span />{copy.howEyebrow}</p>
          <h2>{copy.howTitle}</h2>
        </div>
        <div className="process-steps">
          {copy.steps.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="page-shell about-section__grid">
          <div className="about-section__media">
            <Image
              alt="Immortal Games Store emblem"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              src="/immortal-games-logo.jpg"
            />
            <span className="about-section__frame" />
          </div>
          <div className="about-section__copy">
            <p className="eyebrow"><span />{copy.aboutEyebrow}</p>
            <h2>{copy.aboutTitle}</h2>
            <p>{copy.aboutCopy}</p>
            <a
              className="text-link"
              href="https://www.facebook.com/Immortal.G.Store"
              rel="noreferrer"
              target="_blank"
            >
              {copy.facebook}<ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="whatsapp-cta">
        <div className="whatsapp-cta__glow" />
        <div className="page-shell whatsapp-cta__content">
          <div>
            <p className="eyebrow eyebrow--bright"><span />{copy.ctaEyebrow}</p>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaCopy}</p>
          </div>
          <a
            className="button button--whatsapp"
            href={getWhatsappUrl(undefined, locale)}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsAppIcon />{copy.whatsapp}<ArrowUpRight />
          </a>
        </div>
      </section>
    </div>
  )
}
