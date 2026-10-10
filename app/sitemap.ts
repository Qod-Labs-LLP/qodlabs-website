import { MetadataRoute } from 'next'

const siteUrl = 'https://qodlabs.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-10')
  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/portfolio`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
