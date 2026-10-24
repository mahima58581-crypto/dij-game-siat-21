import React, { useState } from 'react';
import { INSTALLERS } from '../data/mockData';
import { 
  Wrench, ShieldCheck, Star, ArrowUpLeft, 
  MapPin, CheckCircle2, Clock, Cpu, X, PhoneCall, Phone 
} from 'lucide-react';
import { Installer } from '../types';
import './InstallersSection.css';

interface InstallersSectionProps {
  onRequestInstaller?: (installerName?: string) => void;
}

export const InstallersSection: React.FC<InstallersSectionProps> = ({ onRequestInstaller }) => {
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const toEnglishDigits = (str: string) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/[۰-۹]/g, (char) => String(persianDigits.indexOf(char)));
  };

  const handleOpenContact = (inst: Installer) => {
    setSelectedInstaller(inst);
    if (onRequestInstaller) {
      // Optional callback hook
    }
  };

  return (
    <section id="installers" className="installers-cyber-wrapper py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative">
      {/* Ambient Lighting & Grid */}
      <div className="installers-ambient-glow" aria-hidden="true" />
      <div className="installers-grid-bg" aria-hidden="true" />

      {/* Header Hologram Cluster */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="installers-chip-badge">
          <div className="installers-chip-icon">
            <Wrench className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            CERTIFIED RELAY HARDWARE TECHNICIANS 2026
          </span>
          <span className="installers-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="installers-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          شبکه نصاب‌های حرفه‌ای سخت‌افزار رله و شبکه در{' '}
          <span className="installers-title-gradient">سراسر کشور</span>
        </h2>

        <p className="installers-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          نصب و سیم‌کشی تخصصی بدون آسیب به دکوراسیون، کابل‌کشی استاندارد، راه‌اندازی سوییچ‌ها و تنظیم رله صنعتی با ضمانت کتبی کارکرد.
        </p>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="installers-guarantee-strip">
        <div className="installers-guarantee-item">
          <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
          <span>تکنسین‌های تایید هویت و صلاحیت شده</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="installers-guarantee-item">
          <Cpu className="w-4 h-4 text-[#00f0ff]" />
          <span>تضمین عدم آسیب به دکور و سیم‌کشی</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="installers-guarantee-item">
          <Clock className="w-4 h-4 text-[#39ff78]" />
          <span>اعزام فوری در کمتر از ۲۴ ساعت</span>
        </div>
      </div>

      {/* Cyber Cards Grid */}
      <div className="installers-cyber-grid">
        {INSTALLERS.map((inst, index) => {
          const indexFormatted = String(index + 1).padStart(2, '0');
          const isBusy = inst.status === 'busy';

          return (
            <div
              key={inst.id}
              className="installer-cyber-card"
              onMouseMove={handleMouseMove}
            >
              {/* Background Large Stylized Watermark */}
              <span className="cyber-card-watermark" aria-hidden="true">{indexFormatted}</span>

              {/* Glowing Flowing Top Border Beam */}
              <span className="cyber-card-top-beam" aria-hidden="true" />

              {/* Holographic Laser Shimmer */}
              <span className="cyber-card-shimmer" aria-hidden="true" />

              {/* Card Header: Module Badge, Verified Tag & Reactor Pod */}
              <div className="installer-card-header">
                <div className="flex items-center gap-2">
                  <div className="module-id-badge">
                    <span className="status-dot" aria-hidden="true" />
                    <span>TECH // {indexFormatted}</span>
                  </div>

                  <div className="installer-verified-badge">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>تکنسین رسمی</span>
                  </div>
                </div>

                <div className="icon-reactor-pod">
                  <Wrench className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body: Name, Coverage & Telemetry Specs */}
              <div className="installer-card-body">
                <div className="space-y-1">
                  <h3 className="installer-name">
                    {inst.name}
                  </h3>
                  <p className="installer-zone">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-400/80 mt-0.5" />
                    <span>{inst.city}</span>
                  </p>
                </div>

                {/* Telemetry Pod */}
                <div className="installer-telemetry-pod">
                  <div className="installer-spec-item">
                    <span className="installer-spec-title">سابقه نصب:</span>
                    <span className="installer-spec-data font-outfit">
                      {inst.experienceYears} سال سابقه
                    </span>
                  </div>

                  <div className="installer-spec-item">
                    <span className="installer-spec-title">پروژه‌های موفق:</span>
                    <span className="installer-spec-data highlight-emerald font-outfit">
                      {inst.projectsCompleted}+ گیم‌نت
                    </span>
                  </div>
                </div>

                {/* Rating & Live Status Row */}
                <div className="installer-meta-row">
                  <div className="installer-rating-chip">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span className="font-outfit font-black text-amber-400 text-xs">{inst.rating}</span>
                    <span className="text-slate-400 text-[10px]">(رضایت کلوپ‌ها)</span>
                  </div>

                  <div className={`installer-status-pill ${isBusy ? 'is-busy' : ''}`}>
                    <span className="status-dot-pulse" aria-hidden="true" />
                    <span>{isBusy ? 'در حال اجرای پروژه' : 'آماده اعزام فوری'}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Button & Impact Capsule */}
              <div className="installer-card-footer">
                <button
                  type="button"
                  onClick={() => handleOpenContact(inst)}
                  className="installer-action-btn"
                >
                  <span className="installer-btn-shine" aria-hidden="true" />
                  <span>درخواست اعزام نصاب به گیم‌نت شما</span>
                  <ArrowUpLeft className="w-4 h-4 transition-transform duration-300" />
                </button>

                <div className="impact-capsule">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>تضمین سلامت سیم‌کشی و تنظیم دقیق رله</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Dedicated Installer Contact Modal */}
      {selectedInstaller && (
        <div 
          className="installer-modal-overlay"
          onClick={() => setSelectedInstaller(null)}
        >
          <div 
            className="installer-modal-window"
            onClick={e => e.stopPropagation()}
          >
            {/* Glowing Top Beam */}
            <span className="cyber-card-top-beam" aria-hidden="true" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedInstaller(null)}
              className="installer-modal-close"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="icon-reactor-pod !w-16 !h-16 shadow-[0_0_25px_rgba(57,255,120,0.4)]">
                <Wrench className="w-7 h-7 text-[#39ff78]" />
              </div>

              <div className="installer-verified-badge">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>تکنسین رسمی و تایید صلاحیت شده دیجی‌گیم</span>
              </div>

              <h3 className="installer-modal-name font-black text-2xl text-white">
                {selectedInstaller.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedInstaller.city}</span>
              </div>
            </div>

            {/* Phone Display Box */}
            <div className="installer-phone-box">
              <span className="installer-phone-label text-xs font-bold text-slate-400">
                شماره تماس مستقیم کارشناس نصب:
              </span>
              <div className="installer-phone-number font-mono text-2xl sm:text-3xl font-black text-[#39ff78]" dir="ltr">
                {selectedInstaller.phone}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>پاسخگویی سریع جهت هماهنگی، بازدید و راه‌اندازی رله هوشمند</span>
              </div>
            </div>

            {/* Primary Action Button: ارتباط با نصاب */}
            <div className="space-y-3 pt-1">
              <a
                href={`tel:${toEnglishDigits(selectedInstaller.phone).replace(/[^0-9]/g, '')}`}
                className="installer-call-cta-btn"
              >
                <span className="installer-btn-shine" aria-hidden="true" />
                <PhoneCall className="w-5 h-5 animate-pulse" />
                <span>ارتباط با نصاب</span>
              </a>

              <p className="text-[11px] text-center text-slate-400">
                با لمس دکمه، مستقیماً به برنامه تماس تلفن همراه خود هدایت می‌شوید.
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
