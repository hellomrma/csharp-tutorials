import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">404 - 페이지를 찾을 수 없습니다</h1>
        <p className="error-description">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <div className="error-suggestions">
          <p>다음을 시도해 보세요:</p>
          <ul>
            <li>URL을 다시 확인해 보세요</li>
            <li>홈페이지로 돌아가서 원하는 튜토리얼을 찾아보세요</li>
            <li>페이지가 이동되었거나 삭제되었을 수 있습니다</li>
          </ul>
        </div>
        <div className="error-actions">
          <Link href="/" className="error-button error-button-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
