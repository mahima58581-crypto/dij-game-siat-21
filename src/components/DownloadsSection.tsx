import React, { useState } from 'react';
import { Download, Monitor, Laptop, Smartphone, HardDrive, CheckCircle2, ShieldCheck, ArrowDownToLine } from 'lucide-react';
import './DownloadsSection.css';

export const DownloadsSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (packageName: string) => {
    setDownloadSuccess(`دانلود فایل نصبی «${packageName}» با موفقیت آغاز شد.`);
    setTimeout(() => setDownloadSuccess(null), 4500);
  };

  const downloads = [
    {
      id: 'server',
      name: 'نرم‌افزار سرور مرکزی دیجی‌گیم (Server Edition)',
      version: 'نسخه ۴.۹.۲ VIP',
      os: 'ویندوز ۱۰ / ۱۱ و سرور ۲۰۱۹-۲۰۲۲ (۶۴ بیتی)',
      size: '۱۴۲ مگابایت',
      desc: 'نسخه اصلی مخصوص سیستم حسابداری و صندوق مدیریت گیم‌نت با کنترل پورت رله و پایگاه داده محلی.',
      icon: Monitor,
      primary: true
    },
    {
      id: 'client',
      name: 'کلاینت اختصاصی ایستگاه‌های بازی (Client Edition)',
      version: 'نسخه ۴.۸.۰',
      os: 'ویندوز ۷، ۱۰ و ۱۱ (۳۲ و ۶۴ بیتی)',
      size: '۶۸ مگابایت',
      desc: 'قفل‌کننده محیط دسکتاپ ویندوز، منوی گرافیکی انتخاب بازی، نمایش تایم باقی‌مانده و ضدتقلب.',
      icon: Laptop,
      primary: false
    },
    {
      id: 'relay-driver',
      name: 'درایور سخت‌افزاری و پکیج تست رله هوشمند صنعتی',
      version: 'نسخه پایدار v2.4',
      os: 'کلیه نسخه‌های ویندوز (USB to RS485/COM Driver)',
      size: '۱۲ مگابایت',
      desc: 'درایور رسمی چیپست رله سخت‌افزاری دیجی‌گیم برای شناسایی آنی روی پورت‌های ارتباطی کامپیوتر.',
      icon: HardDrive,
      primary: false
    },
    {
      id: 'mobile-app',
      name: 'اپلیکیشن موبایل مدیریت از راه دور (Android & iOS)',
      version: 'نسخه ۳.۱ موبایل',
      os: 'اندروید ۸ به بالا و iOS 14 به بالا',
      size: '۲۸ مگابایت',
      desc: 'مشاهده دخل زنده، دوربین‌ها، وضعیت خاموش/روشن بودن کنسول‌ها از خانه یا بیرون از گیم‌نت.',
      icon: Smartphone,
      primary: false
    }
  ];

  return (
    <section id="downloads" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Download className="w-3.5 h-3.5" />
          <span>مرکز دانلود رسمی فایل‌های نصبی</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          دانلود آخرین نسخه نرم‌افزار و کلاینت‌های دیجی‌گیم
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          کلیه فایل‌ها به صورت ۱۰۰٪ تست شده، فاقد هرگونه ویروس و سازگار با آنتی‌ویروس‌های روز ارائه می‌شوند.
        </p>
      </div>

      {downloadSuccess && (
        <div className="mb-8 p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-2xl text-xs sm:text-sm flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccess}</span>
          </div>
          <span className="text-[11px] text-slate-300">دریافت با سرعت بالا (سرور ایران)</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloads.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all card-hover-lift ${
                item.primary
                  ? 'bg-gradient-to-br from-[#0c1c38] to-[#081226] border-2 border-emerald-500 shadow-xl shadow-emerald-500/10'
                  : 'bg-[#0b1426] border border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 font-outfit">{item.version}</span>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.size}</div>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base leading-snug">{item.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed text-justify">{item.desc}</p>
                <div className="text-[11px] text-slate-500 font-medium">سازگاری: {item.os}</div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>تایید اصالت و گواهی SSL</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(item.name)}
                  className="download-cyber-btn"
                  aria-label={`دانلود مستقیم ${item.name}`}
                >
                  <span className="download-cyber-btn__shine" />
                  <span className="download-cyber-btn__icon">
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                  </span>
                  <span>دانلود مستقیم</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
