import React from 'react';
import { 
  Award, ShieldCheck, Headphones, Server, Zap, 
  CheckCircle2, Cpu, Database, Activity, Sparkles, Lock, ArrowUpLeft 
} from 'lucide-react';
import './AboutAndStats.css';

// DigiGame Enterprise Ecosystem Architecture
export const AboutAndStats: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const pillars = [
    {
      id: 1,
      title: 'مدار رله صنعتی با ایزولاسیون اپتوکوپلر',
      desc: 'ایزوله الکتریکی کامل میان برق شهری و ورودی کنسول/TV بدون ریسک سوختن پورت HDMI و قطعی دقیق سر میلی‌ثانیه.',
      icon: Cpu
    },
    {
      id: 2,
      title: 'پایگاه داده رمزنگاری‌شده ۲۵۶ بیتی محلی',
      desc: 'عملکرد ۱۰۰٪ مستقل و بدون نیاز به اینترنت؛ کلیه لاگ‌های دخل، صندوق و صورتحساب‌ها با کلید بیومتریک مالک محافظت می‌شود.',
      icon: Database
    },
    {
      id: 3,
      title: 'هسته هوشمند آنالیز وفاداری گیمرها',
      desc: 'سیستم لول‌بندی خودکار، تخفیف تصاعدی ساعت بازی و سفارش بوفه با QR که ماندگاری بازیکنان در کلوپ را ۲.۵ برابر می‌کند.',
      icon: Activity
    },
    {
      id: 4,
      title: 'پایش بلادرنگ و پشتیبانی مهندسی ۲۴/۷',
      desc: 'اتصال فوری به تکنسین‌های ارشد سخت‌افزار و شبکه در هر ساعت از شبانه‌روز با پاسخگویی کمتر از ۳ دقیقه.',
      icon: Headphones
    }
  ];

  const metrics = [
    {
      id: 'm1',
      num: '01',
      val: '۵۲۰+',
      label: 'کلوپ گیمینگ فعال',
      desc: 'در بیش از ۶۵ شهر و استان کشور',
      tag: 'LIVE NETWORK',
      tagClass: 'tag-emerald',
      valColor: '#39ff78'
    },
    {
      id: 'm2',
      num: '02',
      val: '۹۹.۹۹٪',
      label: 'پایداری بدون وقفه',
      desc: 'معماری صنعتی آفلاین بدون ۱ ثانیه قطعی',
      tag: 'ZERO-DOWNTIME',
      tagClass: 'tag-cyan',
      valColor: '#00f0ff'
    },
    {
      id: 'm3',
      num: '03',
      val: '+۴۰٪',
      label: 'جهش سود خالص ماهانه',
      desc: 'جلوگیری از ثانیه‌های سوخته و رشد بوفه',
      tag: 'MAX PROFIT',
      tagClass: 'tag-emerald',
      valColor: '#39ff78'
    },
    {
      id: 'm4',
      num: '04',
      val: '۳۶ ماه',
      label: 'گارانتی طلایی تعویض آنی',
      desc: 'وارانتی بی‌قید‌و‌شرط قطعات رله صنعتی',
      tag: 'VIP WARRANTY',
      tagClass: 'tag-gold',
      valColor: '#fbbf24',
      isWarranty: true
    }
  ];

  return (
    <section id="about" className="about-cyber-wrapper py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative">
      {/* Ambient Lighting & Grid */}
      <div className="about-ambient-glow" aria-hidden="true" />
      <div className="about-grid-bg" aria-hidden="true" />

      {/* Master Chassis Container */}
      <div className="about-master-chassis">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Story & Engineering Highlights (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="about-chip-badge">
              <div className="about-chip-icon">
                <Award className="w-3.5 h-3.5 text-[#39ff78]" />
              </div>
              <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
                ENTERPRISE ESPORTS ECOSYSTEM // SINCE 2019
              </span>
              <span className="about-chip-radar" aria-hidden="true" />
            </div>

            <h2 className="about-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight section-glow-text">
              توسعه‌یافته توسط مهندسان گیمینگ برای مدیرانی که{' '}
              <span className="about-title-gradient">لایق بالاترین سود هستند</span>
            </h2>

            <p className="about-story-text">
              دیجی‌گیم از سال ۱۳۹۸ با یک ماموریت حیاتی متولد شد: پایان دادن به سردرگمی، بازی‌های اضافه بدون فاکتور، دستکاری دستی دخل و نشتی‌های مالی پنهان در گیم‌نت‌ها و کلوپ‌های VIP سراسر ایران. روش‌های سنتی دفتری یا نرم‌افزارهای قدیمی تحت ویندوز ۷ سالانه صدها میلیون تومان از سود خالص مدیران را از بین می‌برند.
            </p>

            <p className="about-story-highlight">
              امروز دیجی‌گیم یک اکوسیستم پیشرفته سخت‌افزاری و نرم‌افزاری بلادرنگ است؛ مجهز به پردازنده‌های ۳۲ بیتی صنعتی، رله‌های نوری ضد نوسان ولتاژ، کلاینت‌های ضد تقلب و هوش مصنوعی آنالیز دخل و بوفه. ما تنها یک نرم‌افزار نمی‌فروشیم، بلکه تضمین می‌کنیم هیچ ثانیه‌ای از ظرفیت سرمایه‌گذاری کلوپ شما هدر نرود.
            </p>

            {/* Core Architectural Pillars */}
            <div className="about-pillars-grid">
              {pillars.map(pillar => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={pillar.id} className="about-pillar-pod">
                    <div className="about-pillar-icon-box">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="about-pillar-title">{pillar.title}</h4>
                      <p className="about-pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Highlights & Metrics Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Official DigiGame 3D Esports Logo Showcase */}
            <div 
              className="about-logo-showcase-card"
              onMouseMove={handleMouseMove}
            >
              {/* Flowing Top Laser Beam */}
              <span className="cyber-card-top-beam" aria-hidden="true" />

              {/* Holographic Shimmer Sweep */}
              <span className="cyber-card-shimmer" aria-hidden="true" />

              {/* Top Meta Header */}
              <div className="flex items-center justify-between w-full z-10 relative">
                <div className="module-id-badge">
                  <span className="status-dot" aria-hidden="true" />
                  <span>BRAND // DIGIGAME™</span>
                </div>

                <div className="about-logo-tag">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>نشان رسمی اکوسیستم ۲۰۲۶</span>
                </div>
              </div>

              {/* Central Glowing Emblem Pod */}
              <div className="about-logo-emblem-wrapper">
                <div className="about-logo-halo-ring" aria-hidden="true" />
                <img
                  src="/src/assets/images/digigame_official_logo_2026.jpg"
                  alt="لوگوی رسمی دیجی‌گیم"
                  className="about-logo-img"
                  loading="eager"
                />
              </div>

              {/* Bottom Caption Pill */}
              <div className="about-logo-caption">
                <span className="font-outfit uppercase tracking-widest text-[11px] font-black text-emerald-400">
                  DIGI-GAME AAA ESPORTS LOGO
                </span>
                <span className="text-[11px] text-slate-400">
                  نماد انحصاری سخت‌افزار صنعتی و نرم‌افزار گیمینگ
                </span>
              </div>
            </div>

            <div className="about-metrics-grid">
              {metrics.map(metric => (
                <div
                  key={metric.id}
                  className={`about-cyber-metric-card ${metric.isWarranty ? 'warranty-card' : ''}`}
                  onMouseMove={handleMouseMove}
                >
                  {/* Background Watermark */}
                  <span className="cyber-card-watermark" aria-hidden="true">{metric.num}</span>

                  {/* Flowing Top Laser Beam */}
                  <span className="cyber-card-top-beam" aria-hidden="true" />

                  {/* Holographic Shimmer Sweep */}
                  <span className="cyber-card-shimmer" aria-hidden="true" />

                  {/* Top Row with Tech Tag */}
                  <div className="flex items-center justify-between z-10 relative">
                    <span className={`metric-tag-chip ${metric.tagClass}`}>
                      {metric.tag}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                  </div>

                  {/* Metric Value */}
                  <div className="z-10 relative">
                    <div 
                      className="metric-value-text"
                      style={{ color: metric.valColor }}
                    >
                      {metric.val}
                    </div>
                    <div className="metric-label-title mt-1">
                      {metric.label}
                    </div>
                    <div className="metric-desc-text mt-0.5">
                      {metric.desc}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Certification Ribbon Bar */}
            <div className="about-cert-ribbon">
              <CheckCircle2 className="w-5 h-5 text-[#39ff78] shrink-0" />
              <div className="about-cert-text">
                دارای تاییدیه رسمی انطباق الکترونیک، استاندارد امنیت شبکه و گواهی سنجش کیفیت صنعتی سخت‌افزار کشور.
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
