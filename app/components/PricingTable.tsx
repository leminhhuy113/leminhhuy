'use client';

import { motion } from 'framer-motion';
import { Check, Star, Clock, User, Calendar, Gift } from 'lucide-react';
import { formatVND } from '../lib/pricing';
import { PRICING } from '../lib/constants';

const plans = [
  {
    icon: User,
    title: 'Tự Lái',
    badge: 'Phổ biến nhất',
    badgeColor: 'from-electric-400 to-indigo-500',
    price: PRICING.selfDrive.base,
    unit: '/ ngày',
    highlight: true,
    features: [
      `T7, CN: phụ thu ${formatVND(PRICING.selfDrive.weekendSurcharge)}/ngày`,
      `Lễ Tết: phụ thu ${formatVND(PRICING.selfDrive.holidaySurcharge)}/ngày`,
      'Giao xe miễn phí 5KM từ Vincom Đồng Khởi',
      'Có thể thuê tối thiểu 1 ngày',
      'Yêu cầu CCCD + GPLX hạng B trở lên',
    ],
  },
  {
    icon: Clock,
    title: 'Theo Giờ',
    badge: 'Linh hoạt',
    badgeColor: 'from-amber-400 to-orange-500',
    price: PRICING.selfDrive.hourly4h,
    unit: '/ 4 giờ',
    features: [
      'Tối thiểu 4 giờ',
      'Thích hợp đi sự kiện, chụp ảnh, work-trip ngắn',
      'Phụ phí cuối tuần & lễ tết áp dụng tương tự ngày',
      'Giao nhận tại Vincom Đồng Khởi',
    ],
  },
  {
    icon: Star,
    title: 'Có Tài Xế',
    badge: 'Sang trọng',
    badgeColor: 'from-pink-400 to-rose-500',
    price: PRICING.withDriver.base,
    unit: '/ ngày',
    features: [
      'Tài xế kinh nghiệm 5+ năm, lịch sự',
      `CN: phụ thu ${formatVND(PRICING.withDriver.sundaySurcharge)}/ngày`,
      `Lễ Tết: phụ thu ${formatVND(PRICING.withDriver.holidaySurcharge)}/ngày`,
      'Chi phí ăn ở tài xế: khách hỗ trợ nếu đi xa',
      'Phù hợp đi công tác, đón sân bay',
    ],
  },
];

const addons = [
  {
    icon: Gift,
    title: 'Bảo hiểm thuê xe',
    price: PRICING.addons.insurance,
    unit: '/ ngày',
    desc: 'An tâm tuyệt đối – bảo hiểm thân vỏ, miễn trừ trách nhiệm khi xảy ra sự cố ngoài ý muốn.',
  },
  {
    icon: Calendar,
    title: 'Không giới hạn KM + Sạc 100%',
    price: PRICING.addons.unlimitedKm,
    unit: '/ ngày',
    desc: 'Đi bao nhiêu cũng được, không lo phí vượt km. Bao luôn chi phí sạc điện toàn chuyến.',
  },
];

export default function PricingTable() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="shape-blob bg-electric-400 w-80 h-80 top-20 left-1/4" />
        <div className="shape-blob bg-pink-500 w-96 h-96 bottom-0 right-1/4" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            💰 Bảng giá minh bạch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Bảng giá <span className="gradient-text">thuê xe VF7</span>
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Niêm yết rõ ràng – không phụ phí bất ngờ. Cam kết giá tốt nhất Sài Gòn.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 ${
                p.highlight
                  ? 'glass-strong ring-2 ring-electric-400/50 shadow-2xl scale-[1.02]'
                  : 'glass'
              }`}
            >
              {p.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white bg-gradient-to-r ${p.badgeColor} shadow-lg`}
                >
                  {p.badge}
                </div>
              )}

              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-5">
                <p.icon className="w-6 h-6 text-electric-500" />
              </div>

              <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-extrabold text-4xl gradient-text">
                  {p.price.toLocaleString('vi-VN')}
                </span>
                <span className="font-semibold opacity-70">đ {p.unit}</span>
              </div>

              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 text-electric-500 flex-shrink-0" />
                    <span className="opacity-85">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={`mt-7 w-full text-center inline-flex items-center justify-center px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${
                  p.highlight
                    ? 'btn-glow shadow-lg'
                    : 'glass hover:scale-[1.02]'
                }`}
              >
                Đặt gói này
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl p-6 sm:p-8"
        >
          <h3 className="font-display font-bold text-xl mb-5 text-center">
            ✨ Dịch vụ cộng thêm
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {addons.map((a) => (
              <div
                key={a.title}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-white/5"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-electric-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="font-bold text-sm">{a.title}</h4>
                    <div className="font-bold text-sm gradient-text whitespace-nowrap">
                      +{a.price.toLocaleString('vi-VN')}đ {a.unit}
                    </div>
                  </div>
                  <p className="text-xs opacity-70 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-xs opacity-60 mt-6 max-w-2xl mx-auto">
          * Giá có thể thay đổi theo mùa cao điểm. Giao xe ngoài 5KM tính phụ phí 15.000đ/km. Có
          thể phát sinh phụ phí vệ sinh, sạc trả lại nếu xe được trả không trong tình trạng ban
          đầu.
        </p>
      </div>
    </section>
  );
}
