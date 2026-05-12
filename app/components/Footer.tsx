import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT, SITE } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                VF7
              </div>
              <div>
                <div className="font-display font-bold">{SITE.name}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  {SITE.domain}
                </div>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Cho thuê VinFast VF7 Plus 2 cầu – SUV điện cao cấp nhất tại TP.HCM. Giao xe nhanh,
              giá tốt, hỗ trợ 24/7.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-90">
              Dịch vụ
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a href="#pricing" className="hover:opacity-100">
                  Thuê tự lái
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:opacity-100">
                  Thuê có tài xế
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:opacity-100">
                  Thuê theo giờ
                </a>
              </li>
              <li>
                <a href="#policy" className="hover:opacity-100">
                  Đưa đón sân bay
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-90">
              Thông tin
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a href="#features" className="hover:opacity-100">
                  Về xe VF7 Plus
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:opacity-100">
                  Bảng giá
                </a>
              </li>
              <li>
                <a href="#policy" className="hover:opacity-100">
                  Quy định
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:opacity-100">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-90">
              Liên hệ
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li>
                <a
                  href={`tel:${CONTACT.hotline}`}
                  className="flex items-center gap-2 hover:opacity-100"
                >
                  <Phone className="w-4 h-4 text-electric-500" />
                  {CONTACT.hotlineFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`https://zalo.me/${CONTACT.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-100"
                >
                  <MessageCircle className="w-4 h-4 text-electric-500" />
                  Zalo: {CONTACT.hotlineFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 hover:opacity-100 break-all"
                >
                  <Mail className="w-4 h-4 text-electric-500 flex-shrink-0" />
                  <span className="text-xs">{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-electric-500 flex-shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-60">
          <div>
            © {new Date().getFullYear()} {SITE.name} • Tất cả các quyền được bảo lưu
          </div>
          <div className="flex items-center gap-4">
            <span>VinFast VF7 Plus 2 Cầu 349HP</span>
            <span>•</span>
            <span>Made with ⚡ in Sài Gòn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
