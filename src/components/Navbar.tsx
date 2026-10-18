import React from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AuthButton from './AuthButton';
import DemoOrderButton from './DemoOrderButton';
import './Navbar.css';

interface NavbarProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenAuthModal: () => void;
  onOpenManagementPanel?: () => void;
  onNavigateToPurchase?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenOrderModal, 
  onOpenAuthModal,
  onNavigateToPurchase,
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050a14]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="brand-logo-link flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="font-outfit font-black text-slate-950 text-xl tracking-tighter">DG</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="brand-title text-lg sm:text-xl font-black tracking-tight font-vazir">
                دیجی‌گیم
              </span>
              <span className="brand-vip-badge inline-flex items-center gap-1 text-[9.5px] font-outfit uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full border">
                <span className="brand-vip-dot" />
                VIP
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
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
            <span>01</span>
            ویژگی‌های اپلیکیشن
          </button>
          <button
            onClick={() => onNavigateToSection?.('pricing')}
            className="nav-link"
          >
            <span>02</span>
            تعرفه
          </button>
          <button
            onClick={() => onNavigateToSection?.('game-clubs')}
            className="nav-link"
          >
            <span>03</span>
            گیم‌نت‌ها
          </button>
          <button
            onClick={() => onNavigateToSection?.('installers')}
            className="nav-link"
          >
            <span>04</span>
            نصاب‌ها
          </button>
          <button
            onClick={() => onNavigateToSection?.('blog')}
            className="nav-link"
          >
            <span>05</span>
            بلاگ و مقالات
          </button>
          <button
            onClick={() => onNavigateToSection?.('tutorials')}
            className="nav-link"
          >
            <span>06</span>
            آموزش
          </button>
          <button
            onClick={() => onNavigateToSection?.('downloads')}
            className="nav-link"
          >
            <span>07</span>
            دانلود
          </button>
          <button
            onClick={() => onNavigateToSection?.('about')}
            className="nav-link"
          >
            <span>08</span>
            درباره ما
          </button>
          <button
            onClick={onNavigateToPurchase}
            className="nav-link"
          >
            <span>09</span>
            خرید
          </button>
        </nav>

        {/* Zone 3: Interactive Controls & Portals */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Custom Cyber Neon Light / Dark Mode Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          


          {/* Login / Register Button */}
          <AuthButton onClick={onOpenAuthModal} />

          {/* Primary Action Button */}
          <div className="hidden sm:block">
            <DemoOrderButton onClick={() => onOpenOrderModal()} />
          </div>

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
