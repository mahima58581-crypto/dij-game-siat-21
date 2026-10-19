import React from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { 
  ShieldCheck, Zap, ArrowUpLeft, Sparkles, 
  Clock, Award, Cpu, Flame, Crown, CheckCircle2 
} from 'lucide-react';
import './PricingSection.css';

interface PricingSectionProps {
  onOpenOrderModal: (planId?: string) => void;
  onNavigateToPurchase?: (planId?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  onOpenOrderModal,
  onNavigateToPurchase
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const planConfigs: Record<string, {
    modId: string;
    num: string;
    icon: React.ElementType;
    durationPill: string;
    hardwareNote: string;
    highlightBadge?: string;
  }> = {
    silver: {
      modId: 'MOD // 01',
      num: '01',
      icon: Clock,
      durationPill: 'دوره ۱ ماهه (تست کلوپ)',
      hardwareNote: 'راهکار نرم‌افزاری آفلاین بدون رله',
      highlightBadge: undefined
    },
    gold: {
      modId: 'MOD // 02',
      num: '02',
      icon: Flame,
      durationPill: 'دوره ۶ ماهه (اقتصادی و محبوب)',
      hardwareNote: 'همراه با دستگاه رله ۸ کاناله هوشمند رایگان',
      highlightBadge: 'پیشنهاد ویژه VIP'
    },
    diamond: {
      modId: 'MOD // 03',
      num: '03',
      icon: Crown,
      durationPill: 'دوره ۱۲ ماهه (پکیج جامع سالانه)',
      hardwareNote: '۲ عدد باکس رله ۱۶ کاناله صنعتی + نصب حضوری',
      highlightBadge: 'جامع‌ترین پکیج VIP'
    }
  };

  return (
    <section id="pricing" className="pricing-cyber-wrapper py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background Lighting & Grid */}
      <div className="pricing-ambient-glow" aria-hidden="true" />
      <div className="pricing-grid-bg" aria-hidden="true" />

      {/* Header Hologram Cluster */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="pricing-chip-badge">
          <div className="pricing-chip-icon">
            <Zap className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            ESPORTS TIER PRICING 2026
          </span>
          <span className="pricing-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="pricing-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          تعرفه و پلن‌های مدیریت گیم‌نت{' '}
          <span className="pricing-title-gradient">دیجی‌گیم</span>
        </h2>

        <p className="pricing-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          پلن مناسب کلوپ خود را انتخاب کنید؛ از اشتراک ۱ ماهه آزمایشی تا پکیج همه‌فن‌حریف الماس VIP همراه با رله سخت‌افزاری و نصب حضوری.
        </p>

        {onNavigateToPurchase && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToPurchase()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-[#39ff78] hover:bg-emerald-500/20 text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(57,255,120,0.15)] hover:scale-105 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#39ff78]" />
              <span>ورود مستقیم به پرتال خرید و تمدید لایسنس</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="pricing-guarantee-strip">
        <div className="pricing-guarantee-item">
          <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
          <span>۱۴ روز گارانتی بازگشت ۱۰۰٪ وجه</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="pricing-guarantee-item">
          <Cpu className="w-4 h-4 text-[#00f0ff]" />
          <span>سخت‌افزار رله صنعتی اختصاصی</span>
        </div>
        <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
        <div className="pricing-guarantee-item">
          <CheckCircle2 className="w-4 h-4 text-[#39ff78]" />
          <span>پشتیبانی شبانه‌روزی ۲۴/۷ ریموت و تلفنی</span>
        </div>
      </div>

      {/* Pricing Cards Grid - Exact Cyber Feature Card Structure */}
      <div className="pricing-cyber-grid">
        {PRICING_PLANS.map((plan) => {
          const config = planConfigs[plan.id] || {
            modId: 'MOD // 01',
            num: '01',
            icon: Clock,
            durationPill: 'دوره استاندارد',
            hardwareNote: 'پشتیبانی نرم‌افزاری دیجی‌گیم'
          };
          const Icon = config.icon;
          const isFeatured = plan.id === 'gold';
          const isDiamond = plan.id === 'diamond';

          return (
            <div
              key={plan.id}
              className={`pricing-cyber-card ${isFeatured ? 'is-featured' : ''} ${isDiamond ? 'is-diamond' : ''}`}
              onMouseMove={handleMouseMove}
            >
              {/* Background Large Stylized Watermark */}
              <span className="cyber-card-watermark" aria-hidden="true">{config.num}</span>

              {/* Glowing Flowing Top Border Beam */}
              <span className="cyber-card-top-beam" aria-hidden="true" />

              {/* Holographic Laser Shimmer */}
              <span className="cyber-card-shimmer" aria-hidden="true" />

              {/* HUD Corner Tech Reticles */}
              <span className="card-corner-bracket bracket-tl" aria-hidden="true" />
              <span className="card-corner-bracket bracket-br" aria-hidden="true" />

              {/* Card Header: Module ID & Reactor Pod */}
              <div className="cyber-card-header">
                <div className="module-id-badge">
                  <span className="status-dot" aria-hidden="true" />
                  <span>{config.modId}</span>
                </div>

                <div className="icon-reactor-pod">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Card Body: Title, Description, Price & Specs */}
              <div className="pricing-card-body">
                {/* Highlight Badge if exists */}
                {config.highlightBadge && (
                  <div className="pricing-tier-pill">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{config.highlightBadge}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="pricing-plan-title">
                    {plan.name}
                  </h3>
                  <p className="pricing-plan-tagline">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display Pod */}
                <div className="pricing-cost-pod">
                  <div className="pricing-amount-row">
                    <span className="pricing-num font-outfit">
                      {plan.monthlyPrice.toLocaleString('fa-IR')}
                    </span>
                    <span className="pricing-toman">تومان</span>
                  </div>
                  <span className="pricing-cycle-tag">{config.durationPill}</span>
                </div>

                {/* Hardware & Station Specs Capsules */}
                <div className="pricing-specs-container">
                  <div className="pricing-spec-row">
                    <Cpu className="w-4 h-4 shrink-0 text-[#39ff78]" />
                    <span className="pricing-spec-label">ظرفیت مجاز:</span>
                    <span className="pricing-spec-value">{plan.maxStations}</span>
                  </div>

                  <div className="pricing-spec-row">
                    <Zap className="w-4 h-4 shrink-0 text-[#00f0ff]" />
                    <span className="pricing-spec-label">سخت‌افزار:</span>
                    <span className="pricing-spec-value">{config.hardwareNote}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Button & Guarantee Impact Capsule */}
              <div className="pricing-card-footer">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToPurchase) {
                      onNavigateToPurchase(plan.id);
                    } else {
                      onOpenOrderModal(plan.id);
                    }
                  }}
                  className={`pricing-action-btn ${isFeatured ? 'btn-featured' : ''}`}
                >
                  <span className="pricing-btn-shine" aria-hidden="true" />
                  <span>ثبت سفارش {plan.name.split('(')[0].trim()}</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>

                <div className="impact-capsule">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>۱۴ روز گارانتی بازگشت ۱۰۰٪ وجه</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
