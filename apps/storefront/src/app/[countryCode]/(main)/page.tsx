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
import { storePageCopy } from "@/content/store-pages"
import HotDealsSlider from "@/modules/immortal/components/hot-deals-slider"
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
  const showcaseProducts = ["ea-sports-fc-26", "helldivers-2", "palworld"]
    .flatMap((handle) => {
      const product = catalogProducts.find((item) => item.handle === handle)
      return product ? [product] : []
    })
  const categoryCards = [
    {
      key: "playstation",
      image: "/images/catalog/ea-sports-fc-26.jpg",
      mark: "PS",
      number: "01",
    },
    {
      key: "pc",
      image: "/images/catalog/helldivers-2.png",
      mark: "PC",
      number: "02",
    },
    {
      key: "codes",
      image: "/images/catalog/playstation-store-wallet.jpg",
      mark: "#",
      number: "03",
    },
    {
      key: "subscriptions",
      image: "/images/catalog/xbox-game-pass.jpg",
      mark: "+",
      number: "04",
    },
  ] as const

  return (
    <div className="home-page">
      <section className="store-hero">
        <div className="page-shell store-hero__layout">
          <div className="store-hero__copy">
            <p className="eyebrow eyebrow--bright"><span />{copy.heroEyebrow}</p>
            <h1>
              {copy.heroTitleLead}
              <span>{copy.heroTitleAccent}</span>
            </h1>
            <p className="store-hero__description">{copy.heroDescription}</p>
            <div className="button-row">
              <Link className="button button--primary" href={`/${locale}/catalog`}>
                {copy.browse}<ArrowUpRight />
              </Link>
              <a
                className="button button--ghost"
                href={getWhatsappUrl(undefined, locale)}
                rel="noreferrer"
                target="_blank"
              >
                <WhatsAppIcon />{copy.whatsapp}
              </a>
            </div>
            <p className="store-hero__support"><WhatsAppIcon />{copy.heroSupport}</p>
            <div className="store-hero__platforms" aria-label={copy.categoriesTitle}>
              {(["playstation", "pc", "codes", "subscriptions"] as const).map((category) => (
                <Link href={`/${locale}/catalog?category=${category}`} key={category}>
                  {copy.filters[category]}
                </Link>
              ))}
            </div>
          </div>

          <div className="store-hero__showcase">
            <div className="store-hero__showcase-heading">
              <h2>{copy.heroShowcase}</h2>
              <span aria-hidden="true">01 / 03</span>
            </div>
            <div className="store-hero__games">
              {showcaseProducts.map((product, index) => (
                <Link
                  aria-label={product.name[locale]}
                  className={`store-hero__game${index === 0 ? " store-hero__game--featured" : ""}`}
                  href={`/${locale}/products/${product.handle}`}
                  key={product.handle}
                >
                  <Image
                    alt=""
                    className="store-hero__game-image"
                    fill
                    priority={index === 0}
                    sizes={index === 0 ? "(max-width: 980px) 100vw, 50vw" : "(max-width: 980px) 45vw, 25vw"}
                    src={product.image}
                  />
                  <span className="store-hero__game-shade" />
                  <span className="store-hero__game-info">
                    <small>{product.platform[locale]}</small>
                    <strong>{product.name[locale]}</strong>
                  </span>
                  <span className="store-hero__game-arrow"><ArrowUpRight /></span>
                </Link>
              ))}
            </div>
          </div>
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

      <section className="hot-deals-section page-shell" id="hot-deals">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><span />{copy.hotDealsEyebrow}</p>
            <h2>{copy.hotDealsTitle}</h2>
          </div>
          <div className="section-heading__aside">
            <p>{copy.hotDealsCopy}</p>
          </div>
        </div>
        <HotDealsSlider locale={locale} />
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
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.handle}
              locale={locale}
              priority={index < 2}
              product={product}
            />
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
                <span className="category-card__image" aria-hidden="true">
                  <Image alt="" fill sizes="(max-width: 760px) 100vw, 50vw" src={category.image} />
                </span>
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
          <div className="about-section__media about-section__media--wordmark">
            <Image
              alt="Immortal Games Store emblem"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              src="/brand/immortal-logo-primary.png"
            />
            <span className="about-section__signature">EST. ON FACEBOOK / EGYPT</span>
          </div>
          <div className="about-section__copy">
            <p className="eyebrow"><span />{copy.aboutEyebrow}</p>
            <h2>{copy.aboutTitle}</h2>
            <p>{copy.aboutCopy}</p>
            <Link className="text-link" href={`/${locale}/about`}>
              {storePageCopy[locale].readMore}<ArrowUpRight />
            </Link>
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
