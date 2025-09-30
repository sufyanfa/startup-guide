import { MetadataRoute } from 'next'
import { sections } from '@/data/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  // Main pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ]

  // Dynamic pages for each section (if you plan to have individual section pages)
  const sectionPages = sections.map((section) => ({
    url: `${baseUrl}/#${section.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...sectionPages]
}