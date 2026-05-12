'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Battery,
  Shield,
  MapPin,
  Sparkles,
  Gauge,
  Wifi,
  Car,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '349 HP – 500 Nm',
    desc: 'Mô-tơ kép AWD, tăng tốc 0–100 km/h chỉ 5.8 giây. Cảm giác lái phấn khích.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Battery,
    title: 'Pin 87.7 kWh – 496 KM',
    desc: 'Pin LFP an toàn, đi xa với một lần sạc. Sạc nhanh 10–70% trong ~30 phút.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Car,
    title: '2 Cầu Điện AWD',
    desc: 'Bám đường tuyệt vời, vận hành êm ái trên mọi địa hình – kể cả đường đèo Đà Lạt.',
    color: 'from-electric-400 to-indigo-500',
  },
  {
    icon: Sparkles,
    title: 'Nội thất Cao Cấp Nhất',
    desc: 'Da Nappa, ghế chỉnh điện, làm mát/sưởi, panorama, âm thanh 13 loa.',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: Shield,
    title: 'ADAS – An Toàn Tối Đa',
    desc: 'Cruise control, giữ làn, cảnh báo điểm mù, camera 360, 6 túi khí.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: MapPin,
    title: 'Giao Xe Miễn Phí 5KM',
    desc: 'Tính từ Vincom Đồng Khởi. Giao tận nơi, hướng dẫn sử dụng kỹ càng.',
    color: 'from-purple-400 to-fuchsia-500',
  },
  {
    icon: Wifi,
    title: 'Màn Hình 15.6"',
    desc: 'Kết nối Apple CarPlay, Android Auto. Cập nhật OTA, điều hướng thông minh.',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Gauge,
    title: 'Vận Hành Tiết Kiệm',
    desc: 'Không xăng – không khói. Tiết kiệm 80% chi phí so với xe xăng truyền thống.',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            ✨ Tính năng nổi bật
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Vì sao chọn <span className="gradient-text">VF7 Plus 2 Cầu</span>?
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Phiên bản cao cấp nhất của dòng VF7 – mạnh mẽ, sang trọng và thân thiện môi trường.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-base mb-2">{f.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
