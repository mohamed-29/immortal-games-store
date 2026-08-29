import { notFound } from "next/navigation"

import { isLocale } from "@/content/catalog"
import ImmortalFooter from "@/modules/immortal/components/footer"
import ImmortalNav from "@/modules/immortal/components/nav"

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  if (!isLocale(countryCode)) {
    notFound()
  }

  return (
    <>
      <ImmortalNav locale={countryCode} />
      {props.children}
      <ImmortalFooter locale={countryCode} />
    </>
  )
}
