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
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenOrderModal, 
  onOpenAuthModal, 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050a14]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="font-outfit font-black text-slate-950 text-xl tracking-tighter">DG</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-vazir">
              دیجی‌گیم
              <span className="text-[10px] font-outfit uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">VIP</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">نرم‌افزار جامع گیم‌نت</span>
          </div>
        </a>



        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center nav-menu">
          <a href="#special-features" className="nav-link">
            <span>01</span>
            ویژگی‌های اپلیکیشن
          </a>
          <a href="#pricing" className="nav-link">
            <span>02</span>
            تعرفه
          </a>
          <a href="#game-clubs" className="nav-link">
            <span>03</span>
            گیم‌نت‌ها
          </a>
          <a href="#installers" className="nav-link">
            <span>04</span>
            نصاب‌ها
          </a>
          <a href="#blog" className="nav-link">
            <span>05</span>
            بلاگ و مقالات
          </a>
          <a href="#tutorials" className="nav-link">
            <span>06</span>
            آموزش
          </a>
          <a href="#downloads" className="nav-link">
            <span>07</span>
            دانلود
          </a>
          <a href="#about" className="nav-link">
            <span>08</span>
            درباره ما
          </a>
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
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">امکانات</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">تعرفه</a>
            <a href="#game-clubs" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">گیم‌نت‌ها</a>
            <a href="#installers" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">نصاب‌ها</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">بلاگ و مقالات</a>
            <a href="#tutorials" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">آموزش</a>
            <a href="#downloads" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 hover:text-white">دانلود</a>
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
