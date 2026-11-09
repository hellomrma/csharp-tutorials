import { ImageResponse } from 'next/og';

// 레이아웃/튜토리얼 메타데이터가 참조하는 /og-image.png 를 빌드 시 정적으로 생성
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#0a0a0a',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', borderTop: '2px solid #0a0a0a', paddingTop: 24 }}>
          <div style={{ fontSize: 24, letterSpacing: '0.22em', color: '#525252' }}>
            UNITY · C# · TUTORIALS
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
            Unity C#
          </div>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Tutorials
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#525252' }}>
          <div>From variables to complete games</div>
          <div style={{ color: '#1d4ed8' }}>csharp-tutorials.vercel.app</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
