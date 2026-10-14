(() => {
  const locale = document.documentElement.lang
  const keys = ["all", "playstation", "pc", "codes", "subscriptions"]
  document.cookie = `immortal_locale=${locale};path=/;max-age=31536000;SameSite=Lax;Secure`

  const language = document.querySelector(".language-switch")
  if (language) {
    const destination = new URL(window.location.href)
    destination.pathname = destination.pathname.replace(/^\/(en|ar)(?=\/|$)/, locale === "en" ? "/ar" : "/en")
    language.href = destination.pathname + destination.search + destination.hash
  }

  const slider = document.querySelector(".hot-deals-slider")
  if (slider) {
    const track = slider.querySelector(".hot-deals-slider__track")
    const slides = [...slider.querySelectorAll(".hot-deal")]
    const dots = [...slider.querySelectorAll(".hot-deals-slider__dots button")]
    const arrows = slider.querySelectorAll(".hot-deals-slider__controls > button")
    let active = 0
    let paused = false
    const select = (index) => {
      active = (index + slides.length) % slides.length
      track.style.transform = `translateX(-${active * 100}%)`
      slides.forEach((slide, item) => {
        slide.setAttribute("aria-hidden", String(item !== active))
        slide.inert = item !== active
      })
      dots.forEach((dot, item) => {
        dot.classList.toggle("is-active", item === active)
        dot.setAttribute("aria-pressed", String(item === active))
      })
    }
    arrows[0]?.addEventListener("click", () => select(active - 1))
    arrows[1]?.addEventListener("click", () => select(active + 1))
    dots.forEach((dot, index) => dot.addEventListener("click", () => select(index)))
    slider.addEventListener("mouseenter", () => { paused = true })
    slider.addEventListener("mouseleave", () => { paused = false })
    slider.addEventListener("focusin", () => { paused = true })
    slider.addEventListener("focusout", () => { paused = false })
    select(0)
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.setInterval(() => { if (!paused && !document.hidden) select(active + 1) }, 6500)
    }
  }

  const explorer = document.querySelector(".catalog-explorer")
  if (!explorer) return
  fetch("/assets/catalog.json").then((response) => {
    if (!response.ok) throw new Error("Catalog could not be loaded")
    return response.json()
  }).then((products) => {
    const cards = [...explorer.querySelectorAll(".product-card")]
    const filters = [...explorer.querySelectorAll(".catalog-filters button")]
    const input = explorer.querySelector("input[type=search]")
    const count = explorer.querySelector(".catalog-results-line > span")
    const resultLabel = count.textContent.trim().replace(/^\d+\s*/, "")
    const empty = document.createElement("p")
    empty.className = "empty-catalog"
    empty.textContent = locale === "ar" ? "لا توجد منتجات مطابقة لهذا البحث حالياً." : "No products match that search yet."
    empty.hidden = true
    explorer.appendChild(empty)
    let category = new URL(window.location.href).searchParams.get("category") ?? "all"
    if (!keys.includes(category)) category = "all"
    const render = () => {
      const query = input.value.trim().toLocaleLowerCase(locale)
      let visible = 0
      cards.forEach((card) => {
        const handle = card.querySelector(".product-card__visual").getAttribute("href").split("/").filter(Boolean).pop()
        const product = products.find((item) => item.handle === handle)
        const text = product ? [product.name.en, product.name.ar, product.shortName, product.platform.en, product.platform.ar].join(" ").toLocaleLowerCase(locale) : ""
        const matches = product && (category === "all" || category === product.category) && text.includes(query)
        card.hidden = !matches
        if (matches) visible += 1
      })
      filters.forEach((button, index) => {
        button.classList.toggle("is-active", keys[index] === category)
        button.setAttribute("aria-pressed", String(keys[index] === category))
      })
      count.textContent = `${String(visible).padStart(2, "0")} ${resultLabel}`
      empty.hidden = visible !== 0
    }
    filters.forEach((button, index) => button.addEventListener("click", () => {
      category = keys[index]
      const url = new URL(window.location.href)
      if (category === "all") url.searchParams.delete("category")
      else url.searchParams.set("category", category)
      window.history.replaceState(null, "", url)
      render()
    }))
    input.addEventListener("input", render)
    render()
  }).catch(() => { /* Keep the already rendered full catalog usable. */ })
})()
