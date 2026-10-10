'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/animate'
import {
  Globe, Brain, TrendingUp, Palette, ShoppingCart, Cog, Headphones, Lightbulb,
  ArrowRight, Check, Phone
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Engineering & Applications',
    tagline: 'High-speed, resilient web architecture built for growth',
    desc: 'We engineer high-performance web applications and digital platforms that load instantaneously, look stunning, and function flawlessly across every screen. From high-conversion corporate web presences to complex full-stack web applications, our code is built on modern standards and edge-optimized infrastructure.',
    features: ['Custom edge-rendered architecture (Next.js / Cloudflare)', 'Sub-second page loads and mobile-first responsiveness', 'Modular headless CMS or static content workflows', 'Search engine and technical SEO optimization baked in'],
    image: 'https://cdn.abacus.ai/images/f59b7c36-0eaf-471a-a8bc-3f34575e6856.jpg',
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Brain,
    title: 'Autonomous AI Agents & Workflows',
    tagline: 'Intelligent automation that works autonomously around the clock',
    desc: 'We architect and deploy custom agentic AI systems that handle real-time customer inquiries, parse complex documents, triage support tickets, and automate intricate multi-step tasks. Our agents integrate with your existing databases and APIs to act as tireless, high-precision extensions of your team.',
    features: ['RAG-based AI front desk and conversational agents', 'Automated document extraction and structured data parsing', 'Multi-agent orchestration for complex business logic', 'Human-in-the-loop Telegram and email handoffs'],
    image: 'https://cdn.abacus.ai/images/bd375a51-6cfb-4695-bcd8-e9beab11170d.jpg',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Performance Marketing',
    tagline: 'Precision customer acquisition driven by data',
    desc: 'We connect your technology with measurable market traction. Our team engineers data-driven search engine optimization, content funnels, and targeted digital acquisition campaigns that turn searchers into long-term enterprise clients.',
    features: ['Technical SEO audits and continuous rank optimization', 'Targeted funnel creation and landing page experimentation', 'Conversion rate optimization (CRO) & analytics instrumentation', 'Actionable ROI reporting and transparent analytics'],
    image: 'https://cdn.abacus.ai/images/a8e65197-3a04-41c8-b3ee-78fe931c995d.jpg',
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Palette,
    title: 'Brand Identity & UX Design Systems',
    tagline: 'Distinctive visual systems engineered to build immediate credibility',
    desc: 'First impressions establish authority. We craft cohesive visual languages, high-fidelity UI/UX design systems, and brand assets that communicate competence, elevate your company’s presence, and foster lasting client confidence.',
    features: ['Comprehensive brand guidelines and typography hierarchy', 'Modern design systems and component libraries', 'User-centric wireframing and prototyping', 'Digital marketing assets and collateral design'],
    image: 'https://cdn.abacus.ai/images/bee75135-2cff-418d-884e-9ddc12e9d65e.jpg',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: ShoppingCart,
    title: 'Scalable E-Commerce & Customer Portals',
    tagline: 'Enterprise-grade commerce and customer self-service systems',
    desc: 'Deploy resilient online marketplaces and customer self-service portals that handle transactions with effortless reliability. We integrate payment gateways, inventory syncing, automated invoicing, and user authentication seamlessly.',
    features: ['Custom catalog and product management architectures', 'Frictionless multi-currency and regional payment gateways', 'Real-time order processing and tracking integration', 'Client dashboards with role-based access control'],
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Cog,
    title: 'End-to-End Workflow Automation',
    tagline: 'Eliminate repetitive manual tasks and eliminate operational friction',
    desc: 'We connect disparate business tools (CRMs, databases, email services, internal portals) into seamless automated pipelines. Save hundreds of man-hours each month and eradicate human error with bulletproof automated integrations.',
    features: ['Cross-platform API integration and data synchronization', 'Automated customer onboarding and billing pipelines', 'Custom telemetry, status monitors, and alerting bots', 'Resilient error handling and audit logging'],
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Headphones,
    title: '24/7 Managed Infrastructure & SRE',
    tagline: 'Continuous monitoring, high availability, and proactive maintenance',
    desc: 'Mission-critical systems cannot afford downtime. Our proactive maintenance and Site Reliability Engineering services keep your web applications fast, protected with zero-day security updates, and performing flawlessly 24 hours a day.',
    features: ['Proactive server health and uptime monitoring', 'Edge CDN caching and Cloudflare security optimization', 'Automated backups and disaster recovery runbooks', 'Priority developer support and rapid SLA resolution'],
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Lightbulb,
    title: 'AI & Cloud Strategic Consulting',
    tagline: 'Clear architectural roadmaps for modern digital adoption',
    desc: 'Navigating rapid technological change can be overwhelming. We partner with founders and business leaders to audit existing software stacks, identify high-ROI AI opportunities, and construct concrete architectural roadmaps.',
    features: ['Infrastructure and architectural feasibility reviews', 'Pragmatic AI readiness and capability assessment', 'Cost optimization for cloud and serverless workloads', 'Step-by-step implementation milestones and staffing guidance'],
    color: 'from-teal-500 to-teal-600',
  },
]

export function ServicesClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-teal-800">
        <Container size="xl" className="relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-3">Our Services</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Engineering Solutions Tailored for <span className="text-teal-300">Sustainable Scale</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl leading-relaxed">
              From next-generation web applications to autonomous AI workflows, Qod Labs delivers technical precision, business acumen, and reliable execution.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Services */}
      <Section>
        <Container size="xl">
          <div className="space-y-16">
            {services.map((svc, i) => {
              const Icon = svc.icon
              const isEven = i % 2 === 0
              return (
                <FadeIn key={i}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:[direction:rtl]' : ''}`}>
                    <div className={!isEven ? 'lg:[direction:ltr]' : ''}>
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${svc.color} mb-4 shadow-sm shadow-blue-500/20`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">{svc.title}</h2>
                      <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm mb-4">{svc.tagline}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">{svc.desc}</p>
                      <div className="space-y-3 mb-6">
                        {svc.features.map((f, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact">
                        <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 shadow-sm shadow-blue-500/20">
                          Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className={!isEven ? 'lg:[direction:ltr]' : ''}>
                      {svc.image ? (
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border shadow-md">
                          <Image
                            src={svc.image}
                            alt={`${svc.title} illustration`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center shadow-md`}>
                          <Icon className="h-24 w-24 text-white/30" />
                        </div>
                      )}
                    </div>
                  </div>
                  {i < services.length - 1 && (
                    <div className="border-t border-border/50 mt-16" />
                  )}
                </FadeIn>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600">
        <Container size="xl" className="text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white mb-4">Need a Tailored Technical Consultation?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">Tell us what you are aiming to build or streamline. We will review your architectural needs and map out a practical roadmap.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 shadow-lg text-base px-8 font-semibold">
                <Phone className="mr-2 h-4 w-4" /> Book a Consultation Call
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
