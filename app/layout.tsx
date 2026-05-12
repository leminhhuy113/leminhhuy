import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thuê xe VF7 Plus 2 cầu | thuexevf7.com",
  description:
    "Dịch vụ thuê xe VinFast VF7 Plus 2 cầu tại TP.HCM. Giá 1.200.000/ngày, hỗ trợ theo giờ, có tài xế, giao xe linh hoạt.",
  keywords: [
    "thuê xe vf7",
    "thue xe vf7",
    "thue xe vinfast vf7",
    "xe vf7 plus",
    "vf7 2 cầu",
    "thuê xe vf7 plus 2 cầu"
  ],
  openGraph: {
    title: "🚗 VINFAST VF7 PLUS 2 CẦU | 349HP ⚡",
    description:
      "SUV điện mạnh mẽ bản cao cấp nhất. 100% pin đi 496KM. Đặt xe nhanh tại thuexevf7.com",
    type: "website",
    locale: "vi_VN",
    url: "https://thuexevf7.com"
  },
  metadataBase: new URL("https://thuexevf7.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
