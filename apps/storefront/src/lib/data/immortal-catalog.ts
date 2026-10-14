import "server-only"

import {
  CatalogCategory,
  CatalogProduct,
  catalogProducts,
} from "@/content/catalog"

type MedusaCatalogProduct = {
  handle?: string | null
  title: string
  description?: string | null
  metadata?: Record<string, unknown> | null
}

const categories: Exclude<CatalogCategory, "all">[] = [
  "playstation",
  "pc",
  "codes",
  "subscriptions",
]

function isCatalogCategory(
  value: unknown
): value is Exclude<CatalogCategory, "all"> {
  return typeof value === "string" && categories.includes(
    value as Exclude<CatalogCategory, "all">
  )
}

function stringMetadata(
  metadata: Record<string, unknown>,
  key: string,
  fallback: string
) {
  return typeof metadata[key] === "string" ? metadata[key] : fallback
}

function toCatalogProduct(product: MedusaCatalogProduct): CatalogProduct | null {
  if (!product.handle) {
    return null
  }

  const metadata = product.metadata ?? {}
  const fallback = catalogProducts.find((item) => item.handle === product.handle)
  const category = metadata.category

  if (!isCatalogCategory(category)) {
    return null
  }

  const availability = metadata.availability_status
  const normalizedAvailability =
    availability === "available" ||
    availability === "preorder" ||
    availability === "ask"
      ? availability
      : "ask"

  return {
    handle: product.handle,
    name: {
      en: product.title,
      ar: stringMetadata(metadata, "title_ar", fallback?.name.ar ?? product.title),
    },
    shortName: fallback?.shortName ?? product.title.toUpperCase().slice(0, 18),
    image: stringMetadata(
      metadata,
      "image",
      fallback?.image ?? "/brand/immortal-logo-primary.png"
    ),
    imageFit:
      metadata.image_fit === "contain" || fallback?.imageFit === "contain"
        ? "contain"
        : "cover",
    description: {
      en: product.description ?? fallback?.description.en ?? "",
      ar: stringMetadata(
        metadata,
        "description_ar",
        fallback?.description.ar ?? product.description ?? ""
      ),
    },
    category,
    platform: {
      en: stringMetadata(metadata, "platform_en", fallback?.platform.en ?? "DIGITAL"),
      ar: stringMetadata(metadata, "platform_ar", fallback?.platform.ar ?? "رقمي"),
    },
    availability: normalizedAvailability,
    featured:
      typeof metadata.featured === "boolean"
        ? metadata.featured
        : fallback?.featured ?? false,
    accent: stringMetadata(metadata, "accent", fallback?.accent ?? "#38b6ff"),
    accentSoft: stringMetadata(
      metadata,
      "accent_soft",
      fallback?.accentSoft ?? "#073d65"
    ),
    mark: stringMetadata(
      metadata,
      "mark",
      fallback?.mark ?? product.title.slice(0, 1)
    ),
  }
}

export async function getImmortalCatalog(): Promise<CatalogProduct[]> {
  const backendUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!publishableKey || publishableKey.startsWith("pk_local_")) {
    return catalogProducts
  }

  try {
    const params = new URLSearchParams({
      limit: "100",
      fields: "id,title,handle,description,status,metadata",
    })
    const response = await fetch(`${backendUrl}/store/products?${params}`, {
      headers: {
        "x-publishable-api-key": publishableKey,
      },
      next: {
        revalidate: 60,
        tags: ["immortal-catalog"],
      },
    })

    if (!response.ok) {
      return catalogProducts
    }

    const payload = (await response.json()) as {
      products?: MedusaCatalogProduct[]
    }
    const mappedProducts = (payload.products ?? [])
      .map(toCatalogProduct)
      .filter((product): product is CatalogProduct => Boolean(product))

    if (mappedProducts.length === 0) {
      return catalogProducts
    }

    const launchOrder = new Map(
      catalogProducts.map((product, index) => [product.handle, index])
    )

    return mappedProducts.sort(
      (first, second) =>
        (launchOrder.get(first.handle) ?? Number.MAX_SAFE_INTEGER) -
        (launchOrder.get(second.handle) ?? Number.MAX_SAFE_INTEGER)
    )
  } catch {
    return catalogProducts
  }
}
