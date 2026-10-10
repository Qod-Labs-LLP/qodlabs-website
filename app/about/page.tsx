import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AboutClient } from './_components/about-client'

export const metadata = {
  title: 'About Us - Qod Labs LLP',
  description: 'Learn about Qod Labs LLP, our engineering mission, and the senior leadership team powering our modern web and AI solutions.',
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutClient />
      </main>
      <SiteFooter />
    </>
  )
}
