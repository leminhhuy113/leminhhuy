import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thuexevf7.com'),
  title: {
    default: 'Thuê Xe VF7 | Cho Thuê VinFast VF7 Plus 2 Cầu 349HP Tại TP.HCM',
    template: '%s | Thuê Xe VF7',
  },
  description:
    'Thuê xe VinFast VF7 Plus 2 cầu 349HP – SUV điện cao cấp nhất, 100% pin đi 496KM. Giá thuê chỉ 1.200.000đ/ngày. Giao xe miễn phí 5KM tại Vincom Đồng Khởi. Hotline 0901234334.',
  keywords: [
    'thuê xe vf7',
    'thue xe vf7',
    'thue xe vinfast vf7',
    'xe vf7 plus',
    'vf7 2 cầu',
    'thuê xe vinfast vf7 plus',
    'thuê xe điện vf7',
    'thuê xe vf7 tphcm',
    'thuê xe vf7 sài gòn',
    'cho thuê vf7',
    'giá thuê xe vf7',
    'thuê xe vf7 có tài',
    'thuê xe vf7 tự lái',
    'vinfast vf7 plus 2025',
  ],
  authors: [{ name: 'Thuê Xe VF7' }],
  creator: 'Thuê Xe VF7',
  publisher: 'Thuê Xe VF7',
  alternates: {
    canonical: 'https://thuexevf7.com',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://thuexevf7.com',
    siteName: 'Thuê Xe VF7',
    title: 'Thuê Xe VinFast VF7 Plus 2 Cầu | SUV Điện Cao Cấp 496KM',
    description:
      'Cho thuê VinFast VF7 Plus 2 cầu 349HP – bản cao cấp nhất. Pin đầy đi 496KM. Giá từ 1.200.000đ/ngày. Giao xe miễn phí trong 5KM.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VinFast VF7 Plus 2 Cầu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thuê Xe VinFast VF7 Plus 2 Cầu',
    description: 'SUV điện cao cấp – 349HP – 496KM mỗi lần sạc. Từ 1.200.000đ/ngày.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fbff' },
    { media: '(prefers-color-scheme: dark)', color: '#05080f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  name: 'Thuê Xe VF7',
  url: 'https://thuexevf7.com',
  telephone: '+84901234334',
  email: 'leminhhuy.lmh@gmail.com',
  image: 'https://thuexevf7.com/og-image.jpg',
  priceRange: '1.200.000đ - 2.500.000đ / ngày',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vincom Đồng Khởi',
    addressLocality: 'Quận 1',
    addressRegion: 'TP.HCM',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.7765,
    longitude: 106.7021,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Car',
      name: 'VinFast VF7 Plus 2 Cầu 2025',
      brand: { '@type': 'Brand', name: 'VinFast' },
      model: 'VF7 Plus',
      vehicleConfiguration: 'AWD 2 Cầu',
      fuelType: 'Electric',
      vehicleEngine: { '@type': 'EngineSpecification', enginePower: '349 HP' },
    },
    priceCurrency: 'VND',
    price: '1200000',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '1200000',
      priceCurrency: 'VND',
      unitText: 'NGÀY',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '47',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
