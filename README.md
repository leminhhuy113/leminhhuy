# 🚗 thuexevf7.com — Thuê Xe VinFast VF7 Plus 2 Cầu

Website cho thuê xe VinFast VF7 Plus 2 cầu 349HP – SUV điện cao cấp. Next.js 14 (App Router) + TypeScript + Tailwind CSS, thiết kế Liquid Glass 2026, hỗ trợ Sáng/Tối, tích hợp gửi thông báo qua **Gmail** và **Telegram**.

## ✨ Tính năng

- 🎨 **Liquid Glass UI 2026** – glassmorphism, aurora background, gradient mesh
- 🌓 **Dark/Light mode** – tự nhận theo hệ thống, có toggle
- 💰 **Bảng giá động** – tự tính theo ngày thường / T7,CN / lễ tết / giờ
- 📋 **Form đặt xe** – tính giá real-time, checkbox bảo hiểm & không giới hạn KM
- 📩 **Notification kép** – đồng thời gửi Gmail + Telegram khi có đơn
- 🎯 **SEO chuẩn** – metadata, JSON-LD (AutoRental + FAQPage), sitemap, robots
- 📱 **Responsive** – tối ưu mobile, tablet, desktop
- 🚀 **Production-ready** – security headers, validation, honeypot anti-spam

## 🛠 Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables (Liquid Glass)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Email:** Nodemailer (Gmail SMTP)
- **Deploy:** Vercel

## 🚀 Cài đặt local

```bash
# 1. Cài dependencies
npm install

# 2. Copy file env
cp .env.example .env.local

# 3. Điền các giá trị vào .env.local (xem hướng dẫn bên dưới)

# 4. Chạy dev
npm run dev
```

Mở http://localhost:3000

## 🔑 Lấy thông tin cho `.env.local`

### Gmail App Password

1. Vào https://myaccount.google.com/security
2. Bật **Xác minh 2 bước**
3. Vào **Mật khẩu ứng dụng** → tạo mới → chọn loại **Mail**
4. Copy mật khẩu 16 ký tự → dán vào `SMTP_PASS`

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=leminhhuy.lmh@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
MAIL_TO=leminhhuy.lmh@gmail.com
```

### Telegram Bot

1. Mở Telegram, tìm **@BotFather**
2. Gõ `/newbot` → đặt tên → nhận **token**
3. Mở chat với bot vừa tạo, gửi tin nhắn bất kỳ (vd: "hi")
4. Truy cập: `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. Tìm `"chat":{"id":xxxxxx}` → đó là `TELEGRAM_CHAT_ID`

```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
TELEGRAM_CHAT_ID=987654321
```

## 📦 Deploy lên Vercel

### Cách 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Cách 2: Vercel Dashboard (khuyến nghị)

1. Push code lên GitHub repo
2. Vào https://vercel.com/new
3. Import repo
4. Vào **Settings → Environment Variables**, thêm tất cả biến trong `.env.example`:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
5. Click **Deploy**
6. Sau khi deploy, vào **Settings → Domains**, thêm `thuexevf7.com`
7. Cập nhật DNS theo hướng dẫn Vercel

## 📁 Cấu trúc dự án

```
thuexevf7/
├── app/
│   ├── api/
│   │   ├── booking/route.ts    # API form đặt xe
│   │   └── contact/route.ts    # API liên hệ nhanh
│   ├── components/             # UI components
│   ├── lib/
│   │   ├── constants.ts        # Hằng số (giá, contact)
│   │   ├── pricing.ts          # Logic tính giá
│   │   └── notify.ts           # Gửi Telegram + Email
│   ├── globals.css             # Liquid Glass styles
│   ├── layout.tsx              # Root layout + SEO metadata
│   ├── page.tsx                # Trang chủ
│   ├── sitemap.ts              # Sitemap.xml
│   └── robots.ts               # Robots.txt
├── public/
│   └── manifest.json           # PWA manifest
├── .env.example                # Template env vars
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 💡 Tuỳ chỉnh

- **Đổi thông tin liên hệ / giá:** sửa `app/lib/constants.ts`
- **Đổi logic tính giá lễ tết:** sửa `HOLIDAYS_2026` trong `constants.ts`
- **Thêm câu hỏi FAQ:** sửa mảng `FAQS` trong `app/components/FAQ.tsx`
- **Đổi ảnh OG:** thay `public/og-image.jpg` (1200x630)

## 🎯 SEO keywords đã tối ưu

- thuê xe vf7, thue xe vf7, thue xe vinfast vf7
- xe vf7 plus, vf7 2 cầu
- thuê xe vinfast vf7 plus, thuê xe điện vf7
- thuê xe vf7 tphcm, thuê xe vf7 sài gòn
- thuê xe vf7 có tài, thuê xe vf7 tự lái
- vinfast vf7 plus 2025

## 📞 Hỗ trợ

- **Hotline:** 0901234334
- **Zalo:** 0901234334
- **Email:** leminhhuy.lmh@gmail.com

---

© 2026 Thuê Xe VF7 • Made with ⚡ in Sài Gòn
