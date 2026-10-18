import React, { useState } from 'react';
import { 
  Lock, Volume2, Wifi, Award, Calendar, QrCode, 
  Calculator, UserCheck, Sparkles, CheckCircle2,
  LayoutDashboard, Monitor, Gamepad2, Coffee, 
  BellRing, Trophy, CreditCard, Send
} from 'lucide-react';

export const AppSpecialFeaturesSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'management' | 'client'>('management');

  const managementFeatures = [
    {
      id: 1,
      title: '۱. رمز ورود به بخش درآمد',
      description: 'هیچ پرسنل یا بازیکنی نمی‌تواند دخل، سود خالص یا دریافتی صندوق را ببیند؛ درآمد کاملاً با رمز مالک محافظت می‌شود.',
      highlight: 'حفظ ۱۰۰٪ حریم مالی مالک',
      icon: Lock,
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 2,
      title: '۲. افکت صدای هشدار ۱۰ دقیقه',
      description: 'سیستم به صورت خودکار ۱۰ دقیقه مانده به اتمام وقت استیشن، افکت صوتی و ویس هشدار را به اپراتور و بازیکن اعلام می‌کند.',
      highlight: 'هشدار صوتی خودکار و بدون فراموشی',
      icon: Volume2,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 3,
      title: '۳. سرعت و پینگ لحظه‌ای',
      description: 'پایش ثانیه به ثانیه پهنای باند و پینگ کلاینت‌ها به سرورهای بازی جهت تضمین رقابت بدون لگ و پکت‌لاس در مسابقات.',
      highlight: 'تضمین پینگ پایدار ۱۰ الی ۱۴ میلی‌ثانیه',
      icon: Wifi,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 4,
      title: '۴. مستویات و سطوح بازیکن',
      description: 'سطوح هیجان‌انگیز برنزی، فضّی (نقره‌ای)، ذهبی (طلایی) و فاخر VIP برای ارتقای رتبه و ایجاد شوق بازی مکرر.',
      highlight: 'وفادارسازی با تخفیف ۵٪ تا ۲۰٪',
      icon: Award,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 5,
      title: '۵. بخش رزرو آنلاین استیشن',
      description: 'ثبت نوبت رزرو برای ساعت‌های آینده، مسابقات گروهی، و رزرو اتاق‌های اختصاصی VIP همراه با ثبت پیامکی.',
      highlight: 'مدیریت ترافیک شلوغی آخر هفته',
      icon: Calendar,
      color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 6,
      title: '۶. سفارش بوفه با اسکن QR',
      description: 'هر استیشن دارای بارکد اختصاصی است؛ بازیکن بدون ترک صندلی با گوشی خود منوی خوراکی‌ها را اسکن و سفارش می‌دهد.',
      highlight: 'رشد ۳ برابری فروش نوشیدنی و اسنک',
      icon: QrCode,
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      id: 7,
      title: '۷. ماشین حساب سریع و دنگی',
      description: 'محاسبه ثانیه‌ای زمان، اضافه کردن تنقلات و محاسبه سهم دنگی هر بازیکن به صورت عادلانه در کمتر از ۲ ثانیه.',
      highlight: 'تسویه بی‌دردسر و تفکیک نفری',
      icon: Calculator,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 8,
      title: '۸. حضور و غیاب و تاخیر پرسنل',
      description: 'ثبت ساعت دقیق ورود، محاسبه خودکار دقایق تاخیر و جریمه، ساعات اضافه کاری و لاگ غیرقابل دستکاری صندوق‌دار.',
      highlight: 'جلوگیری از بی‌نظمی و خطای شیفت',
      icon: UserCheck,
      color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    }
  ];

  const clientFeatures = [
    {
      id: 1,
      title: '۱. پنل اختصاصی ورود گیمر',
      description: 'لاگین سریع با شماره همراه یا نام کاربری، قفل خودکار صفحه قبل از احراز هویت و نمایش اعتبار کیف پول.',
      highlight: 'امنیت کامل حساب و ذخیره امتیازات',
      icon: Gamepad2,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 2,
      title: '۲. سفارش آنلاین بوفه از مانیتور',
      description: 'مشاهده منوی مصور نوشیدنی‌ها، اسنک‌ها و تنقلات و ثبت سفارش مستقیم بدون نیاز به ترک صندلی یا فریاد زدن.',
      highlight: 'تحویل سفارش درب استیشن بازیکن',
      icon: Coffee,
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 3,
      title: '۳. تایمر زنده و هشدار صوتی',
      description: 'مشاهده دقیقه به دقیقه زمان سپری‌شده، هزینه جاری بازی و پخش صدای هشدار ۱۰ دقیقه مانده به اتمام اعتبار.',
      highlight: 'محاسبه ثانیه‌ای و شفافیت ۱۰۰٪',
      icon: BellRing,
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      id: 4,
      title: '۴. لیدربرد و رتبه‌بندی هفتگی',
      description: 'مشاهده جدول برترین گیمرهای کلوپ، امتیازات کسب‌شده در فیفا و کالاف دیوتی و دریافت جوایز و کاپ‌های فصلی.',
      highlight: 'هیجان رقابت و رنک رسمی کلاب',
      icon: Trophy,
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    },
    {
      id: 5,
      title: '۵. مانیتورینگ پینگ و کیفیت نت',
      description: 'نمایش ویجت پینگ لحظه‌ای و پکت‌لاس به سرورهای وارزون، ولورانت، سی‌اس و دوتا جهت اطمینان از مسابقه بدون لگ.',
      highlight: 'پینگ اختصاصی زیر ۱۵ میلی‌ثانیه',
      icon: Wifi,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 6,
      title: '۶. افزایش اعتبار با درگاه شتاب',
      description: 'امکان شارژ آنی کیف پول با اسکن QR درگاه اینترنتی توسط موبایل و تمدید خودکار زمان بدون وقفه در بازی.',
      highlight: 'پرداخت امن و تسویه خودکار',
      icon: CreditCard,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 7,
      title: '۷. دکمه فراخوانی اپراتور',
      description: 'ارسال پیام بی‌صدا به مانیتور صندوقدار برای درخواست راهنمایی، تنظیم کنترلر یا درخواست خدمات فنی.',
      highlight: 'ارتباط مستقیم با مدیریت کلوپ',
      icon: Send,
      color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 8,
      title: '۸. سوابق و کدهای تخفیف وفاداری',
      description: 'مشاهده رکورد ساعت‌های بازی در ماه، فعال‌سازی کدهای تخفیف مناسبتی و ارتقا به سطح طلایی و VIP کلاب.',
      highlight: 'پاداش وفاداری و تخفیف‌های ویژه',
      icon: Award,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    }
  ];

  const currentFeatures = activeMode === 'management' ? managementFeatures : clientFeatures;

  return (
    <section id="special-features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Mode Action Buttons (Designed in the Exact Theme of Light/Dark Toggle) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-12">
        {/* Button 1: نرم افزار مدیریتی */}
        <button
          type="button"
          onClick={() => setActiveMode('management')}
          className={`cyber-action-btn ${
            activeMode === 'management' 
              ? 'cyber-action-btn--primary ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/20' 
              : 'opacity-85 hover:opacity-100'
          } !w-auto min-w-[200px] sm:min-w-[230px] h-[48px] px-6 text-xs sm:text-sm font-black transition-all`}
        >
          <span className="cyber-action-btn__shine" />
          <span className="cyber-action-btn__icon">
            <LayoutDashboard className="w-4 h-4" />
          </span>
          <span>نرم‌افزار مدیریتی</span>
          <span 
            className={`w-2 h-2 rounded-full shrink-0 transition-all ${
              activeMode === 'management' 
                ? 'bg-[#39ff78] shadow-[0_0_10px_#39ff78] animate-pulse' 
                : 'bg-slate-500'
            }`} 
          />
        </button>

        {/* Button 2: دمو (کلاینت) */}
        <button
          type="button"
          onClick={() => setActiveMode('client')}
          className={`cyber-action-btn ${
            activeMode === 'client' 
              ? 'cyber-action-btn--primary ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20' 
              : 'opacity-85 hover:opacity-100'
          } !w-auto min-w-[200px] sm:min-w-[230px] h-[48px] px-6 text-xs sm:text-sm font-black transition-all`}
        >
          <span className="cyber-action-btn__shine" />
          <span className="cyber-action-btn__icon">
            <Monitor className="w-4 h-4" />
          </span>
          <span>دمو (کلاینت)</span>
          <span 
            className={`w-2 h-2 rounded-full shrink-0 transition-all ${
              activeMode === 'client' 
                ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-pulse' 
                : 'bg-slate-500'
            }`} 
          />
        </button>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {activeMode === 'management' ? 'هسته نرم‌افزاری اختصاصی ۲۰۲۶' : 'رابط کاربری کلاینت گیمرها ۲۰۲۶'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          {activeMode === 'management' ? 'ویژگی‌های اپلیکیشن مدیریتی گیم‌نت' : 'دمو و امکانات اپلیکیشن کلاینت گیمرها'}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {activeMode === 'management'
            ? '۸ قابلیت انحصاری و طراحی‌شده بر اساس نیازهای واقعی مدیران کلوپ‌های VIP و گیم‌نت‌های مدرن ایران:'
            : '۸ ویژگی جذاب و کاربردی طراحی‌شده برای مانیتور استیشن‌ها و کنسول‌های بازی بازیکنان:'}
        </p>
      </div>

      {/* Grid of 8 Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentFeatures.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={f.id}
              className="bg-[#0b1426] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:bg-[#0d1830] transition-all space-y-4 group card-hover-lift cursor-default feature-card"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center border group-hover:scale-110 transition-transform feature-icon`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed text-justify">
                  {f.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{f.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="special-features-bg" aria-hidden="true" />
    </section>
  );
};
