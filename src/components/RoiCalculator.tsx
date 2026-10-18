import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle, ArrowUpLeft, ShieldAlert } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenOrderModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenOrderModal }) => {
  const [stationCount, setStationCount] = useState<number>(12);
  const [hoursPerDay, setHoursPerDay] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(120000);

  // Calculations:
  // Average unbilled overtime per station without smart relay: 7 minutes per 1-hour session = ~11.6% time leakage
  // Plus buffet leak estimate: ~15%
  const monthlyRevenue = stationCount * hoursPerDay * 30 * hourlyRate * 0.65; // assuming 65% occupancy
  const estimatedMonthlyLeakage = monthlyRevenue * 0.16; // 16% lost due to manual time rounding & staff unbilled plays
  const buffetProfitBoost = stationCount * 30 * 25000; // Extra buffet orders from in-app menu
  const totalMonthlyGain = Math.round(estimatedMonthlyLeakage + buffetProfitBoost);
  const daysToPayback = Math.max(12, Math.round(32000000 / (totalMonthlyGain / 30)));

  return (
    <section id="roi-calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="bg-gradient-to-br from-[#0c1a33] via-[#091427] to-[#060c18] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>محاسبه‌گر دقیق بازگشت سرمایه گیم‌نت</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              ماهانه چقدر پول به خاطر محاسبه دستی در گیم‌نت شما می‌سوزد؟
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              تعداد دستگاه‌ها و نرخ حدودی خود را مشخص کنید تا ببینید سیستم رله هوشمند و حسابداری دیجی‌گیم ماهانه چقدر سود خالص به دخل شما اضافه می‌کند:
            </p>

            {/* Slider 1: Station Count */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">تعداد استیشن‌های بازی (کنسول یا PC):</span>
                <span className="font-outfit font-black text-emerald-400 text-lg tabular-nums">
                  {stationCount} دستگاه
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="2"
                value={stationCount}
                onChange={e => setStationCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>۴ دستگاه</span>
                <span>۲۰ دستگاه</span>
                <span>۴۰ دستگاه</span>
              </div>
            </div>

            {/* Slider 2: Hours Per Day */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">میانگین ساعت کاری فعال در شبانه‌روز:</span>
                <span className="font-outfit font-black text-emerald-400 text-lg tabular-nums">
                  {hoursPerDay} ساعت
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={hoursPerDay}
                onChange={e => setHoursPerDay(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>۶ ساعت</span>
                <span>۱۲ ساعت</span>
                <span>۱۸ ساعت</span>
              </div>
            </div>

            {/* Slider 3: Hourly Rate */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">نرخ کرایه هر ساعت بازی (تومان):</span>
                <span className="font-outfit font-black text-emerald-400 text-lg tabular-nums">
                  {hourlyRate.toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <input
                type="range"
                min="60000"
                max="250000"
                step="10000"
                value={hourlyRate}
                onChange={e => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>۶۰,۰۰۰ ت</span>
                <span>۱۵۰,۰۰۰ ت</span>
                <span>۲۵۰,۰۰۰ ت</span>
              </div>
            </div>
          </div>

          {/* Right Output Box (5 Cols) */}
          <div className="lg:col-span-5 bg-[#081120] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-xl w-fit">
              <ShieldAlert className="w-4 h-4" />
              <span>نتیجه تحلیل مالی گیم‌نت شما</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400">نشتی مالی و دقایق محاسبه نشده بدون رله هوشمند:</div>
              <div className="font-outfit font-black text-2xl sm:text-3xl text-red-400">
                {Math.round(estimatedMonthlyLeakage).toLocaleString('fa-IR')} <span className="text-xs text-slate-300">تومان در ماه</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">افزایش سود ماهانه تضمینی با دیجی‌گیم:</div>
              <div className="font-outfit font-black text-3xl sm:text-4xl text-emerald-400">
                {totalMonthlyGain.toLocaleString('fa-IR')} <span className="text-sm text-slate-300">تومان/ماه</span>
              </div>
              <div className="text-[11px] text-emerald-300">شامل جلوگیری از بازی اضافه + افزایش فروش بوفه</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-300">مدت زمان بازگشت کامل هزینه خرید نرم‌افزار:</span>
              <span className="font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-md font-outfit">
                تنها {daysToPayback} روز!
              </span>
            </div>

            <button
              onClick={onOpenOrderModal}
              type="button"
              className="cyber-action-btn cyber-action-btn--primary"
            >
              <span className="cyber-action-btn__shine" />
              <span>جلوگیری از ضرر و خرید دیجی‌گیم</span>
              <span className="cyber-action-btn__icon">
                <ArrowUpLeft className="w-4 h-4" />
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
