import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import livingRoomBg from '../assets/images/modern_minimalist_living_room.jpg';
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
      {/* Master Framed White Outer Card */}
      <div className="stylecraft-master-frame">
        
        {/* Inner Canvas with Modern Living Room Interior Background */}
        <div 
          className="stylecraft-inner-canvas"
          style={{ backgroundImage: `url(${livingRoomBg})` }}
        >
          {/* Subtle Contrast Overlay */}
          <div className="stylecraft-canvas-overlay" />

          {/* =========================================================
              TOP INVERTED NOTCH NAVIGATION BAR
              ========================================================= */}
          <header className="stylecraft-top-bar" dir="ltr">
            
            {/* Top Left Brand Tab with S Ribbon Logo */}
            <div className="stylecraft-brand-tab">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-slate-950" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 5.5C8 7 6 10.5 6 14.5c0 6.5 6.5 8 11.5 10s4.5 4 4.5 6.5c0 3-2.5 5-6 5-4 0-7-2.5-7.5-6l-4.5 1.5C5 27 9.5 31 16 31c6.5 0 11-4 11-10 0-7-6.5-8.5-11.5-10.5S11 7 11 4.5C11 2.5 13 1 16 1c3.5 0 6 1.5 7 4.5l4-2C25.5 1 21.5 0 16 0 11.5 0 8 2.5 11.5 5.5z" />
                </svg>
              </div>
              <div className="stylecraft-logo-stack">
                <span className="stylecraft-logo-title">STYLECRAFT</span>
                <span className="stylecraft-logo-subtitle">DESIGN</span>
              </div>
            </div>

            {/* Top Center Nav Links sitting directly over dark image */}
            <nav className="stylecraft-nav-links">
              <a 
                href="#shop" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToPurchase) onNavigateToPurchase('new'); }}
                className="stylecraft-nav-link"
              >
                Shop
              </a>
              <a 
                href="#browser" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToSection) onNavigateToSection('features'); }}
                className="stylecraft-nav-link"
              >
                Browser
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToSection) onNavigateToSection('about'); }}
                className="stylecraft-nav-link"
              >
                About Us
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); if (onNavigateToSection) onNavigateToSection('faq'); }}
                className="stylecraft-nav-link"
              >
                FAQ
              </a>
            </nav>

            {/* Top Right Action Tab: Connect With Us Pill + Arrow Button */}
            <div className="stylecraft-action-tab">
              <button 
                type="button" 
                onClick={handleConnectClick} 
                className="stylecraft-connect-btn"
                title="Connect with us"
              >
                Connect with us
              </button>
              <button 
                type="button" 
                onClick={handleConnectClick} 
                className="stylecraft-arrow-btn"
                title="Connect with us"
              >
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

          </header>

          {/* =========================================================
              CENTER HERO CONTENT (HEADLINE + SUBTITLE + EXPLORE BUTTON)
              ========================================================= */}
          <div className="stylecraft-hero-content" dir="ltr">
            
            {/* Bold Headline */}
            <h1 className="stylecraft-main-title">
              Modern Furniture for<br />
              Minimalist Lovers
            </h1>

            {/* Subtitle Description */}
            <p className="stylecraft-sub-title">
              Experience the ultimate relaxation with our collection of serene and tranquil spa-inspired designs
            </p>

            {/* Coral-Red Pill Action Button */}
            <button 
              type="button" 
              onClick={handleExploreClick} 
              className="stylecraft-explore-btn group"
            >
              <span>Explore More</span>
              <span className="stylecraft-explore-arrow-pod">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </button>

          </div>

          {/* Empty bottom anchor to keep layout balanced over the sofa */}
          <div className="h-6" />

        </div>

      </div>
    </section>
  );
};
