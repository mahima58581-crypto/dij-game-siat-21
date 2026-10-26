import React from 'react';
import cyberpunkGreenRoomBg from '../assets/images/cyberpunk_green_gaming_room.png';
import digigameOfficialLogo from '../assets/images/digigame_official_logo_2026.jpg';
import ThemeToggle from './ThemeToggle';
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
              TOP INVERTED NOTCH NAVIGATION BAR (STATIC AT TOP OF HERO)
              ========================================================= */}
          <header className="stylecraft-top-bar" dir="ltr">
            
            {/* Top Left Action Tab: Connect With Us Button & Light/Dark Theme Toggle */}
            <div className="stylecraft-action-tab" dir="rtl">
              <button 
                type="button" 
                onClick={handleConnectClick} 
                className="stylecraft-connect-btn"
                title="ارتباط با ما"
              >
                ارتباط با ما
              </button>
              <ThemeToggle />
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
              <div className="stylecraft-brand-logo-pod">
                <img 
                  src={digigameOfficialLogo} 
                  alt="لوگو دیجی‌گیم" 
                  className="stylecraft-brand-logo-img"
                />
              </div>
              <div className="stylecraft-logo-stack text-right">
                <span className="stylecraft-logo-title font-['Vazirmatn',sans-serif]">دیجی‌گیم</span>
                <span className="stylecraft-logo-subtitle font-['Vazirmatn',sans-serif]">سامانه هوشمند گیم‌نت</span>
              </div>
            </div>

          </header>

          {/* =========================================================
              CENTER HERO CONTENT (HEADLINE + SUBTITLE + EXPLORE BUTTON)
              ========================================================= */}
          <div className="stylecraft-hero-content" dir="rtl">
            
            {/* Cyber Emerald Pill Badge */}
            <div className="stylecraft-hero-badge">
              <span className="stylecraft-badge-pulse" />
              <span>سامانه نسل جدید مدیریت گیم‌نت</span>
            </div>

            {/* Bold Punchy Headline with Theme Gradient */}
            <h1 className="stylecraft-main-title font-['Vazirmatn',sans-serif]">
              مدیریت هوشمند کلوپ با <span className="stylecraft-text-gradient">دیجی‌گیم</span>
            </h1>

            {/* Short & Powerful Subtitle Description */}
            <p className="stylecraft-sub-title font-['Vazirmatn',sans-serif]">
              کنترل خودکار برق کنسول‌ها، محاسبه دقیق ثانیه‌ای و افزایش قطعی درآمد کلوپ شما.
            </p>

          </div>

          {/* Empty bottom anchor to keep layout balanced over the sofa */}
          <div className="h-6" />

        </div>

      </div>
    </section>
  );
};
