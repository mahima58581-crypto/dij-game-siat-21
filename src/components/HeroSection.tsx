import React, { useState } from 'react';
import { LayoutDashboard, Monitor, Sparkles, ShieldCheck, Lock, ArrowUpLeft } from 'lucide-react';
import heroBg from '../assets/images/hero_cyber_arena_bg_1792238808313.jpg';
import { TrialModal } from './TrialModal';

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

  return (
    <section id="home" className="relative pt-6 pb-16 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Container Chassis with Uploaded Neon Crown Emblem Background */}
      <div
        className="hero-chassis relative text-slate-100 rounded-[32px] sm:rounded-[44px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9)] border border-emerald-500/40 p-5 sm:p-8 md:p-12 transition-all overflow-hidden"
        style={{
          ['--hero-bg' as any]: `url(${heroBg})`
        }}
      >
        
        {/* Hero Grid / Spatial Canvas */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">

          {/* Right Column (Stats & Giant Brand Typography & Trial Actions) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full z-10 space-y-6 sm:space-y-8">
            {/* 450+ Gamers & Centers Stat */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-outfit font-black text-4xl sm:text-5xl text-white tracking-tight">
                  ۴۵۰+
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 font-outfit">
                  گیم‌نت در سراسر کشور
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 rtl:space-x-reverse">
                  <div className="w-8 h-8 rounded-full ring-2 ring-slate-800 bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center font-outfit">VIP</div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-slate-800 bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-outfit">PS5</div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-slate-800 bg-blue-700 text-white font-bold text-xs flex items-center justify-center font-outfit">PC</div>
                </div>
                <div className="text-xs text-slate-300 font-medium leading-tight">
                  مورد اعتماد برترین کلوپ‌ها و گیم‌سنترهای ایران
                </div>
              </div>
            </div>

            {/* Giant Typographic Core Accent on Left */}
            <div className="pt-1 select-none pointer-events-none hidden sm:block leading-none space-y-1">
              <span className="font-outfit font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-white opacity-95 block">
                DIGI
              </span>
              <span className="font-outfit font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-emerald-400 block drop-shadow-[0_4px_20px_rgba(16,185,129,0.5)]">
                GAME
              </span>
            </div>

            {/* Value Proposition Description */}
            <div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md text-justify">
                سامانه هوشمند مدیریت سخت‌افزاری و نرم‌افزاری گیم‌نت؛ کنترل خودکار برق کنسول‌ها با رله صنعتی، صورتحساب ثانیه‌ای، فروش آنلاین بوفه و جلوگیری صددرصدی از نشتی مالی دخل.
              </p>
            </div>

            {/* Eye-Catching 5-Day Free Trial Panel: "اول تست کن" */}
            <div className="bg-gradient-to-r from-[#0d1f36]/45 via-[#0a182b]/50 to-[#06101e]/40 border border-emerald-400/60 rounded-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(57,255,120,0.20)] space-y-3.5 backdrop-blur-md group relative isolation animate-pulse-glow hover:border-emerald-300/80 hover:shadow-[0_0_55px_rgba(57,255,120,0.35)] hover:scale-[1.015] transition-all duration-500">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-black shadow-[0_0_12px_rgba(57,255,120,0.25)]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>اول تست کن</span>
                </div>
                <span className="text-[11px] font-bold text-slate-300">
                  ۵ روز تست کامل و بدون قید و شرط
                </span>
              </div>

              {/* Two Action Buttons with the Theme of Light/Dark Mode Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Button 1: نرم افزار مدیریتی */}
                <button
                  type="button"
                  onClick={() => handleTrialClick('manager')}
                  className="cyber-action-btn cyber-action-btn--primary !w-full !min-h-[46px] px-4 text-xs font-black flex items-center justify-center gap-2 group"
                >
                  <span className="cyber-action-btn__shine" />
                  <span className="cyber-action-btn__icon">
                    <LayoutDashboard className="w-4 h-4" />
                  </span>
                  <span>نرم‌افزار مدیریتی</span>
                  <span className="w-2 h-2 rounded-full bg-[#39ff78] shadow-[0_0_8px_#39ff78] animate-pulse shrink-0" />
                </button>

                {/* Button 2: دمو کلاینت */}
                <button
                  type="button"
                  onClick={() => handleTrialClick('client')}
                  className="cyber-action-btn !w-full !min-h-[46px] px-4 text-xs font-black flex items-center justify-center gap-2 group"
                >
                  <span className="cyber-action-btn__shine" />
                  <span className="cyber-action-btn__icon">
                    <Monitor className="w-4 h-4" />
                  </span>
                  <span>دمو کلاینت</span>
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] shrink-0" />
                </button>
              </div>

              {/* Auth / Login Requirement Guidance */}
              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                <div className="flex items-center gap-1.5">
                  {isLoggedIn ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300">حساب شما فعال است؛ آماده تست و دانلود ۵ روزه</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>برای فعال‌سازی تست ۵ روزه، ابتدا ورود یا عضویت لازم است</span>
                    </>
                  )}
                </div>

                {!isLoggedIn && (
                  <button
                    type="button"
                    onClick={onOpenAuthModal}
                    className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-0.5 hover:underline cursor-pointer"
                  >
                    <span>ورود / ثبت‌نام</span>
                    <ArrowUpLeft className="w-3 h-3" />
                  </button>
                )}
              </div>

              {authNotice && !isLoggedIn && (
                <div className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/40 p-2.5 rounded-xl flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>{authNotice}</span>
                </div>
              )}
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
