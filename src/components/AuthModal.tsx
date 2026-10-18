import React, { useState } from 'react';
import {
  X, Lock, Phone, ShieldCheck, Gamepad2, Building2,
  CheckCircle2, Sparkles, Percent, Calculator, ChevronRight, ChevronLeft,
  ArrowUpLeft
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: (role: 'owner' | 'gamer') => void;
}

type PlanId = 'silver' | 'gold' | 'diamond';
type AuthStep = 'name' | 'phone' | 'otp' | 'purchase' | 'success';

const PLAN_IDS: PlanId[] = ['silver', 'gold', 'diamond'];
const PLAN_IDS_FOR_DISPLAY: PlanId[] = ['silver', 'gold', 'diamond'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [step, setStep] = useState<AuthStep>('name');
  const [role, setRole] = useState<'owner' | 'gamer'>('owner');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const [selectedPlan, setSelectedPlan] = useState<PlanId>('gold');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [stations, setStations] = useState(8);
  const [hoursPerDay, setHoursPerDay] = useState(10);
  const [daysPerMonth, setDaysPerMonth] = useState(22);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState<{ code: string; percent: number } | null>(null);
  const [purchaseSubmitted, setPurchaseSubmitted] = useState(false);
  const [purchaseError, setPurchaseError] = useState('');

  const plan = PRICING_PLANS.find(p => p.id === selectedPlan)!;
  const basePrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const calculatorTotal = stations * hoursPerDay * daysPerMonth * 4500;
  let discountPercent = 0;
  if (discountApplied) discountPercent = discountApplied.percent;
  const discountAmount = Math.floor((calculatorTotal + basePrice) * (discountPercent / 100));
  const grandTotal = calculatorTotal + basePrice - discountAmount;

  const format = (v: number) => v.toLocaleString('fa-IR');

  const goNext = () => {
    if (step === 'name') {
      if (!fullName.trim()) return;
      setStep('phone');
    } else if (step === 'phone') {
      const digits = phone.replace(/[^0-9]/g, '');
      if (!/^09\d{9}$/.test(digits)) return;
      setStep('otp');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(v);
    setOtpError('');
  };

  const verifyOtp = () => {
    if (otp.length !== 6) { setOtpError('کد ۶ رقمی را کامل وارد کنید.'); return; }
    setStep('purchase');
  };

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) return;
    const codes: Record<string, number> = { DIGI2026: 15, VIP50: 10, GAMER10: 5, OPENING: 20 };
    if (codes[code] !== undefined) {
      setPurchaseError('');
      setDiscountApplied({ code, percent: codes[code] });
    } else {
      setPurchaseError('کد تخفیف نامعتبر است.');
    }
  };

  const finalizePurchase = () => {
    setPurchaseSubmitted(true);
    setTimeout(() => {
      setStep('success');
      setPurchaseSubmitted(false);
      if (onSuccessLogin) onSuccessLogin(role);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b1324] border border-slate-700/80 rounded-3xl max-w-lg w-full sm:max-w-[620px] p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ===== STEP 1: NAME ===== */}
        {step === 'name' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">DIGIGAME ACCOUNT</span>
              <h2 className="text-xl sm:text-2xl font-black text-white section-glow-text">ثبت‌نام کاربر جدید</h2>
              <p className="text-xs text-slate-400">برای خرید و فعال‌سازی نرم‌افزار دیجی‌گیم، ابتدا نام و شماره همراه را وارد کنید.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={role === 'owner'
                  ? 'py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border bg-emerald-500/10 border-emerald-400/40 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-800 text-slate-500 hover:border-emerald-400/40 hover:bg-slate-800/50'}
              >
                <Building2 className="w-4 h-4" />
                <span className="font-black">مالک / مدیر گیم‌نت</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('gamer')}
                className={role === 'gamer'
                  ? 'py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border bg-emerald-500/10 border-emerald-400/40 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-800 text-slate-500 hover:border-emerald-400/40 hover:bg-slate-800/50'}
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="font-black">گیمر / بازیکن</span>
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block mb-1">نام و نام خانوادگی:</label>
              <input
                autoFocus
                type="text"
                placeholder="مثال: رضا امیری"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 text-white text-right focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={goNext}
                disabled={!fullName.trim()}
                className="cyber-action-btn cyber-action-btn--primary flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
              >
                <span className="cyber-action-btn__shine" />
                <span>پیوستن به مرحله بعدی</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 2: PHONE ===== */}
        {step === 'phone' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">احراز هویت موبایل</span>
              <h2 className="text-xl sm:text-2xl font-black text-white section-glow-text">شماره همراه خود را وارد کنید</h2>
              <p className="text-xs text-slate-400">یک کد تایید ۶ رقمی به شماره زیر ارسال می‌شود.</p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  autoFocus
                  type="tel"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength="11"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-right"
                />
              </div>

              <button
                onClick={goNext}
                disabled={!/^09\d{9}$/.test(phone)}
                className="cyber-action-btn cyber-action-btn--primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
              >
                <span className="cyber-action-btn__shine" />
                <span>ارسال کد تایید</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </button>
            </div>

            <div className="flex justify-center gap-2 text-[11px] text-slate-500">
              <button onClick={() => setStep('name')} className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer">بازگشت به نام</button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: OTP ===== */}
        {step === 'otp' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">کد تایید از طریق پیامک</span>
              <h2 className="text-xl sm:text-2xl font-black text-white section-glow-text">کد تایید را وارد کنید</h2>
              <p className="text-xs text-slate-400">کد ۶ رقمی به شماره ارسال شد.</p>
            </div>

            {otpError && (
              <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs text-center">{otpError}</div>
            )}

            <div className="flex justify-center gap-2 px-4">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={otp[i] || ''}
                  onChange={e => {
                    const v = e.target.value.replace(/[^0-9]/g, '');
                    const newOtp = otp.slice(0, i) + v + otp.slice(i + 1);
                    setOtp(newOtp);
                    if (v && i < 5) { (e.target as HTMLInputElement).nextElementSibling?.focus(); }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !e.target.value && i > 0) { (e.target as HTMLInputElement).previousElementSibling?.focus(); }
                  }}
                  autoFocus={i === 0}
                  className="w-8 h-12 text-center text-2xl font-black text-emerald-400 bg-slate-900/60 border border-emerald-400/50 rounded-xl focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(57,255,120,0.4)]"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={otp.length !== 6}
              className="cyber-action-btn cyber-action-btn--primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
            >
              <span className="cyber-action-btn__shine" />
              <span>تایید کد و ورود به صفحه خرید</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <div className="flex justify-center gap-2 text-[11px] text-slate-500">
              <button onClick={() => setStep('phone')} className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer">ارسال مجدد کد</button>
              <button onClick={() => setStep('name')} className="text-slate-500 hover:text-white font-bold underline cursor-pointer">تغییر شماره</button>
            </div>
          </div>
        )}

        {/* ===== STEP 4: PURCHASE ===== */}
        {step === 'purchase' && (
          <PurchaseFlowUI
            fullName={fullName}
            phone={phone}
            onBack={() => setStep('otp')}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            stations={stations}
            setStations={setStations}
            hoursPerDay={hoursPerDay}
            setHoursPerDay={setHoursPerDay}
            daysPerMonth={daysPerMonth}
            setDaysPerMonth={setDaysPerMonth}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            discountApplied={discountApplied}
            applyDiscount={applyDiscount}
            purchaseError={purchaseError}
            purchaseSubmitted={purchaseSubmitted}
            plan={plan}
            basePrice={basePrice}
            calculatorTotal={calculatorTotal}
            discountAmount={discountAmount}
            grandTotal={grandTotal}
            onFinalize={finalizePurchase}
          />
        )}

        {/* ===== STEP 5: SUCCESS ===== */}
        {step === 'success' && (
          <div className="py-10 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce-slow">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">خرید و فعال‌سازی با موفقیت انجام شد ✅</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              کاربر <span className="text-emerald-400 font-bold">{fullName}</span> با موفقیت در سامانه دیجی‌گیم ثبت شد.
            </p>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <div>کد پیگیری سفارش: <span className="font-mono text-emerald-400 font-bold">DG-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div>پلن انتخاب شده: <span className="text-white font-bold">{plan.name}</span></div>
              <div>مبلغ نهایی: <span className="font-outfit text-white font-bold">{format(grandTotal)} تومان</span></div>
            </div>
            <button
              onClick={onClose}
              className="cyber-action-btn cyber-action-btn--primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
            >
              <span className="cyber-action-btn__shine" />
              <span>بستن و بازگشت به سایت</span>
              <ArrowUpLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

type PurchaseFlowUIProps = {
  fullName: string;
  phone: string;
  onBack: () => void;
  onFinalize: () => void;
  selectedPlan: PlanId;
  setSelectedPlan: (id: PlanId) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (c: 'monthly' | 'yearly') => void;
  stations: number;
  setStations: (n: number) => void;
  hoursPerDay: number;
  setHoursPerDay: (n: number) => void;
  daysPerMonth: number;
  setDaysPerMonth: (n: number) => void;
  discountCode: string;
  setDiscountCode: (v: string) => void;
  discountApplied: { code: string; percent: number } | null;
  applyDiscount: () => void;
  purchaseError: string;
  purchaseSubmitted: boolean;
  plan: { id: string; name: string; badge?: string; monthlyPrice: number; yearlyPrice: number; maxStations: string; features: string[]; relayHardwareIncluded: boolean; popular?: boolean };
  basePrice: number;
  calculatorTotal: number;
  discountAmount: number;
  grandTotal: number;
};

const PurchaseFlowUI: React.FC<PurchaseFlowUIProps> = ({
  fullName, phone, onBack, onFinalize,
  selectedPlan, setSelectedPlan, billingCycle, setBillingCycle,
  stations, setStations, hoursPerDay, setHoursPerDay, daysPerMonth, setDaysPerMonth,
  discountCode, setDiscountCode, discountApplied, applyDiscount,
  purchaseError, purchaseSubmitted,
  plan, basePrice, calculatorTotal, discountAmount, grandTotal
}) => {
  const format = (v: number) => v.toLocaleString('fa-IR');
  const priceDisplay = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

  const getBadgeText = (id: PlanId) => {
    if (id === 'silver') return 'اشتراک ۱ ماهه';
    if (id === 'gold') return 'اشتراک ۶ ماهه';
    return 'اشتراک ۱ ساله';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="text-slate-400 hover:text-emerald-400 p-1.5 rounded-full bg-slate-800/50 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">داشبورد خرید دیجی‌گیم</span>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">انتخاب پلن و محاسبه قیمت</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">سلام {fullName} ({phone}) — مراحل خرید را کامل کنید.</p>
        </div>
      </div>

      {purchaseError && (
        <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-300 text-xs text-center">{purchaseError}</div>
      )}

      {/* Plan Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">پلن سفارشی شما:</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PLAN_IDS_FOR_DISPLAY.map(p => {
            const pData = PRICING_PLANS.find(x => x.id === p)!;
            const price = billingCycle === 'monthly' ? pData.monthlyPrice : pData.yearlyPrice;
            const isSelected = selectedPlan === p;
            return (
              <button key={p} type="button" onClick={() => setSelectedPlan(p)} className={isSelected
                ? 'group relative p-4 rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-[#0f233f] to-[#0a1529] shadow-2xl shadow-emerald-500/15 scale-105 transition-all'
                : 'group relative p-4 rounded-2xl border border-slate-800 bg-[#0a1324] hover:border-emerald-400/40 hover:bg-[#0d1830] hover:shadow-[0_0_20px_rgba(57,255,120,0.1)] transition-all cursor-pointer'}
              >
                {pData.badge && (
                  <span className="absolute -top-3 left-3 bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase shadow-lg shadow-emerald-500/40">{pData.badge}</span>
                )}
                <div className="text-slate-300 font-bold text-xs sm:text-base">{pData.name.replace(/\(.*\)/, '').trim()}</div>
                <div className="mt-1 font-outfit font-black text-emerald-400">{format(price)} تومان</div>
                <div className="text-[9px] text-slate-500 mt-2">{getBadgeText(p)}</div>
                <div className="mt-3 flex items-center gap-1">{isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}</div>
              </button>
            );
          })}
        </div>
      </div>



      {/* Calculator */}
      <div className="bg-[#0a1324] border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-lg shadow-emerald-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-outfit">ماشین حسابريعان سود</span>
            <div className="text-[9px] text-slate-500">تخمین هزینه ماهانه استیشن‌ها</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <CalcInput label="تعداد استیشن" value={stations} onChange={v => setStations(v)} min={1} max={200} suffix="عدد" />
            <CalcInput label="ساعات فعال روزانه" value={hoursPerDay} onChange={v => setHoursPerDay(v)} min={1} max={24} suffix="ساعت" />
            <CalcInput label="روز فعالیت ماهانه" value={daysPerMonth} onChange={v => setDaysPerMonth(v)} min={1} max={31} suffix="روز" />
          </div>

          <div className="border-t border-slate-800 pt-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold text-slate-400">هزینه استیشن‌ها (تخمینی):</span>
              <span className="font-outfit font-black text-emerald-400 text-lg">{format(calculatorTotal)} تومان</span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold text-slate-400">قیمت پلن ({billingCycle === 'monthly' ? 'ماهانه' : 'سالانه'}):</span>
              <span className="font-outfit font-black text-white text-lg">{format(priceDisplay)} تومان</span>
            </div>
            {discountApplied && (
              <div className="flex items-baseline justify-between mb-2 text-emerald-300">
                <span className="text-xs font-bold">تخفیف کد ({discountApplied.code} - {discountApplied.percent}٪):</span>
                <span className="font-mono font-bold">- {format(discountAmount)} تومان</span>
              </div>
            )}
            <div className="flex items-baseline justify-between border-t border-emerald-500/30 pt-3 mt-3">
              <span className="font-black text-white text-xl">مبلغ نهایی قابل پرداخت:</span>
              <span className="font-outfit font-black text-emerald-400 text-2xl">{format(grandTotal)} تومان</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discount */}
      <div className="relative group">
        <div className="flex gap-2">
          <input
            autoFocus
            type="text"
            placeholder="کد تخفیف (مثلاً DIGI2026)"
            value={discountCode}
            onChange={e => setDiscountCode(e.target.value.toUpperCase())}
            className="flex-1 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-right focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-xs sm:text-sm"
          />
          <button
            onClick={applyDiscount}
            disabled={!discountCode.trim()}
            className="px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-emerald-400/60 transition-all"
          >
            اعمال
          </button>
        </div>
        {discountApplied && (
          <div className="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <Percent className="w-3 h-3" />
            <span>کد <span className="font-bold text-emerald-400">{discountApplied.code}</span> اعمال شد — تخفیف {discountApplied.percent}٪</span>
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <button
        onClick={onFinalize}
        disabled={purchaseSubmitted}
        className="cyber-action-btn cyber-action-btn--primary w-full flex items-center justify-center gap-2 text-sm font-black"
      >
        <span className="cyber-action-btn__shine" />
        <span>{purchaseSubmitted ? 'در حال پرداخت...' : 'تأیید خرید و ثبت سفارش نهایی'}</span>
        <ArrowUpLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-2 text-[9px] text-slate-500 mt-3">
        <ShieldCheck className="w-3 h-3 text-emerald-500" />
        <span>پرداخت امن و رمزنگار‌شده — ۱۴ روز ضمانت بازگشت وجه</span>
      </div>
    </div>
  );
};

type CalcInputProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  suffix: string;
};

const CalcInput: React.FC<CalcInputProps> = ({ label, value, onChange, min, max, suffix }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || min;
    if (v < min) v = min;
    if (v > max) v = max;
    onChange(v);
  };
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2.5 text-right text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-500 font-bold">{suffix}</span>
      </div>
    </div>
  );
};

if (typeof document !== 'undefined' && !document.getElementById('auth-modal-animations')) {
  const style = document.createElement('style');
  style.id = 'auth-modal-animations';
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes bounceSlow {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-8px) scale(1.05); }
    }
    .animate-bounce-slow { animation: bounceSlow 3s ease-in-out infinite; }
  `;
  document.head.appendChild(style);
}
