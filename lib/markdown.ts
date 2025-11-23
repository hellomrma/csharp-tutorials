import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import { replaceTermsInHtml } from './terms';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export interface TutorialMeta {
  slug: string;
  title: string;
  order?: number;
  category?: string;
  [key: string]: any;
}

export interface Tutorial {
  meta: TutorialMeta;
  content: string;
  htmlContent: string;
}

/**
 * MD 파일의 slug를 추출합니다 (파일명에서 확장자 제거)
 */
function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

/**
 * 디렉토리에서 모든 MD 파일을 읽어옵니다
 */
function getTutorialsFromDirectory(directory: string, basePath: string = ''): TutorialMeta[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = getSlugFromFilename(fileName);
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // 파일명에서 숫자 추출 (예: "01-변수와-조건문-기초.md" -> 1)
      const orderMatch = fileName.match(/^(\d+)-/);
      const orderFromFilename = orderMatch ? parseInt(orderMatch[1]) : 999;

      // 제목 추출: frontmatter의 title 또는 파일 첫 번째 줄의 # 제목 또는 파일명
      let title = data.title;
      if (!title) {
        const firstLine = content.split('\n')[0];
        if (firstLine.startsWith('# ')) {
          title = firstLine.replace(/^#\s+/, '').trim();
        } else {
          // 파일명에서 한글 제목 추출 (예: "01-변수와-조건문-기초.md" -> "변수와 조건문 기초")
          title = fileName
            .replace(/\.md$/, '')
            .replace(/^\d+-/, '')
            .replace(/-/g, ' ');
        }
      }

      return {
        slug: basePath ? `${basePath}/${slug}` : slug,
        title,
        order: data.order || orderFromFilename,
        category: data.category || 'Unity C# 기초',
        ...data,
      };
    });
}

/**
 * 모든 튜토리얼 파일의 메타데이터를 가져옵니다
 * content/docs에서 읽어옵니다
 */
export function getAllTutorials(): TutorialMeta[] {
  const tutorials = getTutorialsFromDirectory(docsDirectory, 'docs');

  // order 기준으로 정렬
  return tutorials.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * 특정 튜토리얼의 전체 내용을 가져옵니다
 * content/docs에서 찾습니다
 */
export async function getTutorialBySlug(slug: string): Promise<Tutorial | null> {
  try {
    // URL 디코딩 (한글 파일명 처리)
    let decodedSlug = slug;
    try {
      decodedSlug = decodeURIComponent(slug);
    } catch (e) {
      // 이미 디코딩된 경우 그대로 사용
      decodedSlug = slug;
    }
    
    // docs/ 접두사 제거
    const actualSlug = decodedSlug.startsWith('docs/') ? decodedSlug.replace('docs/', '') : decodedSlug;
    const fullPath = path.join(docsDirectory, `${actualSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      // 파일이 없으면 null 반환
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 파일명에서 숫자 추출
    const fileName = path.basename(fullPath);
    const orderMatch = fileName.match(/^(\d+)-/);
    const orderFromFilename = orderMatch ? parseInt(orderMatch[1]) : 999;

    // 제목 추출
    let title = data.title;
    if (!title) {
      const firstLine = content.split('\n')[0];
      if (firstLine.startsWith('# ')) {
        title = firstLine.replace(/^#\s+/, '').trim();
      } else {
        title = slug;
      }
    }

    // Markdown을 HTML로 변환
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown 지원
      .use(remarkRehype) // rehype로 변환
      .use(rehypeHighlight) // 코드 하이라이팅
      .use(rehypeStringify) // HTML 문자열로 변환
      .process(content);

    let htmlContent = processedContent.toString();
    
    // 첫 번째 h1 태그 제거 (article-title과 중복 방지)
    // 마크다운 파일의 첫 번째 h1이 타이틀과 동일한 경우 제거
    htmlContent = htmlContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, (match) => {
      // h1 내용이 타이틀과 유사한지 확인 (대략적인 비교)
      const h1Text = match.replace(/<[^>]*>/g, '').trim();
      const titleMatch = h1Text === title || h1Text.includes(title) || title.includes(h1Text);
      return titleMatch ? '' : match;
    });
    
    // README.md 링크를 홈페이지로 변환
    htmlContent = htmlContent.replace(
      /<a[^>]*href=["']([^"']*README\.md[^"']*)["'][^>]*>/g,
      '<a href="/" class="toc-link">'
    );
    
    // 한글 용어를 "한글(영문)" 형식으로 변환
    htmlContent = replaceTermsInHtml(htmlContent);

    // slug 정규화: 항상 'docs/...' 형식으로 통일
    const normalizedSlug = slug.startsWith('docs/') ? slug : `docs/${actualSlug}`;
    
    return {
      meta: {
        slug: normalizedSlug,
        title,
        order: data.order || orderFromFilename,
        category: data.category || 'Unity C# 기초',
        ...data,
      },
      content,
      htmlContent,
    };
  } catch (error) {
    // 에러 발생 시 null 반환
    console.error('Error loading tutorial:', error);
    return null;
  }
}

/**
 * 모든 튜토리얼 slug 목록을 가져옵니다
 * content/docs에서 가져옵니다
 */
export function getAllTutorialSlugs(): string[] {
  const slugs: string[] = [];

  if (fs.existsSync(docsDirectory)) {
    const docsFiles = fs.readdirSync(docsDirectory);
    docsFiles
      .filter((name) => name.endsWith('.md'))
      .forEach((name) => {
        slugs.push(`docs/${getSlugFromFilename(name)}`);
      });
  }

  return slugs;
}

