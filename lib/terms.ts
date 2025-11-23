/**
 * 한글 용어와 영문 용어 매핑 사전
 * 마크다운 콘텐츠에서 한글 용어를 "한글(영문)" 형식으로 자동 변환합니다
 */
export const termDictionary: Record<string, string> = {
  '변수': 'variable',
  '함수': 'function',
  '클래스': 'class',
  '메서드': 'method',
  '속성': 'property',
  '필드': 'field',
  '상수': 'constant',
  '배열': 'array',
  '리스트': 'list',
  '딕셔너리': 'dictionary',
  '객체': 'object',
  '인스턴스': 'instance',
  '인터페이스': 'interface',
  '구조체': 'struct',
  '열거형': 'enum',
  '네임스페이스': 'namespace',
  '매개변수': 'parameter',
  '반환값': 'return value',
  '반환': 'return',
  '타입': 'type',
  '문자열': 'string',
  '정수': 'integer',
  '실수': 'float',
  '불린': 'boolean',
  '논리값': 'boolean',
  '조건문': 'conditional statement',
  '반복문': 'loop',
  '제어문': 'control statement',
  '연산자': 'operator',
  '표현식': 'expression',
  '문장': 'statement',
  '블록': 'block',
  '스코프': 'scope',
  '접근제한자': 'access modifier',
  '접근자': 'accessor',
  '게터': 'getter',
  '세터': 'setter',
  '생성자': 'constructor',
  '소멸자': 'destructor',
  '오버로딩': 'overloading',
  '오버라이딩': 'overriding',
  '상속': 'inheritance',
  '다형성': 'polymorphism',
  '캡슐화': 'encapsulation',
  '추상화': 'abstraction',
  '예외': 'exception',
  '에러': 'error',
  '이벤트': 'event',
  '델리게이트': 'delegate',
  '람다': 'lambda',
  '익명함수': 'anonymous function',
  'LINQ': 'LINQ',
  '제네릭': 'generic',
  '어트리뷰트': 'attribute',
  '리플렉션': 'reflection',
  '비동기': 'async',
  'await': 'await',
  '태스크': 'task',
  '스레드': 'thread',
  '프로세스': 'process',
  '메모리': 'memory',
  '가비지컬렉션': 'garbage collection',
  'GC': 'GC',
};

/**
 * HTML 콘텐츠에서 한글 용어를 "한글(영문)" 형식으로 변환합니다
 * 코드 블록, 이미지, 링크 등은 제외하고 일반 텍스트만 변환합니다
 */
export function replaceTermsInHtml(html: string): string {
  let result = html;
  
  // 코드 블록과 이미지, 링크를 임시로 마스킹
  const placeholders: Array<{ placeholder: string; original: string }> = [];
  let placeholderIndex = 0;
  
  // 코드 블록 저장 및 마스킹
  result = result.replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, (match) => {
    const placeholder = `__PLACEHOLDER_${placeholderIndex}__`;
    placeholders.push({ placeholder, original: match });
    placeholderIndex++;
    return placeholder;
  });
  
  result = result.replace(/<code[^>]*>[\s\S]*?<\/code>/gi, (match) => {
    const placeholder = `__PLACEHOLDER_${placeholderIndex}__`;
    placeholders.push({ placeholder, original: match });
    placeholderIndex++;
    return placeholder;
  });
  
  // 이미지 저장 및 마스킹
  result = result.replace(/<img[^>]*>/gi, (match) => {
    const placeholder = `__PLACEHOLDER_${placeholderIndex}__`;
    placeholders.push({ placeholder, original: match });
    placeholderIndex++;
    return placeholder;
  });
  
  // 링크 저장 및 마스킹
  result = result.replace(/<a[^>]*>[\s\S]*?<\/a>/gi, (match) => {
    const placeholder = `__PLACEHOLDER_${placeholderIndex}__`;
    placeholders.push({ placeholder, original: match });
    placeholderIndex++;
    return placeholder;
  });
  
  // 용어 치환 (긴 용어부터 먼저 치환하여 중복 방지)
  const sortedTerms = Object.entries(termDictionary).sort((a, b) => b[0].length - a[0].length);
  
  for (const [korean, english] of sortedTerms) {
    // 단어 경계를 고려한 정규식 (이미 변환된 경우 제외)
    // 한글 용어가 이미 "(영문)" 형식으로 변환되어 있지 않은 경우만 치환
    const escapedKorean = korean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(
      `(${escapedKorean})(?!\\s*\\([^)]*\\))`,
      'g'
    );
    
    result = result.replace(pattern, (match, p1) => {
      // HTML 태그 내부가 아닌 텍스트 노드에서만 치환
      // 단순히 치환하되, 이미 변환된 것은 제외
      // 영문 부분과 괄호를 span 태그로 감싸서 스타일 적용
      return `${p1}<span class="term-en">(${english})</span>`;
    });
  }
  
  // 마스킹된 요소들 복원
  placeholders.forEach(({ placeholder, original }) => {
    result = result.replace(placeholder, original);
  });
  
  return result;
}

