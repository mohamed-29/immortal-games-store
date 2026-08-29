import type { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  MedusaError,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createTaxRegionsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"

const launchProducts = [
  {
    handle: "ea-sports-fc-26",
    title: "EA SPORTS FC 26",
    titleAr: "EA SPORTS FC 26",
    description:
      "Football built for match day. Ask for the available PS4 or PS5 edition.",
    descriptionAr:
      "تجربة كرة قدم ليوم المباراة. اسأل عن نسخة PS4 أو PS5 المتوفرة.",
    category: "playstation",
    platform: "PS5 · PS4",
    platformAr: "PS5 · PS4",
    accent: "#7ee8a5",
    accentSoft: "#143c2b",
    mark: "26",
  },
  {
    handle: "minecraft",
    title: "Minecraft",
    titleAr: "ماينكرافت",
    description:
      "Build, explore, and survive in a world that is different every time.",
    descriptionAr: "ابنِ واستكشف وابقَ في عالم مختلف في كل مرة.",
    category: "playstation",
    platform: "PS5 · PS4",
    platformAr: "PS5 · PS4",
    accent: "#a8e063",
    accentSoft: "#28471a",
    mark: "M",
  },
  {
    handle: "helldivers-2",
    title: "HELLDIVERS 2",
    titleAr: "HELLDIVERS 2",
    description:
      "Join the fight for freedom in an intense co-op third-person shooter.",
    descriptionAr: "انضم إلى معركة الحرية في لعبة تصويب تعاونية قوية.",
    category: "pc",
    platform: "PS5 · PC",
    platformAr: "PS5 · PC",
    accent: "#ffd84d",
    accentSoft: "#4b3d08",
    mark: "H2",
  },
  {
    handle: "palworld",
    title: "Palworld",
    titleAr: "Palworld",
    description:
      "Adventure, survival, crafting, and mysterious creatures in one open world.",
    descriptionAr:
      "مغامرة وبقاء وصناعة ومخلوقات غامضة داخل عالم مفتوح.",
    category: "pc",
    platform: "PS5 · PC",
    platformAr: "PS5 · PC",
    accent: "#ff8dd0",
    accentSoft: "#4a1735",
    mark: "P",
  },
  {
    handle: "playstation-store-wallet",
    title: "PlayStation Store Wallet",
    titleAr: "رصيد متجر PlayStation",
    description:
      "Top up your PlayStation Store wallet. Region and value are confirmed before payment.",
    descriptionAr:
      "اشحن رصيد متجر PlayStation. يتم تأكيد المنطقة والقيمة قبل الدفع.",
    category: "codes",
    platform: "DIGITAL CODE",
    platformAr: "كود رقمي",
    accent: "#38b6ff",
    accentSoft: "#073d65",
    mark: "PS",
  },
  {
    handle: "playstation-plus",
    title: "PlayStation Plus",
    titleAr: "PlayStation Plus",
    description:
      "Essential, Extra, or Deluxe membership options. Ask for available duration and region.",
    descriptionAr:
      "خيارات Essential أو Extra أو Deluxe. اسأل عن المدة والمنطقة المتوفرة.",
    category: "subscriptions",
    platform: "SUBSCRIPTION",
    platformAr: "اشتراك",
    accent: "#f6c344",
    accentSoft: "#463607",
    mark: "+",
  },
  {
    handle: "steam-wallet",
    title: "Steam Wallet",
    titleAr: "رصيد Steam",
    description:
      "Add funds for PC games and in-game content. Currency and value are confirmed first.",
    descriptionAr:
      "أضف رصيداً لألعاب الكمبيوتر والمحتوى داخل الألعاب. نؤكد العملة والقيمة أولاً.",
    category: "codes",
    platform: "PC · DIGITAL CODE",
    platformAr: "PC · كود رقمي",
    accent: "#8cc8ff",
    accentSoft: "#112d4a",
    mark: "S",
  },
  {
    handle: "xbox-game-pass",
    title: "Xbox Game Pass",
    titleAr: "Xbox Game Pass",
    description:
      "Ask about currently available Game Pass plans, durations, and activation regions.",
    descriptionAr:
      "اسأل عن خطط Game Pass والمدد ومناطق التفعيل المتوفرة حالياً.",
    category: "subscriptions",
    platform: "PC · XBOX",
    platformAr: "PC · XBOX",
    accent: "#55d66b",
    accentSoft: "#123d1b",
    mark: "X",
  },
  {
    handle: "shahid-vip",
    title: "Shahid VIP",
    titleAr: "شاهد VIP",
    description:
      "Entertainment subscription options. Ask for the available plan and duration.",
    descriptionAr:
      "خيارات اشتراك ترفيهي. اسأل عن الخطة والمدة المتوفرة.",
    category: "subscriptions",
    platform: "ENTERTAINMENT",
    platformAr: "ترفيه",
    accent: "#8f7cff",
    accentSoft: "#29205a",
    mark: "V",
  },
]

const categoryNames = {
  playstation: "PlayStation",
  pc: "PC Games",
  codes: "Digital Codes",
  subscriptions: "Subscriptions",
}

export default async function seedImmortalCatalog({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info("Preparing Immortal Games Store catalog...")

  const { data: existingRegions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "countries.iso_2"],
  })

  const hasEgyptRegion = existingRegions.some((region) =>
    region.countries?.some((country) => country?.iso_2 === "eg")
  )

  if (!hasEgyptRegion) {
    await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Egypt",
            currency_code: "egp",
            countries: ["eg"],
          },
        ],
      },
    })

    await createTaxRegionsWorkflow(container).run({
      input: [
        {
          country_code: "eg",
          provider_id: "tp_system",
        },
      ],
    })
  }

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id", "name"],
  })

  const salesChannel = salesChannels[0]
  const shippingProfile = shippingProfiles[0]

  if (!salesChannel || !shippingProfile) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "A sales channel and shipping profile are required before seeding"
    )
  }

  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "handle", "name"],
  })
  const missingCategoryKeys = Object.keys(categoryNames).filter(
    (key) => !existingCategories.some((category) => category.handle === key)
  ) as (keyof typeof categoryNames)[]

  if (missingCategoryKeys.length > 0) {
    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategoryKeys.map((key) => ({
          name: categoryNames[key],
          handle: key,
          is_active: true,
        })),
      },
    })
  }

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "handle"],
  })
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "status"],
  })
  const launchHandles = new Set(launchProducts.map((product) => product.handle))
  const demoProducts = existingProducts.filter(
    (product) => product.handle && !launchHandles.has(product.handle)
  )

  if (demoProducts.length > 0) {
    await updateProductsWorkflow(container).run({
      input: {
        products: demoProducts.map((product) => ({
          id: product.id,
          status: ProductStatus.DRAFT,
        })),
      },
    })
  }

  const productsToCreate = launchProducts.filter(
    (product) =>
      !existingProducts.some((existing) => existing.handle === product.handle)
  )

  if (productsToCreate.length > 0) {
    await createProductsWorkflow(container).run({
      input: {
        products: productsToCreate.map((product) => {
          const category = categories.find(
            (item) => item.handle === product.category
          )

          if (!category) {
            throw new MedusaError(
              MedusaError.Types.INVALID_DATA,
              `Missing product category: ${product.category}`
            )
          }

          return {
            title: product.title,
            handle: product.handle,
            description: product.description,
            status: ProductStatus.PUBLISHED,
            category_ids: [category.id],
            shipping_profile_id: shippingProfile.id,
            sales_channels: [{ id: salesChannel.id }],
            metadata: {
              title_ar: product.titleAr,
              description_ar: product.descriptionAr,
              category: product.category,
              platform_en: product.platform,
              platform_ar: product.platformAr,
              availability_status: "ask",
              show_price: false,
              delivery_type:
                product.category === "codes" ? "digital_code" : "manual",
              featured: [
                "ea-sports-fc-26",
                "minecraft",
                "helldivers-2",
                "palworld",
                "playstation-store-wallet",
                "playstation-plus",
              ].includes(product.handle),
              accent: product.accent,
              accent_soft: product.accentSoft,
              mark: product.mark,
            },
            options: [
              {
                title: "Platform",
                values: [product.platform],
              },
            ],
            variants: [
              {
                title: product.platform,
                sku: `IGS-${product.handle.toUpperCase()}`,
                manage_inventory: false,
                allow_backorder: true,
                options: {
                  Platform: product.platform,
                },
                prices: [],
              },
            ],
          }
        }),
      },
    })
  }

  logger.info(
    `Immortal catalog ready: ${launchProducts.length} launch products configured`
  )
}
