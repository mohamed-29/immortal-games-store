// Render the existing storefront into a portable Sites catalog without Medusa.
// All product content, page content, components, and images come from the app.
const fs = require("node:fs")
const path = require("node:path")
const Module = require("node:module")

const root = path.resolve(__dirname, "..")
const app = path.join(root, "apps", "storefront")
const dependencyApp = process.env.SITES_DEPENDENCY_APP ?? app
const appRequire = Module.createRequire(path.join(dependencyApp, "package.json"))
const React = appRequire("react")
const { renderToStaticMarkup } = appRequire("react-dom/server")
const ts = appRequire("typescript")
const postcss = appRequire("postcss")
const tailwind = appRequire("tailwindcss")
const autoprefixer = appRequire("autoprefixer")
const output = path.join(root, "dist")
const origin = process.env.SITES_ORIGIN

if (!origin || new URL(origin).protocol !== "https:") {
  throw new Error("Set SITES_ORIGIN to the Site's expected HTTPS origin")
}

function compile(module, filename) {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  })
  module._compile(result.outputText, filename)
}

require.extensions[".ts"] = compile
require.extensions[".tsx"] = compile

const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, parent, ...args) {
  if (request.startsWith("@/")) {
    request = path.join(app, "src", request.slice(2))
  }
  return originalResolve.call(this, request, parent, ...args)
}

const originalLoad = Module._load
Module._load = function (request, parent, ...args) {
  if (["react", "react/jsx-runtime", "react/jsx-dev-runtime"].includes(request)) {
    return originalLoad.call(this, appRequire.resolve(request), parent, ...args)
  }
  if (request === "next/link") {
    return ({ children, hrefLang, href, ...props }) =>
      React.createElement("a", { ...props, href, hrefLang }, children)
  }
  if (request === "next/image") {
    return ({ fill, priority, sizes, ...props }) => React.createElement("img", {
      ...props,
      sizes,
      loading: priority ? "eager" : "lazy",
      ...(priority ? { fetchPriority: "high" } : {}),
      style: {
        ...(fill ? { position: "absolute", inset: 0, height: "100%", width: "100%" } : {}),
        ...props.style,
      },
    })
  }
  if (request === "next/navigation") {
    return { notFound: () => { throw new Error("Unknown exported route") } }
  }
  if (request === "@/lib/data/immortal-catalog") {
    return { getImmortalCatalog: async () => require(path.join(app, "src/content/catalog.ts")).catalogProducts }
  }
  return originalLoad.call(this, request, parent, ...args)
}

const { catalogProducts, supportedLocales, storeCopy } = require(path.join(app, "src/content/catalog.ts"))
const { storePages } = require(path.join(app, "src/content/store-pages.ts"))
const Nav = require(path.join(app, "src/modules/immortal/components/nav.tsx")).default
const Footer = require(path.join(app, "src/modules/immortal/components/footer.tsx")).default
const routes = path.join(app, "src/app/[countryCode]/(main)")
const Home = require(path.join(routes, "page.tsx")).default
const Catalog = require(path.join(routes, "catalog/page.tsx")).default
const Product = require(path.join(routes, "products/[handle]/page.tsx")).default
const Information = require(path.join(routes, "[page]/page.tsx")).default

const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character])

async function writePage(route, locale, title, description, content, image = "/brand/immortal-logo-wide.png") {
  const alternate = route.replace(`/${locale}`, locale === "en" ? "/ar" : "/en")
  const body = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Nav, { locale }), content, React.createElement(Footer, { locale })
  ))
  const html = `<!doctype html><html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}" data-mode="dark"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)} | Immortal Games Store</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${escape(new URL(route, origin).href)}">
<link rel="alternate" hreflang="${locale === "en" ? "ar" : "en"}" href="${escape(new URL(alternate, origin).href)}">
<meta property="og:title" content="${escape(title)} | Immortal Games Store"><meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${escape(new URL(image, origin).href)}"><meta property="og:url" content="${escape(new URL(route, origin).href)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)} | Immortal Games Store">
<meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${escape(new URL(image, origin).href)}">
<link rel="icon" href="/brand/immortal-logo-primary.png"><link rel="stylesheet" href="/assets/store.css"><script src="/assets/site.js" defer></script>
</head><body><main>${body}</main></body></html>`
  const directory = path.join(output, route)
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, "index.html"), html)
}

async function build() {
  if (fs.existsSync(output)) {
    if (fs.lstatSync(output).isSymbolicLink() || path.dirname(output) !== root) {
      throw new Error("The generated dist directory must stay inside the Site checkout")
    }
    fs.rmSync(output, { recursive: true, force: true })
  }
  fs.mkdirSync(path.join(output, "assets"), { recursive: true })
  fs.cpSync(path.join(app, "public"), output, { recursive: true })
  const inputCss = (fs.readFileSync(path.join(app, "src/styles/globals.css"), "utf8")
    + "\n" + fs.readFileSync(path.join(app, "src/styles/brand-refresh.css"), "utf8"))
    .replace('@import "tailwindcss/base";', "@tailwind base;")
    .replace('@import "tailwindcss/components";', "@tailwind components;")
    .replace('@import "tailwindcss/utilities";', "@tailwind utilities;")
  const css = await postcss([tailwind({ content: [path.join(app, "src/**/*.{ts,tsx}")] }), autoprefixer()])
    .process(inputCss, { from: path.join(app, "src/styles/globals.css") })
  let fontCss = ""
  const fontBuild = path.join(dependencyApp, ".next/static")
  if (fs.existsSync(path.join(fontBuild, "css"))) {
    const faces = fs.readdirSync(path.join(fontBuild, "css"))
      .filter((name) => name.endsWith(".css"))
      .flatMap((name) => fs.readFileSync(path.join(fontBuild, "css", name), "utf8").match(/@font-face\{[^}]+\}/g) ?? [])
    const directory = path.join(output, "assets/fonts")
    fs.mkdirSync(directory, { recursive: true })
    fontCss = faces.map((face) => face.replace(/\/_next\/static\/media\/([^\)]+\.woff2)/g, (_, name) => {
      fs.copyFileSync(path.join(fontBuild, "media", name), path.join(directory, name))
      return `/assets/fonts/${name}`
    })).join("\n")
  }
  fs.writeFileSync(path.join(output, "assets/store.css"), `${fontCss}\n${css.css}\n:root{--font-body:Inter,Arial,sans-serif;--font-display:Rajdhani,Arial,sans-serif;--font-arabic:'Noto Kufi Arabic',Arial,sans-serif}\n[hidden]{display:none!important}`)
  fs.copyFileSync(path.join(root, "scripts/sites-browser.js"), path.join(output, "assets/site.js"))
  fs.writeFileSync(path.join(output, "assets/catalog.json"), JSON.stringify(catalogProducts))
  let count = 0
  const allRoutes = []
  for (const locale of supportedLocales) {
    const params = Promise.resolve({ countryCode: locale })
    await writePage(`/${locale}`, locale, storeCopy[locale].heroEyebrow,
      storeCopy[locale].heroDescription, await Home({ params }))
    allRoutes.push(`/${locale}`)
    await writePage(`/${locale}/catalog`, locale, storeCopy[locale].catalogTitle,
      storeCopy[locale].catalogDescription, await Catalog({ params, searchParams: Promise.resolve({}) }))
    allRoutes.push(`/${locale}/catalog`)
    for (const product of catalogProducts) {
      const route = `/${locale}/products/${product.handle}`
      await writePage(route, locale, product.name[locale], product.description[locale],
        await Product({ params: Promise.resolve({ countryCode: locale, handle: product.handle }) }), product.image)
      allRoutes.push(route)
    }
    for (const page of storePages) {
      const route = `/${locale}/${page.slug}`
      await writePage(route, locale, page.title[locale], page.description[locale],
        await Information({ params: Promise.resolve({ countryCode: locale, page: page.slug }) }))
      allRoutes.push(route)
    }
    count += 2 + catalogProducts.length + storePages.length
  }
  fs.writeFileSync(path.join(output, "index.html"), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/en/"><title>Immortal Games Store</title></head><body><a href="/en/">Immortal Games Store</a></body></html>')
  fs.writeFileSync(path.join(output, "404.html"), '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found | Immortal Games Store</title></head><body><h1>Page not found</h1><a href="/en/">Back to Immortal Games Store</a></body></html>')
  fs.writeFileSync(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes.map((route) => `<url><loc>${escape(new URL(route, origin).href)}</loc></url>`).join("")}</urlset>`)
  fs.writeFileSync(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", origin).href}\n`)
  console.log(`Exported ${count} bilingual storefront pages with local assets`)
}

build().catch((error) => { console.error(error.message); process.exitCode = 1 })
