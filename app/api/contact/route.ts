import { NextRequest, NextResponse } from 'next/server';
import { sendTelegram, sendEmail, escapeHtml } from '@/app/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name || '').trim().slice(0, 100);
    const phone = String(body?.phone || '').trim().slice(0, 20);
    const message = String(body?.message || '').trim().slice(0, 500);
    const honeypot = body?.honeypot;

    if (honeypot) {
      return NextResponse.json({ ok: false, error: 'Spam detected' }, { status: 400 });
    }
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: 'Vui lòng nhập họ tên' }, { status: 400 });
    }
    if (!/^[0-9+\s().-]{8,15}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: 'SĐT không hợp lệ' }, { status: 400 });
    }

    const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const tg = [
      `📞 <b>YÊU CẦU LIÊN HỆ MỚI</b>`,
      `🕐 <i>${escapeHtml(now)}</i>`,
      ``,
      `👤 <b>Họ tên:</b> ${escapeHtml(name)}`,
      `📞 <b>SĐT:</b> ${escapeHtml(phone)}`,
      message ? `\n📝 <b>Nội dung:</b>\n${escapeHtml(message)}` : '',
    ].join('\n');

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f8fbff;">
        <div style="background:linear-gradient(135deg,#11b0f5,#6366f1);color:#fff;padding:20px;border-radius:14px 14px 0 0;">
          <h2 style="margin:0;font-size:20px;">📞 Yêu cầu liên hệ mới</h2>
          <div style="opacity:.85;font-size:13px;margin-top:4px;">${escapeHtml(now)}</div>
        </div>
        <div style="background:#fff;padding:20px;border-radius:0 0 14px 14px;">
          <p style="margin:0 0 8px;"><strong>Họ tên:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 8px;"><strong>SĐT:</strong> <a href="tel:${escapeHtml(phone)}" style="color:#11b0f5;">${escapeHtml(phone)}</a></p>
          ${message ? `<p style="margin:8px 0 0;"><strong>Nội dung:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
        </div>
      </div>
    `;

    const [tgRes, mailRes] = await Promise.all([
      sendTelegram(tg),
      sendEmail({ subject: `📞 Liên hệ mới – ${name}`, html }),
    ]);

    return NextResponse.json({
      ok: true,
      message: 'Đã gửi! Chúng tôi sẽ gọi lại ngay.',
      delivered: { telegram: tgRes.ok, email: mailRes.ok },
    });
  } catch (e) {
    console.error('[contact] error:', e);
    return NextResponse.json(
      { ok: false, error: 'Có lỗi xảy ra, vui lòng gọi hotline.' },
      { status: 500 },
    );
  }
}
