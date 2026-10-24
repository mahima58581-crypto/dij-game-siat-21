import React, { useState } from 'react';
import { 
  Calculator, CheckCircle2, ArrowUpLeft, ShieldCheck, 
  Sparkles, Clock, Flame, Crown, Cpu, Gift, Zap
} from 'lucide-react';
import './RoiCalculator.css';

interface RoiCalculatorProps {
  onOpenOrderModal: (planId?: string) => void;
  onNavigateToPurchase?: (planId?: string) => void;
}

type DurationType = '1month' | '6month' | '1year';

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ 
  onOpenOrderModal,
  onNavigateToPurchase
}) => {
  const [stationCount, setStationCount] = useState<number>(12);
  const [duration, setDuration] = useState<DurationType>('6month');
  const [includeRelay, setIncludeRelay] = useState<boolean>(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Base monthly cost per station
  const BASE_MONTHLY_PER_STATION = 79000;

  // Duration multipliers & discounts
  let months = 1;
  let discountPercent = 0;
  let planId = 'silver';
  let planName = 'پلن ۱ ماهه (تست کلوپ)';

  if (duration === '1month') {
    months = 1;
    discountPercent = 0;
    planId = 'silver';
    planName = 'اشتراک ۱ ماهه';
  } else if (duration === '6month') {
    months = 6;
    discountPercent = 20; // 20% discount
    planId = 'gold';
    planName = 'اشتراک ۶ ماهه (پیشنهاد طلایی)';
  } else {
    months = 12;
    discountPercent = 35; // 35% discount
    planId = 'diamond';
    planName = 'اشتراک ۱ ساله (پکیج جامع VIP)';
  }

  // Base price calculation
  const rawSoftwarePrice = Math.max(590000, stationCount * BASE_MONTHLY_PER_STATION) * months;
  const softwareDiscountAmount = Math.round(rawSoftwarePrice * (discountPercent / 100));
  const finalSoftwarePrice = rawSoftwarePrice - softwareDiscountAmount;

  // Smart Hardware Relay calculation
  let relayPrice = 0;
  let relayDiscountText = '';
  if (includeRelay) {
    if (duration === '1year') {
      relayPrice = 0; // 100% Free gift on yearly plan!
      relayDiscountText = 'رایگان (هدیه ویژه اشتراک سالانه)';
    } else if (duration === '6month') {
      relayPrice = stationCount >= 16 ? 0 : 950000; // 60% discount or free for 16+ stations
      relayDiscountText = stationCount >= 16 ? 'رایگان (تعداد استیشن VIP)' : 'با ۵۰٪ تخفیف ویژه کلوپ';
    } else {
      relayPrice = 1950000; // Hardware cost on 1-month
      relayDiscountText = 'سخت‌افزار رله صنعتی اختصاصی';
    }
  }

  const totalAmount = finalSoftwarePrice + relayPrice;
  const totalDays = months * 30;
  const dailyCostPerStation = Math.round(totalAmount / (stationCount * totalDays));
  const monthlyEquivalent = Math.round(totalAmount / months);

  const handleOrderAction = () => {
    if (onNavigateToPurchase) {
      onNavigateToPurchase(planId);
    } else {
      onOpenOrderModal(planId);
    }
  };

  return (
    <section id="roi-calculator" className="calc-section-wrapper py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background Ambient Glow */}
      <div className="calc-ambient-glow" aria-hidden="true" />

      {/* Main Chassis */}
      <div 
        className="calc-master-chassis p-6 sm:p-10 lg:p-12 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <span className="calc-top-beam" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          
          {/* Right Inputs Column (7 Cols in RTL) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Telemetry Badge */}
            <div className="calc-badge">
              <span className="calc-beacon" aria-hidden="true" />
              <Calculator className="w-4 h-4" />
              <span>محاسبه‌گر هوشمند هزینه فعال‌سازی و اشتراک گیم‌نت</span>
            </div>

            {/* Section Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              هزینه فعال‌سازی نرم‌افزار دیجی‌گیم برای کلوپ شما چقدر می‌شود؟
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              تعداد کنسول‌ها و دوره زمانی مدنظرتان را مشخص کنید تا فاکتور دقیق، میزان تخفیف و هزینه هر کنسول را به صورت زنده و شفاف مشاهده کنید:
            </p>

            {/* Step 1: Console / Station Count Slider */}
            <div className="calc-step-card space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="font-bold text-slate-200 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-outfit text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  تعداد کنسول‌ها و استیشن‌های بازی (PS5 ،PC ،Xbox):
                </span>
                <span className="font-outfit font-black text-emerald-400 text-xl sm:text-2xl tabular-nums bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                  {stationCount} <span className="text-xs font-bold font-vazir text-emerald-300">کنسول / سیستم</span>
                </span>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs text-slate-400 font-medium ml-1">انتخاب سریع:</span>
                {[6, 10, 16, 24, 32].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStationCount(num)}
                    className={`preset-chip-btn ${stationCount === num ? 'active' : ''}`}
                  >
                    {num} کنسول
                  </button>
                ))}
              </div>

              {/* Slider Input */}
              <div className="space-y-1 pt-2">
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="1"
                  value={stationCount}
                  onChange={e => setStationCount(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-outfit pt-1">
                  <span>۴ استیشن</span>
                  <span>۲۰ استیشن</span>
                  <span>۴۰+ استیشن</span>
                </div>
              </div>
            </div>

            {/* Step 2: Duration Selector (1 Month, 6 Months, 1 Year) */}
            <div className="calc-step-card space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-outfit text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  مدت زمان اشتراک و فعال‌سازی:
                </span>
                <span className="text-xs text-cyan-400 font-semibold">
                  {duration === '1year' ? 'بیشترین تخفیف + هدیه' : duration === '6month' ? 'پیشنهاد محبوب ۸۰٪ کلوپ‌ها' : 'تست یک‌ماهه'}
                </span>
              </div>

              {/* 3 Selectable Duration Cards */}
              <div className="plan-duration-grid">
                
                {/* 1 Month */}
                <div 
                  onClick={() => setDuration('1month')}
                  className={`duration-card ${duration === '1month' ? 'is-selected' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center">
                      {duration === '1month' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">۱ ماهه</h4>
                    <p className="text-[11px] text-slate-400 mt-1">تست اولیه بدون تعهد طولانی</p>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-3 border-t border-slate-800 pt-2">
                    نرخ پایه ماهانه
                  </div>
                </div>

                {/* 6 Months */}
                <div 
                  onClick={() => setDuration('6month')}
                  className={`duration-card ${duration === '6month' ? 'is-selected' : ''}`}
                >
                  <span className="duration-badge-popular">پیشنهاد ویژه VIP</span>
                  <div className="flex items-center justify-between mb-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center">
                      {duration === '6month' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">۶ ماهه</h4>
                    <p className="text-[11px] text-slate-400 mt-1">اقتصادی و پرفروش‌ترین پلن</p>
                  </div>
                  <div>
                    <span className="duration-badge-discount">۲۰٪ تخفیف ویژه</span>
                  </div>
                </div>

                {/* 1 Year */}
                <div 
                  onClick={() => setDuration('1year')}
                  className={`duration-card ${duration === '1year' ? 'is-selected' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Crown className="w-5 h-5 text-cyan-400" />
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center">
                      {duration === '1year' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">۱ ساله</h4>
                    <p className="text-[11px] text-slate-400 mt-1">پکیج جامع سالانه بدون دغدغه</p>
                  </div>
                  <div>
                    <span className="duration-badge-discount">۳۵٪ تخفیف طلایی</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Step 3: Optional Smart Hardware Relay Box */}
            <div 
              onClick={() => setIncludeRelay(!includeRelay)}
              className={`calc-toggle-card ${includeRelay ? 'active' : ''}`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    دستگاه رله هوشمند قطع و وصل خودکار برق کنسول‌ها
                    {duration === '1year' && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/40 font-bold">
                        هدیه رایگان سالانه!
                      </span>
                    )}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    قطع برق تلویزیون یا مانیتور سر صدم ثانیه پایان شارژ بدون نیاز به کامپیوتر روشن
                  </p>
                </div>
              </div>

              <div className={`switch-indicator ${includeRelay ? 'is-on' : ''}`}>
                <span className="switch-thumb" />
              </div>
            </div>

          </div>

          {/* Left Live Invoice Column (5 Cols in RTL) */}
          <div className="lg:col-span-5 calc-invoice-card space-y-6">
            
            {/* Invoice Top Header */}
            <div className="invoice-header">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-sm">پیش‌فاکتور رسمی فعال‌سازی آنی</span>
              </div>
              <span className="text-[11px] font-outfit font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                DIGI // 2026
              </span>
            </div>

            {/* Total Price Highlight Display */}
            <div className="invoice-price-box space-y-2">
              <span className="text-xs text-slate-400 font-medium block">
                مبلغ نهایی قابل پرداخت ({months} ماهه برای {stationCount} دستگاه):
              </span>
              <div className="invoice-total-amount">
                {totalAmount.toLocaleString('fa-IR')} <span className="text-sm font-bold text-slate-300">تومان</span>
              </div>
              
              {/* Daily & Monthly Equivalents */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-300 pt-1">
                <span>معادل ماهانه:</span>
                <strong className="text-emerald-400 font-outfit">{monthlyEquivalent.toLocaleString('fa-IR')} تومان</strong>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-300">روزی {dailyCostPerStation.toLocaleString('fa-IR')} ت/کنسول</span>
              </div>
            </div>

            {/* Detailed Line Items */}
            <div className="space-y-2 pt-2">
              <div className="invoice-row">
                <span>لایسنس رسمی نرم‌افزار ({stationCount} کنسول):</span>
                <span className="font-outfit font-bold">{rawSoftwarePrice.toLocaleString('fa-IR')} تومان</span>
              </div>

              {softwareDiscountAmount > 0 && (
                <div className="invoice-row text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    تخفیف دوره زمانی ({discountPercent}٪):
                  </span>
                  <span className="font-outfit font-bold">-{softwareDiscountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}

              {includeRelay && (
                <div className="invoice-row">
                  <span>سخت‌افزار باکس رله هوشمند:</span>
                  <span className={relayPrice === 0 ? "text-cyan-400 font-bold" : "font-outfit font-bold"}>
                    {relayPrice === 0 ? "رایگان (۰ تومان)" : `${relayPrice.toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>
              )}

              <div className="invoice-row text-slate-400 text-xs">
                <span>نصب آنلاین، آموزش و پشتیبانی فنی:</span>
                <span className="text-emerald-400 font-bold">۱۰۰٪ رایگان</span>
              </div>
            </div>

            {/* Highlights Checklist */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>گارانتی بازگشت ۱۰۰٪ وجه تا ۳۰ روز در صورت نارضایتی</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>۵ روز تست رایگان و بدون قید و شرط قبل از پرداخت</span>
              </div>
            </div>

            {/* CTA Order Button */}
            <button
              onClick={handleOrderAction}
              type="button"
              className="calc-order-btn"
            >
              <span className="calc-btn-shine" />
              <span>ثبت سفارش و فعال‌سازی آنلاین</span>
              <ArrowUpLeft className="w-5 h-5 shrink-0" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
