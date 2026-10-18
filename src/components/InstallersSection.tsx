import React, { useState } from 'react';
import { INSTALLERS } from '../data/mockData';
import { Wrench, ShieldCheck, Star, Phone, CheckCircle, ArrowUpLeft } from 'lucide-react';

interface InstallersSectionProps {
  onRequestInstaller: (installerName?: string) => void;
}

export const InstallersSection: React.FC<InstallersSectionProps> = ({ onRequestInstaller }) => {
  return (
    <section id="installers" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>تکنسین‌های مجاز و تایید صلاحیت شده</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          شبکه نصاب‌های حرفه‌ای سخت‌افزار رله و شبکه در سراسر کشور
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          نصب و سیم‌کشی تخصصی بدون آسیب به دکوراسیون، کابل‌کشی استاندارد، راه‌اندازی سوییچ‌ها و تنظیم رله صنعتی با ضمانت کارکرد.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSTALLERS.map(inst => (
          <div
            key={inst.id}
            className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all space-y-5 card-hover-lift"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{inst.name}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">{inst.city}</div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>تکنسین رسمی</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="text-slate-500 text-[11px]">سابقه نصب:</div>
                  <div className="font-bold text-white mt-0.5 font-outfit">{inst.experienceYears} سال سابقه</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">پروژه‌های موفق:</div>
                  <div className="font-bold text-emerald-400 mt-0.5 font-outfit">{inst.projectsCompleted}+ گیم‌نت</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{inst.rating}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  وضعیت: <span className="text-emerald-400 font-bold">{inst.status === 'available' ? 'آماده اعزام' : 'در حال اجرای پروژه'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestInstaller(inst.name)}
                className="cyber-action-btn"
              >
                <span className="cyber-action-btn__shine" />
                <span>درخواست اعزام نصاب به گیم‌نت شما</span>
                <span className="cyber-action-btn__icon">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
