import { NextRequest, NextResponse } from 'next/server';
import { sendTelegram, sendEmail, escapeHtml } from '@/app/lib/notify';
import { calculatePrice, formatVND, type RentMode } from '@/app/lib/pricing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface BookingPayload {
  name: string;
  phone: string;
  email?: string;
  mode: RentMode;
  startISO: string;
  endISO: string;
  hours?: number;
  insurance: boolean;
  unlimitedKm: boolean;
  pickupAddress?: string;
  note?: string;
  honeypot?: string;
}

function validate(p: any): { ok: true; data: BookingPayload } | { ok: false; error: string } {
  if (!p || typeof p !== 'object') return { ok: false, error: 'Invalid payload' };
  if (p.honeypot) return { ok: false, error: 'Spam detected' };
  if (!p.name || typeof p.name !== 'string' || p.name.length < 2)
    return { ok: false, error: 'Vui lòng nhập họ tên' };
  if (!p.phone || typeof p.phone !== 'string' || !/^[0-9+\s().-]{8,15}$/.test(p.phone))
    return { ok: false, error: 'Số điện thoại không hợp lệ' };
  if (!['self', 'driver', 'hourly'].includes(p.mode))
    return { ok: false, error: 'Loại thuê không hợp lệ' };
  if (p.mode !== 'hourly') {
    if (!p.startISO || !p.endISO)
      return { ok: false, error: 'Vui lòng chọn ngày nhận và ngày trả' };
  }
  return {
    ok: true,
    data: {
      name: p.name.trim().slice(0, 100),
      phone: p.phone.trim().slice(0, 20),
      email: typeof p.email === 'string' ? p.email.trim().slice(0, 100) : undefined,
      mode: p.mode,
      startISO: p.startISO || '',
      endISO: p.endISO || '',
      hours: p.hours ? Number(p.hours) : undefined,
      insurance: !!p.insurance,
      unlimitedKm: !!p.unlimitedKm,
      pickupAddress:
        typeof p.pickupAddress === 'string' ? p.pickupAddress.trim().slice(0, 200) : undefined,
      note: typeof p.note === 'string' ? p.note.trim().slice(0, 500) : undefined,
    },
  };
}

const MODE_LABEL: Record<RentMode, string> = {
  self: 'Tự lái',
  driver: 'Có tài xế',
  hourly: 'Theo giờ',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validate(body);
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }
    const d = result.data;

    // Tính giá ở server cho chắc
    const price = calculatePrice({
      mode: d.mode,
      startISO: d.startISO,
      endISO: d.endISO,
      hours: d.hours,
      insurance: d.insurance,
      unlimitedKm: d.unlimitedKm,
    });

    const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    // Telegram
    const tgLines = [
      `🚗 <b>ĐƠN THUÊ XE VF7 MỚI</b>`,
      `🕐 <i>${escapeHtml(now)}</i>`,
      ``,
      `👤 <b>Họ tên:</b> ${escapeHtml(d.name)}`,
      `📞 <b>SĐT:</b> ${escapeHtml(d.phone)}`,
    ];
    if (d.email) tgLines.push(`📧 <b>Email:</b> ${escapeHtml(d.email)}`);
    tgLines.push(``, `📋 <b>Loại thuê:</b> ${MODE_LABEL[d.mode]}`);
    if (d.mode === 'hourly') {
      tgLines.push(`⏱ <b>Số giờ:</b> ${d.hours || 4}h`);
    } else {
      const fmt = (iso: string) =>
        new Date(iso).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      tgLines.push(`📅 <b>Nhận xe:</b> ${escapeHtml(fmt(d.startISO))}`);
      tgLines.push(`📅 <b>Trả xe:</b> ${escapeHtml(fmt(d.endISO))}`);
      tgLines.push(`🗓 <b>Tổng:</b> ${price.days} ngày (T7/CN: ${price.weekendDays}, Lễ: ${price.holidayDays})`);
    }
    tgLines.push(``, `✨ <b>Tuỳ chọn:</b>`);
    tgLines.push(`   • Bảo hiểm: ${d.insurance ? '✅' : '❌'}`);
    tgLines.push(`   • Không giới hạn KM + sạc: ${d.unlimitedKm ? '✅' : '❌'}`);
    if (d.pickupAddress) tgLines.push(``, `📍 <b>Nhận xe tại:</b> ${escapeHtml(d.pickupAddress)}`);
    if (d.note) tgLines.push(``, `📝 <b>Ghi chú:</b> ${escapeHtml(d.note)}`);
    tgLines.push(``, `💰 <b>Tạm tính: ${formatVND(price.total)}</b>`);

    // Email
    const rows = price.items
      .map(
        (it) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eef;color:#0b0e1c;">
            <div style="font-weight:600">${escapeHtml(it.label)}</div>
            ${it.detail ? `<div style="font-size:12px;color:#666;margin-top:2px">${escapeHtml(it.detail)}</div>` : ''}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #eef;text-align:right;font-weight:600;color:#0b0e1c;">
            ${formatVND(it.amount)}
          </td>
        </tr>`,
      )
      .join('');

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:640px;margin:0 auto;background:#f8fbff;padding:24px;">
        <div style="background:linear-gradient(135deg,#11b0f5,#6366f1);color:#fff;padding:24px;border-radius:18px 18px 0 0;">
          <div style="font-size:13px;opacity:.85;letter-spacing:2px;">THUÊ XE VF7</div>
          <h1 style="margin:6px 0 0;font-size:24px;">🚗 Đơn thuê xe mới</h1>
          <div style="opacity:.85;font-size:13px;margin-top:4px;">${escapeHtml(now)}</div>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 18px 18px;box-shadow:0 4px 24px rgba(17,176,245,.08);">
          <h2 style="margin:0 0 12px;font-size:16px;color:#0b0e1c;">👤 Thông tin khách</h2>
          <table style="width:100%;font-size:14px;color:#333;border-collapse:collapse;">
            <tr><td style="padding:6px 0;width:120px;color:#666;">Họ tên</td><td style="font-weight:600;">${escapeHtml(d.name)}</td></tr>
            <tr><td style="padding:6px 0;color:#666;">SĐT</td><td style="font-weight:600;"><a href="tel:${escapeHtml(d.phone)}" style="color:#11b0f5;text-decoration:none;">${escapeHtml(d.phone)}</a></td></tr>
            ${d.email ? `<tr><td style="padding:6px 0;color:#666;">Email</td><td style="font-weight:600;">${escapeHtml(d.email)}</td></tr>` : ''}
          </table>

          <h2 style="margin:20px 0 12px;font-size:16px;color:#0b0e1c;">📋 Chi tiết thuê</h2>
          <table style="width:100%;font-size:14px;color:#333;border-collapse:collapse;">
            <tr><td style="padding:6px 0;width:120px;color:#666;">Loại</td><td style="font-weight:600;">${MODE_LABEL[d.mode]}</td></tr>
            ${
              d.mode === 'hourly'
                ? `<tr><td style="padding:6px 0;color:#666;">Số giờ</td><td style="font-weight:600;">${d.hours || 4}h</td></tr>`
                : `
                <tr><td style="padding:6px 0;color:#666;">Nhận xe</td><td style="font-weight:600;">${escapeHtml(new Date(d.startISO).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))}</td></tr>
                <tr><td style="padding:6px 0;color:#666;">Trả xe</td><td style="font-weight:600;">${escapeHtml(new Date(d.endISO).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))}</td></tr>
                <tr><td style="padding:6px 0;color:#666;">Tổng ngày</td><td style="font-weight:600;">${price.days} (T7/CN: ${price.weekendDays}, Lễ: ${price.holidayDays})</td></tr>`
            }
            <tr><td style="padding:6px 0;color:#666;">Bảo hiểm</td><td style="font-weight:600;">${d.insurance ? '✅ Có' : '❌ Không'}</td></tr>
            <tr><td style="padding:6px 0;color:#666;">Không giới hạn KM</td><td style="font-weight:600;">${d.unlimitedKm ? '✅ Có' : '❌ Không'}</td></tr>
            ${d.pickupAddress ? `<tr><td style="padding:6px 0;color:#666;">Địa chỉ giao</td><td style="font-weight:600;">${escapeHtml(d.pickupAddress)}</td></tr>` : ''}
            ${d.note ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top;">Ghi chú</td><td style="font-weight:600;white-space:pre-wrap;">${escapeHtml(d.note)}</td></tr>` : ''}
          </table>

          <h2 style="margin:20px 0 12px;font-size:16px;color:#0b0e1c;">💰 Tạm tính</h2>
          <table style="width:100%;border-collapse:collapse;background:#f8fbff;border-radius:12px;overflow:hidden;">
            ${rows}
            <tr>
              <td style="padding:14px 12px;font-weight:700;color:#0b0e1c;background:linear-gradient(135deg,rgba(17,176,245,.12),rgba(99,102,241,.12));">TỔNG CỘNG</td>
              <td style="padding:14px 12px;text-align:right;font-weight:800;font-size:18px;color:#11b0f5;background:linear-gradient(135deg,rgba(17,176,245,.12),rgba(99,102,241,.12));">${formatVND(price.total)}</td>
            </tr>
          </table>

          <p style="margin-top:20px;font-size:12px;color:#888;">* Giá tạm tính, chưa bao gồm phụ phí phát sinh (giao ngoài 5KM, vệ sinh xe nếu quá bẩn, v.v.). Liên hệ ngay với khách để xác nhận.</p>
        </div>
      </div>
    `;

    const subject = `🚗 Đơn thuê VF7 mới – ${d.name} – ${formatVND(price.total)}`;

    const [tg, mail] = await Promise.all([
      sendTelegram(tgLines.join('\n')),
      sendEmail({ subject, html, replyTo: d.email }),
    ]);

    return NextResponse.json({
      ok: true,
      message: 'Đã gửi yêu cầu! Chúng tôi sẽ liên hệ lại ngay.',
      total: price.total,
      delivered: { telegram: tg.ok, email: mail.ok },
    });
  } catch (e) {
    console.error('[booking] error:', e);
    return NextResponse.json(
      { ok: false, error: 'Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline.' },
      { status: 500 },
    );
  }
}
