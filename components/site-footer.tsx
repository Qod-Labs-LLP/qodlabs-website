import Link from 'next/link'
import { Container } from '@/components/layouts/container'
import { Code2, Mail, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <Container size="xl">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Qod Labs LLP
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering businesses with modern web engineering, intelligent AI workflows, and scalable digital systems.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:support@qodlabs.in" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                support@qodlabs.in
              </a>
              <a href="tel:03335536285" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                033 3553 6285
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Qod Labs LLP. All rights reserved. India &amp; Global.
          </p>
        </div>
      </Container>
    </footer>
  )
}
