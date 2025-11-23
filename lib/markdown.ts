import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import { replaceTermsInHtml } from './terms';
import { type Locale, defaultLocale } from './i18n';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export interface TutorialMeta {
  slug: string;
  slugEn?: string;
  title: string;
  titleEn?: string;
  order?: number;
  category?: string;
  categoryEn?: string;
  description?: string;
  descriptionEn?: string;
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
function getTutorialsFromDirectory(directory: string, basePath: string = '', locale: Locale = defaultLocale): TutorialMeta[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  // .en.md 파일은 제외 (영문 파일은 별도로 처리)
  return fileNames
    .filter((name) => name.endsWith('.md') && !name.endsWith('.en.md'))
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

      // 언어에 따라 제목 선택
      const displayTitle = locale === 'en' && data.titleEn ? data.titleEn : title;
      const displayCategory = locale === 'en' && data.categoryEn ? data.categoryEn : (data.category || 'Unity C# 기초');
      
      // slugEn이 있으면 사용, 없으면 slug 사용
      const slugEn = data.slugEn || slug;
      
      // 언어에 따라 slug 선택
      const displaySlug = locale === 'en' && data.slugEn ? slugEn : slug;
      const finalSlug = basePath ? `${basePath}/${displaySlug}` : displaySlug;

      return {
        slug: finalSlug,
        slugEn: basePath ? `${basePath}/${slugEn}` : slugEn,
        title: displayTitle,
        titleEn: data.titleEn,
        order: data.order || orderFromFilename,
        category: displayCategory,
        categoryEn: data.categoryEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        ...data,
      };
    });
}

/**
 * 모든 튜토리얼 파일의 메타데이터를 가져옵니다
 * content/docs에서 읽어옵니다
 */
export function getAllTutorials(locale: Locale = defaultLocale): TutorialMeta[] {
  const tutorials = getTutorialsFromDirectory(docsDirectory, 'docs', locale);

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
export async function getTutorialBySlug(slug: string, locale: Locale = defaultLocale): Promise<Tutorial | null> {
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
    
    // 먼저 slug로 직접 파일 찾기 시도
    let fullPath = path.join(docsDirectory, `${actualSlug}.md`);
    let enPath = path.join(docsDirectory, `${actualSlug}.en.md`);
    let foundFile = false;
    let actualFileSlug = actualSlug;
    
    // 영문 slug인 경우 .en.md 파일 우선 확인
    if (locale === 'en' && fs.existsSync(enPath)) {
      fullPath = enPath;
      foundFile = true;
    } else if (fs.existsSync(fullPath)) {
      // 기본 파일이 있으면 사용
      foundFile = true;
    }
    
    // slug로 직접 찾지 못한 경우, 모든 파일을 검색하여 slugEn과 매칭
    if (!foundFile) {
      const allFiles = fs.readdirSync(docsDirectory).filter(name => name.endsWith('.md') && !name.endsWith('.en.md'));
      
      for (const fileName of allFiles) {
        const filePath = path.join(docsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        const fileSlug = getSlugFromFilename(fileName);
        const fileSlugEn = data.slugEn || fileSlug;
        
        // 영문 slug와 매칭되는지 확인 (영문 locale이거나 영문 slug로 접근한 경우)
        if (fileSlugEn === actualSlug || `docs/${fileSlugEn}` === decodedSlug) {
          actualFileSlug = fileSlug;
          // 영문 파일이 있으면 우선 사용
          const enFilePath = path.join(docsDirectory, `${fileSlug}.en.md`);
          if (locale === 'en' && fs.existsSync(enFilePath)) {
            fullPath = enFilePath;
          } else {
            fullPath = filePath;
          }
          foundFile = true;
          break;
        }
        // 한국어 slug와 매칭되는지 확인
        else if (fileSlug === actualSlug || `docs/${fileSlug}` === decodedSlug) {
          actualFileSlug = fileSlug;
          fullPath = filePath;
          foundFile = true;
          break;
        }
      }
    }

    if (!foundFile || !fs.existsSync(fullPath)) {
      // 파일이 없으면 null 반환
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 파일명에서 숫자 추출
    const fileName = path.basename(fullPath);
    const orderMatch = fileName.match(/^(\d+)-/);
    const orderFromFilename = orderMatch ? parseInt(orderMatch[1]) : 999;

    // 제목 추출: 언어에 따라 적절한 제목 선택
    let title = data.title;
    if (!title) {
      const firstLine = content.split('\n')[0];
      if (firstLine.startsWith('# ')) {
        title = firstLine.replace(/^#\s+/, '').trim();
      } else {
        title = slug;
      }
    }
    
    // 언어에 따라 제목 선택
    if (locale === 'en' && data.titleEn) {
      title = data.titleEn;
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
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/i;
    const firstH1Match = htmlContent.match(h1Regex);
    
    if (firstH1Match) {
      // h1 내용 추출 (HTML 태그 제거)
      const h1Text = firstH1Match[1].replace(/<[^>]*>/g, '').trim();
      
      // 번호 제거 (예: "15. " 또는 "17. " 같은 패턴)
      const h1TextWithoutNumber = h1Text.replace(/^\d+\.\s*/, '').trim();
      const titleWithoutNumber = title.replace(/^\d+\.\s*/, '').trim();
      
      // 정확한 매칭 또는 포함 관계 확인
      const exactMatch = h1Text === title || h1TextWithoutNumber === titleWithoutNumber;
      const includesMatch = h1Text.includes(title) || title.includes(h1Text);
      const normalizedMatch = h1TextWithoutNumber === title || titleWithoutNumber === h1Text;
      
      // 매칭되면 첫 번째 h1 제거
      if (exactMatch || includesMatch || normalizedMatch) {
        htmlContent = htmlContent.replace(h1Regex, '');
      }
    }
    
    // README.md 링크를 홈페이지로 변환
    htmlContent = htmlContent.replace(
      /<a[^>]*href=["']([^"']*README\.md[^"']*)["'][^>]*>/g,
      '<a href="/" class="toc-link">'
    );
    
    // 한글 용어를 "한글(영문)" 형식으로 변환
    htmlContent = replaceTermsInHtml(htmlContent);

    // 실제 파일명에서 slug 추출 (한글 파일명)
    const realFileSlug = getSlugFromFilename(path.basename(fullPath).replace('.en.md', '.md'));
    
    // slugEn이 있으면 사용, 없으면 파일명에서 추출한 slug 사용
    const slugEn = data.slugEn || realFileSlug;
    
    // 언어에 따라 slug 정규화
    let normalizedSlug: string;
    if (locale === 'en' && data.slugEn) {
      // 영문일 때 slugEn 사용
      normalizedSlug = slug.startsWith('docs/') ? slug : `docs/${data.slugEn}`;
    } else {
      // 한국어일 때 실제 파일 slug 사용
      normalizedSlug = `docs/${realFileSlug}`;
    }
    
    // 언어에 따라 카테고리 선택
    const category = locale === 'en' && data.categoryEn ? data.categoryEn : (data.category || 'Unity C# 기초');
    const description = locale === 'en' && data.descriptionEn ? data.descriptionEn : data.description;
    
    return {
      meta: {
        slug: normalizedSlug,
        slugEn: `docs/${slugEn}`,
        title,
        titleEn: data.titleEn,
        order: data.order || orderFromFilename,
        category,
        categoryEn: data.categoryEn,
        description,
        descriptionEn: data.descriptionEn,
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
 * 한국어와 영문 slug를 모두 반환합니다
 */
export function getAllTutorialSlugs(): string[] {
  const slugs: string[] = [];

  if (fs.existsSync(docsDirectory)) {
    const docsFiles = fs.readdirSync(docsDirectory);
    const koFiles = docsFiles.filter((name) => name.endsWith('.md') && !name.endsWith('.en.md'));
    
    koFiles.forEach((name) => {
      const filePath = path.join(docsDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      const koSlug = getSlugFromFilename(name);
      const enSlug = data.slugEn || koSlug;
      
      // 한국어 slug 추가
      slugs.push(`docs/${koSlug}`);
      
      // 영문 slug가 다르면 추가
      if (enSlug !== koSlug) {
        slugs.push(`docs/${enSlug}`);
      }
    });
  }

  return slugs;
}

