# Project Structure - thuexevf7.com

## ✅ Đã hoàn thành (Phase 1)

```
thuexevf7/
├── package.json                  ✅ Dependencies: next, react, nodemailer, framer-motion, lucide-react
├── next.config.js                ✅ Config với security headers
├── tsconfig.json                 ✅ TypeScript config
├── tailwind.config.js            ✅ Tailwind với liquid glass theme
├── postcss.config.js             ✅
├── app/
│   ├── globals.css               ✅ Liquid glass CSS, aurora, animations
│   ├── layout.tsx                ✅ Root layout + SEO metadata + JSON-LD Schema
```

## 🔨 Cần hoàn thiện (Phase 2 - Hiện tại)

```
thuexevf7/
├── .env.example                  ⏳ Env vars template (SMTP, Telegram)
├── .gitignore                    ⏳
├── README.md                     ⏳ Hướng dẫn deploy Vercel
├── app/
│   ├── page.tsx                  ⏳ Trang chủ (compose tất cả sections)
│   ├── sitemap.ts                ⏳ Sitemap động cho SEO
│   ├── robots.ts                 ⏳ Robots.txt
│   ├── api/
│   │   ├── booking/route.ts      ⏳ API form thuê xe → Gmail + Telegram
│   │   └── contact/route.ts      ⏳ API liên hệ nhanh → Gmail + Telegram
│   ├── components/
│   │   ├── ThemeToggle.tsx       ⏳ Toggle sáng/tối
│   │   ├── Navbar.tsx            ⏳ Header glass với menu
│   │   ├── Hero.tsx              ⏳ Hero section nhấn mạnh VF7 Plus 2 cầu 349HP
│   │   ├── Features.tsx          ⏳ Tính năng nổi bật xe
│   │   ├── PricingTable.tsx      ⏳ Bảng giá ngày/giờ/cuối tuần/lễ tết
│   │   ├── BookingForm.tsx       ⏳ Form thuê xe với checkbox tuỳ chọn
│   │   ├── Gallery.tsx           ⏳ Thư viện ảnh xe
│   │   ├── Policy.tsx            ⏳ Chính sách, phụ phí
│   │   ├── FAQ.tsx               ⏳ Câu hỏi thường gặp (SEO)
│   │   ├── Contact.tsx           ⏳ Hotline, Zalo, Email
│   │   ├── Footer.tsx            ⏳ Footer
│   │   └── FloatingActions.tsx   ⏳ Nút Zalo/Hotline floating
│   └── lib/
│       ├── pricing.ts            ⏳ Logic tính giá (ngày, cuối tuần, lễ)
│       ├── notify.ts             ⏳ Gửi Telegram + Gmail
│       └── constants.ts          ⏳ Hằng số (giá, contact info)
└── public/
    ├── robots.txt                ⏳ (fallback)
    └── manifest.json             ⏳ PWA manifest
```

## 📋 Logic giá thuê
- **Tự lái:** 1.200.000đ/ngày
  - T7, CN: +200.000đ
  - Lễ Tết: +300.000đ
  - Theo giờ: 800.000đ/4h
- **Có tài xế:** 2.200.000đ/ngày
  - CN: +200.000đ
  - Lễ Tết: +300.000đ
- **Tuỳ chọn:**
  - Bảo hiểm: +200.000đ/ngày
  - Không giới hạn KM + sạc miễn phí: +300.000đ/ngày
- **Giao xe:** Miễn phí 5KM từ Vincom Đồng Khởi

## 📩 Notifications
- Gmail: leminhhuy.lmh@gmail.com (via Nodemailer/SMTP)
- Telegram: Bot token + chat ID (env var)

## 🎯 SEO Keywords (đã đưa vào metadata)
- thuê xe vf7, thue xe vf7, thue xe vinfast vf7
- xe vf7 plus, vf7 2 cầu
- VinFast VF7 Plus 349HP, 496KM
