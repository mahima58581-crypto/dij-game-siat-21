import React from 'react';
import heroBg from '../assets/images/hero_cyber_arena_bg_1792238808313.jpg';

interface HeroSectionProps {
  onOpenOrderModal?: () => void;
  onScrollToDemo?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section id="home" className="relative pt-6 pb-16 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Container Chassis with Uploaded Neon Crown Emblem Background */}
      <div
        className="relative text-slate-100 rounded-[32px] sm:rounded-[44px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9)] border border-emerald-500/40 p-5 sm:p-8 md:p-12 transition-all overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(5, 10, 20, 0.90) 0%, rgba(5, 10, 20, 0.55) 45%, rgba(5, 10, 20, 0.20) 100%), url(${heroBg})`
        }}
      >
        
        {/* Hero Grid / Spatial Canvas */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">

          {/* Left Column (Stats & Giant Brand Typography) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full z-10 space-y-8">
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
            <div className="pt-2 select-none pointer-events-none hidden sm:block leading-none space-y-1">
              <span className="font-outfit font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-white opacity-95 block">
                DIGI
              </span>
              <span className="font-outfit font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-emerald-400 block drop-shadow-[0_4px_20px_rgba(16,185,129,0.5)]">
                GAME
              </span>
            </div>

            {/* Value Proposition Description */}
            <div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm text-justify">
                سامانه هوشمند مدیریت سخت‌افزاری و نرم‌افزاری گیم‌نت؛ کنترل خودکار برق کنسول‌ها با رله صنعتی، صورتحساب ثانیه‌ای، فروش آنلاین بوفه و جلوگیری صددرصدی از نشتی مالی دخل.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
