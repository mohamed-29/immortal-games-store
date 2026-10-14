import type { LocalizedCopy } from "./catalog"

type PolicySection = {
  id: string
  title: LocalizedCopy
  paragraphs: LocalizedCopy[]
}

export const policySource = "https://www.facebook.com/Immortal.G.Store/posts/pfbid02HLV924rePat3EbHEa1MP7FU43tWwTAe9jdmu7g9THobkrdTNXbdwHAMSeHwYXSe7l"

export const accountTermsSections: PolicySection[] = [
  {
    id: "ordering",
    title: { en: "Orders and confirmation", ar: "الطلب والتأكيد" },
    paragraphs: [{
      en: "Orders are confirmed through Immortal Games Store's official WhatsApp number. Confirm the product, account type if applicable, PS4 or PS5 compatibility, region, price, and delivery time before payment. Prices depend on the current offer; the price agreed for your order applies to that purchase.",
      ar: "يتم تأكيد الطلبات عبر رقم واتساب الرسمي لإيمورتال جيمز ستور. أكد المنتج ونوع الحساب إن وجد وتوافق PS4 أو PS5 والمنطقة والسعر ووقت التسليم قبل الدفع. تعتمد الأسعار على العرض الحالي ويسري السعر المتفق عليه لطلبك على عملية الشراء.",
    }],
  },
  {
    id: "shared-accounts",
    title: { en: "Shared accounts", ar: "تعريف الحساب المشترك" },
    paragraphs: [{
      en: "A shared account is used by two or three people, depending on its type. Your purchase covers the assigned Primary or Secondary access, not exclusive ownership of the entire account. Shared-account customers are not entitled to the email address or password.",
      ar: "الحساب المشترك يستخدمه شخصان أو ثلاثة بحسب نوعه. يشمل شراؤك حق الاستخدام المخصص لك كأساسي أو ثانوي، وليس ملكية الحساب بالكامل. لا يحق لمشتري الحساب المشترك الحصول على البريد الإلكتروني أو كلمة المرور.",
    }],
  },
  {
    id: "account-types",
    title: { en: "Primary, Secondary, and Full accounts", ar: "الحساب الأساسي والثانوي والكامل" },
    paragraphs: [
      {
        en: "Primary: you play from your personal account on the designated console. This access does not require a permanent connection for the account license; an individual game may still require an internet connection. A Primary purchase cannot be exchanged between PS4 and PS5.",
        ar: "الأساسي (Primary): تلعب من حسابك الشخصي على الجهاز المحدد، ولا يتطلب ترخيص الحساب اتصالاً دائماً بالإنترنت؛ وقد تتطلب اللعبة نفسها اتصالاً بالإنترنت. لا يمكن استبدال شراء حساب أساسي بين PS4 وPS5.",
      },
      {
        en: "Secondary: you play from the supplied account and need a stable, continuous internet connection. The store permits transferring this access from PS4 to PS5 only. Arrange a transfer with us before making changes.",
        ar: "الثانوي (Secondary): تلعب من الحساب المخصص وتحتاج اتصالاً دائماً ومستقراً بالإنترنت. يسمح المتجر بنقل هذا الاستخدام من PS4 إلى PS5 فقط. تواصل معنا لترتيب النقل قبل إجراء التغييرات.",
      },
      {
        en: "Full Account: the store supplies the email, password, and date of birth for your exclusive use. Change the details within 24 hours; problems caused by failing to do so are your responsibility. Full accounts have no store warranty after receipt. Any transfer or resale is also subject to the platform's own rules; the store's description does not override them.",
        ar: "الحساب الكامل (Full Account): يسلم المتجر البريد الإلكتروني وكلمة المرور وتاريخ الميلاد للاستخدام الخاص بك. يجب تغيير البيانات خلال 24 ساعة، وأي مشكلة تنتج عن عدم تغييرها تقع تحت مسؤوليتك. لا يوجد ضمان من المتجر بعد استلام الحساب الكامل. ويخضع أي نقل أو إعادة بيع أيضاً لقواعد المنصة نفسها؛ ولا يحل وصف المتجر محلها.",
      },
    ],
  },
  {
    id: "receiving-access",
    title: { en: "Receiving your purchase", ar: "طريقة استلام الحساب" },
    paragraphs: [{
      en: "Shared-account access is supplied through a QR code or a six-digit sign-in code. Full accounts are delivered with their details and become your responsibility after receipt. If a shared account is deleted from your console or signs out, contact the store to arrange access again. Notify us before selling or formatting your console so we can try to help.",
      ar: "يتم تسليم الدخول للحساب المشترك عبر QR Code أو كود تسجيل دخول من ستة أرقام. يسلم الحساب الكامل ببياناته ويصبح تحت مسؤوليتك بعد الاستلام. إذا تم حذف الحساب المشترك من جهازك أو تسجيل الخروج منه، تواصل مع المتجر لإعادة الدخول. أبلغنا قبل بيع الجهاز أو عمل فورمات لنحاول مساعدتك.",
    }],
  },
  {
    id: "resale",
    title: { en: "Resale through the store", ar: "البيع والاستبدال وإعادة البيع" },
    paragraphs: [
      {
        en: "For customer-to-customer resale, the store acts as an intermediary without an intermediary fee. Sales are arranged through a dedicated WhatsApp group. The seller must provide a video showing account removal from the console; Primary access must also be deactivated.",
        ar: "في إعادة البيع بين العملاء، يعمل المتجر كوسيط دون رسوم وساطة. يتم البيع عبر جروب واتساب مخصص. يقدم البائع فيديو يثبت حذف الحساب من الجهاز، ويجب أيضاً إلغاء التفعيل إذا كان الحساب أساسياً.",
      },
      {
        en: "You can ask to offer your purchase to another customer based on its original purchase price and current market price. The store does not buy accounts back from customers. A seller who is not serious may be refused future transactions, and a buyer may be blocked depending on their conduct.",
        ar: "يمكنك طلب عرض مشتراك للبيع لعميل آخر وفق سعر الشراء الأصلي والسعر الحالي. لا يشتري المتجر الحسابات من العملاء. قد يمنع البائع غير الجاد من التعامل مستقبلاً، وقد يحظر المشتري بحسب سلوكه.",
      },
    ],
  },
  {
    id: "warranty-and-refunds",
    title: { en: "Warranty and refunds", ar: "الضمان والاسترجاع" },
    paragraphs: [
      {
        en: "Warranty depends on the account type. Shared game accounts supplied by the store have five years of account coverage. Shared PlayStation Plus accounts are covered for the purchased subscription term. Third-party accounts have one year of sign-in/sign-out support, without ban or Sony-policy coverage. Full accounts have no warranty after delivery. See the Warranty Policy for the complete conditions.",
        ar: "يختلف الضمان بحسب نوع الحساب. حسابات الألعاب المشتركة التابعة للمتجر يشملها ضمان الحساب لخمس سنوات. حسابات PlayStation Plus المشتركة يشملها الضمان طوال مدة الاشتراك المشتراة. حسابات الطرف الثالث لها ضمان دخول وخروج لمدة سنة دون ضمان ضد البان أو مشكلات سياسات سوني. الحساب الكامل لا يشمله ضمان بعد التسليم. راجع سياسة الضمان للشروط كاملة.",
      },
      {
        en: "Account purchases are normally non-refundable because the game price has already been paid to the publisher. Problems are handled through restored access or a replacement account. A replacement does not ordinarily entitle you to a refund; special cases are decided by the store. If you need access again and the store has no available Primary or Secondary account for that game, it refunds the amount you originally paid. These rules remain subject to applicable consumer rights.",
        ar: "الأصل أن شراء الحساب غير قابل لاسترداد المبلغ لأن ثمن اللعبة قد دفع للشركة الأم. تعالج المشكلات بإعادة الدخول أو التعويض بحساب بديل. لا يتيح التعويض بحساب آخر عادةً طلب استرجاع المبلغ، ويحدد المتجر الحالات الخاصة. إذا احتجت إلى إعادة الدخول ولم يتوفر لدى المتجر حساب أساسي أو ثانوي للعبة، يعيد المتجر المبلغ الذي دفعته عند الشراء. وتظل هذه القواعد خاضعة لحقوق المستهلك المطبقة.",
      },
    ],
  },
  {
    id: "shared-account-conduct",
    title: { en: "Respect the access assigned to you", ar: "الخصوصية والسلوك داخل الحساب" },
    paragraphs: [
      {
        en: "Use only the account access assigned to you. A Primary buyer must not enter the Secondary account except when instructed to download the game. A Secondary buyer must not activate the account as Primary. These actions can prevent another customer from playing. A first occurrence receives a warning; a repeated occurrence leads to account withdrawal.",
        ar: "استخدم فقط الصلاحية المخصصة لك. لا يحق لمشتري الأساسي الدخول إلى حساب الثانوي إلا لتحميل اللعبة عند توجيه المتجر بذلك، ولا يحق لمشتري الثانوي تفعيل الحساب كأساسي. قد تمنع هذه التصرفات عميلاً آخر من اللعب. يوجه تحذير للمرة الأولى، وعند تكرار المخالفة يسحب الحساب.",
      },
      {
        en: "Do not inspect or change shared-account details, activate access contrary to the instructions, enter another customer's account, or send abusive content. Other breaches can lead to immediate withdrawal without compensation; abuse inside an account results in an immediate block. The store may refuse future purchases or contact after a breach.",
        ar: "يمنع الاطلاع على بيانات الحساب المشترك أو تغييرها، أو التفعيل خلاف التعليمات، أو الدخول إلى حساب غير مخصص لك، أو إرسال محتوى مسيء. قد تؤدي المخالفات الأخرى إلى السحب الفوري دون تعويض، وتؤدي الإساءة داخل الحساب إلى الحظر الفوري. يحتفظ المتجر بحق منع الشراء أو التواصل مستقبلاً عند المخالفة.",
      },
    ],
  },
  {
    id: "game-and-platform-issues",
    title: { en: "Game, server, and progress limitations", ar: "مشكلات اللعبة والسيرفرات والتقدم" },
    paragraphs: [
      {
        en: "Our support concerns the account access we supplied. Bugs in a game, game-server outages, and Sony service problems are handled by the publisher or platform support. The store cannot fix those services. If a Secondary game or Plus account must be replaced, progress on that account may be lost; the store offers a discount on the next order in that case.",
        ar: "يتعلق دعمنا بالدخول إلى الحساب الذي وفرناه. مشكلات اللعبة نفسها أو سيرفراتها أو خدمات سوني تعالج لدى دعم الناشر أو المنصة، ولا يستطيع المتجر إصلاح هذه الخدمات. إذا احتاج حساب ثانوي للعبة أو بلس إلى الاستبدال فقد يفقد التقدم الموجود على ذلك الحساب، ويقدم المتجر خصماً على الطلب التالي في هذه الحالة.",
      },
    ],
  },
  {
    id: "updates",
    title: { en: "Acceptance and policy updates", ar: "الموافقة وتحديث الشروط" },
    paragraphs: [{
      en: "Completing a purchase confirms acceptance of the store's current terms and the conditions agreed for that product. Review this page and our official Facebook terms before ordering; updates are published there and here. Updates and their application remain subject to applicable law.",
      ar: "إتمام عملية الشراء يعني الموافقة على شروط المتجر الحالية والشروط المتفق عليها للمنتج. راجع هذه الصفحة ومنشور الشروط الرسمي على فيسبوك قبل الطلب، حيث تنشر التحديثات هناك وهنا. وتخضع التحديثات وتطبيقها للقانون المطبق.",
    }],
  },
]

export const accountWarrantySections: PolicySection[] = [
  {
    id: "shared-game-accounts",
    title: { en: "Store-supplied shared game accounts: five years", ar: "حسابات الألعاب المشتركة التابعة للمتجر: خمس سنوات" },
    paragraphs: [{
      en: "Primary and Secondary shared game accounts supplied by Immortal include sign-in/sign-out support and ban coverage with compensation for five years, provided you follow the usage rules. Contact us if access is lost or the account is removed from your console.",
      ar: "يشمل ضمان حسابات الألعاب المشتركة الأساسية والثانوية التابعة لإيمورتال دعم الدخول والخروج والتعويض في حالة البان لمدة خمس سنوات، مع الالتزام بقواعد الاستخدام. تواصل معنا عند فقدان الدخول أو حذف الحساب من جهازك.",
    }],
  },
  {
    id: "plus-subscriptions",
    title: { en: "PlayStation Plus: the subscription term", ar: "PlayStation Plus: طوال مدة الاشتراك" },
    paragraphs: [{
      en: "Shared Plus-account warranty lasts for the purchased term: one, three, or twelve months. Sign-out or a ban is handled through support and compensation according to the case. This coverage does not extend or automatically renew the subscription.",
      ar: "يسري ضمان حساب بلس المشترك طوال مدة الاشتراك المشتراة: شهر أو ثلاثة أشهر أو سنة. تتم معالجة الخروج أو البان بالدعم والتعويض حسب الحالة. لا يمدد هذا الضمان مدة الاشتراك ولا يجدده تلقائياً.",
    }],
  },
  {
    id: "full-and-third-party",
    title: { en: "Full accounts and third-party accounts", ar: "الحساب الكامل وحسابات الطرف الثالث" },
    paragraphs: [
      {
        en: "Full accounts have no store warranty after receipt because they become your responsibility. Change their details within 24 hours. Problems caused by failing to change them are your responsibility.",
        ar: "لا يوجد ضمان من المتجر للحساب الكامل بعد الاستلام لأنه يصبح تحت مسؤوليتك. يجب تغيير بياناته خلال 24 ساعة، والمشكلات الناتجة عن عدم تغييرها تقع تحت مسؤوليتك.",
      },
      {
        en: "Accounts owned by a third party have one year of sign-in/sign-out support only. They do not include compensation for bans or Sony-related problems. Confirm whether an account is store-supplied or third-party before buying.",
        ar: "الحسابات المملوكة لطرف ثالث لها ضمان دخول وخروج لمدة سنة فقط، ولا يشملها التعويض عن البان أو مشكلات سوني. أكد قبل الشراء ما إذا كان الحساب تابعاً للمتجر أو لطرف ثالث.",
      },
    ],
  },
  {
    id: "support-and-refunds",
    title: { en: "Resolution time and refund exceptions", ar: "مدة الحل وحالات رد المبلغ" },
    paragraphs: [
      {
        en: "Account issues are normally resolved within 12 hours and may take up to 24 hours. Restored access or a replacement account is the usual remedy. A refund cannot normally be requested when another account is supplied as compensation; the store determines special cases.",
        ar: "تحل مشكلات الحساب عادةً خلال 12 ساعة، وقد تستغرق أحياناً حتى 24 ساعة بحد أقصى. يكون الحل المعتاد إعادة الدخول أو التعويض بحساب بديل. لا يمكن عادةً طلب رد المبلغ عند التعويض بحساب آخر، ويحدد المتجر الحالات الخاصة.",
      },
      {
        en: "If you need to add the game account again after a sign-out or deletion and the store has no available Primary or Secondary account for that game, it refunds your original purchase amount. Keep the purchase confirmation and contact us through the original WhatsApp conversation.",
        ar: "إذا احتجت إلى إضافة حساب اللعبة مجدداً بعد الخروج أو الحذف ولم يتوفر لدى المتجر حساب أساسي أو ثانوي للعبة، يعاد مبلغ الشراء الأصلي. احتفظ بتأكيد الشراء وتواصل معنا عبر محادثة واتساب الأصلية.",
      },
    ],
  },
  {
    id: "warranty-conditions",
    title: { en: "What cancels shared-account coverage", ar: "ما يلغي ضمان الحساب المشترك" },
    paragraphs: [{
      en: "Buying a game, adding funds, or subscribing to a service on a store-supplied Primary or Secondary account cancels its warranty without compensation. This applies to both game and Plus accounts. Breaking the assigned-access rules, changing shared details, or abusive conduct can also lead to withdrawal without compensation. Notify us before a console sale or format.",
      ar: "شراء لعبة أو شحن الرصيد أو الاشتراك في أي خدمة على حساب أساسي أو ثانوي تابع للمتجر يلغي الضمان دون تعويض. يسري ذلك على حسابات الألعاب وبلس. قد تؤدي مخالفة صلاحيات الاستخدام أو تغيير بيانات الحساب المشترك أو الإساءة أيضاً إلى سحب الحساب دون تعويض. أبلغنا قبل بيع الجهاز أو عمل فورمات.",
    }],
  },
  {
    id: "service-boundaries",
    title: { en: "Game services and saved progress", ar: "خدمات اللعبة والتقدم المحفوظ" },
    paragraphs: [{
      en: "Warranty concerns account access, not defects in a game or outages of Sony or game servers. Contact the relevant platform or publisher for those issues. Replacement of a Secondary account can mean loss of its saved progress; in that case, Immortal provides a discount on your next order. Coverage does not remove any consumer rights required by applicable law.",
      ar: "يتعلق الضمان بالدخول إلى الحساب، ولا يشمل عيوب اللعبة نفسها أو أعطال سوني وسيرفرات الألعاب؛ تواصل مع المنصة أو الناشر بشأنها. قد يؤدي استبدال الحساب الثانوي إلى فقدان التقدم المحفوظ عليه، ويقدم إيمورتال حينها خصماً على الطلب التالي. ولا تلغي التغطية أي حقوق للمستهلك يقررها القانون المطبق.",
    }],
  },
]
