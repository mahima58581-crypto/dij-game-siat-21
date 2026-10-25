import React from 'react';
import { 
  ArrowUpLeft, Gamepad2, Zap, QrCode, Sparkles, Activity, ShieldCheck 
} from 'lucide-react';
import cyberpunkGreenRoomBg from '../assets/images/cyberpunk_green_gaming_room.png';
import './HeroSection.css';

interface HeroSectionProps {
  onOpenOrderModal?: () => void;
  onScrollToDemo?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToPurchase?: (modeOrPlanId?: string) => void;
  isLoggedIn?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrderModal,
  onScrollToDemo,
  onOpenAuthModal,
  onNavigateToSection,
  onNavigateToPurchase
}) => {
  const handleConnectClick = () => {
    if (onOpenAuthModal) onOpenAuthModal();
    else if (onOpenOrderModal) onOpenOrderModal();
    else if (onNavigateToPurchase) onNavigateToPurchase('new');
  };

  const handleExploreClick = () => {
    if (onNavigateToSection) onNavigateToSection('special-features');
    else if (onScrollToDemo) onScrollToDemo();
  };

  return (
    <section id="home" className="stylecraft-hero-section">
      {/* Master Framed Viewport Canvas */}
      <div className="stylecraft-master-frame">
        
        {/* Inner Canvas with Cyberpunk Green Gaming Room Background */}
        <div 
          className="stylecraft-inner-canvas"
          style={{ backgroundImage: `url(${cyberpunkGreenRoomBg})` }}
        >
          {/* Subtle Contrast Overlay */}
          <div className="stylecraft-canvas-overlay" />

          {/* =========================================================
              AREA 1: FLOATING CYBER TELEMETRY HUD BADGES (UPPER SIDES)
              ========================================================= */}
          {/* Left Upper Cyber Telemetry Pill */}
          <div className="cyber-hud-badge cyber-hud-left" dir="rtl">
            <span className="cyber-pulse-dot" />
            <div className="flex flex-col text-right leading-tight">
              <span className="text-[10px] text-emerald-400 font-bold tracking-wider font-mono">LIVE ENGINE // 240Hz</span>
              <span className="text-xs text-white font-extrabold font-['Vazirmatn',sans-serif]">پینگ سرور: ۱۲ میلی‌ثانیه</span>
            </div>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Right Upper Cyber Status Pill */}
          <div className="cyber-hud-badge cyber-hud-right" dir="rtl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col text-right leading-tight">
              <span className="text-[10px] text-emerald-400 font-bold tracking-wider font-mono">GAMING ARENA v4.2</span>
              <span className="text-xs text-white font-extrabold font-['Vazirmatn',sans-serif]">امنیت دخل و سیستم: ۱۰۰٪</span>
            </div>
          </div>

          {/* =========================================================
              TOP INVERTED NOTCH NAVIGATION BAR
              ========================================================= */}
          <header className="stylecraft-top-bar" dir="ltr">
            
            {/* Top Left Action Tab: Connect With Us Pill + Arrow Button */}
            <div className="stylecraft-action-tab" dir="rtl">
              <button 
                type="button" 
                onClick={handleConnectClick} 
                className="stylecraft-connect-btn"
                title="ارتباط با ما"
              >
                ارتباط با ما
              </button>
              <button 
                type="button" 
                onClick={handleConnectClick} 
                className="stylecraft-arrow-btn"
                title="ارتباط با ما"
              >
                <ArrowUpLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            {/* Top Center Nav Links sitting directly over dark image */}
            <nav className="stylecraft-nav-links" dir="rtl">
              <a 
                href="#shop" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToPurchase) onNavigateToPurchase('new'); }}
                className="stylecraft-nav-link"
              >
                فروشگاه
              </a>
              <a 
                href="#browser" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToSection) onNavigateToSection('features'); }}
                className="stylecraft-nav-link"
              >
                کاتالوگ
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToSection) onNavigateToSection('about'); }}
                className="stylecraft-nav-link"
              >
                درباره ما
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToSection) onNavigateToSection('faq'); }}
                className="stylecraft-nav-link"
              >
                سوالات متداول
              </a>
            </nav>

            {/* Top Right Brand Tab with S Ribbon Logo */}
            <div className="stylecraft-brand-tab" dir="rtl">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-slate-950" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 5.5C8 7 6 10.5 6 14.5c0 6.5 6.5 8 11.5 10s4.5 4 4.5 6.5c0 3-2.5 5-6 5-4 0-7-2.5-7.5-6l-4.5 1.5C5 27 9.5 31 16 31c6.5 0 11-4 11-10 0-7-6.5-8.5-11.5-10.5S11 7 11 4.5C11 2.5 13 1 16 1c3.5 0 6 1.5 7 4.5l4-2C25.5 1 21.5 0 16 0 11.5 0 8 2.5 11.5 5.5z" />
                </svg>
              </div>
              <div className="stylecraft-logo-stack text-right">
                <span className="stylecraft-logo-title font-['Vazirmatn',sans-serif]">استایل‌کرفت</span>
                <span className="stylecraft-logo-subtitle font-['Vazirmatn',sans-serif]">دیزاین</span>
              </div>
            </div>

          </header>

          {/* =========================================================
              CENTER HERO CONTENT (HEADLINE + SUBTITLE + EXPLORE BUTTON)
              ========================================================= */}
          <div className="stylecraft-hero-content" dir="rtl">
            
            {/* Bold Headline */}
            <h1 className="stylecraft-main-title font-['Vazirmatn',sans-serif]">
              مبلمان مدرن برای<br />
              علاقه‌مندان به سبک مینیمال
            </h1>

            {/* Subtitle Description */}
            <p className="stylecraft-sub-title font-['Vazirmatn',sans-serif]">
              نهایت آرامش و اصالت را با مجموعه‌ای برگزیده از طراحی‌های الهام‌بخش، اختصاصی و آرامش‌بخش تجربه کنید
            </p>

            {/* Cyber Emerald Rectangular Action Button */}
            <button 
              type="button" 
              onClick={handleExploreClick} 
              className="stylecraft-explore-btn group"
            >
              <span className="stylecraft-btn-shine" aria-hidden="true" />
              <span>مشاهده و کاوش بیشتر</span>
              <ArrowUpLeft className="w-4 h-4" />
            </button>

          </div>

          {/* =========================================================
              AREA 2: BOTTOM DESK GAMING COMMAND STATION DOCK
              (Fills the wide empty desk surface with gaming telemetry)
              ========================================================= */}
          <div className="stylecraft-bottom-dock" dir="rtl">
            <div className="stylecraft-dock-island">
              
              {/* 1. PS5 & PC */}
              <div 
                className="stylecraft-dock-item"
                onClick={() => onNavigateToSection?.('features')}
                title="امکانات و کنترل کنسول‌ها"
              >
                <div className="stylecraft-dock-icon-pod">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="stylecraft-dock-text-stack">
                  <span className="stylecraft-dock-title">کنترل PS5 و PC</span>
                  <span className="stylecraft-dock-desc">محاسبه خودکار و بلادرنگ</span>
                </div>
              </div>

              {/* 2. Smart Power Relay */}
              <div 
                className="stylecraft-dock-item"
                onClick={() => onNavigateToSection?.('special-features')}
                title="کنترل خودکار برق دستگاه‌ها"
              >
                <div className="stylecraft-dock-icon-pod">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="stylecraft-dock-text-stack">
                  <span className="stylecraft-dock-title">سوئیچ رله هوشمند</span>
                  <span className="stylecraft-dock-desc">قطع و وصل خودکار برق</span>
                </div>
              </div>

              {/* 3. Buffet QR */}
              <div 
                className="stylecraft-dock-item"
                onClick={() => onNavigateToSection?.('special-features')}
                title="منوی دیجیتال بوفه با QR کد"
              >
                <div className="stylecraft-dock-icon-pod">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="stylecraft-dock-text-stack">
                  <span className="stylecraft-dock-title">سفارش بوفه با QR</span>
                  <span className="stylecraft-dock-desc">بدون وقفه در حین بازی</span>
                </div>
              </div>

              {/* 4. Active Gamers */}
              <div 
                className="stylecraft-dock-item"
                onClick={() => onNavigateToSection?.('pricing')}
                title="مشاهده تعرفه‌ها و کلوپ‌های همکار"
              >
                <div className="stylecraft-dock-icon-pod">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="stylecraft-dock-text-stack">
                  <span className="stylecraft-dock-title">+۱۰,۰۰۰ گیمر فعال</span>
                  <span className="stylecraft-dock-desc">کلوپ‌های برتر سراسر کشور</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
