import React, { useState } from 'react';
import { PARTNER_CLUBS } from '../data/mockData';
import { MapPin, Gamepad2, Monitor, Star, Phone, Search, Building } from 'lucide-react';

export const DirectorySection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('همه');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const cities = ['همه', 'تهران', 'اصفهان', 'مشهد', 'شیراز', 'تبریز', 'کرج'];

  const filteredClubs = PARTNER_CLUBS.filter(club => {
    const matchesCity = selectedCity === 'همه' || club.city === selectedCity;
    const matchesSearch = club.name.includes(searchTerm) || club.address.includes(searchTerm);
    return matchesCity && matchesSearch;
  });

  return (
    <section id="game-clubs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 relative">
      <div id="players" className="absolute -top-24 pointer-events-none" />
      
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Building className="w-3.5 h-3.5" />
          <span>شبکه سراسری کلوپ‌های همکار</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          گیم‌نت‌ها و کلوپ‌های مجهز به دیجی‌گیم در سراسر ایران
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          نزدیک‌ترین گیم‌نت VIP مجهز به سیستم قطع خودکار، بازی‌های اورجینال و بوفه آنلاین را در شهر خود بیابید:
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0c1830] border border-slate-800 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCity === city
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px] flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی نام یا محله..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <div
            key={club.id}
            className="bg-[#0b1426] border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between group card-hover-lift"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-white font-bold text-sm">{club.name}</span>
                  {club.isVip && (
                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded font-outfit uppercase">
                      VIP CLUB
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{club.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{club.consolesCount} دستگاه کنسول</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{club.pcCount} سیستم PC</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{club.rating}</span>
                  <span className="text-slate-500 text-[10px]">(رضایت مشتریان)</span>
                </div>

                <a
                  href={`tel:${club.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 font-mono transition-colors"
                  dir="ltr"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{club.phone}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
