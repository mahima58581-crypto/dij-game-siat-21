import React, { useState } from 'react';
import { TUTORIALS } from '../data/mockData';
import { PlayCircle, Clock, CheckCircle2, Video, X } from 'lucide-react';
import { TutorialVideo } from '../types';

export const TutorialsSection: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<TutorialVideo | null>(null);

  return (
    <section id="tutorials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Video className="w-3.5 h-3.5" />
          <span>آکادمی و ویدیوهای آموزشی</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          آموزش صفر تا صد راه‌اندازی و کار با نرم‌افزار دیجی‌گیم
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          حتی بدون دانش فنی قبلی، در کمتر از ۳۰ دقیقه تمام تنظیمات رله، ثبت استیشن‌ها و شیفت پرسنل را یاد بگیرید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TUTORIALS.map(tut => (
          <div
            key={tut.id}
            onClick={() => setActiveTutorial(tut)}
            className="bg-[#0b1426] border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between card-hover-lift"
          >
            <div className="space-y-3">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-[#0e1d38] rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/40 transition-colors">
                <PlayCircle className="w-14 h-14 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{tut.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold">{tut.category}</span>
                <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">{tut.level}</span>
              </div>

              <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors leading-snug">
                {tut.title}
              </h3>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>شامل {tut.stepsCount} مرحله عملی</span>
              </div>
              <span className="text-emerald-400 font-bold group-hover:underline">مشاهده ویدیو ↗</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Simulation Modal */}
      {activeTutorial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1830] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setActiveTutorial(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs text-emerald-400 font-bold">{activeTutorial.category}</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">{activeTutorial.title}</h3>
            </div>

            <div className="aspect-video bg-black rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <PlayCircle className="w-10 h-10" />
              </div>
              <div className="text-sm font-bold text-white">پخش پلیر آموزشی ویدیویی دیجی‌گیم</div>
              <div className="text-xs text-slate-400 max-w-sm">
                این ویدیو با کیفیت 4K و زبان فارسی، کلیه مراحل را به شکل اسکرین‌کست گام به گام آموزش می‌دهد.
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-800 pt-3">
              <span>مدت زمان: {activeTutorial.duration} دقیقه</span>
              <button
                onClick={() => setActiveTutorial(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold cursor-pointer"
              >
                بستن پنجره آموزش
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
