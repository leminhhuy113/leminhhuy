export const SITE = {
  name: 'Thuê Xe VF7',
  domain: 'thuexevf7.com',
  url: 'https://thuexevf7.com',
  description:
    'Cho thuê VinFast VF7 Plus 2 cầu 349HP – SUV điện cao cấp nhất, pin đầy đi 496KM. Giá chỉ từ 1.200.000đ/ngày.',
} as const;

export const CONTACT = {
  hotline: '0901234334',
  hotlineFormatted: '090 123 4334',
  zalo: '0901234334',
  email: 'leminhhuy.lmh@gmail.com',
  address: 'Vincom Đồng Khởi, Quận 1, TP.HCM',
  workingHours: '24/7 – Hỗ trợ mọi lúc',
} as const;

export const CAR = {
  name: 'VinFast VF7 Plus 2 Cầu 2025',
  shortName: 'VF7 Plus AWD',
  power: '349 HP',
  range: '496 KM',
  battery: '87.7 kWh',
  acceleration: '0–100 km/h trong 5.8s',
  drivetrain: 'AWD – 2 Cầu Điện',
  seats: 5,
  year: 2025,
  highlights: [
    '🚗 VINFAST VF7 PLUS 2 CẦU | 349HP ⚡',
    '✨ SUV điện mạnh mẽ – bản cao cấp nhất',
    '🔋 100% PIN đi 496KM',
  ],
} as const;

// Đơn vị: VND
export const PRICING = {
  // Tự lái
  selfDrive: {
    base: 1_200_000, // /ngày
    weekendSurcharge: 200_000, // T7, CN
    holidaySurcharge: 300_000, // Lễ Tết
    hourly4h: 800_000, // mỗi 4h
  },
  // Có tài xế
  withDriver: {
    base: 2_200_000,
    sundaySurcharge: 200_000, // Chỉ CN
    holidaySurcharge: 300_000,
  },
  // Tuỳ chọn
  addons: {
    insurance: 200_000, // /ngày
    unlimitedKm: 300_000, // /ngày – kèm sạc miễn phí 100%
  },
  freeDeliveryKm: 5, // tính từ Vincom Đồng Khởi
} as const;

// Lễ Tết Việt Nam 2026 (chỉ ngày dương lịch cố định, dùng để demo)
// Có thể mở rộng/đẩy sang server-side để chính xác hơn.
export const HOLIDAYS_2026 = [
  '2026-01-01', // Tết Dương lịch
  '2026-02-16', // 30 Tết
  '2026-02-17', // Mùng 1 Tết
  '2026-02-18', // Mùng 2 Tết
  '2026-02-19', // Mùng 3 Tết
  '2026-02-20', // Mùng 4 Tết
  '2026-04-26', // Giỗ Tổ Hùng Vương (10/3 ÂL)
  '2026-04-30', // Giải phóng miền Nam
  '2026-05-01', // Quốc tế Lao động
  '2026-09-02', // Quốc khánh
];
