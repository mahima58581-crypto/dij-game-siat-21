import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import cyberpunkGreenRoomBg from '../assets/images/cyberpunk_green_gaming_room.png';
import digigameOfficialLogo from '../assets/images/digigame_official_logo_2026.jpg';
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

          {/* Empty bottom anchor to keep layout balanced over the sofa */}
          <div className="h-6" />

        </div>

      </div>
    </section>
  );
};
