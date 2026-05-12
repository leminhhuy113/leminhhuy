'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Thuê xe VF7 Plus 2 cầu giá bao nhiêu một ngày?',
    a: 'Giá thuê xe VinFast VF7 Plus 2 cầu là 1.200.000đ/ngày cho thuê tự lái và 2.200.000đ/ngày cho thuê có tài xế. Thứ 7, Chủ Nhật phụ thu 200.000đ/ngày; Lễ Tết phụ thu 300.000đ/ngày. Có thể thuê theo giờ với mức 800.000đ/4 giờ.',
  },
  {
    q: 'VF7 Plus đi được bao nhiêu KM một lần sạc?',
    a: 'VinFast VF7 Plus phiên bản 2 cầu trang bị pin 87.7 kWh, cho phép di chuyển tới 496 KM mỗi lần sạc đầy theo công bố hãng. Trong điều kiện thực tế (chạy hỗn hợp đô thị + cao tốc), xe đi được khoảng 380–430 KM.',
  },
  {
    q: 'Thuê xe VF7 cần giấy tờ gì?',
    a: 'Bạn cần CCCD/CMND gốc và bằng lái xe hạng B1 trở lên. Đặt cọc 15 triệu tiền mặt hoặc xe máy + cà vẹt làm tài sản thế chấp. Khách nước ngoài có thể dùng hộ chiếu kèm bằng lái quốc tế.',
  },
  {
    q: 'Có giao xe miễn phí không?',
    a: 'Có. Chúng tôi giao xe miễn phí trong bán kính 5KM tính từ Vincom Đồng Khởi (Quận 1). Ngoài phạm vi 5KM tính phụ phí 15.000đ/km cho cả hai chiều giao-nhận.',
  },
  {
    q: 'Có gói không giới hạn KM không?',
    a: 'Có. Đăng ký gói "Không giới hạn KM" với phụ phí 300.000đ/ngày. Gói này bao luôn 100% chi phí sạc điện trong suốt chuyến – cực kỳ phù hợp khi đi xa Đà Lạt, Vũng Tàu, Phan Thiết.',
  },
  {
    q: 'Có bảo hiểm thuê xe không?',
    a: 'Có. Gói bảo hiểm thuê xe 200.000đ/ngày sẽ miễn trừ trách nhiệm bồi thường cho khách khi xảy ra sự cố ngoài ý muốn (va chạm nhẹ, trầy xước). Chúng tôi khuyến khích bạn mua gói này để yên tâm tận hưởng chuyến đi.',
  },
  {
    q: 'VF7 Plus có dễ lái không nếu chưa từng lái xe điện?',
    a: 'Rất dễ. VF7 Plus có chế độ Eco/Normal/Sport, hệ thống ADAS hỗ trợ giữ làn, cruise control. Khi giao xe, đội ngũ chúng tôi sẽ hướng dẫn kỹ càng 10–15 phút về cách sạc, chế độ lái và các tính năng tiện ích.',
  },
  {
    q: 'Có thể thuê xe VF7 đi tỉnh không?',
    a: 'Hoàn toàn được. VF7 Plus 2 cầu với quãng đường 496KM phù hợp đi các tuyến: TP.HCM – Vũng Tàu, TP.HCM – Đà Lạt, TP.HCM – Phan Thiết, TP.HCM – Nha Trang. Hệ thống trạm sạc V-Green phủ rộng khắp các tỉnh thành.',
  },
];

// JSON-LD cho FAQ schema
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            💬 Câu hỏi thường gặp
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Bạn cần biết về <span className="gradient-text">thuê xe VF7</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-sm sm:text-base flex-1">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    open === i ? 'rotate-180 text-electric-500' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm opacity-85 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
