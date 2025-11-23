import { MetadataRoute } from 'next';
import { getAllTutorials } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tutorials = getAllTutorials();
  
  const tutorialUrls: MetadataRoute.Sitemap = tutorials.map((tutorial) => ({
    url: `${siteUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...tutorialUrls,
  ];
}

