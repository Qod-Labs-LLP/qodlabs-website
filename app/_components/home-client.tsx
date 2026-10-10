'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SlideIn, Stagger, StaggerItem, HoverLift } from '@/components/ui/animate'
import { CounterAnimation } from '@/components/counter-animation'
import {
  Globe, Brain, TrendingUp, Palette, ShoppingCart, Cog, Headphones, Lightbulb,
  ArrowRight, Quote, Phone, CheckCircle, Users, Rocket, ShieldCheck, Sparkles, Terminal
} from 'lucide-react'

const services = [
  { icon: Globe, title: 'Web Engineering & Apps', desc: 'Lightning-fast, highly responsive web platforms engineered to convert visitors into loyal clients.', color: 'from-blue-600 to-blue-700' },
  { icon: Brain, title: 'Autonomous AI Agents', desc: 'Autonomous AI agents that execute complex tasks, triage queries, and streamline operations around the clock.', color: 'from-teal-500 to-teal-600' },
  { icon: TrendingUp, title: 'Growth & Digital Marketing', desc: 'Precision SEO, technical content, and performance campaigns that generate measurable customer acquisition.', color: 'from-blue-600 to-blue-700' },
  { icon: Palette, title: 'Brand Identity & UX Systems', desc: 'Distinctive design systems, memorable identities, and intuitive user experiences engineered for trust.', color: 'from-teal-500 to-teal-600' },
  { icon: ShoppingCart, title: 'Scalable E-Commerce', desc: 'Robust digital commerce solutions with frictionless checkout, inventory syncing, and enterprise payment gateways.', color: 'from-blue-600 to-blue-700' },
  { icon: Cog, title: 'Workflow & Process Automation', desc: 'Connect your mission-critical tools and automate manual data pipelines to eliminate human error.', color: 'from-teal-500 to-teal-600' },
  { icon: Headphones, title: '24/7 Managed Infrastructure', desc: 'Proactive maintenance, continuous security audits, and guaranteed high availability for your platforms.', color: 'from-blue-600 to-blue-700' },
  { icon: Lightbulb, title: 'AI & Cloud Consulting', desc: 'Architectural roadmaps, technology audits, and actionable strategies for building next-generation AI workflows.', color: 'from-teal-500 to-teal-600' },
]

const portfolioItems = [
  {
    title: 'RootMedic',
    subtitle: 'rootmedic.in',
    desc: 'An intelligent autonomous auto-healing agent that continuously observes, diagnoses, and remediates Linux servers and services — dramatically lowering downtime without manual intervention.',
    image: 'https://cdn.abacus.ai/images/8c0166ff-836a-4b75-ad6d-386ec067c2fe.png',
    tags: ['Autonomous AI', 'Linux Infrastructure', 'Self-Healing Systems'],
  },
  {
    title: 'GyaanVault',
    subtitle: 'Educational Intelligence SaaS',
    desc: 'An AI-powered testing and evaluation platform engineered for coaching institutes and competitive exams, featuring dynamic adaptive questions and deep analytics.',
    image: 'https://cdn.abacus.ai/images/690f7417-f994-4a0c-885a-dbf41d7fb194.png',
    tags: ['EdTech SaaS', 'Adaptive AI', 'Analytics Engine'],
  },
]

const stats = [
  { value: 45, suffix: '+', label: 'Years Combined Engineering Experience' },
  { value: 50, suffix: '+', label: 'Commercial Projects Delivered' },
  { value: 100, suffix: '%', label: 'Client Delivery & Satisfaction' },
]

export function HomeClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.abacus.ai/images/0446472e-e736-4fac-bb38-13885bcad3ea.jpg"
            alt="Modern high-tech digital computing landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-blue-950/85 to-teal-950/75" />
        </div>
        <Container size="xl" className="relative z-10 py-20">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-6">
                <Rocket className="h-4 w-4 text-teal-400" />
                Modern Web Engineering &amp; Agentic AI Solutions
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Architecting Modern Platforms with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">Intelligent AI</span> & High-Speed Web
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                Qod Labs builds resilient web platforms and custom agentic AI systems that empower businesses to automate intricate workflows, scale effortlessly, and outpace the competition.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 shadow-lg shadow-teal-500/20 text-base px-8">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" className="bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 border border-white/30 text-base px-8">
                    Explore Our Work
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-8 shadow-inner">
        <Container size="xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-3xl sm:text-4xl font-bold">
                  <CounterAnimation target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-white/80 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <Section id="services" className="bg-muted/30">
        <Container size="xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Our Capabilities</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Everything You Need to <span className="text-primary">Scale Digitally</span></h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">From mission-critical web applications to autonomous AI workflows, we turn complex technical challenges into competitive advantages.</p>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.05}>
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <StaggerItem key={i}>
                  <HoverLift>
                    <Card variant="interactive" className="h-full">
                      <CardContent className="p-6">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${svc.color} mb-4 shadow-sm shadow-blue-500/20`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2">{svc.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </StaggerItem>
              )
            })}
          </Stagger>
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link href="/services">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Explore All Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* About Preview */}
      <Section id="about">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn from="left">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-border">
                <Image
                  src="https://cdn.abacus.ai/images/82bf0325-5433-450c-894f-284c245de968.jpg"
                  alt="Team collaboration at Qod Labs"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            </SlideIn>
            <SlideIn from="right">
              <div>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">About Qod Labs</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                  Engineered by Veterans Who <span className="text-primary">Know How Systems Scale</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Qod Labs LLP was founded by Sanjay and Pushpi Upadhyay — bringing together more than 45 years of combined experience across Tier-1 technology companies and enterprise leadership development.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Extensive engineering experience across Yahoo, Red Hat, Cisco, Reliance Jio, and QCD Microsystems',
                    'Proven corporate communication & leadership development with Infosys and top IT organizations',
                    'Tailored architecture for every client — zero cookie-cutter templates, engineered for durability',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <Link href="/about">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 shadow-sm shadow-blue-500/20">
                    Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </SlideIn>
          </div>
        </Container>
      </Section>

      {/* Portfolio Preview */}
      <Section id="portfolio" className="bg-muted/30">
        <Container size="xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Featured Products</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Systems Delivering <span className="text-primary">Measurable Impact</span></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <HoverLift>
                  <Card variant="interactive" className="overflow-hidden h-full">
                    <div className="relative aspect-video bg-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag, j) => (
                          <span key={j} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{tag}</span>
                        ))}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{item.subtitle}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </HoverLift>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link href="/portfolio">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials">
        <Container size="xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Client Trust</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Built on Transparency &amp; <span className="text-primary">Results</span></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Enterprise Client', role: 'CTO · FinTech Partner', text: 'Qod Labs delivered a modern, resilient architecture with custom AI integrations that transformed our operational speed.' },
              { name: 'SaaS Founder', role: 'Founder · EdTech Platform', text: 'The depth of engineering and business clarity Sanjay and Pushpi bring to the table is unmatched. Our mock platform launched ahead of schedule.' },
              { name: 'Growth Partner', role: 'Head of Digital · Services Co', text: 'We view Qod Labs not just as an agency, but as our trusted engineering wing. Fast communication, transparent milestones, and flawless execution.' },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="h-full bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-blue-950/20 dark:to-teal-950/20 border-0">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-teal-600/40 mb-4" />
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-sm">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-25" />
        <Container size="xl" className="relative z-10 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Ready to Accelerate Your Digital Transformation?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Discuss your project goals with our senior engineering team and explore how high-speed web apps and custom AI agents can multiply your growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 shadow-lg text-base px-8 font-semibold">
                  <Phone className="mr-2 h-4 w-4" />
                  Get in Touch Today
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" className="bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 border border-white/30 text-base px-8">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
