import React, { useState } from 'react';
import { 
  Home, Search, LayoutGrid, MessageSquare, Bell, Settings, 
  Moon, Sun, MapPin, Building2, ChevronDown, ArrowUpRight, 
  ArrowUpLeft, DollarSign, X
} from 'lucide-react';
import villaBg from '../assets/images/luxury_futuristic_villa_bg.jpg';
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
  
  // Interactive Filter States
  const [activeLocation, setActiveLocation] = useState('Arizona');
  const [activePropertyType, setActivePropertyType] = useState('Villa');
  const [activeMaxPrice, setActiveMaxPrice] = useState('$300 000');
  const [openDropdown, setOpenDropdown] = useState<'location' | 'type' | 'price' | null>(null);

  // Left Sidebar Active Nav Item
  const [activeNav, setActiveNav] = useState<'home' | 'search' | 'grid' | 'chat'>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      onClick={() => setOpenDropdown(null)}
    >
      {/* Master Viewport Frame matching reference image (Edge-to-Edge Full Screen) */}
      <div 
        className="villa-master-frame relative w-full h-full min-h-screen lg:h-screen overflow-hidden flex flex-col justify-between"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `url(${villaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
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
            <span className="font-extrabold text-sm tracking-wide">Buy</span>
          </button>

          {/* Top Center: 3 Filter Telemetry Dropdowns */}
          <div 
            className="villa-filter-island flex items-center gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-[14px]"
            onClick={e => e.stopPropagation()}
          >
            {/* 1. Location Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => setOpenDropdown(prev => prev === 'location' ? null : 'location')}
                className="filter-telemetry-btn flex items-center gap-1.5 text-left"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{activeLocation}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-emerald-400/70 transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'location' && (
                <div className="villa-dropdown-menu">
                  {['Arizona', 'California', 'Dubai VIP', 'Tehran Central', 'Esfahan Lounge'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => { setActiveLocation(loc); setOpenDropdown(null); }}
                      className={`dropdown-opt ${activeLocation === loc ? 'active' : ''}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-emerald-500/30" />

            {/* 2. Property Type Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => setOpenDropdown(prev => prev === 'type' ? null : 'type')}
                className="filter-telemetry-btn flex items-center gap-1.5 text-left"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Property Type</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{activePropertyType}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-emerald-400/70 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'type' && (
                <div className="villa-dropdown-menu">
                  {['Villa', 'Penthouse', 'VIP Gaming Lounge', 'Esports Arena', 'Modern Mansion'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { setActivePropertyType(t); setOpenDropdown(null); }}
                      className={`dropdown-opt ${activePropertyType === t ? 'active' : ''}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-emerald-500/30 hidden sm:block" />

            {/* 3. Max Price Dropdown */}
            <div className="relative hidden sm:block">
              <button 
                type="button" 
                onClick={() => setOpenDropdown(prev => prev === 'price' ? null : 'price')}
                className="filter-telemetry-btn flex items-center gap-1.5 text-left"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Max Price</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{activeMaxPrice}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-emerald-400/70 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'price' && (
                <div className="villa-dropdown-menu">
                  {['$150 000', '$300 000', '$500 000', '$1 000 000+'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setActiveMaxPrice(p); setOpenDropdown(null); }}
                      className={`dropdown-opt ${activeMaxPrice === p ? 'active' : ''}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Top Right: Rent Pill Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigateToSection) onNavigateToSection('pricing');
              else onScrollToDemo?.();
            }}
            className="villa-pill-btn villa-rent-btn group"
            title="مشاهده تعرفه‌ها و اشتراک"
          >
            <span className="font-extrabold text-sm tracking-wide">Rent</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

        </div>

        {/* =========================================================
            MIDDLE CANVAS: BIG TYPOGRAPHY & INTRO PARAGRAPH
            ========================================================= */}
        <div className="villa-hero-center-content relative z-20 flex-1 px-8 sm:px-14 lg:px-20 pt-10 sm:pt-14 pb-4 flex flex-col justify-center">
          
          {/* Big Majestic Headline sitting directly on artwork */}
          <div className="villa-headline-stack text-center pointer-events-none select-none">
            <h1 className="villa-huge-title leading-[0.95] tracking-tight">
              <span className="block font-black text-white/90 drop-shadow-md">New Way Of</span>
              <span className="block font-black text-white/85 drop-shadow-lg">Living</span>
            </h1>
          </div>

          {/* Elegant Floating Narrative Paragraph on Left */}
          <div className="villa-narrative-box max-w-sm sm:max-w-md pt-4 sm:pt-6">
            <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm">
              Discover extraordinary properties available for purchase or rent. Whether you're seeking a dream home or a unique investment, our curated listings offer the most exceptional estates worldwide.
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

            {/* 2. Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(prev => !prev)}
              className={`sidebar-dock-btn ${searchOpen ? 'is-active' : ''}`}
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* 3. Grid / Dashboard */}
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

            {/* 6. Notification Bell with Alert Dot */}
            <button
              type="button"
              onClick={() => onOpenAuthModal?.()}
              className="sidebar-dock-btn relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>

          </div>

          {/* Organic Inset Bridge Notch */}
          <div className="sidebar-divider w-5 h-px bg-slate-300/40 my-1" />

          {/* Lower Cluster (Settings & Theme Toggles) */}
          <div className="flex flex-col items-center gap-2">
            
            {/* 7. Settings */}
            <button
              type="button"
              onClick={() => onOpenOrderModal?.()}
              className="sidebar-dock-btn"
              title="Settings & Options"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* 8. Dark Mode Moon */}
            <button
              type="button"
              onClick={() => { if (mode !== 'dark') toggleTheme(); }}
              className={`sidebar-dock-btn ${mode === 'dark' ? 'is-theme-active' : ''}`}
              title="Dark Mode"
            >
              <Moon className="w-4 h-4" />
            </button>

            {/* 9. Light Mode Sun */}
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

        {/* Quick Search Popout when search clicked in sidebar */}
        {searchOpen && (
          <div className="search-popout-island absolute left-20 top-24 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-200 dark:border-slate-800">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="جستجو در املاک، ویلاها یا سیستم‌ها..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-800 dark:text-slate-100 outline-none w-48 font-vazir"
              autoFocus
            />
            <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* =========================================================
            BOTTOM CARDS: ORGANIC LEFT CARD & FROSTED RIGHT CARD
            ========================================================= */}
        <div className="villa-bottom-cards-row relative z-30 p-4 sm:p-6 lg:p-8 flex items-end justify-between gap-6 flex-wrap">
          
          {/* 1. Bottom Left: White Organic Card "Find The Perfect Place" */}
          <div className="villa-bottom-left-card bg-white text-slate-900 p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] max-w-sm shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Find The Perfect Place
              </h3>
              <p className="text-slate-500 text-xs sm:text-xs leading-relaxed">
                Our platform connects you with extraordinary homes in the most sought-after locations. Start your journey to discovering the perfect match for your lifestyle.
              </p>
            </div>

            {/* Stat Row: 10K+ Properties & Avatars */}
            <div className="pt-6 flex items-center justify-between">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none">10K+</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Properties</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Overlapping circle property thumbnails */}
                <div className="flex items-center -space-x-2">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=80&h=80&q=80" 
                    alt="Property 1" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=80&h=80&q=80" 
                    alt="Property 2" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=80&h=80&q=80" 
                    alt="Property 3" 
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
                  title="Explore All Features & Properties"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
