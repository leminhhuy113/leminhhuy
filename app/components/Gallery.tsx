'use client';

import { motion } from 'framer-motion';

const photos = [
  { title: 'Ngoại thất – Cyan Blue', desc: 'Màu xanh đặc trưng bản Plus' },
  { title: 'Nội thất Da Nappa', desc: 'Sang trọng từng đường chỉ' },
  { title: 'Màn hình 15.6"', desc: 'Cảm ứng siêu mượt' },
  { title: 'Cốp rộng 537L', desc: 'Dư sức chứa hành lý gia đình' },
  { title: 'Mâm 20 inch', desc: 'Thiết kế khí động học' },
  { title: 'Đèn LED Matrix', desc: 'Tự thích ứng môi trường' },
];

const gradients = [
  'from-electric-400 to-indigo-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-green-400 to-emerald-500',
  'from-purple-400 to-fuchsia-500',
  'from-blue-400 to-cyan-500',
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            📸 Thư viện ảnh
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Chiêm ngưỡng <span className="gradient-text">VF7 Plus</span>
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Vẻ đẹp đến từng chi tiết – ngoại thất, nội thất, công nghệ.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden glass cursor-pointer ${
                i === 0 ? 'lg:col-span-2 lg:row-span-2 sm:aspect-square' : ''
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-90`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />

              {/* Decorative car silhouette */}
              <svg
                viewBox="0 0 200 150"
                className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 30 100 Q 40 70 70 65 L 130 65 Q 160 70 170 100 L 170 110 Q 170 118 162 118 L 38 118 Q 30 118 30 110 Z"
                  fill="rgba(255,255,255,0.3)"
                />
                <circle cx="62" cy="118" r="11" fill="rgba(0,0,0,0.4)" />
                <circle cx="138" cy="118" r="11" fill="rgba(0,0,0,0.4)" />
              </svg>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/60 to-transparent text-white">
                <div className="font-bold text-sm sm:text-base">{p.title}</div>
                <div className="text-[11px] sm:text-xs opacity-90">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
