import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PortfolioClient } from './_components/portfolio-client'

export const metadata = {
  title: 'Portfolio & Case Studies - Qod Labs LLP',
  description: 'Explore high-impact projects built by Qod Labs, including RootMedic autonomous Linux auto-heal agent, GyaanVault adaptive testing SaaS, and AI front desks.',
}

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PortfolioClient />
      </main>
      <SiteFooter />
    </>
  )
}
