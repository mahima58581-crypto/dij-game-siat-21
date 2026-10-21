import React from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AuthButton from './AuthButton';
import './Navbar.css';

interface NavbarProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenAuthModal: () => void;
  onOpenManagementPanel?: () => void;
  onNavigateToPurchase?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenOrderModal, 
  onOpenAuthModal,
  onNavigateToPurchase,
  onNavigateToSection,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(false);

  const handleNavMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--nav-x', `${x}px`);
    e.currentTarget.style.setProperty('--nav-y', `${y}px`);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      // Hero section height is roughly 650-700px. Once scrolled past 250px (heading to slide 2), morph navbar to expanded full mode!
      const scrollPos = window.scrollY;
      if (scrollPos > 240) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
      isScrolledPastHero 
        ? 'navbar-expanded' 
        : 'navbar-compact'
    }`}>
      <div 
        className="navbar-inner-container mx-auto flex items-center justify-between gap-3 sm:gap-4 transition-all duration-500 relative"
        onMouseMove={handleNavMouseMove}
      >
        {/* Specular Top Accent Light Beam */}
        <span className="nav-specular-beam" aria-hidden="true" />
        
        {/* Zone 1: Pro Brand Hologram Badge */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
            else window.location.hash = '';
          }}
          className="brand-logo-link flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer"
        >
          {/* 3D Glowing DG Emblem Avatar */}
          <div className="brand-icon-pod relative flex items-center justify-center shrink-0">
            <span className="brand-icon-pulse-glow" aria-hidden="true" />
            <div className="brand-icon-box">
              <span className="brand-icon-text">DG</span>
            </div>
          </div>

          {/* Typography & VIP Live Radar */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="brand-title">
                دیجی‌گیم
              </span>
              <span className="brand-vip-badge">
                <span className="brand-vip-dot" />
                VIP
              </span>
            </div>
            <div className="brand-subtext-row">
              <span className="brand-status-dot" />
              <span>نرم‌افزار جامع گیم‌نت</span>
            </div>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center nav-menu">
          <button
            onClick={() => onNavigateToSection?.('special-features')}
            className="nav-link"
          >
            ویژگی‌های اپلیکیشن
          </button>
          <button
            onClick={() => onNavigateToSection?.('pricing')}
            className="nav-link"
          >
            تعرفه
          </button>
          <button
            onClick={() => onNavigateToSection?.('game-clubs')}
            className="nav-link"
          >
            گیم‌نت‌ها
          </button>
          <button
            onClick={() => onNavigateToSection?.('installers')}
            className="nav-link"
          >
            نصاب‌ها
          </button>
          <button
            onClick={() => onNavigateToSection?.('blog')}
            className="nav-link"
          >
            بلاگ و مقالات
          </button>
          <button
            onClick={() => onNavigateToSection?.('tutorials')}
            className="nav-link"
          >
            آموزش
          </button>
          <button
            onClick={() => onNavigateToSection?.('downloads')}
            className="nav-link"
          >
            دانلود
          </button>
          <button
            onClick={() => onNavigateToSection?.('about')}
            className="nav-link"
          >
            درباره ما
          </button>
          <button
            onClick={onNavigateToPurchase}
            className="nav-link nav-link-cta"
          >
            <span className="nav-cta-beacon" />
            <span>خرید اشتراک</span>
            <span className="nav-cta-tag">VIP</span>
          </button>
        </nav>

        {/* Zone 3: Interactive Controls & Portals */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Custom Cyber Neon Light / Dark Mode Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Login / Register Button */}
          <AuthButton onClick={onOpenAuthModal} />

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            aria-label="منو موبایل"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#070e1c] border-b border-slate-800 p-4 space-y-3 text-xs font-bold">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('special-features'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">امکانات</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('pricing'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">تعرفه</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('game-clubs'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">گیم‌نت‌ها</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('installers'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">نصاب‌ها</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('blog'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">بلاگ و مقالات</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('tutorials'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">آموزش</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToSection?.('downloads'); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">دانلود</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigateToPurchase?.(); }} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">خرید</button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row gap-2 items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full bg-slate-800 py-2.5 rounded-xl text-center text-white font-bold"
            >
              ورود / عضویت
            </button>
            <div className="w-full flex justify-center py-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
