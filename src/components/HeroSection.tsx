import React, { useState } from 'react';
import { 
  LayoutDashboard, Monitor, Sparkles, ShieldCheck, 
  Lock, ArrowUpLeft 
} from 'lucide-react';
import heroBg from '../assets/images/hero_cyber_arena_bg_1792238808313.jpg';
import { TrialModal } from './TrialModal';
import { soundManager } from '../utils/audioAlerts';
import './HeroSection.css';

interface HeroSectionProps {
  onOpenOrderModal?: () => void;
  onScrollToDemo?: () => void;
  onOpenAuthModal?: () => void;
  isLoggedIn?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuthModal,
  isLoggedIn = false
}) => {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [trialSoftwareType, setTrialSoftwareType] = useState<'manager' | 'client'>('manager');
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const handleTrialClick = (type: 'manager' | 'client') => {
    try {
      soundManager.playRelayClick();
    } catch {
      // Audio fallback
    }

    if (!isLoggedIn) {
      setAuthNotice('برای شروع ۵ روز تست رایگان، لطفاً ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.');
      if (onOpenAuthModal) {
        onOpenAuthModal();
      }
      return;
    }

    setAuthNotice(null);
    setTrialSoftwareType(type);
    setTrialModalOpen(true);
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    e.currentTarget.style.setProperty('--tilt-x', `${tiltX.toFixed(3)}`);
    e.currentTarget.style.setProperty('--tilt-y', `${tiltY.toFixed(3)}`);
  };

  const handleHeroMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', '0');
    e.currentTarget.style.setProperty('--tilt-y', '0');
  };

  return (
    <section id="home" className="hero-arena-wrapper relative pt-4 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden scroll-mt-24">
      {/* Ambient Lighting Orbs */}
      <div className="hero-ambient-beam-1" aria-hidden="true" />

      {/* Main Master Chassis */}
      <div
        className="hero-master-chassis hero-chassis relative text-slate-100 p-6 sm:p-8 md:p-12 transition-all overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{
          ['--hero-bg' as any]: `url(${heroBg})`
        }}
      >
        {/* Cyber Emblem Pulsing Energy Aura (Behind Artwork) */}
        <div className="hero-emblem-aura" aria-hidden="true" />

        {/* Hero Grid Canvas: Right Column has the content, Left Column leaves the 3D Emblem completely clear! */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">

          {/* Right Column (Starts from Right in RTL) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full z-10 space-y-4 sm:space-y-5">
            
            {/* 1. Top Telemetry & Trust Cluster */}
            <div className="space-y-3">
              <div className="hero-stats-bar">
                {/* 450+ Stat Pod */}
                <div className="hero-counter-box">
                  <span className="hero-counter-num">
                    ۴۵۰<span className="hero-counter-unit">+</span>
                  </span>
                  <span className="hero-counter-label">
                    گیم‌نت در سراسر کشور
                  </span>
                </div>

                {/* Server Status Live Pill */}
                <div className="hero-status-pill">
                  <span className="hero-live-beacon" />
                  <span>ONLINE 2026</span>
                </div>
              </div>
              
              {/* Trust Platforms Bar */}
              <div className="hero-trust-bar">
                <div className="hero-platform-chips">
                  <div className="platform-chip chip-pc">PC</div>
                  <div className="platform-chip chip-ps5">PS5</div>
                  <div className="platform-chip chip-vip">VIP</div>
                </div>
                <div className="hero-trust-text">
                  مورد اعتماد برترین کلوپ‌ها و گیم‌سنترهای مدرن ایران
                </div>
              </div>
            </div>

            {/* 2. Giant Brand Typography: DIGI GAME */}
            <div className="hero-brand-group">
              <span className="hero-brand-digi">
                DIGI
              </span>
              <span className="hero-brand-game">
                GAME
              </span>
            </div>

            {/* 3. Symmetrical, Neat 5-Day Free Trial Launch Pod: "اول تست کن" */}
            <div className="hero-launch-card">
              <span className="hero-launch-top-beam" aria-hidden="true" />

              {/* Pod Header */}
              <div className="hero-launch-header">
                <div className="hero-launch-badge">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>اول تست کن</span>
                </div>
                <span className="hero-launch-guarantee">
                  ⚡ ۵ روز تست کامل و بدون قید و شرط
                </span>
              </div>

              {/* Two Action Buttons Grid */}
              <div className="hero-launch-buttons">
                {/* Button 1: نرم افزار مدیریتی */}
                <button
                  type="button"
                  onClick={() => handleTrialClick('manager')}
                  className="hero-launch-btn btn-primary"
                >
                  <div className="btn-icon-wrapper">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <span>نرم‌افزار مدیریتی</span>
                  <span className="btn-status-beacon beacon-green" />
                </button>

                {/* Button 2: دمو کلاینت */}
                <button
                  type="button"
                  onClick={() => handleTrialClick('client')}
                  className="hero-launch-btn"
                >
                  <div className="btn-icon-wrapper">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <span>دمو کلاینت</span>
                  <span className="btn-status-beacon beacon-cyan" />
                </button>
              </div>

              {/* Auth / Login Guidance Footer */}
              <div className="hero-launch-footer">
                <div className={`hero-auth-text ${isLoggedIn ? 'is-active' : ''}`}>
                  {isLoggedIn ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>حساب شما فعال است؛ آماده تست و دانلود نرم‌افزار</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>برای فعال‌سازی تست ۵ روزه، ابتدا ورود یا عضویت لازم است</span>
                    </>
                  )}
                </div>

                {!isLoggedIn && (
                  <button
                    type="button"
                    onClick={onOpenAuthModal}
                    className="hero-auth-link"
                  >
                    <span>ورود / ثبت‌نام</span>
                    <ArrowUpLeft className="w-3 h-3" />
                  </button>
                )}
              </div>

              {authNotice && !isLoggedIn && (
                <div className="mt-3 text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/40 p-2.5 rounded-xl flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>{authNotice}</span>
                </div>
              )}
            </div>

          </div>

          {/* Left Column: Holographic Cyber HUD & Scanner over Controller */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative pointer-events-none select-none min-h-[480px]">
            {/* Cyber Scanning Laser Beam */}
            <div className="hero-scanner-laser" aria-hidden="true" />

            {/* Rotating Cyber HUD Rings */}
            <div className="cyber-hud-reactor-pod">
              <div className="cyber-ring ring-outer" />
              <div className="cyber-ring ring-middle" />
              <div className="cyber-ring ring-inner" />
              <div className="cyber-reactor-core" />
              <div className="cyber-target-crosshairs" />
              
              {/* Micro Telemetry HUD Floating Badges */}
              <div className="cyber-telemetry-tag tag-top">
                <span className="telemetry-dot" />
                <span>OVERCLOCK // 2026</span>
              </div>
              <div className="cyber-telemetry-tag tag-bottom">
                <span>AI CLOUD RELAY : 0.4ms</span>
              </div>
            </div>

            {/* Floating Cyber Particle Moters */}
            <div className="cyber-sparks-field" aria-hidden="true">
              <span className="spark-particle p1" />
              <span className="spark-particle p2" />
              <span className="spark-particle p3" />
              <span className="spark-particle p4" />
              <span className="spark-particle p5" />
            </div>
          </div>

        </div>

      </div>

      {/* 5-Day Free Trial Download & Activation Modal */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        softwareType={trialSoftwareType}
      />
    </section>
  );
};
