import type { Locale, LocalizedCopy } from "./catalog"
import { accountTermsSections, accountWarrantySections } from "./account-policies"

type PageSection = {
  id: string
  title: LocalizedCopy
  paragraphs: LocalizedCopy[]
}

export type StorePage = {
  slug: string
  title: LocalizedCopy
  description: LocalizedCopy
  sections: PageSection[]
}

export const storePageCopy = {
  en: {
    eyebrow: "Immortal Games Store",
    importantLinks: "Store information",
    onThisPage: "On this page",
    updated: "Last updated",
    helpTitle: "Need a hand?",
    helpCopy: "Ask us about a product, your order, or any of these policies.",
    whatsapp: "Message on WhatsApp",
    contact: "Contact us",
    readMore: "More about Immortal",
    alternate: "Read in Arabic",
  },
  ar: {
    eyebrow: "إيمورتال جيمز ستور",
    importantLinks: "معلومات المتجر",
    onThisPage: "في هذه الصفحة",
    updated: "آخر تحديث",
    helpTitle: "تحتاج مساعدة؟",
    helpCopy: "اسألنا عن منتج أو طلبك أو أي من سياسات المتجر.",
    whatsapp: "راسلنا على واتساب",
    contact: "اتصل بنا",
    readMore: "المزيد عن إيمورتال",
    alternate: "Read in English",
  },
} satisfies Record<Locale, Record<string, string>>

export const storePages: StorePage[] = [
  {
    slug: "about",
    title: { en: "About us", ar: "من نحن" },
    description: {
      en: "Games, codes, and subscriptions with personal service from Immortal Games Store in Egypt.",
      ar: "ألعاب وأكواد واشتراكات بخدمة شخصية من إيمورتال جيمز ستور في مصر.",
    },
    sections: [
      {
        id: "our-store",
        title: { en: "Made for our gaming community", ar: "متجر لمجتمع اللاعبين" },
        paragraphs: [
          {
            en: "Immortal Games Store began on Facebook. Our website brings that same personal service into a catalog where you can discover your next game and speak directly with us before buying.",
            ar: "بدأ إيمورتال جيمز ستور على فيسبوك. يجمع موقعنا نفس الخدمة الشخصية في كتالوج يساعدك على اكتشاف لعبتك القادمة والتواصل معنا مباشرة قبل الشراء.",
          },
        ],
      },
      {
        id: "our-products",
        title: { en: "Games and more", ar: "ألعاب وأكثر" },
        paragraphs: [
          {
            en: "Browse PS4 and PS5 games, PC games, digital wallet codes, PlayStation Plus, gaming memberships, and entertainment subscriptions. Availability depends on the platform, edition, plan, and activation region you need.",
            ar: "تصفح ألعاب PS4 وPS5 وألعاب الكمبيوتر وأكواد شحن الرصيد وPlayStation Plus واشتراكات الألعاب والترفيه. يعتمد التوفر على المنصة والنسخة والخطة ومنطقة التفعيل المطلوبة.",
          },
        ],
      },
      {
        id: "personal-service",
        title: { en: "A real person with every order", ar: "تواصل شخصي مع كل طلب" },
        paragraphs: [
          {
            en: "Ordering takes place on WhatsApp. We confirm the product, current price, delivery instructions, and warranty with you before payment. You can also contact us for help after delivery.",
            ar: "يتم الطلب عبر واتساب. نؤكد معك المنتج والسعر الحالي وتعليمات التسليم والضمان قبل الدفع، ويمكنك التواصل معنا للمساعدة بعد الاستلام أيضاً.",
          },
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: { en: "Terms and Conditions", ar: "الشروط والأحكام" },
    description: {
      en: "Immortal's account types, purchase rules, resale arrangements, warranty, and usage conditions.",
      ar: "أنواع الحسابات وقواعد الشراء وإعادة البيع والضمان وشروط الاستخدام في إيمورتال.",
    },
    sections: accountTermsSections,
  },
  {
    slug: "digital-delivery",
    title: { en: "Digital Delivery Policy", ar: "سياسة التسليم الرقمي" },
    description: {
      en: "Digital delivery usually within minutes after confirmed payment, with updates from our WhatsApp team.",
      ar: "تسليم رقمي عادةً خلال دقائق بعد تأكيد الدفع، مع متابعة فريقنا عبر واتساب.",
    },
    sections: [
      {
        id: "delivery-channel",
        title: { en: "Where your product arrives", ar: "كيف تستلم المنتج" },
        paragraphs: [
          {
            en: "We deliver codes, activation instructions, or subscription confirmation through your official WhatsApp order conversation. Shared accounts use a QR code or a six-digit sign-in code without sharing the email or password. Full accounts are supplied with their email, password, and date of birth; change their details within 24 hours. Digital orders do not require physical shipping.",
            ar: "نرسل الأكواد أو تعليمات التفعيل أو تأكيد الاشتراك عبر محادثة واتساب الرسمية للطلب. تسلم الحسابات المشتركة عبر QR Code أو كود دخول من ستة أرقام دون تسليم البريد أو كلمة المرور. تسلم الحسابات الكاملة بالبريد وكلمة المرور وتاريخ الميلاد، ويجب تغيير البيانات خلال 24 ساعة. لا تتطلب الطلبات الرقمية شحناً فعلياً.",
          },
        ],
      },
      {
        id: "delivery-time",
        title: { en: "Usually within minutes", ar: "عادةً خلال دقائق" },
        paragraphs: [
          {
            en: "Most available digital orders are delivered within minutes after we confirm successful payment. Order verification, busy periods, product preparation, or a provider outage can take longer. We tell you about a different delivery estimate before payment where known and keep you updated if a delay occurs. Pre-orders follow the release and delivery arrangements agreed for that product.",
            ar: "يتم تسليم معظم الطلبات الرقمية المتوفرة خلال دقائق بعد تأكيد نجاح الدفع. قد يستغرق الأمر وقتاً أطول بسبب مراجعة الطلب أو ضغط الطلبات أو تجهيز المنتج أو عطل لدى المزود. نوضح لك أي وقت تسليم مختلف معروف قبل الدفع ونتابع معك عند حدوث تأخير. تخضع الطلبات المسبقة لترتيبات الإصدار والتسليم المتفق عليها للمنتج.",
          },
        ],
      },
      {
        id: "before-delivery",
        title: { en: "Check your details", ar: "راجع بياناتك" },
        paragraphs: [
          {
            en: "Confirm your WhatsApp number, platform, edition, and activation region before payment. Tell us immediately if a detail is wrong. Keep delivered codes private and use the instructions supplied with your order.",
            ar: "أكد رقم واتساب والمنصة والنسخة ومنطقة التفعيل قبل الدفع. أخبرنا فوراً إذا كانت أي بيانات غير صحيحة. احتفظ بالأكواد المستلمة بشكل خاص واتبع تعليمات الطلب.",
          },
        ],
      },
      {
        id: "missing-delivery",
        title: { en: "If delivery is missing", ar: "إذا لم يصل المنتج" },
        paragraphs: [
          {
            en: "Reply in the same WhatsApp conversation with the product name and payment confirmation. We will check the order and delivery status. If an order cannot be supplied, we will arrange a refund; you do not need a website account to request support.",
            ar: "رد في نفس محادثة واتساب باسم المنتج وتأكيد الدفع. سنراجع حالة الطلب والتسليم. إذا تعذر توفير الطلب فسنعمل على رد المبلغ، ولا تحتاج إلى حساب على الموقع لطلب الدعم.",
          },
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: { en: "Contact us", ar: "اتصل بنا" },
    description: {
      en: "Reach Immortal Games Store on WhatsApp, by phone, or through our official Facebook page.",
      ar: "تواصل مع إيمورتال جيمز ستور عبر واتساب أو الهاتف أو صفحة فيسبوك الرسمية.",
    },
    sections: [
      {
        id: "customer-support",
        title: { en: "Before and after you buy", ar: "خدمة قبل الشراء وبعده" },
        paragraphs: [
          {
            en: "Need help choosing a game, checking a region, following up on delivery, or resolving an activation problem? Contact us using the official channels below. WhatsApp is where we confirm and follow up on orders.",
            ar: "تحتاج مساعدة في اختيار لعبة أو التأكد من المنطقة أو متابعة التسليم أو حل مشكلة تفعيل؟ تواصل معنا عبر القنوات الرسمية أدناه. نستخدم واتساب لتأكيد الطلبات ومتابعتها.",
          },
        ],
      },
      {
        id: "help-us-help-you",
        title: { en: "What to include in your message", ar: "ماذا ترسل في رسالتك" },
        paragraphs: [
          {
            en: "For a new order, send the product, platform, edition or plan, and region. For an existing order, include your purchase confirmation and describe the problem. A screenshot of an error helps, but cover passwords, verification codes, and full payment-card details.",
            ar: "لطلب جديد أرسل المنتج والمنصة والنسخة أو الخطة والمنطقة. ولطلب قائم أرسل تأكيد الشراء ووصف المشكلة. تساعد صورة رسالة الخطأ، لكن أخفِ كلمات المرور وأكواد التحقق وبيانات بطاقة الدفع الكاملة.",
          },
        ],
      },
      {
        id: "reply-times",
        title: { en: "Response times", ar: "وقت الرد" },
        paragraphs: [
          {
            en: "You can send a message at any time. We reply as soon as possible; response times depend on the current volume of messages and orders. We serve our community in Egypt and provide digital delivery through the channels agreed for each order.",
            ar: "يمكنك إرسال رسالة في أي وقت. نرد في أقرب وقت ممكن، وقد يختلف وقت الرد حسب عدد الرسائل والطلبات. نخدم مجتمعنا في مصر ونقدم التسليم الرقمي عبر القنوات المتفق عليها لكل طلب.",
          },
        ],
      },
    ],
  },
  {
    slug: "warranty",
    title: { en: "Warranty Policy", ar: "سياسة الضمان" },
    description: {
      en: "Five-year shared game-account warranty, Plus-term coverage, third-party support, and refund exceptions.",
      ar: "ضمان حسابات الألعاب المشتركة لخمس سنوات وضمان مدة بلس ودعم الطرف الثالث وحالات رد المبلغ.",
    },
    sections: accountWarrantySections,
  },
  {
    slug: "privacy",
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    description: {
      en: "How the catalog and our support channels handle your information and language preferences.",
      ar: "كيف يتعامل الكتالوج وقنوات الدعم مع معلوماتك وتفضيلات اللغة.",
    },
    sections: [
      {
        id: "information",
        title: { en: "Information used to help you", ar: "معلومات لخدمتك" },
        paragraphs: [
          {
            en: "You can browse our catalog without creating a customer account. If you contact us, the information you send may include your name, phone number, product selection, payment confirmation, and support messages. Server logs may record technical request data such as an IP address, requested page, and time to operate and troubleshoot the website.",
            ar: "يمكنك تصفح الكتالوج دون إنشاء حساب عميل. عند التواصل معنا قد تشمل المعلومات التي ترسلها اسمك ورقم هاتفك والمنتج المطلوب وتأكيد الدفع ورسائل الدعم. قد تسجل سجلات الخادم بيانات تقنية مثل عنوان IP والصفحة المطلوبة والوقت لتشغيل الموقع وحل المشكلات.",
          },
        ],
      },
      {
        id: "use-and-sharing",
        title: { en: "Use and sharing", ar: "الاستخدام والمشاركة" },
        paragraphs: [
          {
            en: "We use order and message details to reply to you, verify payment, deliver your product, and handle support or warranty requests. We do not sell your personal information. Information is shared only when necessary to fulfill the order, operate the service, or meet a legal requirement. Share only the information needed for your request.",
            ar: "نستخدم تفاصيل الطلب والرسائل للرد عليك والتحقق من الدفع وتسليم المنتج ومعالجة طلبات الدعم أو الضمان. لا نبيع معلوماتك الشخصية. تتم مشاركة المعلومات فقط عند الحاجة لتنفيذ الطلب أو تشغيل الخدمة أو الالتزام بطلب قانوني. شارك فقط المعلومات اللازمة لاستفسارك.",
          },
        ],
      },
      {
        id: "cookies-and-links",
        title: { en: "Language cookie and external links", ar: "ملف اللغة والروابط الخارجية" },
        paragraphs: [
          {
            en: "The catalog sets an immortal_locale cookie containing en or ar for the language preference, with a one-year expiry. You can remove it in your browser settings. The catalog does not provide an online payment form. WhatsApp and Facebook links take you to external services, which handle your messages and data under their own privacy policies.",
            ar: "يضع الكتالوج ملف تعريف ارتباط باسم immortal_locale يحتوي على en أو ar لتفضيل اللغة، وتنتهي صلاحيته بعد سنة. يمكنك حذفه من إعدادات المتصفح. لا يوفر الكتالوج نموذج دفع أونلاين. تنقلك روابط واتساب وفيسبوك إلى خدمات خارجية تتعامل مع رسائلك وبياناتك وفق سياسات الخصوصية الخاصة بها.",
          },
        ],
      },
      {
        id: "retention-and-requests",
        title: { en: "Retention and your requests", ar: "الاحتفاظ بالبيانات وطلباتك" },
        paragraphs: [
          {
            en: "Order and support records are kept for the period needed to fulfill the order, support warranty claims, and meet applicable record-keeping duties. Contact us to request access to, correction of, or deletion of information you have provided. We will explain any records that must be retained and any information controlled by an external service.",
            ar: "نحتفظ بسجلات الطلبات والدعم للمدة اللازمة لتنفيذ الطلب ودعم مطالبات الضمان والوفاء بمتطلبات حفظ السجلات المطبقة. تواصل معنا لطلب الاطلاع على المعلومات التي قدمتها أو تصحيحها أو حذفها. سنوضح أي سجلات يلزم الاحتفاظ بها وأي معلومات تتحكم فيها خدمة خارجية.",
          },
        ],
      },
    ],
  },
]

export function getStorePage(slug: string) {
  return storePages.find((page) => page.slug === slug)
}
