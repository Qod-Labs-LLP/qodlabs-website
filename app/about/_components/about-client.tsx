'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { CounterAnimation } from '@/components/counter-animation'
import {
  Target, Heart, Award, Users, ArrowRight,
  Briefcase, Globe, Lightbulb, ShieldCheck, Code2
} from 'lucide-react'

const values = [
  { icon: ShieldCheck, title: 'Engineering Integrity', desc: 'We build with transparency and precision. Clear timelines, robust architecture, and genuine dedication to your platform’s success.' },
  { icon: Target, title: 'Outcome-Driven', desc: 'We do not build software for the sake of complexity. Every system we deploy is calibrated to drive measurable operational and financial impact.' },
  { icon: Lightbulb, title: 'Continuous Innovation', desc: 'We stay on the bleeding edge of agentic AI, modern web frameworks, and cloud systems to keep your business ahead of the curve.' },
  { icon: Heart, title: 'Long-Term Partnership', desc: 'Delivery is never the finish line. We support, monitor, and evolve your systems so your business scales smoothly.' },
]

export function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-teal-800" />
        <div className="absolute inset-0">
          <Image
            src="https://cdn.abacus.ai/images/82bf0325-5433-450c-894f-284c245de968.jpg"
            alt="Professional engineering collaboration"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container size="xl" className="relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-3">About Qod Labs</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Engineering High-Performance Systems for <span className="text-teal-300">Modern Businesses</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl leading-relaxed">
              Qod Labs LLP is a specialized technology lab focused on high-speed web engineering and agentic artificial intelligence solutions for forward-thinking organizations worldwide.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Mission */}
      <Section>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn from="left">
              <div>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Our Origins</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                  Founded on Decades of <span className="text-primary">Deep Engineering</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Modern enterprises require digital platforms that combine bulletproof stability with dynamic, autonomous intelligence. That core requirement led Sanjay and Pushpi Upadhyay to establish Qod Labs LLP.
                  </p>
                  <p>
                    With over four decades of combined experience across global infrastructure leaders, telecommunications giants, and enterprise training institutions, our founders recognized that businesses need more than static templates — they need agile, automated systems engineered to scale.
                  </p>
                  <p>
                    At Qod Labs, we turn high-leverage modern technologies — from static-first Cloudflare edge networks to multi-agent AI pipelines — into practical, cost-effective engines for business acceleration.
                  </p>
                </div>
              </div>
            </SlideIn>
            <SlideIn from="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 45, suffix: '+', label: 'Years Combined Tech Experience', icon: Award },
                  { value: 50, suffix: '+', label: 'Systems & Deployments', icon: Briefcase },
                  { value: 2, suffix: '', label: 'Veteran Co-Founders', icon: Users },
                  { value: 10, suffix: '+', label: 'Global Geographies Served', icon: Globe },
                ].map((s, i) => {
                  const Icon = s.icon
                  return (
                    <Card key={i} className="bg-gradient-to-br from-blue-50/60 to-teal-50/60 dark:from-blue-950/20 dark:to-teal-950/20 border-0">
                      <CardContent className="p-5 text-center">
                        <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-display text-2xl font-bold text-primary">
                          <CounterAnimation target={s.value} suffix={s.suffix} />
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </SlideIn>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="bg-muted/30">
        <Container size="xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Leadership Team</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">The Engineers &amp; Strategists Behind <span className="text-primary">Qod Labs</span></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sanjay */}
            <FadeIn delay={0.1}>
              <Card variant="interactive" className="overflow-hidden h-full">
                <div className="relative aspect-square bg-muted max-h-80">
                  <Image
                    src="https://cdn.abacus.ai/images/a4449515-bd73-4e0f-8283-73462e608207.png"
                    alt="Sanjay Upadhyay - Co-founder and Technology Lead at Qod Labs"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold">Sanjay Upadhyay</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold mb-3">Co-Founder & Technology Lead</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Bringing 25 years of hands-on systems and software engineering experience, Sanjay has architected high-scale infrastructure at companies including Yahoo, QCD Microsystems, Reliance Jio, Red Hat, and Cisco. He drives technology strategy and AI architecture at Qod Labs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Yahoo', 'Red Hat', 'Cisco', 'Reliance Jio', 'QCD'].map((c) => (
                      <span key={c} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">{c}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Pushpi */}
            <FadeIn delay={0.2}>
              <Card variant="interactive" className="overflow-hidden h-full">
                <div className="relative aspect-square bg-muted max-h-80">
                  <Image
                    src="https://cdn.abacus.ai/images/53d8089f-1f69-4b91-95b7-bc08500abc44.png"
                    alt="Pushpi Upadhyay - Co-founder and Business Strategy Lead at Qod Labs"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold">Pushpi Upadhyay</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold mb-3">Co-Founder & Business Strategy Lead</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    With over 20 years of leadership in corporate communication, talent readiness, and professional coaching, Pushpi has mentored leaders at Infosys and leading enterprise IT organizations, ensuring business solutions connect human capability with technology.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Infosys', 'Corporate Leadership', 'Strategy', 'Talent Transformation'].map((c) => (
                      <span key={c} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">{c}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container size="xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Our Principles</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">The Principles That Guide <span className="text-primary">Our Code</span></h2>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <StaggerItem key={i}>
                  <Card className="h-full text-center bg-gradient-to-br from-blue-50/40 to-teal-50/40 dark:from-blue-950/20 dark:to-teal-950/20 border-0">
                    <CardContent className="p-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 mb-4 shadow-sm shadow-blue-500/20">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              )
            })}
          </Stagger>
        </Container>
      </Section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600">
        <Container size="xl" className="text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white mb-4">Ready to Partner with Qod Labs?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">Let us discuss how our technical expertise can turn your vision into an unfair competitive edge.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 shadow-lg text-base px-8 font-semibold">
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
