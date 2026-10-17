import React, { useState } from 'react';
import { X, User, Lock, Phone, ShieldCheck, ArrowUpLeft, Gamepad2, Building2, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: (role: 'owner' | 'gamer') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'owner' | 'gamer'>('owner');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [clubName, setClubName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      setErrorMsg('لطفاً شماره موبایل و کلمه عبور را تکمیل نمایید.');
      return;
    }
    setErrorMsg('');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSuccessLogin) {
        onSuccessLogin(role);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1325] border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-white">ورود با موفقیت انجام شد!</h3>
            <p className="text-xs text-slate-400">
              در حال انتقال به {role === 'owner' ? 'پنل اختصاصی مدیریت گیم‌نت' : 'باشگاه بازیکنان دیجی‌گیم'}...
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center space-y-1 mb-6">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-outfit">
                DIGIGAME AUTH PORTAL
              </span>
              <h3 className="text-2xl font-black text-white">
                {mode === 'login' ? 'ورود به حساب کاربری' : 'ثبت‌نام و عضویت جدید'}
              </h3>
              <p className="text-xs text-slate-400">
                سامانه یکپارچه احراز هویت مدیران کلوپ و گیمرهای سراسر کشور
              </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl mb-4 border border-slate-800">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === 'owner'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>مدیر / مالک گیم‌نت</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('gamer')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === 'gamer'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>گیمر / بازیکن</span>
              </button>
            </div>

            {/* Login / Register Toggle */}
            <div className="flex justify-center gap-4 text-xs font-bold mb-4 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`pb-1 transition-colors cursor-pointer ${mode === 'login' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}
              >
                ورود با رمز عبور
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`pb-1 transition-colors cursor-pointer ${mode === 'register' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}
              >
                عضویت جدید
              </button>
            </div>

            {errorMsg && (
              <div className="mb-3 p-2.5 bg-red-500/20 text-red-300 text-xs rounded-xl border border-red-500/40">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="text-slate-300 font-bold block mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: رضا امیری"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              {mode === 'register' && role === 'owner' && (
                <div>
                  <label className="text-slate-300 font-bold block mb-1">نام مجموعه / گیم‌نت:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: گیم‌کلوب رویال"
                    value={clubName}
                    onChange={e => setClubName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="text-slate-300 font-bold block mb-1">شماره همراه:</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">کلمه عبور:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>{mode === 'login' ? 'ورود به پنل' : 'تکمیل ثبت‌نام و فعال‌سازی'}</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-500 pt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>اتصال امن رمزنگاری‌شده با سرور مرکزی دیجی‌گیم</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
