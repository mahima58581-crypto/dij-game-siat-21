import React from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, ShieldCheck, Zap, ArrowUpLeft, Sparkles, Clock, Award } from 'lucide-react';

interface PricingSectionProps {
  onOpenOrderModal: (planId?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>تعرفه‌های تخصصی و اشتراک‌های گیم‌نت</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          تعرفه و پلن‌های مدیریت گیم‌نت دیجی‌گیم
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          پلن مناسب کلوپ خود را انتخاب کنید؛ از اشتراک ۱ ماهه نقره‌ای تا پلن جامع ۱ ساله الماس VIP.
        </p>
      </div>

      {/* Pricing Cards Grid (3 distinct professional tiers: Silver 1 Month, Gold 6 Months, Diamond 1 Year) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          // Determine duration badge based on plan id
          const durationLabel = 
            plan.id === 'silver' ? 'اشتراک ۱ ماهه' :
            plan.id === 'gold' ? 'اشتراک ۶ ماهه' : 'اشتراک ۱ ساله (VIP)';

          const durationIcon = 
            plan.id === 'silver' ? <Clock className="w-4 h-4 text-slate-400" /> :
            plan.id === 'gold' ? <Sparkles className="w-4 h-4 text-emerald-400" /> :
            <Award className="w-4 h-4 text-amber-400" />;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all card-hover-lift ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#0f233f] to-[#0a1529] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/15 scale-100 lg:-translate-y-2'
                  : 'bg-[#0a1324] border border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-slate-950 font-black text-[11px] px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Header & Duration */}
                <div className="space-y-3 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-bold text-slate-300">
                    {durationIcon}
                    <span>{durationLabel}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="pb-6 border-b border-slate-800 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-outfit font-black text-3xl sm:text-4xl text-white tracking-tight">
                      {plan.monthlyPrice.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="py-6 space-y-3">
                  <div className="text-xs font-bold text-slate-300">امکانات این پکیج:</div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenOrderModal(plan.id)}
                  className={`cyber-action-btn ${plan.popular ? 'cyber-action-btn--primary' : ''}`}
                >
                  <span className="cyber-action-btn__shine" />
                  <span>ثبت سفارش {plan.name}</span>
                  <span className="cyber-action-btn__icon">
                    <ArrowUpLeft className="w-4 h-4" />
                  </span>
                </button>

                <div className="text-[11px] text-slate-500 text-center mt-2.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>۱۴ روز ضمانت بازگشت وجه بی قید و شرط</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
