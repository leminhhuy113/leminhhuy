"use client";

import { FormEvent, useState } from "react";

const ldJson = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "Thuê xe VF7 Plus 2 cầu",
  telephone: "0901234334",
  email: "leminhhuy.lmh@gmail.com",
  areaServed: "TP.HCM",
  vehicleModelDate: "2025",
  makesOffer: {
    "@type": "Offer",
    priceCurrency: "VND",
    price: "1200000"
  }
};

export default function Home() {
  const [status, setStatus] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
    setStatus(res.ok ? "Đã gửi yêu cầu thành công!" : "Gửi thất bại, vui lòng gọi hotline.");
  }

  return (
    <main className="container grid">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <section className="glass hero">
        <span className="badge">thuê xe vf7 | thue xe vinfast vf7</span>
        <h1>🚗 VINFAST VF7 PLUS 2 CẦU | 349HP ⚡🚗</h1>
        <p>
          ✨ SUV điện mạnh mẽ – bản cao cấp nhất 100% PIN đi 496KM. Thuê xe VF7 Plus 2 cầu sang trọng,
          hiện đại, tối ưu cho công tác và du lịch gia đình.
        </p>
        <p>
          Hotline/Zalo: <b>0901234334</b> • Mail: <b>leminhhuy.lmh@gmail.com</b>
        </p>
      </section>

      <section className="glass hero">
        <h2>Bảng giá thuê xe VF7</h2>
        <table className="price-table">
          <tbody>
            <tr><th>Gói thuê</th><th>Giá</th></tr>
            <tr><td>Thuê tự lái (ngày thường)</td><td>1.200.000đ/ngày</td></tr>
            <tr><td>Thứ 7, Chủ Nhật</td><td>+200.000đ/ngày</td></tr>
            <tr><td>Lễ/Tết</td><td>+300.000đ/ngày</td></tr>
            <tr><td>Theo giờ (mỗi 4h)</td><td>800.000đ</td></tr>
            <tr><td>Thuê có tài xế</td><td>2.200.000đ/ngày</td></tr>
            <tr><td>Chủ Nhật (có tài xế)</td><td>+200.000đ</td></tr>
            <tr><td>Lễ/Tết (có tài xế)</td><td>+300.000đ</td></tr>
            <tr><td>Không giới hạn KM + sạc điện 100%</td><td>+300.000đ/ngày</td></tr>
            <tr><td>Giao xe miễn phí</td><td>Trong 5KM từ Vincom Đồng Khởi</td></tr>
          </tbody>
        </table>
        <p className="small">*Phụ phí có thể phát sinh theo thực tế lộ trình, thời gian, và điều kiện thuê xe.</p>
      </section>

      <section className="grid cols">
        <article className="glass hero">
          <h2>Đặt thuê xe nhanh</h2>
          <form className="grid" onSubmit={submit}>
            <input name="name" required placeholder="Họ và tên" />
            <input name="phone" required placeholder="Số điện thoại" />
            <input name="date" required type="date" />
            <select name="package">
              <option>Thuê tự lái</option>
              <option>Thuê có tài xế</option>
              <option>Theo giờ (4h)</option>
            </select>
            <label><input type="checkbox" name="insurance" value="200000" /> Bảo hiểm thuê xe (+200K/ngày)</label>
            <textarea name="note" placeholder="Nhu cầu, lộ trình, thời gian nhận trả xe..." rows={4} />
            <button type="submit">Gửi yêu cầu thuê xe VF7</button>
            {status && <p>{status}</p>}
          </form>
        </article>

        <article className="glass hero">
          <h2>Thông tin liên hệ</h2>
          <p>Mioto tham khảo xe: https://www.mioto.vn/car/vinfast-vf7-plus-2025/KHKGWB</p>
          <p>Hotline: 0901234334</p>
          <p>Zalo: 0901234334</p>
          <p>Email: leminhhuy.lmh@gmail.com</p>
          <p>Từ khoá SEO chính: thuê xe vf7, thue xe vf7, thue xe vinfast vf7, xe vf7 plus, vf7 2 cầu.</p>
        </article>
      </section>
    </main>
  );
}
