import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  CatalogCategory,
  isLocale,
  storeCopy,
} from "@/content/catalog"
import { getImmortalCatalog } from "@/lib/data/immortal-catalog"
import CatalogExplorer from "@/modules/immortal/components/catalog-explorer"

type CatalogPageProps = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse the Immortal Games Store catalog of games, digital codes, and subscriptions.",
}

const validCategories: CatalogCategory[] = [
  "all",
  "playstation",
  "pc",
  "codes",
  "subscriptions",
]

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ countryCode }, query] = await Promise.all([params, searchParams])

  if (!isLocale(countryCode)) {
    notFound()
  }

  const copy = storeCopy[countryCode]
  const catalogProducts = await getImmortalCatalog()
  const requestedCategory = query.category as CatalogCategory | undefined
  const initialCategory =
    requestedCategory && validCategories.includes(requestedCategory)
      ? requestedCategory
      : "all"

  return (
    <div className="catalog-page">
      <header className="catalog-hero">
        <div className="catalog-hero__grid" />
        <div className="page-shell catalog-hero__content">
          <p className="eyebrow eyebrow--bright"><span />{copy.catalogEyebrow}</p>
          <h1>{copy.catalogTitle}</h1>
          <p>{copy.catalogDescription}</p>
        </div>
        <span aria-hidden="true" className="catalog-hero__mark">IGS</span>
      </header>

      <section className="page-shell catalog-content">
        <CatalogExplorer
          initialCategory={initialCategory}
          locale={countryCode}
          products={catalogProducts}
        />
      </section>
    </div>
  )
}
