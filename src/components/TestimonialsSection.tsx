import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Building2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Quote className="w-3.5 h-3.5" />
          <span>صدای مدیران واقعی گیم‌نت</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          نظرات خریداران و مدیران مجموعه‌های بزرگ گیمینگ
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          ببینید همکاران شما در شهرهای مختلف چطور با راه‌اندازی دیجی‌گیم از نشتی مالی جلوگیری کرده و درآمدشان را متحول کرده‌اند.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-5"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">
                «{t.quote}»
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0 font-outfit`}>
                VIP
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-white truncate">{t.name}</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 truncate">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span>{t.club}</span>
                </div>
                <div className="text-[10px] text-slate-500">{t.stations}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
