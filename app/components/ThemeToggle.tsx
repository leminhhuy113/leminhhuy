'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return <div className="w-11 h-11 rounded-full glass" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
      className="relative w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
    >
      <Sun
        className={`absolute w-5 h-5 transition-all ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
      />
      <Moon
        className={`absolute w-5 h-5 transition-all ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
      />
    </button>
  );
}
