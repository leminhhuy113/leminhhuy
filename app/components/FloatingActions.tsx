'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT } from '../lib/constants';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      <a
        href={`https://zalo.me/${CONTACT.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-electric-500 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform animate-pulse-slow"
        aria-label="Chat Zalo"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute inset-0 rounded-full bg-electric-400 animate-ping opacity-30" />
      </a>
      <a
        href={`tel:${CONTACT.hotline}`}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        aria-label="Gọi hotline"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
