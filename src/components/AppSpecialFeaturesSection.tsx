import React, { useState } from 'react';
import { 
  Lock, Volume2, Wifi, Award, Calendar, QrCode, 
  Calculator, UserCheck, Sparkles, CheckCircle2,
  LayoutDashboard, Monitor, Gamepad2, Coffee, 
  BellRing, Trophy, CreditCard, Send, VolumeX, ShieldCheck
} from 'lucide-react';
import './AppSpecialFeaturesSection.css';
import { soundManager } from '../utils/audioAlerts';

export const AppSpecialFeaturesSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'management' | 'client'>('management');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalized tilt (-1 to 1) with smooth clamping
    const tiltX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const tiltY = Math.max(-1, Math.min(1, (y - centerY) / centerY));
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    e.currentTarget.style.setProperty('--card-tilt-x', `${tiltX.toFixed(3)}`);
    e.currentTarget.style.setProperty('--card-tilt-y', `${tiltY.toFixed(3)}`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--card-tilt-x', '0');
    e.currentTarget.style.setProperty('--card-tilt-y', '0');
  };

  const handlePlayWarningSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) return;

    setIsPlayingAudio(true);
    try {
      soundManager.play10MinuteWarning(true);
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  const managementFeatures = [
    {
      id: 1,
      num: '01',
      title: '۱. رمز ورود به بخش درآمد',
      description: 'هیچ پرسنل یا بازیکنی نمی‌تواند دخل، سود خالص یا دریافتی صندوق را ببیند؛ درآمد کاملاً با رمز اختصاصی مالک محافظت می‌شود.',
      highlight: 'حفظ ۱۰۰٪ حریم مالی مالک',
      icon: Lock,
      widget: (
        <div className="feature-spec-pill">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>حفاظت ۲۵۶ بیتی دخل و حسابداری</span>
        </div>
      )
    },
    {
      id: 2,
      num: '02',
      title: '۲. افکت صدای هشدار ۱۰ دقیقه',
      description: 'سیستم به صورت خودکار ۱۰ دقیقه مانده به اتمام وقت استیشن، افکت صوتی و ویس هشدار را به اپراتور و بازیکن اعلام می‌کند.',
      highlight: 'هشدار صوتی خودکار و بدون فراموشی',
      icon: Volume2,
      widget: (
        <div className="audio-visualizer-box">
          <button
            type="button"
            onClick={handlePlayWarningSound}
            className={`audio-test-btn ${isPlayingAudio ? 'is-playing' : ''}`}
            title="تست صدای هشدار ۱۰ دقیقه"
          >
            {isPlayingAudio ? (
              <VolumeX className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
            <span>{isPlayingAudio ? 'در حال پخش ویس...' : 'تست آنلاین صدا'}</span>
            <div className="audio-spectrum-bars" aria-hidden="true">
              <span className="spectrum-bar" />
              <span className="spectrum-bar" />
              <span className="spectrum-bar" />
              <span className="spectrum-bar" />
            </div>
          </button>
        </div>
      )
    },
    {
      id: 3,
      num: '03',
      title: '۳. سرعت و پینگ لحظه‌ای',
      description: 'پایش ثانیه به ثانیه پهنای باند و پینگ کلاینت‌ها به سرورهای بازی جهت تضمین رقابت بدون لگ و پکت‌لاس در مسابقات.',
      highlight: 'تضمین پینگ پایدار ۱۰ الی ۱۴ میلی‌ثانیه',
      icon: Wifi,
      widget: (
        <div className="ping-telemetry-pill">
          <div className="ping-beacon" aria-hidden="true">
            <span className="ping-beacon-dot" />
            <span className="ping-beacon-ring" />
          </div>
          <span>PING: 11ms STABLE</span>
        </div>
      )
    },
    {
      id: 4,
      num: '04',
      title: '۴. مستویات و سطوح بازیکن',
      description: 'سطوح هیجان‌انگیز برنزی، فضّی (نقره‌ای)، ذهبی (طلایی) و فاخر VIP برای ارتقای رتبه و ایجاد شوق بازی مکرر.',
      highlight: 'وفادارسازی با تخفیف ۵٪ تا ۲۰٪',
      icon: Award,
      widget: (
        <div className="unified-vip-chips">
          <span className="vip-badge-tag">BRONZE</span>
          <span className="vip-badge-tag">SILVER</span>
          <span className="vip-badge-tag">GOLD</span>
          <span className="vip-badge-tag highlight-vip">VIP ★</span>
        </div>
      )
    },
    {
      id: 5,
      num: '05',
      title: '۵. بخش رزرو آنلاین استیشن',
      description: 'ثبت نوبت رزرو برای ساعت‌های آینده، مسابقات گروهی، و رزرو اتاق‌های اختصاصی VIP همراه با ثبت پیامکی.',
      highlight: 'مدیریت ترافیک شلوغی آخر هفته',
      icon: Calendar,
      widget: (
        <div className="feature-spec-pill">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>سیستم نوبت‌دهی خودکار پیامکی</span>
        </div>
      )
    },
    {
      id: 6,
      num: '06',
      title: '۶. سفارش بوفه با اسکن QR',
      description: 'هر استیشن دارای بارکد اختصاصی است؛ بازیکن بدون ترک صندلی با گوشی خود منوی خوراکی‌ها را اسکن و سفارش می‌دهد.',
      highlight: 'رشد ۳ برابری فروش نوشیدنی و اسنک',
      icon: QrCode,
      widget: (
        <div className="feature-spec-pill">
          <QrCode className="w-3.5 h-3.5 shrink-0" />
          <span>منوی QR هوشمند متصل به صندوق</span>
        </div>
      )
    },
    {
      id: 7,
      num: '07',
      title: '۷. ماشین حساب سریع و دنگی',
      description: 'محاسبه ثانیه‌ای زمان، اضافه کردن تنقلات و محاسبه سهم دنگی هر بازیکن به صورت عادلانه در کمتر از ۲ ثانیه.',
      highlight: 'تسویه بی‌دردسر و تفکیک نفری',
      icon: Calculator,
      widget: (
        <div className="feature-spec-pill">
          <Calculator className="w-3.5 h-3.5 shrink-0" />
          <span>تفکیک دنگ دقیق در ۲ ثانیه</span>
        </div>
      )
    },
    {
      id: 8,
      num: '08',
      title: '۸. حضور و غیاب و تاخیر پرسنل',
      description: 'ثبت ساعت دقیق ورود، محاسبه خودکار دقایق تاخیر و جریمه، ساعات اضافه کاری و لاگ غیرقابل دستکاری صندوق‌دار.',
      highlight: 'جلوگیری از بی‌نظمی و خطای شیفت',
      icon: UserCheck,
      widget: (
        <div className="feature-spec-pill">
          <UserCheck className="w-3.5 h-3.5 shrink-0" />
          <span>لاگ غیرقابل حذف تردد و شیفت</span>
        </div>
      )
    }
  ];

  const clientFeatures = [
    {
      id: 1,
      num: '01',
      title: '۱. پنل اختصاصی ورود گیمر',
      description: 'لاگین سریع با شماره همراه یا نام کاربری، قفل خودکار صفحه قبل از احراز هویت و نمایش اعتبار کیف پول.',
      highlight: 'امنیت کامل حساب و ذخیره امتیازات',
      icon: Gamepad2,
      widget: (
        <div className="feature-spec-pill">
          <Gamepad2 className="w-3.5 h-3.5 shrink-0" />
          <span>احراز هویت پیامکی بدون وقفه</span>
        </div>
      )
    },
    {
      id: 2,
      num: '02',
      title: '۲. سفارش آنلاین بوفه از مانیتور',
      description: 'مشاهده منوی مصور نوشیدنی‌ها، اسنک‌ها و تنقلات و ثبت سفارش مستقیم بدون نیاز به ترک صندلی یا صدا زدن اپراتور.',
      highlight: 'تحویل سفارش درب استیشن بازیکن',
      icon: Coffee,
      widget: (
        <div className="feature-spec-pill">
          <Coffee className="w-3.5 h-3.5 shrink-0" />
          <span>منوی مصور با سفارش آنلاین</span>
        </div>
      )
    },
    {
      id: 3,
      num: '03',
      title: '۳. تایمر زنده و هشدار صوتی',
      description: 'مشاهده دقیقه به دقیقه زمان سپری‌شده، هزینه جاری بازی و پخش صدای هشدار ۱۰ دقیقه مانده به اتمام اعتبار.',
      highlight: 'محاسبه ثانیه‌ای و شفافیت ۱۰۰٪',
      icon: BellRing,
      widget: (
        <div className="feature-spec-pill">
          <BellRing className="w-3.5 h-3.5 shrink-0" />
          <span>کرنومتر زنده با هشدار صوتی</span>
        </div>
      )
    },
    {
      id: 4,
      num: '04',
      title: '۴. لیدربرد و رتبه‌بندی هفتگی',
      description: 'مشاهده جدول برترین گیمرهای کلوپ، امتیازات کسب‌شده در فیفا و کالاف دیوتی و دریافت جوایز و کاپ‌های فصلی.',
      highlight: 'هیجان رقابت و رنک رسمی کلاب',
      icon: Trophy,
      widget: (
        <div className="unified-vip-chips">
          <span className="vip-badge-tag">RANK 1..10</span>
          <span className="vip-badge-tag highlight-vip">SEASON CUP 🏆</span>
        </div>
      )
    },
    {
      id: 5,
      num: '05',
      title: '۵. مانیتورینگ پینگ و کیفیت نت',
      description: 'نمایش ویجت پینگ لحظه‌ای و پکت‌لاس به سرورهای وارزون، ولورانت، سی‌اس و دوتا جهت اطمینان از مسابقه بدون لگ.',
      highlight: 'پینگ اختصاصی زیر ۱۵ میلی‌ثانیه',
      icon: Wifi,
      widget: (
        <div className="ping-telemetry-pill">
          <div className="ping-beacon" aria-hidden="true">
            <span className="ping-beacon-dot" />
            <span className="ping-beacon-ring" />
          </div>
          <span>ZERO PACKET LOSS</span>
        </div>
      )
    },
    {
      id: 6,
      num: '06',
      title: '۶. افزایش اعتبار با درگاه شتاب',
      description: 'امکان شارژ آنی کیف پول با اسکن QR درگاه اینترنتی توسط موبایل و تمدید خودکار زمان بدون وقفه در بازی.',
      highlight: 'پرداخت امن و تسویه خودکار',
      icon: CreditCard,
      widget: (
        <div className="feature-spec-pill">
          <CreditCard className="w-3.5 h-3.5 shrink-0" />
          <span>شارژ خودکار با درگاه شاپرک</span>
        </div>
      )
    },
    {
      id: 7,
      num: '07',
      title: '۷. دکمه فراخوانی اپراتور',
      description: 'ارسال پیام بی‌صدا به مانیتور صندوقدار برای درخواست راهنمایی، تنظیم کنترلر یا درخواست خدمات فنی.',
      highlight: 'ارتباط مستقیم با مدیریت کلوپ',
      icon: Send,
      widget: (
        <div className="feature-spec-pill">
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>پیام بی‌صدا به سرور صندوق</span>
        </div>
      )
    },
    {
      id: 8,
      num: '08',
      title: '۸. سوابق و کدهای تخفیف وفاداری',
      description: 'مشاهده رکورد ساعت‌های بازی در ماه، فعال‌سازی کدهای تخفیف مناسبتی و ارتقا به سطح طلایی و VIP کلاب.',
      highlight: 'پاداش وفاداری و تخفیف‌های ویژه',
      icon: Award,
      widget: (
        <div className="feature-spec-pill">
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>تخفیف‌های تصاعدی ساعت بازی</span>
        </div>
      )
    }
  ];

  const currentFeatures = activeMode === 'management' ? managementFeatures : clientFeatures;

  return (
    <section id="special-features" className="special-features-section py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background Lighting & Grid */}
      <div className="special-features-ambient-orb" aria-hidden="true" />
      <div className="special-features-grid-bg" aria-hidden="true" />

      {/* Mode Action Buttons (Designed in the Exact Theme of Light/Dark Toggle) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-14">
        {/* Button 1: نرم افزار مدیریتی */}
        <button
          type="button"
          onClick={() => setActiveMode('management')}
          className={`cyber-action-btn ${
            activeMode === 'management' 
              ? 'cyber-action-btn--primary ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/25' 
              : 'opacity-85 hover:opacity-100'
          } !w-auto min-w-[200px] sm:min-w-[230px] h-[50px] px-6 text-xs sm:text-sm font-black transition-all`}
        >
          <span className="cyber-action-btn__shine" />
          <span className="cyber-action-btn__icon">
            <LayoutDashboard className="w-4 h-4" />
          </span>
          <span>نرم‌افزار مدیریتی</span>
          <span 
            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
              activeMode === 'management' 
                ? 'bg-[#39ff78] shadow-[0_0_12px_#39ff78] animate-pulse' 
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
              ? 'cyber-action-btn--primary ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/25' 
              : 'opacity-85 hover:opacity-100'
          } !w-auto min-w-[200px] sm:min-w-[230px] h-[50px] px-6 text-xs sm:text-sm font-black transition-all`}
        >
          <span className="cyber-action-btn__shine" />
          <span className="cyber-action-btn__icon">
            <Monitor className="w-4 h-4" />
          </span>
          <span>دمو (کلاینت)</span>
          <span 
            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
              activeMode === 'client' 
                ? 'bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] animate-pulse' 
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

      {/* Grid of 8 Unified Cyber Cards */}
      <div key={activeMode} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentFeatures.map((f, index) => {
          const Icon = f.icon;
          return (
            <div
              key={f.id}
              className="cyber-feature-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ animationDelay: `${index * 55}ms` } as React.CSSProperties}
            >
              {/* Background Large Stylized Watermark */}
              <span className="cyber-card-watermark" aria-hidden="true">{f.num}</span>

              {/* Glowing Flowing Top Border Beam */}
              <span className="cyber-card-top-beam" aria-hidden="true" />

              {/* Holographic Laser Shimmer */}
              <span className="cyber-card-shimmer" aria-hidden="true" />

              {/* Vertical Cyber Laser Scanline */}
              <span className="cyber-card-scanline" aria-hidden="true" />

              {/* HUD Corner Tech Reticles */}
              <span className="card-corner-bracket bracket-tl" aria-hidden="true" />
              <span className="card-corner-bracket bracket-br" aria-hidden="true" />

              {/* Card Header: Module ID & Reactor Pod */}
              <div className="cyber-card-header">
                <div className="module-id-badge">
                  <span className="status-dot" />
                  <span>MOD // {f.num}</span>
                </div>

                <div className="icon-reactor-pod">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Card Body: Title, Description & Interactive Widget */}
              <div className="cyber-card-body">
                <h3 className="cyber-card-title">
                  {f.title}
                </h3>
                <p className="cyber-card-desc">
                  {f.description}
                </p>

                {/* Animated Widget / Telemetry */}
                {f.widget && (
                  <div className="card-interactive-widget">
                    {f.widget}
                  </div>
                )}
              </div>

              {/* Card Footer: Impact Capsule */}
              <div className="cyber-card-footer">
                <div className="impact-capsule">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{f.highlight}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
