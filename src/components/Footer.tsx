import React from 'react';
import { 
  ShieldCheck, PhoneCall, Mail, MapPin, 
  ArrowUp, 
  Send, Cpu, Lock, Coffee, Download, 
  HelpCircle, ChevronLeft, 
  FileCode 
} from 'lucide-react';
import { 
  InstagramIcon, 
  TelegramIcon, 
  AparatIcon, 
  YouTubeIcon, 
  WhatsAppIcon, 
  XIcon, 
  EitaaIcon 
} from './CyberSocialIcons';
import { InteractiveDigiGameText } from './InteractiveDigiGameText';
import './Footer.css';

interface FooterProps {
  onOpenOrderModal: () => void;
  onNavigateToPurchase?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal, onNavigateToPurchase }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-cyber-master">
      {/* Top Ambient Glow & Mesh */}
      <div className="footer-ambient-glow" aria-hidden="true" />
      <div className="footer-grid-mesh" aria-hidden="true" />
      <span className="footer-top-laser-beam" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        

        {/* ===================================================
            MASTER FOOTER GRID (4 COLUMNS)
            =================================================== */}
        <div className="footer-main-grid">
          
          {/* Column 1: Brand Info & Mission */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img
                src="/src/assets/images/digigame_official_logo_2026.jpg"
                alt="لوگوی رسمی دیجی‌گیم"
                className="footer-brand-logo-img"
              />
              <div className="footer-brand-name-box">
                <span className="footer-brand-title">دیجی‌گیم</span>
                <span className="footer-brand-badge">ENTERPRISE VIP GAMING</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              تخصصی‌ترین سامانه جامع سخت‌افزاری و نرم‌افزاری مدیریت گیم‌نت، کلوپ‌های واقعیت مجازی و گیم‌سنترهای زنجیره‌ای در ایران. مجهز به رله‌های صنعتی کنترل خودکار برق مانیتورها، کلاینت ضدتقلب ویندوز و هوش مصنوعی آنالیز دخل بدون حتی یک ثانیه نشتی مالی.
            </p>

            {/* Server Status Live Indicator */}
            <div className="footer-server-status-pill">
              <span className="footer-server-dot" aria-hidden="true" />
              <span className="footer-server-text">
                وضعیت شبکه سرورها: <strong>۱۰۰٪ آنلاین (۹۹.۹۸٪ Uptime)</strong>
              </span>
            </div>

          </div>

          {/* Column 2: Ecosystem Modules */}
          <div>
            <h4 className="footer-col-title">
              <Cpu className="w-4 h-4" />
              <span>ماژول‌های اکوسیستم</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href="#features" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>باکس رله صنعتی Zero-Crossing</span>
                  <span className="footer-link-tag">HARDWARE</span>
                </a>
              </li>
              <li>
                <a href="#special-features" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>کلاینت قفل کرنل ویندوز</span>
                  <span className="footer-link-tag">SECURITY</span>
                </a>
              </li>
              <li>
                <a href="#special-features" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>منوی آنلاین بوفه با QR کد</span>
                </a>
              </li>
              <li>
                <a href="#roi-calculator" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>محاسبه‌گر پیشرفته سود و دخل</span>
                </a>
              </li>
              <li>
                <a href="#installers" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>شبکه نصاب‌های مجاز کشور</span>
                </a>
              </li>
              <li>
                <a href="#directory" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>دایرکتوری کلوپ‌های منتخب</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Guides */}
          <div>
            <h4 className="footer-col-title">
              <FileCode className="w-4 h-4" />
              <span>راهنما و دسترسی سریع</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href="#downloads" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>مرکز دانلود لانچر و سرور</span>
                  <span className="footer-link-tag">DOWNLOAD</span>
                </a>
              </li>
              <li>
                <a href="#tutorials" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>ویدیوهای آموزش گام‌به‌گام</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToPurchase ? onNavigateToPurchase : () => { window.location.hash = 'purchase'; }}
                  className="footer-nav-link text-right w-full cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>پرتال خرید و تمدید لایسنس</span>
                  <span className="footer-link-tag">PORTAL</span>
                </button>
              </li>
              <li>
                <a href="#pricing" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>تعرفه‌ها و پلن‌های لایسنس</span>
                </a>
              </li>
              <li>
                <a href="#about" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>درباره شرکت و استانداردها</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>تجربیات و نظرات مدیران</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-nav-link">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>پایگاه دانش و سوالات متداول</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Hotline & HQ */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">
              <PhoneCall className="w-4 h-4" />
              <span>ارتباط و پشتیبانی فنی ۲۴/۷</span>
            </h4>

            {/* Direct Phone Dial Card */}
            <a href="tel:02191004588" className="footer-hotline-card">
              <div className="footer-hotline-info">
                <span className="footer-hotline-label">خط ویژه پشتیبانی و فروش</span>
                <span className="footer-hotline-num" dir="ltr">۰۲۱-۹۱۰۰۴۵۸۸</span>
              </div>
              <div className="footer-hotline-icon">
                <PhoneCall className="w-4 h-4" />
              </div>
            </a>

            <div className="footer-contact-details">
              <div className="footer-contact-item">
                <Mail className="w-4 h-4" />
                <span>ایمیل فروش سازمانی: <strong className="text-white font-outfit">support@digigame.ir</strong></span>
              </div>
              <div className="footer-contact-item">
                <MapPin className="w-4 h-4" />
                <span>تهران، پارک علم و فناوری دانشگاه تربیت مدرس، مجتمع فناوری و نوآوری</span>
              </div>
            </div>

            {/* Action Consult Button */}
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="footer-consult-btn"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>ثبت تیکت مشاوره یا خرید فوری</span>
            </button>

            {/* Social Media Links - Cyber Green Suite */}
            <div className="footer-socials-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="صفحه رسمی اینستاگرام دیجی‌گیم"
                title="اینستاگرام رسمی"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://eitaa.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="کانال رسمی پیام‌رسان ایتا دیجی‌گیم"
                title="پیام‌رسان ایتا"
              >
                <EitaaIcon />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="کانال رسمی تلگرام دیجی‌گیم"
                title="تلگرام رسمی"
              >
                <TelegramIcon />
              </a>
              <a
                href="https://aparat.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="کانال رسمی آپارات ویدیوهای آموزشی دیجی‌گیم"
                title="کانال آپارات"
              >
                <AparatIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="کانال رسمی یوتیوب دیجی‌گیم"
                title="یوتیوب"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="ارتباط در پیام‌رسان واتساپ"
                title="واتساپ پشتیبانی"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="صفحه رسمی ایکس (توییتر سابق)"
                title="ایکس (توییتر)"
              >
                <XIcon />
              </a>
            </div>
          </div>

        </div>

        {/* ===================================================
            INTERACTIVE DRAGGABLE DIGIGAME BRAND PLAYGROUND
            =================================================== */}
        <InteractiveDigiGameText />


        {/* ===================================================
            BOTTOM COPYRIGHT & SCROLL TO TOP BAR
            =================================================== */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی متعلق به سامانه مدیریت هوشمند گیم‌نت «دیجی‌گیم» است.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-scroll-top-btn"
            aria-label="بازگشت به ابتدای صفحه"
          >
            <span>بازگشت به ابتدای صفحه</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
