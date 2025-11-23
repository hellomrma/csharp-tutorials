import { MetadataRoute } from 'next';
import { getAllTutorials } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://csharp-tutorials.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // 한국어와 영문 튜토리얼 모두 가져오기
  const koTutorials = getAllTutorials('ko');
  const enTutorials = getAllTutorials('en');
  
  // 모든 slug 수집 (중복 제거)
  const allSlugs = new Set<string>();
  koTutorials.forEach(t => {
    allSlugs.add(t.slug);
    if (t.slugEn) {
      allSlugs.add(t.slugEn);
    }
  });
  
  const tutorialUrls: MetadataRoute.Sitemap = Array.from(allSlugs).map((slug) => ({
    url: `${siteUrl}/tutorials/${slug}`,
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

