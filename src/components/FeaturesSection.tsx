import React from 'react';
import { 
  Cpu, ShieldCheck, ShoppingCart, Users, Trophy, 
  MessageSquareText, Lock, ArrowUpLeft, Zap, Gamepad2, CheckCircle2 
} from 'lucide-react';
import './FeaturesSection.css';

interface FeaturesSectionProps {
  onOpenOrderModal?: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="features" className="features-section-container py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div id="games" className="absolute -top-24 pointer-events-none" />
      
      {/* Background Ambient Lighting */}
      <div className="features-ambient-glow" aria-hidden="true" />

      {/* Cyber Section Header */}
      <div className="features-header-box">
        {/* Holographic Chip Badge */}
        <div className="cyber-chip-badge">
          <div className="chip-icon-spin">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="chip-status-beacon" />
          <span className="chip-text">تکنولوژی انحصاری و یکپارچه گیمینگ</span>
          <span className="chip-code">DIGI // 2026</span>
        </div>

        {/* Radiant Main Title */}
        <h2 className="features-main-title">
          چرا <span className="features-title-glow">دیجی‌گیم</span> انتخاب اول کلوپ‌های <span className="features-vip-tag">VIP</span> است؟
        </h2>

        {/* Subtitle with High-Impact Emphasis */}
        <p className="features-subtitle">
          ترکیبی از <strong className="text-emerald-400">سخت‌افزار صنعتی ضدآسیب</strong> و <strong className="text-cyan-400">نرم‌افزار فوق‌العاده سریع</strong> که مدیریت گیم‌نت را کاملاً خودکار، شفاف و بدون نشتی مالی می‌کند.
        </p>

        {/* Floating HUD Key Pillars Under Header */}
        <div className="features-pillars-bar">
          <div className="pillar-item">
            <Zap className="w-3.5 h-3.5" />
            <span>پایداری ۹۹.۹۹٪ سرور بدون قطعی</span>
          </div>
          <div className="pillar-item">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>۲ سال گارانتی تعویض طلایی سخت‌افزار</span>
          </div>
          <div className="pillar-item">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>سازگار با PS5 ،PC ،Xbox و VR</span>
          </div>
          <div className="pillar-item">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>صفر درصد خطای صندوق و دخل مالی</span>
          </div>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* Feature 1: Large Showcase with Monitor Asset (8 Cols) */}
        <div 
          className="lg:col-span-8 bento-cyber-card p-6 sm:p-8 flex flex-col justify-between group"
          onMouseMove={handleMouseMove}
        >
          <span className="bento-watermark" aria-hidden="true">01</span>
          <span className="bento-top-beam" aria-hidden="true" />
          <span className="bento-shimmer" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-tl" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-br" aria-hidden="true" />

          <div className="space-y-3 z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-outfit text-xs font-bold tracking-wider">
              <span>01. CENTRAL COMMAND DASHBOARD</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">
              داشبورد مانیتورینگ زنده و کنترل همزمان ۲۴+ استیشن
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              مشاهده در لحظه کنسول‌های فعال، وضعیت تایمرها، نام مشتری، مصرف بوفه و دخل روزانه. همه چیز با یک نگاه و با کمترین کلیک ممکن در دسترس اپراتور است.
            </p>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative z-10">
            <img
              src="/src/assets/images/software_dashboard_monitor_1791986036116.jpg"
              alt="داشبورد نرم افزار مدیریت گیم نت دیجی گیم روی مانیتور گیمینگ"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Feature 2: Smart IoT Hardware Relay (4 Cols) */}
        <div 
          className="lg:col-span-4 bento-cyber-card p-6 sm:p-8 flex flex-col justify-between group"
          onMouseMove={handleMouseMove}
        >
          <span className="bento-watermark" aria-hidden="true">02</span>
          <span className="bento-top-beam" aria-hidden="true" />
          <span className="bento-shimmer" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-tl" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-br" aria-hidden="true" />

          <div className="space-y-4 z-10">
            <div className="bento-icon-pod">
              <Cpu className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-outfit block">
              02. INDUSTRIAL RELAY BOX
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              رله سخت‌افزاری قطع و وصل برق فوق سریع
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              باکس رله صنعتی اختصاصی ساخت دیجی‌گیم بدون نیاز به کامپیوتر روشن در هر استیشن. برق تلویزیون یا مانیتور سر صدم ثانیه پایان شارژ قطع شده و از هرگونه بازی اضافه جلوگیری می‌کند.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300 z-10">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>مجهز به محافظ نوسان برق و استابلایزر داخلی</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>۲ سال ضمانت تعویض طلایی شرکتی</span>
            </div>
          </div>
        </div>

        {/* Feature 3: PC Client Lockdown (4 Cols) */}
        <div 
          className="lg:col-span-4 bento-cyber-card p-6 sm:p-8 space-y-4 group"
          onMouseMove={handleMouseMove}
        >
          <span className="bento-watermark" aria-hidden="true">03</span>
          <span className="bento-top-beam" aria-hidden="true" />
          <span className="bento-shimmer" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-tl" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-br" aria-hidden="true" />

          <div className="bento-icon-pod z-10">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-outfit block z-10">
            03. WINDOWS DESKTOP LOCK
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors z-10">
            کلاینت ضدتقلب و لانچر هوشمند بازی‌ها
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed z-10">
            قفل کامل محیط دسکتاپ ویندوز، بستن Task Manager و پورت‌های USB، و نمایش منوی گرافیکی شیک از بازی‌های نصب‌شده با پوستر و اطلاعات.
          </p>
        </div>

        {/* Feature 4: Buffet & POS (4 Cols) */}
        <div 
          className="lg:col-span-4 bento-cyber-card p-6 sm:p-8 space-y-4 group"
          onMouseMove={handleMouseMove}
        >
          <span className="bento-watermark" aria-hidden="true">04</span>
          <span className="bento-top-beam" aria-hidden="true" />
          <span className="bento-shimmer" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-tl" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-br" aria-hidden="true" />

          <div className="bento-icon-pod z-10">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-outfit block z-10">
            04. BUFFET & INVENTORY POS
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors z-10">
            حسابداری بوفه، سفارش آنلاین و انبارداری
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed z-10">
            گیمرها می‌توانند از روی مانیتور خود ردبول، چیپس و قهوه سفارش دهند. اتصال به پرینتر فیش و کنترل دقیق موجودی انبار بدون کسری.
          </p>
        </div>

        {/* Feature 5: Customer Loyalty & SMS Club (4 Cols) */}
        <div 
          className="lg:col-span-4 bento-cyber-card p-6 sm:p-8 space-y-4 group"
          onMouseMove={handleMouseMove}
        >
          <span className="bento-watermark" aria-hidden="true">05</span>
          <span className="bento-top-beam" aria-hidden="true" />
          <span className="bento-shimmer" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-tl" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-br" aria-hidden="true" />

          <div className="bento-icon-pod z-10">
            <MessageSquareText className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-outfit block z-10">
            05. VIP CLUB & AUTO SMS
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors z-10">
            باشگاه مشتریان، کیف پول و پیامک خودکار
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed z-10">
            ارسال خودکار پیامک خوش‌آمد، مانده شارژ، کدهای تخفیف، و تبریک تولد به مشتریان برای تبدیل گیمرهای گذری به بازیکنان وفادار همیشگی.
          </p>
        </div>

        {/* Feature 6: Tournament Engine (Full Width 12 Cols Banner) */}
        <div 
          className="lg:col-span-12 bento-cyber-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group"
          onMouseMove={handleMouseMove}
        >
          <span className="bento-watermark" aria-hidden="true">06</span>
          <span className="bento-top-beam" aria-hidden="true" />
          <span className="bento-shimmer" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-tl" aria-hidden="true" />
          <span className="bento-corner-bracket bento-bracket-br" aria-hidden="true" />

          <div className="flex items-center gap-4 z-10 w-full">
            <div className="bento-icon-pod shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                سیستم برگزاری مسابقات و تورنمنت‌های حضوری FIFA و کالاف دیوتی
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                قرعه‌کشی خودکار جدول تک‌حذفی و دوبل، ثبت نتایج، نمایش جدول زنده روی تلویزیون‌های سالن و جذب صدها پلیر جدید در هر ماه.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
