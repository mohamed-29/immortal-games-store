import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  catalogProducts,
  getWhatsappUrl,
  isLocale,
  storeCopy,
  supportedLocales,
} from "@/content/catalog"
import {
  ArrowLeft,
  ArrowUpRight,
  WhatsAppIcon,
} from "@/modules/immortal/components/icons"
import ProductCard from "@/modules/immortal/components/product-card"

type ProductPageProps = {
  params: Promise<{ countryCode: string; handle: string }>
}

export function generateStaticParams() {
  return supportedLocales.flatMap((countryCode) =>
    catalogProducts.map((product) => ({
      countryCode,
      handle: product.handle,
    }))
  )
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { countryCode, handle } = await params
  const product = catalogProducts.find((item) => item.handle === handle)

  if (!product || !isLocale(countryCode)) {
    return { title: "Product not found" }
  }

  return {
    title: product.name[countryCode],
    description: product.description[countryCode],
    openGraph: {
      title: product.name[countryCode],
      description: product.description[countryCode],
      images: [{ url: product.image, alt: product.name[countryCode] }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name[countryCode],
      description: product.description[countryCode],
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { countryCode, handle } = await params
  const product = catalogProducts.find((item) => item.handle === handle)

  if (!product || !isLocale(countryCode)) {
    notFound()
  }

  const copy = storeCopy[countryCode]
  const relatedProducts = catalogProducts
    .filter((item) => item.handle !== product.handle)
    .sort((first, second) => {
      const firstMatches = first.category === product.category ? -1 : 1
      const secondMatches = second.category === product.category ? -1 : 1
      return firstMatches - secondMatches
    })
    .slice(0, 3)

  return (
    <div className="product-page">
      <div className="page-shell product-detail">
        <Link className="back-link" href={`/${countryCode}/catalog`}>
          <ArrowLeft />
          {copy.backToCatalog}
        </Link>

        <div className="product-detail__grid">
          <div
            className="product-detail__visual"
            style={
              {
                "--product-accent": product.accent,
                "--product-accent-soft": product.accentSoft,
              } as React.CSSProperties
            }
          >
            <Image
              alt={product.name[countryCode]}
              className={`product-detail__image product-detail__image--${product.imageFit ?? "cover"}`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              src={product.image}
            />
            <span className="product-detail__image-shade" />
            <span className="product-detail__short-name">{product.shortName}</span>
          </div>

          <div className="product-detail__copy">
            <p className="availability-line">
              <span className="availability-dot" />
              {copy.availabilityLabels[product.availability]}
            </p>
            <p className="product-detail__platform">{product.platform[countryCode]}</p>
            <h1>{product.name[countryCode]}</h1>
            <p className="product-detail__description">
              {product.description[countryCode]}
            </p>

            <div className="product-detail__price-row">
              <span>{product.price?.[countryCode] ?? copy.askForPrice}</span>
              <small>{copy.noCheckout}</small>
            </div>

            <a
              className="button button--whatsapp button--wide"
              href={getWhatsappUrl(product.name[countryCode], countryCode)}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsAppIcon />
              {copy.inquiry}
              <ArrowUpRight />
            </a>

            <div className="product-detail__notice">
              <span>i</span>
              <div>
                <strong>{copy.productDetails}</strong>
                <p>{copy.productNotice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="page-shell related-products">
        <div className="section-heading">
          <p className="eyebrow"><span />{copy.related}</p>
        </div>
        <div className="product-grid product-grid--related">
          {relatedProducts.map((item) => (
            <ProductCard key={item.handle} locale={countryCode} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
