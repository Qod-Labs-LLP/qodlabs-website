import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ServicesClient } from './_components/services-client'

export const metadata = {
  title: 'Services - Qod Labs LLP',
  description: 'Explore our full suite of web engineering, agentic AI workflows, cloud infrastructure, and technical consulting services.',
}

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServicesClient />
      </main>
      <SiteFooter />
    </>
  )
}
