'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러를 로깅 서비스로 전송할 수 있습니다
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">문제가 발생했습니다</h1>
        <p className="error-description">
          페이지를 로드하는 중 오류가 발생했습니다.
        </p>
        {error.message && (
          <details className="error-details">
            <summary>오류 세부 정보</summary>
            <pre className="error-message">{error.message}</pre>
          </details>
        )}
        <div className="error-actions">
          <button
            onClick={reset}
            className="error-button error-button-primary"
          >
            다시 시도
          </button>
          <a href="/" className="error-button error-button-secondary">
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
