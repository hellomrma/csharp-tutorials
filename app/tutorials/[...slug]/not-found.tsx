import Link from 'next/link';

export default function TutorialNotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">튜토리얼을 찾을 수 없습니다</h1>
        <p className="error-description">
          요청하신 튜토리얼이 존재하지 않습니다.
        </p>
        <div className="error-suggestions">
          <p>가능한 원인:</p>
          <ul>
            <li>잘못된 URL 또는 오래된 링크</li>
            <li>튜토리얼이 이동되었거나 삭제됨</li>
            <li>아직 작성되지 않은 튜토리얼</li>
          </ul>
        </div>
        <div className="error-actions">
          <Link href="/" className="error-button error-button-primary">
            튜토리얼 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
