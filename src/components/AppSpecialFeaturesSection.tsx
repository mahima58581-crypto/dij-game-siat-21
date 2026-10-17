import React from 'react';
import { 
  Lock, Volume2, Wifi, Award, Calendar, QrCode, 
  Calculator, UserCheck, Sparkles, CheckCircle2 
} from 'lucide-react';

export const AppSpecialFeaturesSection: React.FC = () => {
  const features = [
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

  return (
    <section id="special-features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>هسته نرم‌افزاری اختصاصی ۲۰۲۶</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ویژگی‌های اپلیکیشن مدیریتی گیم‌نت
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          ۸ قابلیت انحصاری و طراحی‌شده بر اساس نیازهای واقعی مدیران کلوپ‌های VIP و گیم‌نت‌های مدرن ایران:
        </p>
      </div>

      {/* Clean Grid of 8 Features without bulky test widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(f => {
          const Icon = f.icon;
          return (
            <div
              key={f.id}
              className="bg-[#0b1426] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:bg-[#0d1830] transition-all space-y-4 group card-hover-lift cursor-default"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center border group-hover:scale-105 transition-transform`}>
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

    </section>
  );
};
