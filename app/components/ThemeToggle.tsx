'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark' | 'system';
const ORDER: Mode[] = ['light', 'dark', 'system'];
const ICONS: Record<Mode, string> = { light: '☼', dark: '☾', system: '▭' };
const LABELS: Record<Mode, string> = {
  light: '라이트 모드',
  dark: '다크 모드',
  system: '시스템 설정',
};

function applyTheme(mode: Mode) {
  const dark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', mode);
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Mode | null) || 'light';
    // localStorage는 클라이언트에서만 읽을 수 있어 마운트 후 동기화 (하이드레이션 불일치 방지)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (mode === 'system') applyTheme('system');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [mode, mounted]);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    applyTheme(next);
    setMode(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="theme-toggle"
      aria-label={`테마: ${LABELS[mode]} (클릭하여 전환)`}
      title={LABELS[mode]}
    >
      {mounted ? ICONS[mode] : ICONS.light}
    </button>
  );
}
