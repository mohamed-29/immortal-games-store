import Link from "next/link"

import { CatalogProduct, Locale, storeCopy } from "@/content/catalog"
import { ArrowUpRight, WhatsAppIcon } from "./icons"
import { getWhatsappUrl } from "@/content/catalog"

type ProductCardProps = {
  locale: Locale
  product: CatalogProduct
  priority?: boolean
}

export default function ProductCard({ locale, product }: ProductCardProps) {
  const copy = storeCopy[locale]

  return (
    <article className="product-card">
      <Link
        aria-label={product.name[locale]}
        className="product-card__visual"
        href={`/${locale}/products/${product.handle}`}
        style={
          {
            "--product-accent": product.accent,
            "--product-accent-soft": product.accentSoft,
          } as React.CSSProperties
        }
      >
        <span className="product-card__grid" />
        <span className="product-card__orb" />
        <span className="product-card__mark">{product.mark}</span>
        <span className="product-card__short-name">{product.shortName}</span>
        <span className="product-card__platform">{product.platform[locale]}</span>
      </Link>

      <div className="product-card__body">
        <div>
          <p className="availability-line">
            <span className="availability-dot" />
            {copy.availabilityLabels[product.availability]}
          </p>
          <h3>
            <Link href={`/${locale}/products/${product.handle}`}>
              {product.name[locale]}
            </Link>
          </h3>
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">
            {product.price?.[locale] ?? copy.askForPrice}
          </span>
          <div className="product-card__actions">
            <a
              aria-label={`${copy.inquiry}: ${product.name[locale]}`}
              className="icon-action icon-action--whatsapp"
              href={getWhatsappUrl(product.name[locale], locale)}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsAppIcon />
            </a>
            <Link
              aria-label={product.name[locale]}
              className="icon-action"
              href={`/${locale}/products/${product.handle}`}
            >
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
