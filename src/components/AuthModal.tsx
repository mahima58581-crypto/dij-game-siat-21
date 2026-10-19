import React, { useState } from 'react';
import {
  X, Lock, Phone, ShieldCheck,
  CheckCircle2, Sparkles, ChevronRight, ChevronLeft,
  ArrowUpLeft, KeyRound, Zap
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: (role: 'owner' | 'gamer') => void;
}

type AuthStep = 'name' | 'phone' | 'otp' | 'success';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [step, setStep] = useState<AuthStep>('name');
  const role: 'owner' | 'gamer' = 'owner';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

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
    if (otp.length !== 6) {
      setOtpError('کد ۶ رقمی را کامل وارد کنید.');
      return;
    }
    setStep('success');
    if (onSuccessLogin) onSuccessLogin(role);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b1324] border border-slate-700/80 rounded-3xl max-w-lg w-full sm:max-w-[520px] p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">

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
              <p className="text-xs text-slate-400">برای ورود و فعال‌سازی حساب کاربری دیجی‌گیم، ابتدا نام و نام خانوادگی را وارد کنید.</p>
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
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setStep('name')} className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">مرحله ۲ از ۳</span>
                <h2 className="text-lg sm:text-xl font-black text-white">شماره تلفن همراه</h2>
              </div>
            </div>

            <p className="text-xs text-slate-400">کد تأیید ورود پیامک خواهد شد. شماره موبایل خود را وارد نمایید.</p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">شماره موبایل:</label>
              <div className="relative">
                <input
                  autoFocus
                  type="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 text-white text-center font-outfit text-base font-bold focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[10px] text-slate-500">شماره باید با ۰۹ شروع شده و ۱۱ رقم باشد.</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={goNext}
                disabled={!/^09\d{9}$/.test(phone.replace(/[^0-9]/g, ''))}
                className="cyber-action-btn cyber-action-btn--primary flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
              >
                <span className="cyber-action-btn__shine" />
                <span>ارسال کد تأیید</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: OTP ===== */}
        {step === 'otp' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setStep('phone')} className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">مرحله ۳ از ۳</span>
                <h2 className="text-lg sm:text-xl font-black text-white">تأیید پیامکی هویت</h2>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              کد ۶ رقمی ارسال شده به شماره <span className="font-outfit text-emerald-400 font-bold" dir="ltr">{phone}</span> را وارد کنید:
            </p>

            <div className="space-y-2">
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  dir="ltr"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3.5 text-white text-center font-outfit text-xl font-black tracking-[0.5em] focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              {otpError && (
                <p className="text-[11px] text-red-400 font-semibold">{otpError}</p>
              )}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>کد آزمایشی هر ۶ رقم دلخواه است.</span>
                <button
                  type="button"
                  onClick={() => setOtp('123456')}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  درج خودکار (۱۲۳۴۵۶)
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={verifyOtp}
                disabled={otp.length !== 6}
                className="cyber-action-btn cyber-action-btn--primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
              >
                <span className="cyber-action-btn__shine" />
                <span>تأیید و ورود به حساب</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 4: SUCCESS ===== */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20 animate-bounce-slow">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">ورود با موفقیت انجام شد ✅</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                کاربر گرامی <span className="text-emerald-400 font-bold">{fullName}</span>، حساب کاربری شما با موفقیت تأیید و فعال شد.
              </p>
            </div>
            <button
              onClick={onClose}
              className="cyber-action-btn cyber-action-btn--primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-black"
            >
              <span className="cyber-action-btn__shine" />
              <span>ورود به حساب کاربری و بازگشت به سایت</span>
              <ArrowUpLeft className="w-4 h-4" />
            </button>
          </div>
        )}
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
