'use client';

import { motion } from 'framer-motion';
import { FileCheck, AlertTriangle, CreditCard, MapPinned } from 'lucide-react';

const sections = [
  {
    icon: FileCheck,
    title: 'Giấy tờ thuê xe',
    items: [
      'CCCD/CMND gốc + GPLX hạng B1 trở lên',
      'Hoặc Hộ chiếu (passport) đối với khách nước ngoài',
      'Tài sản thế chấp: 15 triệu (tiền mặt/chuyển khoản) hoặc xe máy + cà vẹt',
    ],
  },
  {
    icon: CreditCard,
    title: 'Thanh toán & Đặt cọc',
    items: [
      'Đặt cọc 50% khi xác nhận đơn (chuyển khoản qua MB/Vietcombank)',
      'Thanh toán phần còn lại khi giao xe',
      'Hoàn cọc 100% nếu huỷ trước 24h',
      'Hỗ trợ xuất hoá đơn VAT',
    ],
  },
  {
    icon: MapPinned,
    title: 'Giao – Nhận xe',
    items: [
      'Miễn phí giao xe trong bán kính 5KM từ Vincom Đồng Khởi',
      'Ngoài 5KM: phụ phí 15.000đ/km (cả hai chiều)',
      'Nhận xe sau 21h: phụ phí 100.000đ',
      'Hỗ trợ giao xe tại sân bay Tân Sơn Nhất',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Phụ phí có thể phát sinh',
    items: [
      'Phí trả xe trễ: 80.000đ/giờ (sau 1 giờ ân hạn)',
      'Phí vệ sinh xe quá bẩn: 200.000đ – 500.000đ',
      'Phí ám mùi (thuốc lá, đồ ăn): 500.000đ – 1.000.000đ',
      'Phí sạc lại pin nếu trả pin < 20%: theo lượng kWh tiêu thụ',
      'Vi phạm giao thông: khách hàng tự chịu trách nhiệm',
    ],
  },
];

export default function Policy() {
  return (
    <section id="policy" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            📋 Chính sách minh bạch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Quy định & <span className="gradient-text">Phụ phí</span>
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Tất cả thông tin được công khai minh bạch để bạn yên tâm thuê xe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-electric-400 to-indigo-500 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg">{s.title}</h3>
              </div>
              <ul className="space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm opacity-85">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-500 mt-2 flex-shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
