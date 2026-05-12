import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const text = [
    "Yêu cầu thuê xe VF7 mới:",
    `Tên: ${data.name || ""}`,
    `SĐT: ${data.phone || ""}`,
    `Ngày thuê: ${data.date || ""}`,
    `Gói thuê: ${data.package || ""}`,
    `Bảo hiểm: ${data.insurance ? "Có (+200K/ngày)" : "Không"}`,
    `Ghi chú: ${data.note || ""}`
  ].join("\n");

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "leminhhuy.lmh@gmail.com",
      subject: "Đơn thuê xe VF7 mới",
      text
    });
  }

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
    });
  }

  return NextResponse.json({ ok: true });
}
