'use client';

import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { CONTACT } from '../lib/constants';

const NAV_ITEMS = [
  { href: '#hero', label: 'Trang chủ' },
  { href: '#features', label: 'Tính năng' },
  { href: '#pricing', label: 'Bảng giá' },
  { href: '#booking', label: 'Đặt xe' },
  { href: '#gallery', label: 'Thư viện' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'pt-2 px-2 sm:pt-4 sm:px-6' : 'pt-4 px-4 sm:pt-6 sm:px-8'
      }`}
    >
      <nav
        className={`glass-strong mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
              VF7
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-base leading-tight">Thuê Xe VF7</div>
              <div className="text-[10px] uppercase tracking-widest opacity-60">
                VinFast VF7 Plus 2 Cầu
              </div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  className="px-4 py-2 text-sm font-medium rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${CONTACT.hotline}`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full btn-glow text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.hotlineFormatted}
            </a>
            <ThemeToggle />
            <button
              className="lg:hidden w-11 h-11 rounded-full glass flex items-center justify-center"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((it) => (
                <li key={it.href}>
                  <a
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 dark:hover:bg-white/5"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`tel:${CONTACT.hotline}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-glow text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Gọi ngay {CONTACT.hotlineFormatted}
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
