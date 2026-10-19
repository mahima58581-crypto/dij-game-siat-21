import React, { useState } from 'react';
import { TUTORIALS } from '../data/mockData';
import { 
  Play, Clock, CheckCircle2, Video, X, 
  ArrowUpLeft, Sparkles, Tv, ShieldCheck 
} from 'lucide-react';
import { TutorialVideo } from '../types';
import './TutorialsSection.css';

export const TutorialsSection: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<TutorialVideo | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const getLevelClass = (level: string) => {
    if (level === 'مقدماتی') return 'level-beginner';
    if (level === 'متوسط') return 'level-intermediate';
    return 'level-advanced';
  };

  return (
    <section id="tutorials" className="tutorials-cyber-wrapper py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative">
      {/* Ambient Lighting & Grid */}
      <div className="tutorials-ambient-glow" aria-hidden="true" />
      <div className="tutorials-grid-bg" aria-hidden="true" />

      {/* Header Hologram Cluster */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="tutorials-chip-badge">
          <div className="tutorials-chip-icon">
            <Video className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            ACADEMY & VIDEO TUTORIALS 2026
          </span>
          <span className="tutorials-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="tutorials-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          آموزش صفر تا صد راه‌اندازی و کار با نرم‌افزار{' '}
          <span className="tutorials-title-gradient">دیجی‌گیم</span>
        </h2>

        <p className="tutorials-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          حتی بدون دانش فنی قبلی، در کمتر از ۳۰ دقیقه تمام تنظیمات رله، ثبت استیشن‌ها و شیفت پرسنل را به صورت ویدیویی و عملی یاد بگیرید.
        </p>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="tutorials-guarantee-strip">
        <div className="tutorials-guarantee-item">
          <Tv className="w-4 h-4 text-[#39ff78]" />
          <span>ویدیوهای 4K با اسکرین‌کست فارسی</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="tutorials-guarantee-item">
          <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" />
          <span>آموزش گام‌به‌گام صفر تا صد عملی</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="tutorials-guarantee-item">
          <Clock className="w-4 h-4 text-[#39ff78]" />
          <span>تضمین یادگیری در کمتر از نیم ساعت</span>
        </div>
      </div>

      {/* Cyber Cards Grid */}
      <div className="tutorials-cyber-grid">
        {TUTORIALS.map((tut, index) => {
          const indexFormatted = String(index + 1).padStart(2, '0');

          return (
            <div
              key={tut.id}
              onClick={() => setActiveTutorial(tut)}
              onMouseMove={handleMouseMove}
              className="tutorial-cyber-card"
            >
              {/* Background Large Stylized Watermark */}
              <span className="cyber-card-watermark" aria-hidden="true">{indexFormatted}</span>

              {/* Glowing Flowing Top Border Beam */}
              <span className="cyber-card-top-beam" aria-hidden="true" />

              {/* Holographic Laser Shimmer */}
              <span className="cyber-card-shimmer" aria-hidden="true" />

              {/* HUD Corner Tech Reticles */}
              <span className="card-corner-bracket bracket-tl" aria-hidden="true" />
              <span className="card-corner-bracket bracket-br" aria-hidden="true" />

              {/* Video Preview Chassis */}
              <div className="tutorial-video-chassis">
                <div className="video-scanline-overlay" aria-hidden="true" />

                {/* Center Play Pod */}
                <div className="tutorial-play-pod">
                  <span className="tutorial-play-ripple" aria-hidden="true" />
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>

                {/* Top Bar on Video */}
                <div className="video-top-bar">
                  <div className="module-id-badge">
                    <span className="status-dot" aria-hidden="true" />
                    <span>TUT // {indexFormatted}</span>
                  </div>

                  <span className={`tutorial-level-badge ${getLevelClass(tut.level)}`}>
                    {tut.level}
                  </span>
                </div>

                {/* Bottom Bar on Video */}
                <div className="video-bottom-bar">
                  <div className="video-duration-pill">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{tut.duration}</span>
                  </div>

                  <span className="video-resolution-pill">4K UHD</span>
                </div>
              </div>

              {/* Card Body: Category, Title & Telemetry */}
              <div className="tutorial-card-body">
                <div className="tutorial-category-pill">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{tut.category}</span>
                </div>

                <h3 className="tutorial-card-title">
                  {tut.title}
                </h3>

                <div className="tutorial-telemetry-row">
                  <div className="tutorial-steps-info">
                    <CheckCircle2 className="w-4 h-4 text-[#39ff78]" />
                    <span>شامل {tut.stepsCount} مرحله عملی</span>
                  </div>

                  <span className="tutorial-tag-badge">راهنمای تصویری</span>
                </div>
              </div>

              {/* Card Footer: Watch CTA & Impact Capsule */}
              <div className="tutorial-card-footer">
                <button
                  type="button"
                  className="tutorial-watch-btn"
                >
                  <span className="tutorial-btn-shine" aria-hidden="true" />
                  <span>مشاهده ویدیوی آموزشی</span>
                  <ArrowUpLeft className="w-4 h-4 transition-transform duration-300" />
                </button>

                <div className="impact-capsule">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>آموزش کاربردی بدون نیاز به تخصص فنی</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Cyber Video Modal Player */}
      {activeTutorial && (
        <div className="tutorial-modal-overlay" onClick={() => setActiveTutorial(null)}>
          <div
            className="tutorial-modal-window"
            onClick={e => e.stopPropagation()}
          >
            {/* Corner Tech Reticles on Modal */}
            <span className="card-corner-bracket bracket-tl" aria-hidden="true" />
            <span className="card-corner-bracket bracket-br" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setActiveTutorial(null)}
              className="tutorial-modal-close-btn"
              title="بستن پنجره آموزش"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-2">
              <span className="tutorial-category-pill mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{activeTutorial.category}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">{activeTutorial.title}</h3>
            </div>

            <div className="modal-player-screen">
              <div className="video-scanline-overlay" aria-hidden="true" />

              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#39ff78] flex items-center justify-center border-2 border-emerald-400 shadow-[0_0_30px_rgba(57,255,120,0.5)]">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>

              <div className="text-sm font-bold text-white z-10">پلیر ویدیویی اختصاصی دیجی‌گیم (4K)</div>
              <div className="text-xs text-slate-400 max-w-sm z-10">
                این ویدیو به زبان فارسی و با کیفیت بالا، تمامی مراحل ستاپ را گام به گام آموزش می‌دهد.
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/50 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>مدت زمان: {activeTutorial.duration} دقیقه</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveTutorial(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all cursor-pointer"
              >
                بستن پنجره آموزش
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
