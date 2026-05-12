import { PRICING, HOLIDAYS_2026 } from './constants';

export type RentMode = 'self' | 'driver' | 'hourly';

export interface PriceBreakdownItem {
  label: string;
  amount: number;
  detail?: string;
}

export interface PriceBreakdown {
  items: PriceBreakdownItem[];
  total: number;
  days: number;
  weekendDays: number;
  sundayDays: number;
  holidayDays: number;
}

export function formatVND(n: number): string {
  return n.toLocaleString('vi-VN') + 'đ';
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isHoliday(d: Date): boolean {
  return HOLIDAYS_2026.includes(toISODate(d));
}

function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6; // CN hoặc T7
}

function isSunday(d: Date): boolean {
  return d.getDay() === 0;
}

/**
 * Đếm số ngày thường, cuối tuần, lễ giữa 2 mốc (bao gồm cả ngày đầu).
 * Trả về số ngày = ceil((end - start)/24h), tối thiểu 1.
 */
export function analyzeDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return { days: 0, weekendDays: 0, sundayDays: 0, holidayDays: 0, normalDays: 0 };
  }

  const ms = end.getTime() - start.getTime();
  const days = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));

  let weekendDays = 0;
  let sundayDays = 0;
  let holidayDays = 0;

  for (let i = 0; i < days; i++) {
    const cur = new Date(start);
    cur.setDate(cur.getDate() + i);

    if (isHoliday(cur)) {
      holidayDays++;
    } else if (isWeekend(cur)) {
      weekendDays++;
      if (isSunday(cur)) sundayDays++;
    }
  }

  const normalDays = days - weekendDays - holidayDays;
  return { days, weekendDays, sundayDays, holidayDays, normalDays };
}

export interface PriceInput {
  mode: RentMode;
  startISO: string;
  endISO: string;
  hours?: number; // dùng khi mode === 'hourly'
  insurance: boolean;
  unlimitedKm: boolean;
}

export function calculatePrice(input: PriceInput): PriceBreakdown {
  const items: PriceBreakdownItem[] = [];
  let total = 0;
  let days = 0;
  let weekendDays = 0;
  let sundayDays = 0;
  let holidayDays = 0;

  if (input.mode === 'hourly') {
    const hours = Math.max(4, input.hours || 4);
    const blocks = Math.ceil(hours / 4);
    const subtotal = blocks * PRICING.selfDrive.hourly4h;
    items.push({
      label: `Thuê theo giờ (${blocks} x 4h)`,
      amount: subtotal,
      detail: `${formatVND(PRICING.selfDrive.hourly4h)} / 4h`,
    });
    total += subtotal;
    days = 1; // dùng cho tính bảo hiểm/unlimited theo ngày
  } else {
    const range = analyzeDateRange(input.startISO, input.endISO);
    days = range.days;
    weekendDays = range.weekendDays;
    sundayDays = range.sundayDays;
    holidayDays = range.holidayDays;

    if (input.mode === 'self') {
      const base = PRICING.selfDrive.base * days;
      items.push({
        label: `Giá thuê tự lái`,
        amount: base,
        detail: `${formatVND(PRICING.selfDrive.base)} x ${days} ngày`,
      });
      total += base;

      if (weekendDays > 0) {
        const sub = weekendDays * PRICING.selfDrive.weekendSurcharge;
        items.push({
          label: `Phụ thu cuối tuần (T7/CN)`,
          amount: sub,
          detail: `${formatVND(PRICING.selfDrive.weekendSurcharge)} x ${weekendDays} ngày`,
        });
        total += sub;
      }
      if (holidayDays > 0) {
        const sub = holidayDays * PRICING.selfDrive.holidaySurcharge;
        items.push({
          label: `Phụ thu Lễ Tết`,
          amount: sub,
          detail: `${formatVND(PRICING.selfDrive.holidaySurcharge)} x ${holidayDays} ngày`,
        });
        total += sub;
      }
    } else {
      // driver
      const base = PRICING.withDriver.base * days;
      items.push({
        label: `Giá thuê có tài xế`,
        amount: base,
        detail: `${formatVND(PRICING.withDriver.base)} x ${days} ngày`,
      });
      total += base;

      if (sundayDays > 0) {
        const sub = sundayDays * PRICING.withDriver.sundaySurcharge;
        items.push({
          label: `Phụ thu Chủ Nhật`,
          amount: sub,
          detail: `${formatVND(PRICING.withDriver.sundaySurcharge)} x ${sundayDays} ngày`,
        });
        total += sub;
      }
      if (holidayDays > 0) {
        const sub = holidayDays * PRICING.withDriver.holidaySurcharge;
        items.push({
          label: `Phụ thu Lễ Tết`,
          amount: sub,
          detail: `${formatVND(PRICING.withDriver.holidaySurcharge)} x ${holidayDays} ngày`,
        });
        total += sub;
      }
    }
  }

  // Add-ons (tính theo ngày, hourly = 1)
  if (input.insurance) {
    const sub = PRICING.addons.insurance * days;
    items.push({
      label: `Bảo hiểm thuê xe`,
      amount: sub,
      detail: `${formatVND(PRICING.addons.insurance)} x ${days} ngày`,
    });
    total += sub;
  }
  if (input.unlimitedKm) {
    const sub = PRICING.addons.unlimitedKm * days;
    items.push({
      label: `Không giới hạn KM + Sạc miễn phí 100%`,
      amount: sub,
      detail: `${formatVND(PRICING.addons.unlimitedKm)} x ${days} ngày`,
    });
    total += sub;
  }

  return { items, total, days, weekendDays, sundayDays, holidayDays };
}
