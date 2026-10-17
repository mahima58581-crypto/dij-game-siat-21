import React from 'react';
import { Cpu, ShieldCheck, ShoppingCart, Users, Trophy, MessageSquareText, Lock, ArrowUpLeft } from 'lucide-react';
import './DemoOrderButton.css';

interface FeaturesSectionProps {
  onOpenOrderModal: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 relative">
      <div id="games" className="absolute -top-24 pointer-events-none" />
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>تکنولوژی انحصاری و یکپارچه گیمینگ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          چرا دیجی‌گیم انتخاب اول کلوپ‌های VIP است؟
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          ترکیبی از سخت‌افزار صنعتی ضدآسیب و نرم‌افزار فوق‌العاده سریع که مدیریت گیم‌نت را کاملاً خودکار، شفاف و بدون نشتی مالی می‌کند.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* Feature 1: Large Showcase with Monitor Asset (8 Cols) */}
        <div className="lg:col-span-8 bg-[#0a1426] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group card-hover-lift">
          <div className="space-y-3 z-10 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-outfit">
              01. CENTRAL COMMAND DASHBOARD
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              داشبورد مانیتورینگ زنده و کنترل همزمان ۲۴+ استیشن
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              مشاهده در لحظه کنسول‌های فعال، وضعیت تایمرها، نام مشتری، مصرف بوفه و دخل روزانه. همه چیز با یک نگاه و با کمترین کلیک ممکن در دسترس اپراتور است.
            </p>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative">
            <img
              src="/src/assets/images/software_dashboard_monitor_1791986036116.jpg"
              alt="داشبورد نرم افزار مدیریت گیم نت دیجی گیم روی مانیتور گیمینگ"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Feature 2: Smart IoT Hardware Relay (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0c1a33] to-[#081224] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden card-hover-lift">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-outfit block">
              02. INDUSTRIAL RELAY BOX
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              رله سخت‌افزاری قطع و وصل برق فوق سریع
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              باکس رله صنعتی اختصاصی ساخت دیجی‌گیم بدون نیاز به کامپیوتر روشن در هر استیشن. برق تلویزیون یا مانیتور سر صدم ثانیه پایان شارژ قطع شده و از هرگونه بازی اضافه جلوگیری می‌کند.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مجهز به محافظ نوسان برق و استابلایزر داخلی</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>۲ سال ضمانت تعویض طلایی شرکتی</span>
            </div>
          </div>
        </div>

        {/* Feature 3: PC Client Lockdown (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0a1426] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 card-hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-outfit block">
            03. WINDOWS DESKTOP LOCK
          </span>
          <h3 className="text-xl font-bold text-white">
            کلاینت ضدتقلب و لانچر هوشمند بازی‌ها
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            قفل کامل محیط دسکتاپ ویندوز، بستن Task Manager و پورت‌های USB، و نمایش منوی گرافیکی شیک از بازی‌های نصب‌شده با پوستر و اطلاعات.
          </p>
        </div>

        {/* Feature 4: Buffet & POS (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0a1426] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 card-hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-outfit block">
            04. BUFFET & INVENTORY POS
          </span>
          <h3 className="text-xl font-bold text-white">
            حسابداری بوفه، سفارش آنلاین و انبارداری
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            گیمرها می‌توانند از روی مانیتور خود ردبول، چیپس و قهوه سفارش دهند. اتصال به پرینتر فیش و کنترل دقیق موجودی انبار بدون کسری.
          </p>
        </div>

        {/* Feature 5: Customer Loyalty & SMS Club (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0a1426] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 card-hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <MessageSquareText className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-outfit block">
            05. VIP CLUB & AUTO SMS
          </span>
          <h3 className="text-xl font-bold text-white">
            باشگاه مشتریان، کیف پول و پیامک خودکار
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            ارسال خودکار پیامک خوش‌آمد، مانده شارژ، کدهای تخفیف، و تبریک تولد به مشتریان برای تبدیل گیمرهای گذری به بازیکنان وفادار همیشگی.
          </p>
        </div>

        {/* Feature 6: Tournament Engine (Full Width 12 Cols Banner) */}
        <div className="lg:col-span-12 bg-gradient-to-r from-emerald-950/60 via-[#0a1426] to-blue-950/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                سیستم برگزاری مسابقات و تورنمنت‌های حضوری FIFA و کالاف دیوتی
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                قرعه‌کشی خودکار جدول تک‌حذفی و دوبل، ثبت نتایج، نمایش جدول زنده روی تلویزیون‌های سالن و جذب صدها پلیر جدید در هر ماه.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenOrderModal}
            type="button"
            className="demo-order-button shrink-0"
            aria-label="ثبت سفارش و نصب فوری"
          >
            <span className="demo-order-button__shine" />
            <span className="demo-order-button__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>
            <span className="demo-order-button__text">
              <span className="demo-order-button__title">
                ثبت سفارش و نصب فوری
              </span>
              <span className="demo-order-button__subtitle">
                مشاوره و راه‌اندازی سریع
              </span>
            </span>
            <span className="demo-order-button__arrow">↗</span>
          </button>
        </div>

      </div>

    </section>
  );
};
