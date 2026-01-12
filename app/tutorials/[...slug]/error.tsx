'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TutorialError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Tutorial page error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">튜토리얼을 불러올 수 없습니다</h1>
        <p className="error-description">
          요청하신 튜토리얼 페이지를 로드하는 중 문제가 발생했습니다.
        </p>
        <div className="error-suggestions">
          <p>다음을 시도해 보세요:</p>
          <ul>
            <li>페이지를 새로고침하거나 다시 시도해 보세요</li>
            <li>URL이 올바른지 확인해 보세요</li>
            <li>튜토리얼 목록에서 다른 항목을 선택해 보세요</li>
          </ul>
        </div>
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="error-details">
            <summary>개발자 정보</summary>
            <pre className="error-message">{error.message}</pre>
            {error.stack && (
              <pre className="error-stack">{error.stack}</pre>
            )}
          </details>
        )}
        <div className="error-actions">
          <button
            onClick={reset}
            className="error-button error-button-primary"
          >
            다시 시도
          </button>
          <Link href="/" className="error-button error-button-secondary">
            튜토리얼 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
