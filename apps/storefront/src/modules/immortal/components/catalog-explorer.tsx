"use client"

import { useMemo, useState } from "react"

import {
  CatalogCategory,
  CatalogProduct,
  Locale,
  getWhatsappUrl,
  storeCopy,
} from "@/content/catalog"
import ProductCard from "./product-card"
import { SearchIcon, WhatsAppIcon } from "./icons"

type CatalogExplorerProps = {
  initialCategory?: CatalogCategory
  locale: Locale
  products: CatalogProduct[]
}

const categoryKeys: CatalogCategory[] = [
  "all",
  "playstation",
  "pc",
  "codes",
  "subscriptions",
]

export default function CatalogExplorer({
  initialCategory = "all",
  locale,
  products,
}: CatalogExplorerProps) {
  const copy = storeCopy[locale]
  const [category, setCategory] = useState<CatalogCategory>(initialCategory)
  const [query, setQuery] = useState("")

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale)

    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category
      const searchableText = [
        product.name.en,
        product.name.ar,
        product.shortName,
        product.platform.en,
        product.platform.ar,
      ]
        .join(" ")
        .toLocaleLowerCase(locale)

      return matchesCategory && searchableText.includes(normalizedQuery)
    })
  }, [category, locale, products, query])

  return (
    <div className="catalog-explorer">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <SearchIcon />
          <span className="sr-only">{copy.searchPlaceholder}</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            type="search"
            value={query}
          />
        </label>

        <div aria-label="Catalog categories" className="catalog-filters">
          {categoryKeys.map((key) => (
            <button
              aria-pressed={category === key}
              className={category === key ? "is-active" : undefined}
              key={key}
              onClick={() => setCategory(key)}
              type="button"
            >
              {copy.filters[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-results-line">
        <span>
          {String(visibleProducts.length).padStart(2, "0")} {copy.results}
        </span>
        <span className="catalog-results-line__rule" />
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid product-grid--catalog">
          {visibleProducts.map((product) => (
            <ProductCard key={product.handle} locale={locale} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-catalog">
          <span>Ø</span>
          <h2>{copy.noResults}</h2>
          <a
            className="button button--primary"
            href={getWhatsappUrl(undefined, locale)}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsAppIcon />
            {copy.askDifferent}
          </a>
        </div>
      )}
    </div>
  )
}
