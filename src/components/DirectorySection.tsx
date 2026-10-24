import React, { useState } from 'react';
import { PARTNER_CLUBS } from '../data/mockData';
import { 
  MapPin, Gamepad2, Monitor, Star, Phone, Search, 
  Building2, Sparkles, CheckCircle2, ArrowUpLeft, X 
} from 'lucide-react';
import './DirectorySection.css';

// DigiGame Partner Clubs Directory 2026
export const DirectorySection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('همه');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const cities = ['همه', 'تهران', 'اصفهان', 'مشهد', 'شیراز', 'تبریز', 'کرج'];

  const filteredClubs = PARTNER_CLUBS.filter(club => {
    const matchesCity = selectedCity === 'همه' || club.city === selectedCity;
    const matchesSearch = 
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      club.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="game-clubs" className="directory-cyber-wrapper py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 relative">
      <div id="players" className="absolute -top-24 pointer-events-none" />

      {/* Ambient Lighting & Grid */}
      <div className="directory-ambient-glow" aria-hidden="true" />
      <div className="directory-grid-bg" aria-hidden="true" />

      {/* Header Hologram Cluster */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="directory-chip-badge">
          <div className="directory-chip-icon">
            <Building2 className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            PARTNER CLUBS NETWORK 2026
          </span>
          <span className="directory-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="directory-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          گیم‌نت‌ها و کلوپ‌های مجهز به{' '}
          <span className="directory-title-gradient">دیجی‌گیم</span> در سراسر ایران
        </h2>

        <p className="directory-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          نزدیک‌ترین گیم‌نت VIP مجهز به سیستم قطع خودکار برق کنسول، بازی‌های اورجینال و بوفه آنلاین را در شهر خود بیابید و تجربه گیمینگ مدرن داشته باشید:
        </p>
      </div>

      {/* Futuristic Filter & Search Deck */}
      <div className="directory-filter-deck">
        {/* City Filter Pills */}
        <div className="directory-cities-scroll">
          {cities.map(city => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`directory-city-btn ${isActive ? 'is-active' : ''}`}
              >
                {isActive && <span className="city-active-beacon" aria-hidden="true" />}
                <span>{city}</span>
              </button>
            );
          })}
        </div>

        {/* Cyber Search Box */}
        <div className="directory-search-wrapper">
          <Search className="directory-search-icon" />
          <input
            type="text"
            placeholder="جستجوی نام کلوپ، شهر یا محله..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="directory-search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="directory-search-clear"
              title="پاک کردن جستجو"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Result Counter Pill */}
      <div className="directory-meta-strip mb-8">
        <div className="directory-meta-pill">
          <Sparkles className="w-3.5 h-3.5 text-[#39ff78]" />
          <span>تعداد کلوپ‌های یافت‌شده:</span>
          <strong className="text-emerald-400 font-outfit px-1">{filteredClubs.length} مجموعه فعال</strong>
        </div>
      </div>

      {/* Cyber Cards Grid */}
      {filteredClubs.length === 0 ? (
        <div className="directory-empty-state">
          <Building2 className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
          <h3 className="text-base font-bold text-slate-300">هیچ کلوپی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-slate-500 mt-1">لطفاً فیلتر شهر را تغییر دهید یا عبارت دیگری را جستجو کنید.</p>
          <button
            type="button"
            onClick={() => { setSelectedCity('همه'); setSearchTerm(''); }}
            className="mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-all"
          >
            مشاهده تمام کلوپ‌ها
          </button>
        </div>
      ) : (
        <div className="directory-cyber-grid">
          {filteredClubs.map((club, index) => {
            const indexFormatted = String(index + 1).padStart(2, '0');
            return (
              <div
                key={club.id}
                className="directory-cyber-card"
                onMouseMove={handleMouseMove}
              >
                {/* Background Large Stylized Watermark */}
                <span className="cyber-card-watermark" aria-hidden="true">{indexFormatted}</span>

                {/* Glowing Flowing Top Border Beam */}
                <span className="cyber-card-top-beam" aria-hidden="true" />

                {/* Holographic Laser Shimmer */}
                <span className="cyber-card-shimmer" aria-hidden="true" />

                {/* Club Visual Pod with Scanline & Status Badges */}
                <div className="club-image-pod">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="club-image"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="club-image-overlay" />

                  {/* Top Bar on Image */}
                  <div className="club-image-top-bar">
                    <div className="module-id-badge">
                      <span className="status-dot" aria-hidden="true" />
                      <span>CLUB // {indexFormatted}</span>
                    </div>

                    {club.isVip && (
                      <div className="club-vip-badge">
                        <Sparkles className="w-3 h-3" />
                        <span>VIP CLUB</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom City Pill on Image */}
                  <div className="club-image-bottom-bar">
                    <div className="club-city-pill">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{club.city}</span>
                    </div>
                  </div>
                </div>

                {/* Club Details Body */}
                <div className="club-card-body">
                  <div className="space-y-1">
                    <h3 className="club-card-title">
                      {club.name}
                    </h3>
                    <p className="club-card-address">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-400/80 mt-0.5" />
                      <span>{club.address}</span>
                    </p>
                  </div>

                  {/* Hardware Telemetry Specs */}
                  <div className="club-telemetry-grid">
                    <div className="club-telemetry-pill consoles-pill">
                      <Gamepad2 className="w-4 h-4 text-[#00f0ff]" />
                      <span>{club.consolesCount} دستگاه کنسول</span>
                    </div>

                    <div className="club-telemetry-pill pc-pill">
                      <Monitor className="w-4 h-4 text-[#39ff78]" />
                      <span>{club.pcCount} سیستم PC گیمینگ</span>
                    </div>
                  </div>

                  {/* Customer Rating & Verified Badge */}
                  <div className="club-meta-row">
                    <div className="club-rating-chip">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span className="font-outfit font-black text-amber-400 text-xs">{club.rating}</span>
                      <span className="text-slate-400 text-[10px]">(رضایت مشتریان)</span>
                    </div>

                    <div className="club-verified-chip">
                      <CheckCircle2 className="w-3 h-3 text-[#39ff78]" />
                      <span>تایید رسمی دیجی‌گیم</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Direct Dial CTA Button & Smart Relay Impact Capsule */}
                <div className="club-card-footer">
                  <a
                    href={`tel:${club.phone.replace(/[^0-9]/g, '')}`}
                    className="club-dial-btn"
                    dir="ltr"
                  >
                    <span className="club-btn-shine" aria-hidden="true" />
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="club-phone-text font-mono font-bold">{club.phone}</span>
                    <span className="club-call-label">تماس با کلوپ</span>
                    <ArrowUpLeft className="w-4 h-4 mr-auto" />
                  </a>

                  <div className="impact-capsule">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>مجهز به رله هوشمند و کنترل زمان دیجی‌گیم</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
