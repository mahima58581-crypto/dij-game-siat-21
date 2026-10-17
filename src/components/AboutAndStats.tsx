import React from 'react';
import { Award, ShieldCheck, Headphones, Server, Zap, CheckCircle2 } from 'lucide-react';

export const AboutAndStats: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Container Frame */}
      <div className="bg-[#091222] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        
        {/* Ambient lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>درباره تیم و هویت دیجی‌گیم</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              توسعه‌یافته توسط مهندسان گیمینگ برای مدیرانی که لایق بالاترین سود هستند
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">
              دیجی‌گیم از سال ۱۳۹۸ با یک هدف مشخص متولد شد: پایان دادن به سردرگمی، بازی بدون فاکتور و نشتی مالی در کلوپ‌های بازی و گیم‌نت‌های ایران. ما متوجه شدیم که روش‌های سنتی (دفترچه یادداشت یا نرم‌افزارهای قدیمی تحت داس و ویندوز ۷) سالانه ده‌ها میلیون تومان از سود خالص صاحبان گیم‌نت را می‌بلعند.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-justify">
              امروز دیجی‌گیم یک اکوسیستم کامل سخت‌افزاری و نرم‌افزاری است؛ از رله‌های قطع برق صنعتی اختصاصی با استاندارد حفاظتی گرفته تا کلاینت‌های مدرن ویندوز و سیستم بوفه هوشمند. ما فقط یک نرم‌افزار نمی‌فروشیم، بلکه تضمین می‌کنیم هیچ ثانیه‌ای از کارکرد گیم‌نت شما هدر نرود.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">امنیت سخت‌افزاری تضمینی</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">رله‌های ایزوله نوری بدون آسیب به مادربورد یا تلویزیون</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <Headphones className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">پشتیبانی ۲۴ ساعته شیفتی</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">پاسخگویی سریع حتی در نیمه‌شب و روزهای تعطیل رسمی</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Highlights & Metrics Cards (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl space-y-2 card-hover-lift">
              <div className="font-outfit font-black text-3xl sm:text-4xl text-emerald-400">
                ۴۵۰+
              </div>
              <div className="text-xs font-bold text-white">گیم‌نت فعال</div>
              <div className="text-[11px] text-slate-400">در بیش از ۶۰ شهر سراسر کشور</div>
            </div>

            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl space-y-2 card-hover-lift">
              <div className="font-outfit font-black text-3xl sm:text-4xl text-blue-400">
                ۹۹.۹٪
              </div>
              <div className="text-xs font-bold text-white">پایداری عملکرد</div>
              <div className="text-[11px] text-slate-400">معماری آفلاین ۱۰۰٪ بدون توقف</div>
            </div>

            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl space-y-2 card-hover-lift">
              <div className="font-outfit font-black text-3xl sm:text-4xl text-emerald-400">
                +۳۵٪
              </div>
              <div className="text-xs font-bold text-white">افزایش سود ماهانه</div>
              <div className="text-[11px] text-slate-400">گزارش تایید شده مشتریان دیجی‌گیم</div>
            </div>

            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl space-y-2 card-hover-lift">
              <div className="font-outfit font-black text-3xl sm:text-4xl text-amber-400">
                ۲۴ ماه
              </div>
              <div className="text-xs font-bold text-white">گارانتی طلایی</div>
              <div className="text-[11px] text-slate-400">تعویض آنی قطعات رله سخت‌افزاری</div>
            </div>

            {/* Certification Badge */}
            <div className="col-span-2 bg-gradient-to-r from-emerald-950/80 to-[#0e1d38] border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                دارای گواهی استاندارد فنی و انطباق الکترونیکی از آزمایشگاه‌های معتبر سخت‌افزاری کشور.
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
