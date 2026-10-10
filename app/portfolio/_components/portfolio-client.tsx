'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, HoverLift } from '@/components/ui/animate'
import {
  ExternalLink, Server, GraduationCap, Shield,
  Activity, Cpu, BookOpen, BarChart3, Users, Phone, Bot, MessageSquare, Zap
} from 'lucide-react'

const projects = [
  {
    title: 'RootMedic',
    subtitle: 'rootmedic.in',
    link: 'https://rootmedic.in',
    tagline: 'Autonomous Auto-Heal Agent for Linux Infrastructure',
    desc: 'RootMedic is an intelligent telemetry and self-healing agent engineered for Linux servers and distributed environments. It continuously observes system vitals, isolates anomalies before outages occur, and automatically remediates recurring failure modes without human intervention.',
    longDesc: 'Architected for site reliability engineers, system administrators, and infrastructure teams managing production server fleets. RootMedic dramatically reduces Mean Time To Recovery (MTTR), handles automated service restarts, cleans storage thresholds, and remediates security alerts autonomously.',
    image: 'https://cdn.abacus.ai/images/8c0166ff-836a-4b75-ad6d-386ec067c2fe.png',
    tags: ['Autonomous AI Agent', 'Linux Systems', 'Self-Healing SRE', 'Telemetry'],
    color: 'from-blue-600 to-blue-700',
    icon: Server,
    highlights: [
      { icon: Shield, label: 'Automated self-healing' },
      { icon: Activity, label: 'Continuous SRE telemetry' },
      { icon: Cpu, label: 'AI diagnostic models' },
    ],
  },
  {
    title: 'GyaanVault',
    subtitle: 'Mock Testing SaaS Platform',
    link: null,
    tagline: 'Adaptive AI-Powered Evaluation for Educational Institutes',
    desc: 'GyaanVault is a high-throughput mock examination platform architected for coaching institutes and competitive exam programs. It harnesses agentic AI workflows to dynamically generate test papers, evaluate answers, and deliver deep student learning analytics.',
    longDesc: 'Institutes leverage GyaanVault to scale their evaluation processes without manual overhead. The platform synthesizes adaptive difficulty question pools, highlights knowledge gaps, and provides student-tailored study recommendations driven by AI models.',
    image: 'https://cdn.abacus.ai/images/690f7417-f994-4a0c-885a-dbf41d7fb194.png',
    tags: ['EdTech SaaS', 'Adaptive AI', 'Evaluation Engine', 'Multi-Tenant'],
    color: 'from-teal-500 to-teal-600',
    icon: GraduationCap,
    highlights: [
      { icon: BookOpen, label: 'Dynamic test generation' },
      { icon: BarChart3, label: 'Cognitive analytics' },
      { icon: Users, label: 'Multi-institute scaling' },
    ],
  },
  {
    title: 'AI Front Desk & Operator Relay',
    subtitle: 'Autonomous Visitor Engagement',
    link: null,
    tagline: 'Multi-Tenant RAG Knowledge Engine with Real-Time Telegram Handoff',
    desc: 'A serverless, edge-deployed conversational front desk that ingests company knowledge bases and instantly answers visitor queries with pinpoint accuracy, whilst seamlessly handing off hot leads to human operators via Telegram.',
    longDesc: 'Operates across multiple production domains with dedicated tenant isolation, Vectorize semantic search, and Cloudflare Workers AI. When high buying intent or complex inquiries arise, human operators can seamlessly reply inside Telegram to chat directly with website visitors.',
    image: 'https://cdn.abacus.ai/images/bd375a51-6cfb-4695-bcd8-e9beab11170d.jpg',
    tags: ['Serverless RAG', 'Cloudflare Workers AI', 'Telegram Handoff', 'Multi-Tenant'],
    color: 'from-blue-600 to-teal-600',
    icon: Bot,
    highlights: [
      { icon: MessageSquare, label: 'Edge-based RAG chat' },
      { icon: Zap, label: 'Telegram operator handoff' },
      { icon: Shield, label: 'Turnstile verified' },
    ],
  },
]

export function PortfolioClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-teal-800">
        <Container size="xl" className="relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-3">Portfolio &amp; Solutions</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Engineered for Production, <span className="text-teal-300">Delivering Real Impact</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl leading-relaxed">
              Explore our core products and client architectures. Each represents an intersection of reliable software engineering and high-leverage artificial intelligence.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Projects */}
      <Section>
        <Container size="xl">
          <div className="space-y-20">
            {projects.map((project, i) => {
              const ProjectIcon = project.icon
              return (
                <FadeIn key={i}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div>
                      <HoverLift>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-lg border border-border">
                          <Image
                            src={project.image}
                            alt={`${project.title} dashboard screenshot`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </HoverLift>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.color} shadow-sm shadow-blue-500/20`}>
                          <ProjectIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h2>
                          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-teal-600 dark:text-teal-400 font-semibold mb-4">{project.tagline}</p>
                      <p className="text-muted-foreground leading-relaxed mb-4">{project.desc}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">{project.longDesc}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, j) => (
                          <span key={j} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{tag}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        {project.highlights.map((h, j) => {
                          const HIcon = h.icon
                          return (
                            <Card key={j} className="bg-muted/50 border-0">
                              <CardContent className="p-3 flex items-center gap-2">
                                <HIcon className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-xs font-medium">{h.label}</span>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>

                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                  {i < projects.length - 1 && (
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
            <h2 className="font-display text-3xl font-bold tracking-tight text-white mb-4">Have an Ambitious Engineering Objective?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">Whether you need an autonomous agent system or a high-velocity web platform, let us architect a solution tailored to your vision.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 shadow-lg text-base px-8 font-semibold">
                <Phone className="mr-2 h-4 w-4" /> Schedule a Technical Discovery Call
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
