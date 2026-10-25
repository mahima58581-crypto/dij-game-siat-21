import React, { useState } from 'react';
import { 
  Home, LayoutGrid, MessageSquare, 
  Moon, Sun, ArrowUpRight, ArrowUpLeft
} from 'lucide-react';
import neonGameCollageBg from '../assets/images/epic_neon_gaming_collage.png';
import { useTheme } from '../context/ThemeContext';
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
  onNavigateToPurchase,
  isLoggedIn = false
}) => {
  const { mode, toggleTheme } = useTheme();

  // Left Sidebar Active Nav Item
  const [activeNav, setActiveNav] = useState<'home' | 'grid' | 'chat'>('home');

  // 3D Parallax Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const tiltY = Math.max(-1, Math.min(1, (y - centerY) / centerY));
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    e.currentTarget.style.setProperty('--tilt-x', `${tiltX.toFixed(3)}`);
    e.currentTarget.style.setProperty('--tilt-y', `${tiltY.toFixed(3)}`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', '0');
    e.currentTarget.style.setProperty('--tilt-y', '0');
  };

  return (
    <section 
      id="home" 
      className="villa-hero-section relative w-full min-h-screen lg:h-screen m-0 p-0 select-none overflow-hidden"
    >
      {/* Master Viewport Frame matching reference image (Edge-to-Edge Full Screen) */}
      <div 
        className="villa-master-frame relative w-full h-full min-h-screen lg:h-screen overflow-hidden flex flex-col justify-between"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `url(${neonGameCollageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        {/* Soft Ambient Cinematic Vignette Overlay */}
        <div className="villa-ambient-overlay pointer-events-none" />

        {/* =========================================================
            TOP FLOATING BRIDGE & NAV ISLAND
            ========================================================= */}
        <div className="villa-top-bar-wrapper relative z-30 pt-4 px-4 sm:px-8 flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          
          {/* Top Left: Buy Pill Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigateToPurchase) {
                onNavigateToPurchase('new');
              } else {
                window.location.hash = 'purchase';
              }
            }}
            className="villa-pill-btn villa-buy-btn group"
            title="ورود به صفحه خرید و فعال‌سازی لایسنس"
          >
            <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="font-extrabold text-sm tracking-wide font-['Vazirmatn',sans-serif]">خرید لایسنس</span>
          </button>

          {/* Top Right: Rent Pill Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigateToSection) onNavigateToSection('pricing');
              else onScrollToDemo?.();
            }}
            className="villa-pill-btn villa-rent-btn group"
            title="مشاهده نسخه آزمایشی و تعرفه‌ها"
          >
            <span className="font-extrabold text-sm tracking-wide font-['Vazirmatn',sans-serif]">نسخه دمو</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

        </div>

        {/* =========================================================
            MIDDLE CANVAS: BIG TYPOGRAPHY & INTRO PARAGRAPH
            ========================================================= */}
        <div className="villa-hero-center-content relative z-20 flex-1 px-8 sm:px-14 lg:px-20 pt-10 sm:pt-14 pb-4 flex flex-col justify-center">
          
          {/* Big Majestic Headline sitting directly on artwork */}
          <div className="villa-headline-stack text-center pointer-events-none select-none" dir="rtl">
            <h1 className="villa-huge-title leading-[1.05] tracking-tight">
              <span className="block font-black text-white/95 drop-shadow-md">شیوه نوین</span>
              <span className="block font-black text-white/90 drop-shadow-lg">مدیریت گیم‌نت</span>
            </h1>
          </div>

          {/* Elegant Floating Narrative Paragraph */}
          <div className="villa-narrative-box max-w-sm sm:max-w-md pt-4 sm:pt-6" dir="rtl">
            <p className="text-white/85 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm font-['Vazirmatn',sans-serif] text-right">
              پیشرفته‌ترین پلتفرم جامع برای کنترل استیشن‌ها، محاسبه دقیق زمان و دخل، تفکیک خودکار حساب و هوشمندسازی مدرن‌ترین گیم‌نت‌ها و کلاب‌های بازی سراسر کشور.
            </p>
          </div>

        </div>

        {/* =========================================================
            LEFT DOCK & SIDEBAR (ORGANIC CURVED ISLAND)
            ========================================================= */}
        <aside className="villa-left-sidebar absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 py-3 px-2 rounded-[18px]">
          
          {/* Upper Cluster */}
          <div className="flex flex-col items-center gap-2">
            
            {/* 1. Home Button (Active) */}
            <button
              type="button"
              onClick={() => {
                setActiveNav('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`sidebar-dock-btn ${activeNav === 'home' ? 'is-active' : ''}`}
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>

            {/* 2. Grid / Dashboard */}
            <button
              type="button"
              onClick={() => {
                setActiveNav('grid');
                if (onNavigateToSection) onNavigateToSection('features');
              }}
              className={`sidebar-dock-btn ${activeNav === 'grid' ? 'is-active' : ''}`}
              title="امکانات و داشبورد گیم‌نت"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            {/* 4. Chat / Messages */}
            <button
              type="button"
              onClick={() => {
                setActiveNav('chat');
                if (onNavigateToSection) onNavigateToSection('faq');
                else if (!isLoggedIn && onOpenAuthModal) onOpenAuthModal();
              }}
              className={`sidebar-dock-btn ${activeNav === 'chat' ? 'is-active' : ''}`}
              title="پشتیبانی و سوالات متداول"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* 5. User Profile Photo with Green Live Beacon */}
            <div 
              className="sidebar-avatar-pod relative cursor-pointer group"
              onClick={() => onOpenAuthModal?.()}
              title={isLoggedIn ? "پروفایل کاربری شما" : "ورود به حساب کاربری"}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User Profile" 
                className="w-8 h-8 rounded-[10px] object-cover border-2 border-white/80 shadow-sm transition-transform group-hover:scale-105"
              />
              <span className="avatar-online-beacon absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>

          </div>

          {/* Organic Inset Bridge Notch */}
          <div className="sidebar-divider w-5 h-px bg-slate-300/40 my-1" />

          {/* Lower Cluster (Theme Toggles) */}
          <div className="flex flex-col items-center gap-2">
            
            {/* 6. Dark Mode Moon */}
            <button
              type="button"
              onClick={() => { if (mode !== 'dark') toggleTheme(); }}
              className={`sidebar-dock-btn ${mode === 'dark' ? 'is-theme-active' : ''}`}
              title="Dark Mode"
            >
              <Moon className="w-4 h-4" />
            </button>

            {/* 7. Light Mode Sun */}
            <button
              type="button"
              onClick={() => { if (mode !== 'light') toggleTheme(); }}
              className={`sidebar-dock-btn ${mode === 'light' ? 'is-theme-active' : ''}`}
              title="Light Mode"
            >
              <Sun className="w-4 h-4" />
            </button>

          </div>

        </aside>

        {/* =========================================================
            BOTTOM CARDS: ORGANIC CARD
            ========================================================= */}
        <div className="villa-bottom-cards-row relative z-30 p-4 sm:p-6 lg:p-8 flex items-end justify-between gap-6 flex-wrap">
          
          {/* 1. Bottom Left: White Organic Card */}
          <div className="villa-bottom-left-card bg-white text-slate-900 p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] max-w-sm shadow-xl flex flex-col justify-between" dir="rtl">
            <div className="space-y-2 text-right">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Vazirmatn',sans-serif]">
                انتخاب هوشمندانه کلوپ شما
              </h3>
              <p className="text-slate-600 text-xs sm:text-xs leading-relaxed font-['Vazirmatn',sans-serif]">
                سامانه دیجی‌گیم به شما کمک می‌کند کلوپ خود را به نسل جدید استانداردهای مدیریتی، امنیت دخل و رضایت صددرصدی گیمرها مجهز کنید.
              </p>
            </div>

            {/* Stat Row: 10K+ Properties & Avatars */}
            <div className="pt-6 flex items-center justify-between">
              <div className="text-right">
                <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none font-outfit">+10K</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-['Vazirmatn',sans-serif]">کنسول و گیمر فعال</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Overlapping circle thumbnails */}
                <div className="flex items-center -space-x-2">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=80&h=80&q=80" 
                    alt="Club 1" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=80&h=80&q=80" 
                    alt="Club 2" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=80&h=80&q=80" 
                    alt="Club 3" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>

                {/* Circular Arrow Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToSection) onNavigateToSection('features');
                    else onScrollToDemo?.();
                  }}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                  title="مشاهده امکانات و ویژگی‌ها"
                >
                  <ArrowUpLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
