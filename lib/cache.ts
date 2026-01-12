/**
 * 간단한 메모리 캐시 구현
 * 빌드 타임에 파일 시스템 접근을 최소화하기 위해 사용
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<any>>;
  private ttl: number; // Time to live in milliseconds

  constructor(ttl: number = 5 * 60 * 1000) { // 기본 5분
    this.cache = new Map();
    this.ttl = ttl;
  }

  /**
   * 캐시에서 값을 가져옵니다
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // TTL 체크 (프로덕션 빌드에서는 무제한)
    if (process.env.NODE_ENV === 'production') {
      return entry.data;
    }

    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * 캐시에 값을 저장합니다
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * 특정 키의 캐시를 삭제합니다
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * 모든 캐시를 삭제합니다
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 캐시 크기를 반환합니다
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * 특정 패턴으로 시작하는 모든 캐시를 삭제합니다
   */
  clearByPrefix(prefix: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }
}

// 전역 캐시 인스턴스
export const tutorialCache = new MemoryCache();

/**
 * 캐시 키 생성 헬퍼
 */
export const cacheKeys = {
  allTutorials: (locale: string) => `tutorials:all:${locale}`,
  tutorialBySlug: (slug: string, locale: string) => `tutorial:${slug}:${locale}`,
  allSlugs: () => 'tutorials:slugs:all',
  fileContent: (filePath: string) => `file:${filePath}`,
};
