'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Battery, Gauge, Phone } from 'lucide-react';
import { CAR, CONTACT } from '../lib/constants';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="aurora" />
      <div className="noise" />

      {/* Floating shapes */}
      <div className="shape-blob bg-electric-400 w-72 h-72 top-1/3 -left-20 animate-float" />
      <div
        className="shape-blob bg-indigo-500 w-96 h-96 bottom-10 right-0 animate-float"
        style={{ animationDelay: '-3s' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Sẵn xe – Đặt ngay hôm nay
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Thuê Xe{' '}
            <span className="gradient-text">VinFast VF7 Plus</span>
            <br />
            2 Cầu <span className="gradient-text">349HP</span>
          </h1>

          <p className="text-base sm:text-lg opacity-80 mb-4 max-w-xl leading-relaxed">
            🚗 <strong>SUV điện mạnh mẽ – bản cao cấp nhất</strong>. Pin đầy đi{' '}
            <strong className="text-electric-500">496KM</strong>. Giao xe miễn phí 5KM từ Vincom
            Đồng Khởi. Hotline tư vấn 24/7.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-500" /> {CAR.power}
            </span>
            <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
              <Battery className="w-3.5 h-3.5 text-green-500" /> {CAR.range}
            </span>
            <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-electric-500" /> {CAR.acceleration}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#booking"
              className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base shadow-xl"
            >
              Đặt xe ngay
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${CONTACT.hotline}`}
              className="glass-strong inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base hover:scale-[1.02] transition-transform"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.hotlineFormatted}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs opacity-70">
            <div>
              <div className="text-2xl font-bold gradient-text">5.0★</div>
              <div>47+ đánh giá</div>
            </div>
            <div className="w-px h-10 bg-current opacity-20" />
            <div>
              <div className="text-2xl font-bold gradient-text">100+</div>
              <div>Chuyến đã giao</div>
            </div>
            <div className="w-px h-10 bg-current opacity-20" />
            <div>
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div>Hỗ trợ</div>
            </div>
          </div>
        </motion.div>

        {/* Right – Car visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-gradient-to-br from-electric-400/30 via-indigo-500/20 to-pink-500/20">
              {/* SVG car illustration as fallback */}
              <svg
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3dccff" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="window" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0b1426" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0b1426" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Ground reflection */}
                <ellipse cx="200" cy="260" rx="160" ry="10" fill="rgba(0,0,0,0.2)" />
                {/* Car body */}
                <path
                  d="M 60 200 Q 80 140 140 130 L 260 130 Q 320 140 340 200 L 340 220 Q 340 235 325 235 L 75 235 Q 60 235 60 220 Z"
                  fill="url(#carBody)"
                />
                {/* Windshield */}
                <path
                  d="M 100 195 Q 115 150 145 145 L 255 145 Q 285 150 300 195 Z"
                  fill="url(#window)"
                />
                {/* Headlight */}
                <ellipse cx="80" cy="200" rx="14" ry="6" fill="#fff" opacity="0.9" />
                <ellipse cx="80" cy="200" rx="8" ry="3" fill="#fff" />
                {/* Wheels */}
                <circle cx="125" cy="235" r="22" fill="#1a1a2e" />
                <circle cx="125" cy="235" r="13" fill="#2d2d44" />
                <circle cx="125" cy="235" r="6" fill="#11b0f5" />
                <circle cx="275" cy="235" r="22" fill="#1a1a2e" />
                <circle cx="275" cy="235" r="13" fill="#2d2d44" />
                <circle cx="275" cy="235" r="6" fill="#11b0f5" />
                {/* Side detail */}
                <path d="M 100 215 L 300 215" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                {/* Brand */}
                <text
                  x="200"
                  y="190"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                >
                  VF7 PLUS
                </text>
              </svg>

              {/* Floating badges */}
              <div className="absolute top-4 left-4 glass rounded-2xl px-3 py-2">
                <div className="text-[10px] opacity-70 uppercase tracking-wider">Công suất</div>
                <div className="font-bold text-sm gradient-text">349 HP</div>
              </div>
              <div className="absolute top-4 right-4 glass rounded-2xl px-3 py-2">
                <div className="text-[10px] opacity-70 uppercase tracking-wider">Quãng đường</div>
                <div className="font-bold text-sm gradient-text">496 KM</div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-2">
                <div className="text-[10px] opacity-70 uppercase tracking-wider text-center">
                  Hệ dẫn động
                </div>
                <div className="font-bold text-sm gradient-text">AWD – 2 Cầu</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-lg">{CAR.name}</div>
                <div className="text-xs opacity-60">Bản cao cấp nhất • 5 chỗ • Điện 100%</div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-60">Chỉ từ</div>
                <div className="font-display font-extrabold text-2xl gradient-text">
                  1.2tr<span className="text-sm font-medium opacity-60">/ngày</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
