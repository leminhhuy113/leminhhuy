'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import { calculatePrice, formatVND, type RentMode } from '../lib/pricing';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BookingForm() {
  const [mode, setMode] = useState<RentMode>('self');
  const [hours, setHours] = useState(4);

  // Default: nhận xe sau 2h, trả sau 1 ngày
  const initStart = (() => {
    const d = new Date();
    d.setHours(d.getHours() + 2, 0, 0, 0);
    return toLocalISO(d);
  })();
  const initEnd = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(d.getHours() + 2, 0, 0, 0);
    return toLocalISO(d);
  })();

  const [startISO, setStartISO] = useState(initStart);
  const [endISO, setEndISO] = useState(initEnd);
  const [insurance, setInsurance] = useState(true);
  const [unlimitedKm, setUnlimitedKm] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [note, setNote] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  const price = useMemo(
    () =>
      calculatePrice({
        mode,
        startISO: new Date(startISO).toISOString(),
        endISO: new Date(endISO).toISOString(),
        hours,
        insurance,
        unlimitedKm,
      }),
    [mode, startISO, endISO, hours, insurance, unlimitedKm],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setMsg('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          mode,
          startISO: new Date(startISO).toISOString(),
          endISO: new Date(endISO).toISOString(),
          hours,
          insurance,
          unlimitedKm,
          pickupAddress,
          note,
          honeypot,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setMsg(data.message || 'Đã gửi! Chúng tôi sẽ gọi lại ngay.');
      } else {
        setStatus('error');
        setMsg(data.error || 'Có lỗi xảy ra.');
      }
    } catch {
      setStatus('error');
      setMsg('Không thể kết nối. Vui lòng thử lại hoặc gọi hotline.');
    }
  }

  return (
    <section id="booking" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="shape-blob bg-electric-400 w-96 h-96 top-10 -right-20" />
        <div className="shape-blob bg-indigo-500 w-80 h-80 bottom-10 -left-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium mb-4 uppercase tracking-widest">
            📝 Đặt xe online
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Đặt xe <span className="gradient-text">chỉ 1 phút</span>
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Điền form bên dưới, hệ thống tự tính giá. Chúng tôi sẽ liên hệ xác nhận trong 5 phút.
          </p>
        </motion.div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={onSubmit} className="grid lg:grid-cols-5 gap-6">
            {/* LEFT – form */}
            <div className="lg:col-span-3 space-y-5">
              {/* Mode selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Loại thuê
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { v: 'self', label: 'Tự lái', sub: '1.2tr/ngày' },
                      { v: 'hourly', label: 'Theo giờ', sub: '800K/4h' },
                      { v: 'driver', label: 'Có tài', sub: '2.2tr/ngày' },
                    ] as { v: RentMode; label: string; sub: string }[]
                  ).map((m) => (
                    <button
                      type="button"
                      key={m.v}
                      onClick={() => setMode(m.v)}
                      className={`p-3 rounded-2xl text-center transition-all ${
                        mode === m.v
                          ? 'btn-glow shadow-lg'
                          : 'glass hover:scale-[1.02]'
                      }`}
                    >
                      <div className="text-sm font-bold">{m.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">{m.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date inputs */}
              {mode === 'hourly' ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                    Số giờ thuê (tối thiểu 4h)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[4, 8, 12, 16].map((h) => (
                      <button
                        type="button"
                        key={h}
                        onClick={() => setHours(h)}
                        className={`p-3 rounded-xl text-sm font-bold transition-all ${
                          hours === h
                            ? 'btn-glow'
                            : 'glass hover:scale-[1.02]'
                        }`}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                      Nhận xe
                    </label>
                    <input
                      type="datetime-local"
                      value={startISO}
                      onChange={(e) => setStartISO(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                      Trả xe
                    </label>
                    <input
                      type="datetime-local"
                      value={endISO}
                      onChange={(e) => setEndISO(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Add-ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Tuỳ chọn
                </label>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 p-3 rounded-2xl glass cursor-pointer hover:scale-[1.01] transition-transform">
                    <input
                      type="checkbox"
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                      className="glass-checkbox mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-semibold text-sm">Bảo hiểm thuê xe</div>
                        <div className="text-sm font-bold gradient-text">+200.000đ/ngày</div>
                      </div>
                      <div className="text-xs opacity-70 mt-0.5">
                        Miễn trừ trách nhiệm bồi thường khi sự cố ngoài ý muốn (khuyến khích)
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-2xl glass cursor-pointer hover:scale-[1.01] transition-transform">
                    <input
                      type="checkbox"
                      checked={unlimitedKm}
                      onChange={(e) => setUnlimitedKm(e.target.checked)}
                      className="glass-checkbox mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-semibold text-sm">
                          Không giới hạn KM + Sạc 100%
                        </div>
                        <div className="text-sm font-bold gradient-text">+300.000đ/ngày</div>
                      </div>
                      <div className="text-xs opacity-70 mt-0.5">
                        Đi bao nhiêu cũng được, miễn phí toàn bộ chi phí sạc
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Personal info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="0901234567"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Email (không bắt buộc)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Địa chỉ nhận xe
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="form-input"
                  placeholder="VD: Vincom Đồng Khởi – Q1 (miễn phí 5KM)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="form-input resize-none"
                  placeholder="VD: cần ghế trẻ em, cần biên nhận VAT..."
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
            </div>

            {/* RIGHT – price summary */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 space-y-4">
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">
                    Tạm tính
                  </div>
                  <ul className="space-y-2.5 mb-4">
                    {price.items.map((it, i) => (
                      <li key={i} className="flex justify-between gap-3 text-sm">
                        <div className="flex-1">
                          <div className="font-medium">{it.label}</div>
                          {it.detail && (
                            <div className="text-[11px] opacity-60 mt-0.5">{it.detail}</div>
                          )}
                        </div>
                        <div className="font-semibold whitespace-nowrap">
                          {formatVND(it.amount)}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                    <span className="font-bold">Tổng cộng</span>
                    <span className="font-display font-extrabold text-2xl gradient-text">
                      {formatVND(price.total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-glow w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi yêu cầu đặt xe
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-start gap-2 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>{msg}</div>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-start gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-sm">
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>{msg}</div>
                  </div>
                )}

                <p className="text-[11px] opacity-60 text-center leading-relaxed">
                  * Giá tạm tính, chưa bao gồm phụ phí phát sinh. Chúng tôi sẽ xác nhận chính xác
                  qua điện thoại trong 5 phút.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function toLocalISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
