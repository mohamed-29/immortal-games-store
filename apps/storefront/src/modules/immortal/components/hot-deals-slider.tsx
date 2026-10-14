"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { getWhatsappUrl, Locale } from "@/content/catalog"
import { ArrowLeft, ArrowUpRight, WhatsAppIcon } from "./icons"

const deals = [
  {
    image: "/images/deals/fc27-preorder.jpg",
    title: { en: "FC 27 pre-order", ar: "حجز FC 27" },
  },
  {
    image: "/images/deals/fortnite-crew-pack.jpg",
    title: { en: "Fortnite Crew offer", ar: "عرض Fortnite Crew" },
  },
  {
    image: "/images/deals/summer-offer-fc26-ps-plus.jpg",
    title: { en: "FC 26 + PlayStation Plus", ar: "FC 26 وPlayStation Plus" },
  },
  {
    image: "/images/deals/year-end-offer-fc26-ps-plus.jpg",
    title: { en: "PlayStation year-end offers", ar: "عروض بلايستيشن لنهاية السنة" },
  },
] as const

const sliderCopy = {
  en: {
    previous: "Previous deal",
    next: "Next deal",
    badge: "From our Facebook page",
    confirm: "Message us to confirm the current price and availability.",
    action: "Ask about this deal",
    viewPost: "Visit Facebook",
    pause: "Pause slides",
    resume: "Resume slides",
  },
  ar: {
    previous: "العرض السابق",
    next: "العرض التالي",
    badge: "من صفحتنا على فيسبوك",
    confirm: "راسلنا لتأكيد السعر الحالي والتوفر.",
    action: "اسأل عن العرض",
    viewPost: "زيارة فيسبوك",
    pause: "إيقاف العرض التلقائي",
    resume: "تشغيل العرض التلقائي",
  },
} as const

type HotDealsSliderProps = {
  locale: Locale
}

export default function HotDealsSlider({ locale }: HotDealsSliderProps) {
  const [activeDeal, setActiveDeal] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const copy = sliderCopy[locale]

  useEffect(() => {
    if (paused || hovered || focused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveDeal((current) => (current + 1) % deals.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [paused, hovered, focused])

  const previousDeal = () => {
    setActiveDeal((current) => (current - 1 + deals.length) % deals.length)
  }

  const nextDeal = () => {
    setActiveDeal((current) => (current + 1) % deals.length)
  }

  return (
    <div
      aria-label={locale === "ar" ? "أقوى العروض" : "Hot deals"}
      className="hot-deals-slider"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onFocusCapture={() => setFocused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="region"
    >
      <div className="hot-deals-slider__viewport" dir="ltr">
        <div
          className="hot-deals-slider__track"
          style={{ transform: `translateX(-${activeDeal * 100}%)` }}
        >
          {deals.map((deal, index) => (
            <article
              aria-hidden={index !== activeDeal}
              inert={index !== activeDeal}
              className="hot-deal"
              dir={locale === "ar" ? "rtl" : "ltr"}
              key={deal.image}
            >
              <div className="hot-deal__media">
                <Image
                  alt={deal.title[locale]}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 860px) 100vw, 55vw"
                  src={deal.image}
                />
              </div>
              <div className="hot-deal__copy">
                <span className="hot-deal__badge">{copy.badge}</span>
                <p className="hot-deal__count">
                  {String(index + 1).padStart(2, "0")} / {String(deals.length).padStart(2, "0")}
                </p>
                <h3>{deal.title[locale]}</h3>
                <p>{copy.confirm}</p>
                <div className="hot-deal__actions">
                  <a
                    className="button button--whatsapp"
                    href={getWhatsappUrl(deal.title[locale], locale)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <WhatsAppIcon />
                    {copy.action}
                  </a>
                  <a
                    className="text-link"
                    href="https://www.facebook.com/Immortal.G.Store"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {copy.viewPost}
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hot-deals-slider__controls">
        <button aria-label={copy.previous} onClick={previousDeal} type="button">
          <ArrowLeft />
        </button>
        <div className="hot-deals-slider__dots">
          {deals.map((deal, index) => (
            <button
              aria-label={`${copy.badge}: ${deal.title[locale]}`}
              aria-pressed={index === activeDeal}
              className={index === activeDeal ? "is-active" : ""}
              key={deal.image}
              onClick={() => setActiveDeal(index)}
              type="button"
            />
          ))}
        </div>
        <button aria-label={copy.next} onClick={nextDeal} type="button">
          <ArrowLeft className="hot-deals-slider__next-icon" />
        </button>
        <button
          aria-label={paused ? copy.resume : copy.pause}
          aria-pressed={paused}
          className="hot-deals-slider__pause"
          data-pause-label={copy.pause}
          data-resume-label={copy.resume}
          onClick={() => setPaused((current) => !current)}
          type="button"
        >
          <span aria-hidden="true">{paused ? ">" : "Ⅱ"}</span>
        </button>
      </div>
    </div>
  )
}
