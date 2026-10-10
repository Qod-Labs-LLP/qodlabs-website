'use client'

import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SlideIn } from '@/components/ui/animate'
import { toast } from 'sonner'
import {
  Mail, Phone, MapPin, Send, Clock, Globe, ArrowRight,
  User, AtSign, PhoneCall, Briefcase, MessageSquare, CheckCircle
} from 'lucide-react'

const serviceOptions = [
  'Web Engineering & Applications',
  'Autonomous AI Agents & Workflows',
  'Growth & Performance Marketing',
  'Brand Identity & UX Design Systems',
  'Scalable E-Commerce & Portals',
  'End-to-End Workflow Automation',
  '24/7 Managed Infrastructure & SRE',
  'AI & Cloud Strategic Consulting',
  'General Inquiry / Not Sure Yet',
]

// Public Turnstile site key, inlined at build (NEXT_PUBLIC_*).
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [token, setToken] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  // Render the Turnstile widget once the script is ready.
  useEffect(() => {
    let cancelled = false
    const tryRender = () => {
      if (cancelled) return
      if (window.turnstile && turnstileRef.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: 'contact-submit',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': (code?: string) => {
            console.error(
              '[Turnstile] Verification failed with code:',
              code,
              'Ensure current domain is added to Allowed Domains in Cloudflare Turnstile dashboard.'
            )
            setToken('')
          },
          theme: 'light',
        })
      } else if (widgetId.current === null) {
        setTimeout(tryRender, 300)
      }
    }
    tryRender()
    return () => {
      cancelled = true
    }
  }, [])

  const resetTurnstile = () => {
    setToken('')
    if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e?.target ?? { name: '', value: '' }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }
    if (!token) {
      toast.error('Please complete the verification.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, 'cf-turnstile-response': token }),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Thank you! Our engineering team will get back to you shortly.')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Contact form error:', err)
      toast.error('Could not submit the form. Please try again later.')
    } finally {
      resetTurnstile()
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-teal-800">
        <Container size="xl" className="relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-3">Contact Qod Labs</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Let&apos;s Build Something <span className="text-teal-300">Remarkable</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl leading-relaxed">
              Have an engineering project in mind, need an AI pipeline, or looking to scale your web architecture? Fill out the form or contact us directly at support@qodlabs.in.
            </p>
          </FadeIn>
        </Container>
      </section>

      <Section>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <SlideIn from="left">
                <Card variant="interactive" className="overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 mb-4">
                          <CheckCircle className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-2">Message Received!</h3>
                        <p className="text-muted-foreground mb-6">Thank you for reaching out. A senior member of our team will review your specifications and contact you within 24 hours.</p>
                        <Button onClick={() => setSubmitted(false)} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <h2 className="font-display text-2xl font-bold tracking-tight mb-1">Tell Us About Your Project</h2>
                          <p className="text-sm text-muted-foreground">Share your goals or technical challenges, and we will prepare a preliminary plan and quote.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Work Email *</Label>
                            <div className="relative">
                              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone / WhatsApp</Label>
                            <div className="relative">
                              <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                name="phone"
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="service">Service Focus</Label>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                              <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer"
                              >
                                <option value="">Select a capability</option>
                                {serviceOptions.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Project Scope / Message *</Label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Describe your current tech stack, target timeline, or what you are trying to automate..."
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={5}
                              className="pl-10 resize-none"
                            />
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Your information is handled strictly under mutual confidentiality and stored securely.
                        </p>

                        <div ref={turnstileRef} className="cf-turnstile" />

                        <Button
                          type="submit"
                          disabled={loading || !token}
                          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 h-12 text-base shadow-sm shadow-blue-500/20"
                        >
                          {loading ? 'Sending Request...' : 'Submit Project Inquiry'}
                          {!loading && <Send className="ml-2 h-4 w-4" />}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </SlideIn>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <SlideIn from="right">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight mb-1">Direct Communication</h2>
                    <p className="text-sm text-muted-foreground">Reach out via email or direct telephone for immediate queries.</p>
                  </div>

                  <Card className="bg-gradient-to-br from-blue-50/60 to-teal-50/60 dark:from-blue-950/20 dark:to-teal-950/20 border-0">
                    <CardContent className="p-6 space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Mail className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Primary Support</p>
                          <a href="mailto:support@qodlabs.in" className="text-sm text-primary hover:underline font-medium">support@qodlabs.in</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Office Phone</p>
                          <a href="tel:03335536285" className="text-sm text-primary hover:underline font-medium">033 3553 6285</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <PhoneCall className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Direct Mobile / WhatsApp</p>
                          <a href="tel:8582690408" className="text-sm text-primary hover:underline font-medium">858 269 0408</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Globe className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Serving</p>
                          <p className="text-sm text-muted-foreground">India &amp; Global Enterprise Clients</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-950/20 dark:to-blue-950/20 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <h3 className="font-semibold">Prompt Response Guaranteed</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We respond to all technical inquiries within 24 hours. For critical incidents or urgent project sprints, please call directly.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 border-0 text-white">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-display text-lg font-bold mb-2">Technical Discovery Call</h3>
                      <p className="text-sm text-white/80 mb-4">Book a 30-minute discovery session with our senior engineers to assess your requirements.</p>
                      <a href="tel:8582690408">
                        <Button className="bg-white text-blue-700 hover:bg-white/90 w-full font-semibold">
                          <Phone className="mr-2 h-4 w-4" /> Call Direct
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </SlideIn>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
