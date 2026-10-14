const fs = require("node:fs")
const path = require("node:path")
const assert = require("node:assert/strict")

const root = path.resolve(process.argv[2] ?? "dist")
const files = fs.readdirSync(root, { recursive: true })
const htmlFiles = files.filter((filename) => filename.endsWith("index.html"))
const errors = []

for (const filename of htmlFiles) {
  const html = fs.readFileSync(path.join(root, filename), "utf8")
  assert.ok(!html.includes("immortal-games-logo.jpg"), "Old JPG branding must not be rendered")
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&")
    if (!url.startsWith("/") || url.startsWith("//")) continue
    let target = path.join(root, decodeURIComponent(url.split(/[?#]/)[0]))
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html")
    if (!fs.existsSync(target)) errors.push(`${filename}: missing ${url}`)
  }
}

assert.equal(errors.length, 0, errors.join("\n"))
assert.equal(htmlFiles.length, 35, "Expected root plus 34 bilingual pages")
for (const locale of ["en", "ar"]) {
  for (const slug of ["about", "terms-and-conditions", "digital-delivery", "contact", "warranty", "privacy"]) {
    const html = fs.readFileSync(path.join(root, locale, slug, "index.html"), "utf8")
    assert.ok(html.includes(`lang="${locale}"`), "Page language must match route")
    assert.ok(html.includes(`dir="${locale === "ar" ? "rtl" : "ltr"}"`), "Page direction must match language")
    assert.ok(html.includes(`/${locale === "en" ? "ar" : "en"}/${slug}`), "Language switch must preserve policy")
    assert.ok(html.includes("+20 15 52346010"), "Contact details must belong to Immortal")
    assert.ok(!html.includes("+966"), "Reference store contact details must not be copied")
  }
}
const warranty = fs.readFileSync(path.join(root, "en/warranty/index.html"), "utf8")
assert.ok(warranty.includes("five years"))
assert.ok(warranty.includes("24 hours"))
assert.ok(warranty.includes("original purchase amount"))
assert.ok(!warranty.toLowerCase().includes("lifetime warranty"))
for (const locale of ["en", "ar"]) {
  const home = fs.readFileSync(path.join(root, locale, "index.html"), "utf8")
  assert.ok(home.includes("/brand/immortal-logo-primary.png"), "Supplied wordmark must be visible")
  assert.ok(home.includes("store-hero__showcase"), "Game showcase must be rendered")
  assert.ok(home.includes("hot-deals-slider__pause"), "Deal slider must provide pause controls")
}
const css = fs.readFileSync(path.join(root, "assets/store.css"), "utf8")
for (const match of css.matchAll(/url\((\/assets\/fonts\/[^)]+)\)/g)) {
  assert.ok(fs.existsSync(path.join(root, match[1])), `Missing font: ${match[1]}`)
}
console.log("Verified 35 HTML files, internal links, images, fonts, twelve policy routes, RTL, contact details, and warranty periods")
