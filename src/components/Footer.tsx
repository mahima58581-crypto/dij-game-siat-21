import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040810] border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black font-outfit text-xl">
                DG
              </div>
              <span className="text-xl font-black text-white font-vazir">
                دیجی‌گیم <span className="text-xs text-emerald-400 font-outfit font-bold uppercase tracking-wider">VIP GAMING</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm text-justify">
              تخصصی‌ترین سامانه جامع سخت‌افزاری و نرم‌افزاری مدیریت گیم‌نت، کلوپ‌های واقعیت مجازی و گیم‌سنترهای زنجیره‌ای در ایران. مجهز به رله کنترل هوشمند برق و حسابداری بدون نشتی.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>پشتیبانی شبانه‌روزی ۳۶۵ روز سال حتی روزهای تعطیل</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-white text-sm">دسترسی سریع</div>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">امکانات سخت‌افزاری و نرم‌افزاری</a>
              </li>
              <li>
                <a href="#special-features" className="hover:text-emerald-400 transition-colors">ویژگی‌های هوشمند اپلیکیشن</a>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-emerald-400 transition-colors">محاسبه‌گر سود و دخل</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">پلن‌های لایسنس و قیمت</a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">درباره شرکت و گارانتی</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">سوالات متداول</a>
              </li>
            </ul>
          </div>

          {/* Contact & Hotline (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-bold text-white text-sm">تماس با دپارتمان فروش و پشتیبانی</div>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خط ویژه پشتیبانی فنی: <strong className="font-outfit text-white" dir="ltr">۰۲۱-۹۱۰۰۴۵۸۸</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ایمیل فروش سازمانی: <strong className="font-outfit text-white">support@digigame.ir</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>تهران، پارک علم و فناوری دانشگاه تربیت مدرس، ساختمان نوآوری</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenOrderModal}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                ثبت تیکت مشاوره یا خرید فوری
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی متعلق به سامانه مدیریت هوشمند گیم‌نت «دیجی‌گیم» است.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <span>بازگشت به ابتدای صفحه</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
