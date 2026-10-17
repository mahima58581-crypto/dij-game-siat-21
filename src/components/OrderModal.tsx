import React, { useState } from 'react';
import { X, CheckCircle2, PhoneCall, MessageCircle, ArrowUpLeft, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface OrderModalProps {
  isOpen: boolean;
  selectedPlanId?: string;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, selectedPlanId, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(selectedPlanId || 'gold');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [clubName, setClubName] = useState('');
  const [city, setCity] = useState('');
  const [stationCount, setStationCount] = useState('۱۲');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !clubName.trim()) {
      setErrorMsg('لطفاً نام، شماره تماس و نام گیم‌نت را وارد نمایید.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setClubName('');
    setCity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b1324] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 left-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-outfit">
                DIGIGAME VIP ONBOARDING
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                درخواست دمو آنلاین و فعال‌سازی دیجی‌گیم
              </h3>
              <p className="text-xs text-slate-400">
                فرم زیر را پر کنید؛ کارشناس فنی ارشد ما ظرف کمتر از ۱۵ دقیقه جهت هماهنگی دمو رایگان و مشاوره خرید با شما تماس خواهد گرفت.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">پلن مدنظر شما:</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRICING_PLANS.map(p => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        selectedPlan === p.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {p.name.split(' ')[1] || p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">نام و نام خانوادگی مدیر:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: علیرضا محمدی"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">شماره موبایل (جهت تماس و واتساپ):</label>
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors text-right"
                />
              </div>

              {/* Club Name & City */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">نام گیم‌نت / کلوپ:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: گیم‌سنتر ماتریکس"
                    value={clubName}
                    onChange={e => setClubName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">شهر:</label>
                  <input
                    type="text"
                    placeholder="تهران، اصفهان، شیراز..."
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Station Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">تعداد تقریبی دستگاه‌ها (کنسول + PC):</label>
                <select
                  value={stationCount}
                  onChange={e => setStationCount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="۴ تا ۸ دستگاه">۴ تا ۸ دستگاه (پلن نقره‌ای)</option>
                  <option value="۹ تا ۱۸ دستگاه">۹ تا ۱۸ دستگاه (پلن طلایی)</option>
                  <option value="۱۹ تا ۳۰ دستگاه">۱۹ تا ۳۰ دستگاه (پلن طلایی یا الماس)</option>
                  <option value="بیش از ۳۰ دستگاه">بیش از ۳۰ دستگاه یا چندشعبه‌ای (پلن الماس VIP)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  <span>ثبت درخواست مشاوره و فعال‌سازی</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>اطلاعات شما کاملاً محرمانه نزد دیجی‌گیم محفوظ است.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                درخواست شما با موفقیت ثبت گردید!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                مدیر محترم مجموعه <span className="text-emerald-400 font-bold">{clubName}</span>، کارشناس فنی دیجی‌گیم ظرف کمتر از ۱۵ دقیقه با شماره <span className="font-outfit text-white font-bold" dir="ltr">{phone}</span> تماس خواهد گرفت.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <div>کد پیگیری درخواست: <span className="font-mono text-emerald-400 font-bold">DG-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div>دموی رایگان از طریق انی‌دسک بر روی سیستم شما اجرا خواهد شد.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/989123456789?text=${encodeURIComponent(`سلام، درخواست دموی دیجی‌گیم برای گیم‌نت ${clubName} را ثبت کردم.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>پیام در واتساپ فروش</span>
              </a>

              <a
                href="tel:02191004588"
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>تماس فوری: ۰۲۱-۹۱۰۰۴۵۸۸</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer pt-2"
            >
              بستن پنجره
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
