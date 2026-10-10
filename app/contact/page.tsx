import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactClient } from './_components/contact-client'

export const metadata = {
  title: 'Contact Us - Qod Labs LLP',
  description: 'Get in touch with Qod Labs LLP for high-performance web engineering, autonomous AI workflows, and cloud solutions. Reach us at support@qodlabs.in.',
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ContactClient />
      </main>
      <SiteFooter />
    </>
  )
}
