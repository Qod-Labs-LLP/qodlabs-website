import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomeClient } from './_components/home-client'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeClient />
      </main>
      <SiteFooter />
    </>
  )
}
