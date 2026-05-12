'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, MapPin, Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import { CONTACT } from '../lib/constants';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, honeypot }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setMsg(data.message || 'Đã gửi!');
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Có lỗi xảy ra.');
      }
    } catch {
      setStatus('error');
      setMsg('Không thể kết nối. Vui lòng gọi hotline.');
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            📞 Liên hệ
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Kết nối <span className="gradient-text">ngay với chúng tôi</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact cards */}
          <div className="space-y-3">
            <a
              href={`tel:${CONTACT.hotline}`}
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs opacity-60 uppercase tracking-wider">Hotline 24/7</div>
                <div className="font-display font-bold text-lg">{CONTACT.hotlineFormatted}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full glass">Bấm để gọi</div>
            </a>

            <a
              href={`https://zalo.me/${CONTACT.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-electric-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs opacity-60 uppercase tracking-wider">Zalo</div>
                <div className="font-display font-bold text-lg">{CONTACT.hotlineFormatted}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full glass">Chat ngay</div>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs opacity-60 uppercase tracking-wider">Email</div>
                <div className="font-display font-bold text-sm sm:text-base truncate">
                  {CONTACT.email}
                </div>
              </div>
            </a>

            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs opacity-60 uppercase tracking-wider">Địa điểm giao xe</div>
                <div className="font-display font-bold text-base">{CONTACT.address}</div>
                <div className="text-xs opacity-70 mt-0.5">Miễn phí giao trong 5KM</div>
              </div>
            </div>
          </div>

          {/* Quick form */}
          <div className="glass-strong rounded-3xl p-6 sm:p-7">
            <h3 className="font-display font-bold text-xl mb-2">Liên hệ nhanh</h3>
            <p className="text-sm opacity-70 mb-5">
              Để lại thông tin, chúng tôi sẽ gọi lại bạn trong 5 phút.
            </p>
            <form onSubmit={onSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ và tên *"
                className="form-input"
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại *"
                className="form-input"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Nội dung (không bắt buộc)"
                className="form-input resize-none"
              />
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-glow w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Gửi liên hệ
                  </>
                )}
              </button>
              {status === 'success' && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>{msg}</div>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>{msg}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
