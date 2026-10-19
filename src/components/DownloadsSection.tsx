import React, { useState } from 'react';
import { 
  Download, Monitor, Laptop, Smartphone, HardDrive, 
  CheckCircle2, ShieldCheck, ArrowDownToLine, Sparkles, 
  Cpu, Server, FileCheck, Zap 
} from 'lucide-react';
import './DownloadsSection.css';

export const DownloadsSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleDownload = (packageName: string) => {
    setDownloadSuccess(`دانلود فایل نصبی «${packageName}» با موفقیت آغاز شد.`);
    setTimeout(() => setDownloadSuccess(null), 4500);
  };

  const downloads = [
    {
      id: 'server',
      modId: 'PKG // 01',
      num: '01',
      name: 'نرم‌افزار سرور مرکزی دیجی‌گیم (Server Edition)',
      badge: 'پکیج اصلی سرور VIP',
      version: 'نسخه ۴.۹.۲ VIP',
      os: 'ویندوز ۱۰ / ۱۱ و سرور',
      size: '۱۴۲ مگابایت',
      desc: 'هسته اصلی مخصوص سیستم حسابداری و صندوق مدیریت گیم‌نت با کنترل پورت رله، مدیریت دنگی، انبارداری و پایگاه داده محلی آفلاین.',
      icon: Monitor,
      primary: true
    },
    {
      id: 'client',
      modId: 'PKG // 02',
      num: '02',
      name: 'کلاینت اختصاصی ایستگاه‌های بازی (Client Edition)',
      badge: 'کلاینت گیمرها و PC',
      version: 'نسخه ۴.۸.۰',
      os: 'ویندوز ۷، ۱۰ و ۱۱',
      size: '۶۸ مگابایت',
      desc: 'قفل‌کننده محیط دسکتاپ ویندوز، منوی گرافیکی انتخاب بازی، نمایش تایم باقی‌مانده و ضدتقلب با سیستم سفارش‌گیری از بوفه.',
      icon: Laptop,
      primary: false
    },
    {
      id: 'relay-driver',
      modId: 'PKG // 03',
      num: '03',
      name: 'درایور سخت‌افزاری و پکیج تست رله هوشمند صنعتی',
      badge: 'درایور رسمی چیپست',
      version: 'نسخه پایدار v2.4',
      os: 'کلیه نسخه‌های ویندوز',
      size: '۱۲ مگابایت',
      desc: 'درایور رسمی چیپست رله سخت‌افزاری دیجی‌گیم جهت شناسایی آنی روی پورت‌های ارتباطی USB به RS485 و تنظیم قطع ثانیه‌ای برق.',
      icon: HardDrive,
      primary: false
    },
    {
      id: 'mobile-app',
      modId: 'PKG // 04',
      num: '04',
      name: 'اپلیکیشن موبایل مدیریت از راه دور (Android & iOS)',
      badge: 'نرم‌افزار موبایل مدیران',
      version: 'نسخه ۳.۱ موبایل',
      os: 'اندروید ۸+ و iOS 14+',
      size: '۲۸ مگابایت',
      desc: 'مشاهده دخل زنده، گزارش کارکرد روزانه، وضعیت خاموش/روشن بودن کنسول‌ها و کنترل صندوق از خانه یا بیرون از گیم‌نت.',
      icon: Smartphone,
      primary: false
    }
  ];

  return (
    <section id="downloads" className="downloads-cyber-wrapper py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative">
      {/* Ambient Lighting & Grid */}
      <div className="downloads-ambient-glow" aria-hidden="true" />
      <div className="downloads-grid-bg" aria-hidden="true" />

      {/* Header Hologram Cluster */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="downloads-chip-badge">
          <div className="downloads-chip-icon">
            <Download className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            OFFICIAL RELEASE DOWNLOAD CENTER 2026
          </span>
          <span className="downloads-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="downloads-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          دانلود آخرین نسخه نرم‌افزار و کلاینت‌های{' '}
          <span className="downloads-title-gradient">دیجی‌گیم</span>
        </h2>

        <p className="downloads-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          کلیه فایل‌ها به صورت ۱۰۰٪ تست شده، فاقد هرگونه بدافزار و سازگار با سیستم‌عامل‌های روز همراه با پشتیبانی نصب ارائه می‌شوند.
        </p>
      </div>

      {/* Trust Guarantee Strip */}
      <div className="downloads-guarantee-strip">
        <div className="downloads-guarantee-item">
          <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
          <span>تضمین اصالت فایل و گواهی امنیتی SSL</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="downloads-guarantee-item">
          <Zap className="w-4 h-4 text-[#00f0ff]" />
          <span>سرورهای اختصاصی دانلود پرسرعت ایران</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="downloads-guarantee-item">
          <FileCheck className="w-4 h-4 text-[#39ff78]" />
          <span>تست‌شده روی ویندوز ۱۰، ۱۱ و سرور</span>
        </div>
      </div>

      {/* Live Download Success Toast */}
      {downloadSuccess && (
        <div className="downloads-success-toast">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#39ff78] shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
          <span className="text-[11px] opacity-80 font-mono">CDN IRAN // 10 Gbps</span>
        </div>
      )}

      {/* Cyber Cards Grid */}
      <div className="downloads-cyber-grid">
        {downloads.map(item => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleDownload(item.name)}
              className={`download-cyber-card ${item.primary ? 'is-primary' : ''}`}
              onMouseMove={handleMouseMove}
            >
              {/* Background Large Stylized Watermark */}
              <span className="cyber-card-watermark" aria-hidden="true">{item.num}</span>

              {/* Glowing Flowing Top Border Beam */}
              <span className="cyber-card-top-beam" aria-hidden="true" />

              {/* Holographic Laser Shimmer */}
              <span className="cyber-card-shimmer" aria-hidden="true" />

              {/* HUD Corner Tech Reticles */}
              <span className="card-corner-bracket bracket-tl" aria-hidden="true" />
              <span className="card-corner-bracket bracket-br" aria-hidden="true" />

              {/* Card Header: Module Badge, Badge & Reactor Pod */}
              <div className="download-card-header">
                <div className="flex items-center gap-2">
                  <div className="module-id-badge">
                    <span className="status-dot" aria-hidden="true" />
                    <span>{item.modId}</span>
                  </div>

                  <div className="download-tag-badge">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>
                </div>

                <div className="icon-reactor-pod">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body: Title, Description & Telemetry Specs */}
              <div className="download-card-body">
                <h3 className="download-card-title">
                  {item.name}
                </h3>

                <p className="download-card-desc">
                  {item.desc}
                </p>

                {/* Telemetry Specs Pod */}
                <div className="download-specs-pod">
                  <div className="download-spec-item">
                    <span className="download-spec-label">شماره نسخه:</span>
                    <span className="download-spec-value highlight-version font-outfit">
                      {item.version}
                    </span>
                  </div>

                  <div className="download-spec-item">
                    <span className="download-spec-label">حجم بسته:</span>
                    <span className="download-spec-value highlight-size font-outfit">
                      {item.size}
                    </span>
                  </div>

                  <div className="download-spec-item">
                    <span className="download-spec-label">سازگاری:</span>
                    <span className="download-spec-value">
                      {item.os}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Impact Capsule */}
              <div className="download-card-footer">
                <div className="impact-capsule">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>ترافیک نیم‌بهاء داخلی + تایید سلامت ضد ویروس</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
