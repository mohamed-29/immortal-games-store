export type Locale = "en" | "ar"

export type CatalogCategory =
  | "all"
  | "playstation"
  | "pc"
  | "codes"
  | "subscriptions"

export type LocalizedCopy = Record<Locale, string>

export type CatalogProduct = {
  handle: string
  name: LocalizedCopy
  shortName: string
  image: string
  imageFit?: "cover" | "contain"
  description: LocalizedCopy
  category: Exclude<CatalogCategory, "all">
  platform: LocalizedCopy
  availability: "available" | "preorder" | "ask"
  price?: LocalizedCopy
  featured: boolean
  accent: string
  accentSoft: string
  mark: string
}

export const storeCopy = {
  en: {
    announcement: "Digital delivery • Personal support • Egypt",
    navigation: {
      catalog: "Catalog",
      playstation: "PlayStation",
      pc: "PC games",
      codes: "Digital codes",
      subscriptions: "Subscriptions",
      about: "About us",
    },
    language: "العربية",
    languageLabel: "Switch to Arabic",
    heroEyebrow: "Immortal Games Store",
    heroTitle: "Your next game lives here.",
    heroDescription:
      "PlayStation and PC games, digital codes, wallet cards, and subscriptions—backed by fast, personal help on WhatsApp.",
    browse: "Browse catalog",
    whatsapp: "Message us on WhatsApp",
    directSupport: "Direct support",
    directSupportCopy: "Speak with a real person before you buy.",
    flexiblePricing: "Clear availability",
    flexiblePricingCopy: "See a price when listed, or ask us for today’s offer.",
    digitalFirst: "Digital-first",
    digitalFirstCopy: "Fast help with codes, games, and subscriptions.",
    hotDealsEyebrow: "From our Facebook page",
    hotDealsTitle: "Hot deals",
    hotDealsCopy:
      "Browse recent Immortal offers, then message us to confirm the current price and availability.",
    trendingEyebrow: "Popular right now",
    trendingTitle: "Trending picks",
    trendingCopy:
      "A starter selection based on current PlayStation and PC interest. Message us to confirm platform, edition, region, and today’s price.",
    viewAll: "View full catalog",
    categoriesEyebrow: "Choose your world",
    categoriesTitle: "Shop by category",
    categoriesCopy:
      "Built for the way gamers actually shop—from full games to wallet codes and memberships.",
    categoryDescriptions: {
      playstation: "PS4 and PS5 games, editions, and store credit.",
      pc: "PC titles and Steam wallet options.",
      codes: "PlayStation, Steam, and entertainment wallet codes.",
      subscriptions: "Gaming and entertainment memberships.",
    },
    explore: "Explore",
    howEyebrow: "Simple by design",
    howTitle: "From discovery to play in three steps.",
    steps: [
      ["01", "Find your product", "Browse the catalog and choose the platform or subscription you need."],
      ["02", "Message Immortal", "WhatsApp opens with the product name ready. Tell us the edition and region."],
      ["03", "Confirm with us", "We confirm price, availability, payment, and delivery directly with you."],
    ],
    aboutEyebrow: "Built around gamers",
    aboutTitle: "A local store with human service.",
    aboutCopy:
      "Immortal Games Store started on Facebook and is growing into a faster, clearer catalog for our community. This first phase keeps ordering personal: explore here, then speak with us directly on WhatsApp.",
    ctaEyebrow: "Can’t find it?",
    ctaTitle: "Tell us what you want to play.",
    ctaCopy:
      "Send the game, platform, edition, and account region. We’ll check what is available and reply with the current offer.",
    facebook: "Visit our Facebook page",
    footerCopy:
      "Games, digital codes, and subscriptions with personal support in Egypt.",
    quickLinks: "Quick links",
    contact: "Contact",
    rights: "Immortal Games Store. All rights reserved.",
    noCheckout: "Orders are confirmed personally on WhatsApp. No online checkout in phase one.",
    catalogEyebrow: "The Immortal catalog",
    catalogTitle: "Pick your next experience.",
    catalogDescription:
      "Search our launch catalog, filter by category, then message us to confirm the exact edition, region, and current price.",
    searchPlaceholder: "Search games, codes, or subscriptions",
    filters: {
      all: "All products",
      playstation: "PlayStation",
      pc: "PC games",
      codes: "Digital codes",
      subscriptions: "Subscriptions",
    },
    results: "products",
    noResults: "No products match that search yet.",
    askDifferent: "Ask us for something else",
    backToCatalog: "Back to catalog",
    productDetails: "Product details",
    productNotice:
      "Platform, edition, activation region, availability, and price are confirmed with you on WhatsApp before payment.",
    related: "You may also like",
    inquiry: "Ask about this product",
    availabilityLabels: {
      available: "Available",
      preorder: "Pre-order",
      ask: "Ask to confirm",
    },
    askForPrice: "Ask for price",
  },
  ar: {
    announcement: "تسليم رقمي • دعم شخصي • مصر",
    navigation: {
      catalog: "الكتالوج",
      playstation: "بلايستيشن",
      pc: "ألعاب الكمبيوتر",
      codes: "أكواد رقمية",
      subscriptions: "اشتراكات",
      about: "من نحن",
    },
    language: "English",
    languageLabel: "التبديل إلى الإنجليزية",
    heroEyebrow: "إيمورتال جيمز ستور",
    heroTitle: "لعبتك القادمة تبدأ من هنا.",
    heroDescription:
      "ألعاب بلايستيشن وكمبيوتر، أكواد رقمية، بطاقات شحن واشتراكات—مع مساعدة شخصية وسريعة عبر واتساب.",
    browse: "تصفح الكتالوج",
    whatsapp: "راسلنا على واتساب",
    directSupport: "دعم مباشر",
    directSupportCopy: "تحدث مع شخص حقيقي قبل الشراء.",
    flexiblePricing: "توفر واضح",
    flexiblePricingCopy: "شاهد السعر عند عرضه أو اسألنا عن عرض اليوم.",
    digitalFirst: "خدمة رقمية أولاً",
    digitalFirstCopy: "مساعدة سريعة للأكواد والألعاب والاشتراكات.",
    hotDealsEyebrow: "من صفحتنا على فيسبوك",
    hotDealsTitle: "أقوى العروض",
    hotDealsCopy:
      "تصفح عروض إيمورتال ثم راسلنا لتأكيد السعر الحالي والتوفر.",
    trendingEyebrow: "الأكثر طلباً الآن",
    trendingTitle: "اختيارات رائجة",
    trendingCopy:
      "مجموعة أولية مبنية على الاهتمام الحالي بألعاب بلايستيشن والكمبيوتر. راسلنا لتأكيد المنصة والنسخة والمنطقة وسعر اليوم.",
    viewAll: "عرض الكتالوج الكامل",
    categoriesEyebrow: "اختر عالمك",
    categoriesTitle: "تسوق حسب القسم",
    categoriesCopy:
      "مصمم لطريقة شراء اللاعبين فعلياً—من الألعاب الكاملة إلى أكواد الشحن والعضويات.",
    categoryDescriptions: {
      playstation: "ألعاب PS4 وPS5 والنسخ ورصيد المتجر.",
      pc: "ألعاب الكمبيوتر وخيارات رصيد Steam.",
      codes: "أكواد بلايستيشن وSteam وخدمات الترفيه.",
      subscriptions: "اشتراكات الألعاب وخدمات الترفيه.",
    },
    explore: "استكشف",
    howEyebrow: "ببساطة",
    howTitle: "من الاختيار إلى اللعب في ثلاث خطوات.",
    steps: [
      ["01", "اختر المنتج", "تصفح الكتالوج وحدد المنصة أو الاشتراك الذي تحتاجه."],
      ["02", "راسل إيمورتال", "يفتح واتساب واسم المنتج جاهز. أخبرنا بالنسخة والمنطقة."],
      ["03", "أكد معنا", "نؤكد السعر والتوفر والدفع والتسليم معك مباشرة."],
    ],
    aboutEyebrow: "مصمم للاعبين",
    aboutTitle: "متجر محلي بخدمة حقيقية.",
    aboutCopy:
      "بدأ إيمورتال جيمز ستور على فيسبوك ويتطور الآن إلى كتالوج أسرع وأوضح لمجتمعنا. في المرحلة الأولى يظل الطلب شخصياً: استكشف هنا ثم تحدث معنا مباشرة عبر واتساب.",
    ctaEyebrow: "لم تجد طلبك؟",
    ctaTitle: "أخبرنا ماذا تريد أن تلعب.",
    ctaCopy:
      "أرسل اسم اللعبة والمنصة والنسخة ومنطقة الحساب. سنراجع المتوفر ونرسل لك العرض الحالي.",
    facebook: "زيارة صفحتنا على فيسبوك",
    footerCopy: "ألعاب وأكواد رقمية واشتراكات مع دعم شخصي داخل مصر.",
    quickLinks: "روابط سريعة",
    contact: "تواصل معنا",
    rights: "إيمورتال جيمز ستور. جميع الحقوق محفوظة.",
    noCheckout: "يتم تأكيد الطلبات شخصياً عبر واتساب. لا يوجد دفع أونلاين في المرحلة الأولى.",
    catalogEyebrow: "كتالوج إيمورتال",
    catalogTitle: "اختر تجربتك القادمة.",
    catalogDescription:
      "ابحث في كتالوج الإطلاق وصَفِّ حسب القسم، ثم راسلنا لتأكيد النسخة والمنطقة والسعر الحالي.",
    searchPlaceholder: "ابحث عن ألعاب أو أكواد أو اشتراكات",
    filters: {
      all: "كل المنتجات",
      playstation: "بلايستيشن",
      pc: "ألعاب الكمبيوتر",
      codes: "أكواد رقمية",
      subscriptions: "اشتراكات",
    },
    results: "منتج",
    noResults: "لا توجد منتجات مطابقة لهذا البحث حالياً.",
    askDifferent: "اسألنا عن منتج آخر",
    backToCatalog: "العودة إلى الكتالوج",
    productDetails: "تفاصيل المنتج",
    productNotice:
      "يتم تأكيد المنصة والنسخة ومنطقة التفعيل والتوفر والسعر معك على واتساب قبل الدفع.",
    related: "قد يعجبك أيضاً",
    inquiry: "اسأل عن هذا المنتج",
    availabilityLabels: {
      available: "متوفر",
      preorder: "طلب مسبق",
      ask: "اسأل للتأكيد",
    },
    askForPrice: "اسأل عن السعر",
  },
} as const

export const catalogProducts: CatalogProduct[] = [
  {
    handle: "ea-sports-fc-26",
    name: { en: "EA SPORTS FC 26", ar: "EA SPORTS FC 26" },
    shortName: "FC 26",
    image: "/images/catalog/ea-sports-fc-26.jpg",
    imageFit: "contain",
    description: {
      en: "Football built for match day. Ask for the available PS4 or PS5 edition.",
      ar: "تجربة كرة قدم ليوم المباراة. اسأل عن نسخة PS4 أو PS5 المتوفرة.",
    },
    category: "playstation",
    platform: { en: "PS5 · PS4", ar: "PS5 · PS4" },
    availability: "ask",
    featured: true,
    accent: "#7ee8a5",
    accentSoft: "#143c2b",
    mark: "26",
  },
  {
    handle: "minecraft",
    name: { en: "Minecraft", ar: "ماينكرافت" },
    shortName: "MINECRAFT",
    image: "/images/catalog/minecraft.jpg",
    imageFit: "contain",
    description: {
      en: "Build, explore, and survive in a world that is different every time.",
      ar: "ابنِ واستكشف وابقَ في عالم مختلف في كل مرة.",
    },
    category: "playstation",
    platform: { en: "PS5 · PS4", ar: "PS5 · PS4" },
    availability: "ask",
    featured: true,
    accent: "#a8e063",
    accentSoft: "#28471a",
    mark: "M",
  },
  {
    handle: "helldivers-2",
    name: { en: "HELLDIVERS 2", ar: "HELLDIVERS 2" },
    shortName: "HELLDIVERS",
    image: "/images/catalog/helldivers-2.png",
    description: {
      en: "Join the fight for freedom in an intense co-op third-person shooter.",
      ar: "انضم إلى معركة الحرية في لعبة تصويب تعاونية قوية.",
    },
    category: "pc",
    platform: { en: "PS5 · PC", ar: "PS5 · PC" },
    availability: "ask",
    featured: true,
    accent: "#ffd84d",
    accentSoft: "#4b3d08",
    mark: "H2",
  },
  {
    handle: "palworld",
    name: { en: "Palworld", ar: "Palworld" },
    shortName: "PALWORLD",
    image: "/images/catalog/palworld.jpg",
    description: {
      en: "Adventure, survival, crafting, and mysterious creatures in one open world.",
      ar: "مغامرة وبقاء وصناعة ومخلوقات غامضة داخل عالم مفتوح.",
    },
    category: "pc",
    platform: { en: "PS5 · PC", ar: "PS5 · PC" },
    availability: "ask",
    featured: true,
    accent: "#ff8dd0",
    accentSoft: "#4a1735",
    mark: "P",
  },
  {
    handle: "playstation-store-wallet",
    name: { en: "PlayStation Store Wallet", ar: "رصيد متجر PlayStation" },
    shortName: "PS WALLET",
    image: "/images/catalog/playstation-store-wallet.jpg",
    imageFit: "contain",
    description: {
      en: "Top up your PlayStation Store wallet. Region and value are confirmed before payment.",
      ar: "اشحن رصيد متجر PlayStation. يتم تأكيد المنطقة والقيمة قبل الدفع.",
    },
    category: "codes",
    platform: { en: "DIGITAL CODE", ar: "كود رقمي" },
    availability: "ask",
    featured: true,
    accent: "#38b6ff",
    accentSoft: "#073d65",
    mark: "PS",
  },
  {
    handle: "playstation-plus",
    name: { en: "PlayStation Plus", ar: "PlayStation Plus" },
    shortName: "PS PLUS",
    image: "/images/catalog/playstation-plus.png",
    imageFit: "contain",
    description: {
      en: "Essential, Extra, or Deluxe membership options. Ask for available duration and region.",
      ar: "خيارات Essential أو Extra أو Deluxe. اسأل عن المدة والمنطقة المتوفرة.",
    },
    category: "subscriptions",
    platform: { en: "SUBSCRIPTION", ar: "اشتراك" },
    availability: "ask",
    featured: true,
    accent: "#f6c344",
    accentSoft: "#463607",
    mark: "+",
  },
  {
    handle: "steam-wallet",
    name: { en: "Steam Wallet", ar: "رصيد Steam" },
    shortName: "STEAM",
    image: "/images/catalog/steam-wallet.png",
    imageFit: "contain",
    description: {
      en: "Add funds for PC games and in-game content. Currency and value are confirmed first.",
      ar: "أضف رصيداً لألعاب الكمبيوتر والمحتوى داخل الألعاب. نؤكد العملة والقيمة أولاً.",
    },
    category: "codes",
    platform: { en: "PC · DIGITAL CODE", ar: "PC · كود رقمي" },
    availability: "ask",
    featured: false,
    accent: "#8cc8ff",
    accentSoft: "#112d4a",
    mark: "S",
  },
  {
    handle: "xbox-game-pass",
    name: { en: "Xbox Game Pass", ar: "Xbox Game Pass" },
    shortName: "GAME PASS",
    image: "/images/catalog/xbox-game-pass.jpg",
    imageFit: "contain",
    description: {
      en: "Ask about currently available Game Pass plans, durations, and activation regions.",
      ar: "اسأل عن خطط Game Pass والمدد ومناطق التفعيل المتوفرة حالياً.",
    },
    category: "subscriptions",
    platform: { en: "PC · XBOX", ar: "PC · XBOX" },
    availability: "ask",
    featured: false,
    accent: "#55d66b",
    accentSoft: "#123d1b",
    mark: "X",
  },
  {
    handle: "shahid-vip",
    name: { en: "Shahid VIP", ar: "شاهد VIP" },
    shortName: "SHAHID",
    image: "/images/catalog/shahid-vip.webp",
    imageFit: "contain",
    description: {
      en: "Entertainment subscription options. Ask for the available plan and duration.",
      ar: "خيارات اشتراك ترفيهي. اسأل عن الخطة والمدة المتوفرة.",
    },
    category: "subscriptions",
    platform: { en: "ENTERTAINMENT", ar: "ترفيه" },
    availability: "ask",
    featured: false,
    accent: "#8f7cff",
    accentSoft: "#29205a",
    mark: "V",
  },
]

export const supportedLocales: Locale[] = ["en", "ar"]

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}

export function getWhatsappUrl(productName?: string, locale: Locale = "en") {
  const message = productName
    ? locale === "ar"
      ? `مرحباً Immortal Games Store، أريد الاستفسار عن ${productName}. ما السعر والتوفر والمنصة أو المنطقة المتاحة؟`
      : `Hi Immortal Games Store, I would like to ask about ${productName}. What is the current price, availability, platform, and region?`
    : locale === "ar"
      ? "مرحباً Immortal Games Store، أريد الاستفسار عن منتج."
      : "Hi Immortal Games Store, I would like to ask about a product."

  return `https://wa.me/201552346010?text=${encodeURIComponent(message)}`
}
