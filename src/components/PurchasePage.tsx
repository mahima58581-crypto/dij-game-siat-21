import React, { useMemo, useState, useEffect } from 'react';
import { 
  CheckCircle2, Sparkles, Percent, ArrowLeft, ShieldCheck, 
  Clock, Zap, Crown, Lock, Tag, ShoppingBag, Activity, 
  ChevronDown, X, Building2, RefreshCw, 
  AlertTriangle, Calendar, Search, KeyRound, Server, Check, 
  RotateCcw, Award, Radio, HelpCircle, Flame, Cpu, ArrowUpLeft
} from 'lucide-react';
import './PricingSection.css';
import './PurchasePage.css';

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  iconType: 'clock' | 'zap' | 'crown';
  description: string;
  popular?: boolean;
  badge?: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'یک‌ماهه مقدماتی',
    duration: '۳۰ روز اعتبار کامل',
    price: 149000,
    iconType: 'clock',
    description: 'ایده‌آل برای تست میدانی و بررسی کارکرد رله و کلاینت',
    badge: 'شروع سریع',
    features: [
      'دسترسی کامل به نرم‌افزار سرور و کلاینت',
      'پشتیبانی آنلاین از طریق AnyDesk',
      'مدیریت تا ۲۰ استیشن و کنسول',
      'ثبت فاکتور بوفه و دخل روزانه',
      'به‌روزرسانی‌های امنیتی دوره',
    ],
  },
  {
    id: 'six-months',
    name: 'شش‌ماهه ویژه',
    duration: '۱۸۰ روز اعتبار طلایی',
    price: 699000,
    iconType: 'zap',
    popular: true,
    badge: 'انتخاب اکثر مدیران VIP',
    description: 'تعادل بی‌نظیر اقتصادی با تخفیف دوره‌ای برای کلوپ‌های پرمشتری',
    features: [
      'تمام قابلیت‌های پلن یک‌ماهه',
      'پشتیبانی اولویت‌دار ۲۴ ساعته اختصاصی',
      'سیستم ثبت نام باشگاه مشتریان و لول‌بندی',
      'منوی آنلاین سفارش بوفه با QR کد اختصاصی',
      'آنالیز هوشمند دخل و جلوگیری صددرصدی از بازی اضافه',
      'تخفیف ویژه در تمدید دوره‌های بعدی',
    ],
  },
  {
    id: 'yearly',
    name: 'یک‌ساله طلایی VIP',
    duration: '۳۶۵ روز اعتبار نامحدود',
    price: 1199000,
    iconType: 'crown',
    badge: 'حداکثر سودآوری سالانه',
    description: 'کامل‌ترین پکیج مدیریتی برای گیم‌سنترها و کلوپ‌های بزرگ کشور',
    features: [
      'تمامی امکانات دیجی‌گیم بدون هیچ‌گونه محدودیت',
      'استیشن و سیستم‌های نامحدود (کنسول + PC)',
      'گارانتی تعویض بی چون و چرای سخت‌افزار رله',
      'پشتیبانی VIP مستقیم با خط تلفن اختصاصی',
      'نسخه پشتیبان ابری خودکار روزانه (Cloud Sync)',
      'اعزام نصاب حضوری در صورت نیاز مجموعه',
    ],
  },
];

interface RenewalPackage {
  id: string;
  name: string;
  durationTitle: string;
  addedDays: number;
  bonusDays: number;
  originalPrice: number;
  discountedPrice: number;
  loyaltyPercent: number;
  badge?: string;
  highlightBadge?: string;
  popular?: boolean;
  vip?: boolean;
  description: string;
  features: string[];
  modId: string;
  num: string;
  durationPill: string;
  hardwareSpec: string;
  stationSpec: string;
}

const renewalPackages: RenewalPackage[] = [
  {
    id: 'renew-1m',
    modId: 'MOD // R01',
    num: '01',
    name: 'تمدید ۱ ماهه استاندارد',
    durationTitle: '۳۰ روز اعتبار بدون وقفه',
    durationPill: 'دوره ۳۰ روزه استاندارد',
    addedDays: 30,
    bonusDays: 0,
    originalPrice: 149000,
    discountedPrice: 149000,
    loyaltyPercent: 0,
    badge: 'تمدید فوری',
    highlightBadge: undefined,
    description: 'رفع سریع خطر انقضا و ادامه بدون وقفه فعالیت سیستم‌های کلوپ',
    stationSpec: 'پشتیبانی تا ۲۰ استیشن و کنسول',
    hardwareSpec: 'سینک ابری آنی بدون نیاز به ریستارت سرور',
    features: [
      'تمدید آنی بدون سوختن زمان باقیمانده',
      'سیستم‌ها و رله‌ها ۱۰۰٪ آنلاین می‌مانند',
      'حفظ کامل دیتابیس مشتریان و دخل بوفه',
      'پشتیبانی فنی آنلاین AnyDesk',
    ],
  },
  {
    id: 'renew-6m',
    modId: 'MOD // R02',
    num: '02',
    name: 'تمدید ۶ ماهه ویژه',
    durationTitle: '۱۸۰ روز + ۷ روز هدیه رایگان',
    durationPill: 'دوره ۱۸۰ روزه اقتصادی و محبوب',
    addedDays: 180,
    bonusDays: 7,
    originalPrice: 699000,
    discountedPrice: 594000,
    loyaltyPercent: 15,
    popular: true,
    badge: '🔥 پیشنهاد هوشمند',
    highlightBadge: 'پیشنهاد هوشمند کلوپ‌داران • ۱۵٪ تخفیف',
    description: 'تعادل اقتصادی عالی همراه با ۱۰۵,۰۰۰ تومان صرفه‌جویی و ۷ روز هدیه مازاد',
    stationSpec: 'پشتیبانی تا ۵۰ استیشن + باکس‌های رله هوشمند',
    hardwareSpec: '۷ روز هدیه رایگان + پشتیبانی اولویت‌دار ۲۴ ساعته',
    features: [
      '۱۵٪ تخفیف وفاداری مستقیم مشترکین',
      '۷ روز اعتبار هدیه رایگان مازاد دیجی‌گیم',
      'بدون نیاز به تغییر تنظیمات سرور و کلاینت',
      'پشتیبانی اولویت‌دار اختصاصی ۲۴ ساعته',
    ],
  },
  {
    id: 'renew-1y',
    modId: 'MOD // R03',
    num: '03',
    name: 'تمدید ۱ ساله طلایی VIP',
    durationTitle: '۳۶۵ روز + ۳۰ روز هدیه (۱۳ ماه)',
    durationPill: 'دوره ۳۶۵ روزه جامع سالانه VIP',
    addedDays: 365,
    bonusDays: 30,
    originalPrice: 1199000,
    discountedPrice: 899000,
    loyaltyPercent: 25,
    vip: true,
    badge: '💎 پکیج طلایی',
    highlightBadge: 'جامع‌ترین پکیج VIP • ۲۵٪ تخفیف + ۱ ماه رایگان',
    description: 'بالاترین صرفه‌جویی سالانه همراه با ۱ ماه اشتراک رایگان و گارانتی طلایی',
    stationSpec: 'نامحدود استیشن، کنسول و کلاینت گیمینگ',
    hardwareSpec: 'گارانتی تعویض رله + پشتیبان‌گیری ابری روزانه',
    features: [
      '۲۵٪ تخفیف وفاداری (۳۰۰,۰۰۰ تومان سود کلوپ)',
      '۳۰ روز اشتراک هدیه رایگان (۱۳ ماه کامل)',
      'گارانتی تعویض بی قیدوشرط سخت‌افزار رله',
      'پشتیبان‌گیری ابری روزانه خودکار (Cloud Sync)',
    ],
  },
];

interface VerifiedLicense {
  licenseKey: string;
  clubName: string;
  city: string;
  ownerName: string;
  mobile: string;
  stationCount: number;
  planType: string;
  currentExpiresInDays: number;
  currentExpiresInHours: number;
  currentExpiryDate: string;
  hardwareId: string;
  status: 'expiring_tomorrow' | 'expired' | 'active';
}

const mockExpiringLicense: VerifiedLicense = {
  licenseKey: 'DG-9942-EXPIRING',
  clubName: 'گیم‌سنتر تخصصی آرنا',
  city: 'تهران (سعادت‌آباد)',
  ownerName: 'مهندس اکبری',
  mobile: '۰۹۱۲۴۸۵۲۰۰۱',
  stationCount: 16,
  planType: 'شش‌ماهه ویژه',
  currentExpiresInDays: 1,
  currentExpiresInHours: 21,
  currentExpiryDate: 'فردا - ساعت ۱۸:۳۰',
  hardwareId: 'HW-RELAY-9942-SRV',
  status: 'expiring_tomorrow',
};

const mockExpiredLicense: VerifiedLicense = {
  licenseKey: 'DG-7714-EXPIRED',
  clubName: 'کلوپ بازی سایبر پارادوکس',
  city: 'مشهد (بلوار سجاد)',
  ownerName: 'آقای رضایی',
  mobile: '۰۹۱۵۳۳۹۸۷۶۵',
  stationCount: 12,
  planType: 'یک‌ماهه مقدماتی',
  currentExpiresInDays: 0,
  currentExpiresInHours: 0,
  currentExpiryDate: 'دیروز (منقضی شده - سیستم‌ها در حالت آماده‌باش)',
  hardwareId: 'HW-RELAY-7714-SRV',
  status: 'expired',
};

const recentPurchasesData = [
  { name: 'مجموعه گیمینگ اکسیر (سعادت‌آباد تهران)', plan: 'تمدید یک‌ساله طلایی VIP', time: '۲ دقیقه پیش', price: '۸۹۹,۰۰۰ تومان', isVip: true },
  { name: 'گیم‌نت VIP پارادوکس (مرداویج اصفهان)', plan: 'تمدید شش‌ماهه ویژه', time: '۷ دقیقه پیش', price: '۵۹۴,۰۰۰ تومان', isVip: true },
  { name: 'گیم‌کلوب سنترال (بلوار سجاد مشهد)', plan: 'خرید یک‌ساله طلایی VIP', time: '۱۶ دقیقه پیش', price: '۱,۱۹۹,۰۰۰ تومان', isVip: true },
  { name: 'سایبرکلوب ماتریکس (معالی‌آباد شیراز)', plan: 'تمدید شش‌ماهه ویژه', time: '۲۴ دقیقه پیش', price: '۵۹۴,۰۰۰ تومان', isVip: false },
  { name: 'کلوپ بازی آدرنالین (ولیعصر تبریز)', plan: 'خرید یک‌ماهه مقدماتی', time: '۳۸ دقیقه پیش', price: '۱۴۹,۰۰۰ تومان', isVip: false },
];

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

interface PurchasePageProps {
  onBack?: () => void;
  onOpenAuth?: () => void;
  initialMode?: 'new' | 'renewal';
}

export const PurchasePage: React.FC<PurchasePageProps> = ({ onBack, initialMode = 'new' }) => {
  // Page mode: 'new' (New Purchase) | 'renewal' (Subscription Renewal)
  const [purchaseMode, setPurchaseMode] = useState<'new' | 'renewal'>(initialMode);

  // Standard Purchase State
  const [selectedPlanId, setSelectedPlanId] = useState('six-months');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [highlightOrder, setHighlightOrder] = useState(false);

  // Renewal State
  const [renewalInput, setRenewalInput] = useState('DG-9942-EXPIRING');
  const [isSearchingLicense, setIsSearchingLicense] = useState(false);
  const [verifiedLicense, setVerifiedLicense] = useState<VerifiedLicense | null>(mockExpiringLicense);
  const [searchFeedback, setSearchFeedback] = useState<string>('');
  const [selectedRenewalId, setSelectedRenewalId] = useState('renew-6m');
  const [renewalCoupon, setRenewalCoupon] = useState('');
  const [appliedRenewalCoupon, setAppliedRenewalCoupon] = useState('');
  const [renewalCouponMessage, setRenewalCouponMessage] = useState('');
  const [renewalSuccessModal, setRenewalSuccessModal] = useState(false);
  const [highlightRenewalSummary, setHighlightRenewalSummary] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const plan = plans.find((item) => item.id === selectedPlanId);
  const renewalPkg = renewalPackages.find((item) => item.id === selectedRenewalId) || renewalPackages[1];

  // Coupon for New Purchases
  const discountRate = useMemo(() => {
    if (appliedCoupon === 'DIGI10') return 10;
    if (appliedCoupon === 'DEMO20') return 20;
    return 0;
  }, [appliedCoupon]);

  const discount = Math.round(((plan?.price ?? 0) * discountRate) / 100);
  const finalPrice = (plan?.price ?? 0) - discount;

  // Coupon for Renewal
  const renewalCouponRate = useMemo(() => {
    if (appliedRenewalCoupon === 'LOYAL10') return 10;
    if (appliedRenewalCoupon === 'DIGI10') return 10;
    if (appliedRenewalCoupon === 'DEMO20') return 20;
    return 0;
  }, [appliedRenewalCoupon]);

  const renewalExtraDiscount = Math.round((renewalPkg.discountedPrice * renewalCouponRate) / 100);
  const finalRenewalPrice = renewalPkg.discountedPrice - renewalExtraDiscount;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (code === 'DIGI10' || code === 'DEMO20') {
      setAppliedCoupon(code);
      setCouponMessage(
        `کد تخفیف با موفقیت اعمال شد؛ ${code === 'DIGI10' ? '۱۰' : '۲۰'}٪ تخفیف اختصاص یافت.`
      );
    } else {
      setAppliedCoupon('');
      setCouponMessage('این کد تخفیف معتبر نیست یا منقضی شده است.');
    }
  }

  function applyRenewalCoupon() {
    const code = renewalCoupon.trim().toUpperCase();
    if (code === 'LOYAL10' || code === 'DIGI10' || code === 'DEMO20') {
      setAppliedRenewalCoupon(code);
      setRenewalCouponMessage(
        `کد تخفیف با موفقیت اعمال شد؛ ${code === 'DEMO20' ? '۲۰' : '۱۰'}٪ تخفیف مازاد اختصاص یافت.`
      );
    } else {
      setAppliedRenewalCoupon('');
      setRenewalCouponMessage('این کد تخفیف معتبر نیست یا منقضی شده است.');
    }
  }

  function handleLicenseSearch(overrideKey?: string) {
    const searchTarget = (overrideKey !== undefined ? overrideKey : renewalInput).trim().toUpperCase();
    setIsSearchingLicense(true);
    setSearchFeedback('');

    setTimeout(() => {
      setIsSearchingLicense(false);
      if (searchTarget.includes('EXPIRED') || searchTarget === '09153398765') {
        setVerifiedLicense(mockExpiredLicense);
        setSearchFeedback('لایسنس یافت شد: اشتراک این مجموعه منقضی شده است.');
      } else if (searchTarget.includes('EXPIRING') || searchTarget.includes('9942') || searchTarget === '09124852001' || searchTarget === '') {
        setVerifiedLicense(mockExpiringLicense);
        setSearchFeedback('لایسنس یافت شد: اشتراک شما فردا به پایان می‌رسد.');
      } else {
        // Fallback realistic match
        setVerifiedLicense({
          licenseKey: searchTarget,
          clubName: 'گیم‌کلوب بازی مدرن',
          city: 'تهران (صادقیه)',
          ownerName: 'مدیریت مجموعه',
          mobile: '۰۹۱۲۰۰۰۰۰۰۰',
          stationCount: 14,
          planType: 'شش‌ماهه ویژه',
          currentExpiresInDays: 1,
          currentExpiresInHours: 18,
          currentExpiryDate: 'فردا - ساعت ۱۶:۰۰',
          hardwareId: 'HW-RELAY-GENERIC-SRV',
          status: 'expiring_tomorrow',
        });
        setSearchFeedback(`لایسنس ${searchTarget} با موفقیت شناسایی و تایید شد.`);
      }
    }, 450);
  }

  function choosePlan(id: string) {
    setSelectedPlanId(id);
    setCoupon('');
    setAppliedCoupon('');
    setCouponMessage('');

    // Smooth scroll down to the "سفارش خودت رو نهایی کن" section
    setTimeout(() => {
      const targetElement = document.getElementById('finalize-order-section');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHighlightOrder(true);
        setTimeout(() => setHighlightOrder(false), 2200);
      }
    }, 80);
  }

  function chooseRenewalPlan(id: string) {
    setSelectedRenewalId(id);
    setRenewalCoupon('');
    setAppliedRenewalCoupon('');
    setRenewalCouponMessage('');

    setTimeout(() => {
      const targetElement = document.getElementById('renewal-finalize-section');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHighlightRenewalSummary(true);
        setTimeout(() => setHighlightRenewalSummary(false), 2200);
      }
    }, 80);
  }

  function switchToRenewal() {
    setPurchaseMode('renewal');
    setTimeout(() => {
      const el = document.getElementById('renewal-main-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  function switchToNew() {
    setPurchaseMode('new');
    setTimeout(() => {
      const el = document.getElementById('new-plans-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  const renderPlanIcon = (type: Plan['iconType']) => {
    switch (type) {
      case 'clock':
        return <Clock className="w-6 h-6 text-emerald-400" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-[#39ff78]" />;
      case 'crown':
        return <Crown className="w-6 h-6 text-amber-400" />;
    }
  };

  if (!plan) return null;

  return (
    <main className="purchase-page" dir="rtl">
      {/* Background Matrix Grid & Cyber Aura */}
      <div className="purchase-grid-bg" aria-hidden="true" />
      <div className="purchase-ambient-glow" aria-hidden="true" />

      {/* 1. HERO HEADER */}
      <header className="purchase-hero">
        {onBack && (
          <div className="flex justify-center mb-5">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-[#39ff78] hover:border-[#39ff78]/50 transition-all text-xs font-bold shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              <span>بازگشت به صفحه اصلی دیجی‌گیم</span>
            </button>
          </div>
        )}

        <div className="purchase-eyebrow">
          <span className="live-dot" aria-hidden="true" />
          <span>DIGIGAME ENTERPRISE // SUBSCRIPTION & RENEWAL PORTAL 2026</span>
          <span className="hero-chip-radar" aria-hidden="true" />
        </div>

        <h1>
          {purchaseMode === 'new' ? (
            <>
              قدرت مدیریت گیم‌نتت رو{' '}
              <span className="hero-headline-gradient">چند برابر کن!</span>
            </>
          ) : (
            <>
              تمدید آنی لایسنس و اشتراک{' '}
              <span className="hero-headline-gradient">بدون حتی ۱ ثانیه قطعی!</span>
            </>
          )}
        </h1>

        <p>
          {purchaseMode === 'new'
            ? 'پلن مناسب گیم‌نت یا کلوپ خود را انتخاب کنید، اشتراک لایسنس را در چند ثانیه فعال کرده و با خیال آسوده نشتی مالی دخل را برای همیشه به صفر برسانید.'
            : 'اگر قبلاً اشتراک دیجی‌گیم را تهیه کرده‌اید و اعتبار شما فردا یا در روزهای آینده به پایان می‌رسد، بدون نیاز به نصب مجدد و با حفظ ۱۰۰٪ اطلاعات دخل، لایسنس خود را با تخفیف وفاداری تمدید کنید.'}
        </p>

        {/* MODE SWITCHER: NEW SUBSCRIPTION VS RENEWAL SLIDE */}
        <div className="purchase-mode-switcher-container">
          <div className="purchase-mode-switcher" role="tablist" aria-label="انتخاب نوع عملیات خرید یا تمدید">
            <button
              type="button"
              role="tab"
              aria-selected={purchaseMode === 'new'}
              className={`mode-switch-btn ${purchaseMode === 'new' ? 'active-mode' : ''}`}
              onClick={switchToNew}
            >
              <ShoppingBag className="w-4 h-4 ml-2" />
              <div className="text-right">
                <span className="mode-btn-title">خرید اشتراک جدید</span>
                <span className="mode-btn-sub">راه‌اندازی اولیه و پلن‌ها</span>
              </div>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={purchaseMode === 'renewal'}
              className={`mode-switch-btn ${purchaseMode === 'renewal' ? 'active-mode' : ''}`}
              onClick={switchToRenewal}
            >
              <RefreshCw className={`w-4 h-4 ml-2 ${purchaseMode === 'renewal' ? 'animate-spin-slow text-[#39ff78]' : ''}`} />
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <span className="mode-btn-title">تمدید اشتراک لایسنس</span>
                  <span className="renewal-urgent-pill">انقضای فردا</span>
                </div>
                <span className="mode-btn-sub">ویژه مشترکین قبلی با تخفیف وفاداری</span>
              </div>
            </button>
          </div>
        </div>

        {/* Fast Action Banner in New Mode */}
        {purchaseMode === 'new' && (
          <div className="renewal-prompt-ribbon">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>از قبل اشتراک دارید و لایسنس‌تان فردا به پایان می‌رسد؟</span>
            <button
              type="button"
              className="renewal-ribbon-btn"
              onClick={switchToRenewal}
            >
              <span>انتقال مستقیم به اسلاید تمدید لایسنس</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </button>
          </div>
        )}

        {/* Benefits Badges */}
        <div className="purchase-benefits">
          <span>
            <ShieldCheck className="w-3.5 h-3.5 inline ml-1.5 text-emerald-400" />
            حفظ ۱۰۰٪ اطلاعات مشتریان و دخل بوفه
          </span>
          <span>
            <Zap className="w-3.5 h-3.5 inline ml-1.5 text-[#39ff78]" />
            تمدید و فعال‌سازی آنی بدون وقفه در بازی گیمرها
          </span>
          <span>
            <Sparkles className="w-3.5 h-3.5 inline ml-1.5 text-cyan-400" />
            پشتیبانی ۲۴ ساعته ۳۶۵ روزه حتی روزهای تعطیل
          </span>
        </div>
      </header>

      {/* =========================================================================
          VIEW A: NEW SUBSCRIPTION PURCHASE FLOW
          ========================================================================= */}
      {purchaseMode === 'new' && (
        <div id="new-plans-anchor">
          {/* 2. PRICING SECTION */}
          <section className="pricing-section">
            <div className="purchase-section-heading">
              <div>
                <span className="section-kicker">CHOOSE YOUR SUBSCRIPTION PLAN</span>
                <h2>پلن خودت رو انتخاب کن</h2>
                <p>تمامی پلن‌ها شامل نرم‌افزار سرور، کلاینت‌های ضدتقلب و اتصال هوشمند رله هستند.</p>
              </div>
              <span className="pricing-badge">
                <Sparkles className="w-3.5 h-3.5 inline ml-1" />
                ۳ پلن تخصصی گیمینگ
              </span>
            </div>

            <div className="pricing-grid">
              {plans.map((item, index) => {
                const isSelected = selectedPlanId === item.id;
                return (
                  <article
                    key={item.id}
                    className={`pricing-card ${item.popular ? 'popular-plan' : ''} ${
                      isSelected ? 'selected-plan' : ''
                    }`}
                    style={{ '--card-index': index } as React.CSSProperties}
                    onMouseMove={handleMouseMove}
                    onClick={() => choosePlan(item.id)}
                  >
                    <span className="pricing-top-beam" aria-hidden="true" />
                    <span className="pricing-corner-bracket bracket-tl" aria-hidden="true" />
                    <span className="pricing-corner-bracket bracket-br" aria-hidden="true" />

                    <div className="pricing-header">
                      <div className="plan-badge-row">
                        <span className="plan-icon-pod">{renderPlanIcon(item.iconType)}</span>
                        {item.badge && <span className="plan-badge">{item.badge}</span>}
                      </div>

                      <h3 className="plan-name">{item.name}</h3>
                      <p className="plan-description">{item.description}</p>
                    </div>

                    <div className="pricing-amount-block">
                      <div className="flex items-baseline gap-2">
                        <span className="plan-price-digits">
                          {new Intl.NumberFormat('fa-IR').format(item.price)}
                        </span>
                        <span className="plan-price-currency">تومان</span>
                      </div>
                      <span className="plan-duration-label">{item.duration}</span>
                    </div>

                    <div className="pricing-divider" />

                    <ul className="plan-features">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <span className="feature-check-icon">
                            <CheckCircle2 className="w-4 h-4 text-[#39ff78]" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={`plan-button ${isSelected ? 'active-plan-button' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        choosePlan(item.id);
                      }}
                    >
                      <span>
                        {isSelected ? '✓ پلن انتخابی شما' : 'انتخاب این پلن'}
                      </span>
                      <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          {/* 3. ORDER LAYOUT (Checkout & Trust) */}
          <section
            id="finalize-order-section"
            className={`order-layout ${highlightOrder ? 'highlight-focus' : ''}`}
          >
            <div className="order-main">
              <div className="order-heading">
                <span className="section-kicker">FINALIZE SUBSCRIPTION ORDER</span>
                <h2>سفارش خودت رو نهایی کن</h2>
                <p>پلن انتخابی، مدت اعتبار و کدهای تخفیف خود را بررسی فرمایید.</p>
              </div>

              {/* Coupon Box */}
              <div className="coupon-box">
                <div className="coupon-heading">
                  <span className="coupon-icon">
                    <Percent className="w-5 h-5" />
                  </span>
                  <div>
                    <h3>کد تخفیف اختصاصی داری؟</h3>
                    <p>کد معرف یا تخفیف ویژه خود را وارد کنید تا کسر گردد.</p>
                  </div>
                </div>

                <div className="coupon-input-row">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={coupon}
                      onChange={(event) => setCoupon(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') applyCoupon();
                      }}
                      placeholder="کد تخفیف (مثال: DIGI10)"
                      className="pr-9"
                      aria-label="کد تخفیف"
                    />
                  </div>
                  <button type="button" onClick={applyCoupon} className="coupon-apply-btn">
                    اعمال کد
                  </button>
                </div>

                {couponMessage && (
                  <p
                    className={`coupon-status-msg ${
                      appliedCoupon ? 'coupon-success' : 'coupon-error'
                    }`}
                    role="status"
                  >
                    {couponMessage}
                  </p>
                )}

                <div className="coupon-hints-row">
                  <span>کدهای فعال برای تست این نسخه:</span>
                  <button 
                    type="button" 
                    onClick={() => { setCoupon('DIGI10'); }} 
                    className="coupon-pill-copy"
                  >
                    DIGI10 (۱۰٪)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setCoupon('DEMO20'); }} 
                    className="coupon-pill-copy"
                  >
                    DEMO20 (۲۰٪)
                  </button>
                </div>
              </div>

              {/* Order Summary Chassis */}
              <div className="order-summary" onMouseMove={handleMouseMove}>
                <span className="pricing-top-beam" aria-hidden="true" />
                <span className="pricing-corner-bracket bracket-tl" aria-hidden="true" />
                <span className="pricing-corner-bracket bracket-br" aria-hidden="true" />

                <div className="summary-top">
                  <div>
                    <span className="section-kicker">ORDER BREAKDOWN</span>
                    <h3>فاکتور نهایی اشتراک</h3>
                  </div>
                  <span className="summary-lock">
                    <Lock className="w-3.5 h-3.5 ml-1 text-emerald-400" />
                    تراکنش امن ۲۵۶ بیتی
                  </span>
                </div>

                <div className="summary-plan-banner">
                  <div className="summary-plan-icon-pod">
                    {renderPlanIcon(plan.iconType)}
                  </div>
                  <div className="flex-1">
                    <strong>{plan.name}</strong>
                    <p>{plan.duration} • دسترسی کامل به کلیه ماژول‌ها</p>
                  </div>
                  <span className="summary-plan-tag">{formatPrice(plan.price)}</span>
                </div>

                <div className="summary-line">
                  <span>قیمت اصلی اشتراک</span>
                  <span>{formatPrice(plan.price)}</span>
                </div>

                <div className="summary-line discount-line">
                  <span>
                    تخفیف اعمال‌شده {discountRate ? `(${discountRate}٪ کد معرف)` : ''}
                  </span>
                  <span className={discount ? 'text-emerald-400 font-bold' : ''}>
                    {discount ? `− ${formatPrice(discount)}` : '۰ تومان'}
                  </span>
                </div>

                <div className="summary-divider" />

                <div className="summary-total">
                  <div>
                    <span>مبلغ نهایی قابل پرداخت:</span>
                    <small className="block text-[11px] text-slate-400 mt-0.5">
                      شامل مالیات و پشتیبانی کامل دوره
                    </small>
                  </div>
                  <strong className="summary-total-digits">{formatPrice(finalPrice)}</strong>
                </div>

                <button
                  type="button"
                  className="checkout-button group"
                  onClick={() => setCheckoutOpen(true)}
                >
                  <ShoppingBag className="w-5 h-5 ml-2" />
                  <span>ادامه و ثبت نهایی سفارش</span>
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1.5" />
                </button>

                <p className="checkout-note">
                  ✓ فعال‌سازی آنی پس از پرداخت • ارسال خودکار لایسنس و کلید فعال‌سازی به موبایل شما
                </p>
              </div>
            </div>

            {/* Side Column: Trust, Security & Guarantees */}
            <aside className="purchase-trust" onMouseMove={handleMouseMove}>
              <span className="pricing-top-beam" aria-hidden="true" />
              <div className="trust-card">
                <div className="trust-header">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4>گارانتی بی‌قیدوشرط دیجی‌گیم</h4>
                </div>
                <p>
                  در صورت هرگونه عدم رضایت از عملکرد رله یا نرم‌افزار، تا ۱۴ روز کل مبلغ بدون هیچ سوالی به حساب بانکی شما عودت داده می‌شود.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-header">
                  <Zap className="w-5 h-5 text-[#39ff78]" />
                  <h4>نصب و تحویل فوری</h4>
                </div>
                <p>
                  لایسنس و فایل‌های نصبی بلافاصله پس از پرداخت صادر شده و کارشناس فنی ما از طریق AnyDesk در صورت درخواست شما در ۱۰ دقیقه سیستم را راه‌اندازی می‌کند.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-header">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <h4>درگاه پرداخت رسمی شاپرک</h4>
                </div>
                <p>
                  تمامی تراکنش‌ها در بستر رمزنگاری‌شده پروتکل SSL و زیر نظر مستقیم شبکه الکترونیکی پرداخت کارت (شاپرک) انجام می‌پذیرد.
                </p>
              </div>
            </aside>
          </section>
        </div>
      )}

      {/* =========================================================================
          VIEW B: SUBSCRIPTION RENEWAL SLIDE (تمدید اشتراک لایسنس)
          ========================================================================= */}
      {purchaseMode === 'renewal' && (
        <div id="renewal-main-anchor" className="renewal-portal-section">
          {/* Header Hologram Cluster */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-2">
            <div className="pricing-chip-badge">
              <div className="pricing-chip-icon">
                <Zap className="w-3.5 h-3.5 text-[#39ff78]" />
              </div>
              <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
                ACTIVE CLUB TELEMETRY & RENEWAL 2026
              </span>
              <span className="pricing-chip-radar" aria-hidden="true" />
            </div>

            <h2 className="pricing-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
              تمدید آنی لایسنس و اشتراک{' '}
              <span className="pricing-title-gradient">دیجی‌گیم</span>
            </h2>

            <p className="pricing-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              بدون یک ثانیه قطعی سیستم‌ها یا ریستارت سرور؛ با تخفیف‌های ویژه وفاداری کلوپ‌داران، روزهای رایگان هدیه و اعمال خودکار بر روی رله‌ها.
            </p>
          </div>

          {/* Trust Guarantee Strip */}
          <div className="pricing-guarantee-strip">
            <div className="pricing-guarantee-item">
              <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
              <span>عدم سوختن ساعات باقیمانده (افزودن به انتهای لایسنس فعلی)</span>
            </div>
            <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
            <div className="pricing-guarantee-item">
              <Cpu className="w-4 h-4 text-[#00f0ff]" />
              <span>بدون ۱ ثانیه قطعی رله‌ها یا سیستم‌ها</span>
            </div>
            <div className="h-4 w-px bg-slate-700/50 hidden sm:block" />
            <div className="pricing-guarantee-item">
              <CheckCircle2 className="w-4 h-4 text-[#39ff78]" />
              <span>حفظ ۱۰۰٪ دیتابیس مشتریان و دخل کلوپ</span>
            </div>
          </div>

          {/* Live Esports License Telemetry & Search Deck */}
          <section className="renewal-lookup-chassis" onMouseMove={handleMouseMove}>
            <span className="pricing-top-beam" aria-hidden="true" />
            <span className="pricing-corner-bracket bracket-tl" aria-hidden="true" />
            <span className="pricing-corner-bracket bracket-br" aria-hidden="true" />

            <div className="telemetry-top-bar flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-700/40">
              <div className="flex items-center gap-2">
                <span className="live-dot" />
                <span className="text-xs font-extrabold font-outfit uppercase tracking-wider text-emerald-400">
                  LIVE TELEMETRY // وضعیت اتصال ابری سرور کلوپ
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                سرور مرکزی: <span className="text-emerald-400 font-mono">ONLINE (99.98%)</span>
              </span>
            </div>

            {/* Live Verified License Status HUD Card */}
            {verifiedLicense && (
              <div className="verified-license-radar my-4">
                {/* License Metadata Grid */}
                <div className="license-meta-grid">
                  <div className="meta-cell">
                    <span className="meta-label">نام گیم‌سنتر / کلوپ</span>
                    <strong className="meta-value text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      {verifiedLicense.clubName}
                    </strong>
                    <small className="text-slate-400 text-xs">{verifiedLicense.city} • {verifiedLicense.ownerName}</small>
                  </div>

                  <div className="meta-cell">
                    <span className="meta-label">کد اختصاصی لایسنس</span>
                    <strong className="meta-value font-mono text-[#39ff78] tracking-wider">
                      {verifiedLicense.licenseKey}
                    </strong>
                    <small className="text-slate-400 text-xs">پلن فعلی: {verifiedLicense.planType}</small>
                  </div>

                  <div className="meta-cell">
                    <span className="meta-label">استیشن‌ها و کنسول‌ها</span>
                    <strong className="meta-value text-cyan-300">
                      {verifiedLicense.stationCount} سیستم فعال
                    </strong>
                    <small className="text-slate-400 text-xs">کنسول PS5 + پی‌سی گیمینگ متصل</small>
                  </div>

                  <div className="meta-cell">
                    <span className="meta-label">وضعیت انقضا</span>
                    <strong className="meta-value text-amber-400">
                      {verifiedLicense.currentExpiryDate}
                    </strong>
                    <small className="text-emerald-400 text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" /> آنلاین • بدون وقفه در رله‌ها
                    </small>
                  </div>
                </div>
              </div>
            )}

            {/* License Lookup Search Bar */}
            <div className="renewal-search-bar mt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={renewalInput}
                  onChange={(e) => setRenewalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLicenseSearch();
                  }}
                  placeholder="استعلام لایسنس دیگر (مثال: DG-9942-EXPIRING) یا شماره همراه..."
                  className="renewal-search-input"
                />
              </div>

              <button
                type="button"
                className="renewal-search-action-btn"
                onClick={() => handleLicenseSearch()}
                disabled={isSearchingLicense}
              >
                {isSearchingLicense ? (
                  <>
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin text-[#040914]" />
                    <span>در حال استعلام سرور...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 ml-2" />
                    <span>استعلام وضعیت لایسنس</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Fill Buttons for Testing */}
            <div className="renewal-demo-presets mt-3">
              <span className="demo-label">تست سناریوهای آماده:</span>
              <button
                type="button"
                className="demo-preset-pill demo-expiring"
                onClick={() => {
                  setRenewalInput('DG-9942-EXPIRING');
                  handleLicenseSearch('DG-9942-EXPIRING');
                }}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 ml-1 inline" />
                سناریو ۱: لایسنس در آستانه انقضا (فردا به پایان می‌رسد!)
              </button>
              <button
                type="button"
                className="demo-preset-pill demo-expired"
                onClick={() => {
                  setRenewalInput('DG-7714-EXPIRED');
                  handleLicenseSearch('DG-7714-EXPIRED');
                }}
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400 ml-1 inline" />
                سناریو ۲: لایسنس منقضی شده (دیروز)
              </button>
            </div>

            {searchFeedback && (
              <p className="renewal-search-feedback mt-2">{searchFeedback}</p>
            )}
          </section>

          {/* Section 2: Renewal Packages Selection - High-Tech Cyber Cards */}
          <section className="renewal-packages-section">
            <div className="purchase-section-heading mb-6">
              <div>
                <span className="section-kicker">STEP 02 // CHOOSE RENEWAL DURATION</span>
                <h2>پلن‌های تمدید با تخفیف وفاداری دیجی‌گیم</h2>
                <p>به پاس همراهی شما، تخفیف‌های ویژه وفاداری و روزهای رایگان هدیه برای تمدید اعمال گردیده است.</p>
              </div>
              <span className="pricing-badge">
                <Award className="w-3.5 h-3.5 inline ml-1 text-amber-400" />
                تخفیف ویژه کلوپ‌های همکار
              </span>
            </div>

            <div className="pricing-cyber-grid">
              {renewalPackages.map((pkg) => {
                const isSelected = selectedRenewalId === pkg.id;
                const isFeatured = pkg.popular;
                const isDiamond = pkg.vip;

                return (
                  <div
                    key={pkg.id}
                    className={`pricing-cyber-card ${isFeatured ? 'is-featured' : ''} ${isDiamond ? 'is-diamond' : ''} ${isSelected ? 'is-selected-cyber' : ''}`}
                    onMouseMove={handleMouseMove}
                    onClick={() => chooseRenewalPlan(pkg.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Background Stylized Watermark */}
                    <span className="cyber-card-watermark" aria-hidden="true">{pkg.num}</span>

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
                        <span>{pkg.modId}</span>
                      </div>

                      <div className="icon-reactor-pod">
                        {pkg.vip ? (
                          <Crown className="w-6 h-6 text-amber-400" />
                        ) : pkg.popular ? (
                          <Flame className="w-6 h-6 text-[#39ff78]" />
                        ) : (
                          <Clock className="w-6 h-6 text-emerald-400" />
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="pricing-card-body">
                      {pkg.highlightBadge && (
                        <div className="pricing-tier-pill">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{pkg.highlightBadge}</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <h3 className="pricing-plan-title">
                          {pkg.name}
                        </h3>
                        <p className="pricing-plan-tagline">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Price Display Pod */}
                      <div className="pricing-cost-pod">
                        {pkg.originalPrice > pkg.discountedPrice && (
                          <div className="text-xs text-slate-400 line-through mb-1 flex items-center justify-center gap-1.5 font-outfit">
                            <span>{pkg.originalPrice.toLocaleString('fa-IR')}</span>
                            <span>تومان</span>
                            <span className="bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/30">
                              {pkg.loyaltyPercent}٪ تخفیف
                            </span>
                          </div>
                        )}
                        <div className="pricing-amount-row">
                          <span className="pricing-num font-outfit">
                            {pkg.discountedPrice.toLocaleString('fa-IR')}
                          </span>
                          <span className="pricing-toman">تومان</span>
                        </div>
                        <span className="pricing-cycle-tag">{pkg.durationPill}</span>
                      </div>

                      {/* Specs Container */}
                      <div className="pricing-specs-container">
                        <div className="pricing-spec-row">
                          <Cpu className="w-4 h-4 shrink-0 text-[#39ff78]" />
                          <span className="pricing-spec-label">پشتیبانی:</span>
                          <span className="pricing-spec-value">{pkg.stationSpec}</span>
                        </div>
                        <div className="pricing-spec-row">
                          <Zap className="w-4 h-4 shrink-0 text-[#00f0ff]" />
                          <span className="pricing-spec-label">ویژگی ویژه:</span>
                          <span className="pricing-spec-value">{pkg.hardwareSpec}</span>
                        </div>
                      </div>

                      {/* Features List */}
                      <ul className="plan-features mt-4 space-y-2">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#39ff78] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer */}
                    <div className="pricing-card-footer mt-5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          chooseRenewalPlan(pkg.id);
                        }}
                        className={`pricing-action-btn ${isFeatured ? 'btn-featured' : ''} ${isSelected ? 'is-selected-btn' : ''}`}
                      >
                        <span className="pricing-btn-shine" aria-hidden="true" />
                        <span>{isSelected ? '✓ تمدید با این پلن انتخاب شد' : `انتخاب ${pkg.name.split('(')[0].trim()}`}</span>
                        <ArrowUpLeft className="w-4 h-4" />
                      </button>

                      <div className="impact-capsule">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#39ff78]" />
                        <span>بدون سوختن زمان فعلی • سینک ابری فوری</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Renewal Order Summary & Instant Checkout */}
          <section
            id="renewal-finalize-section"
            className={`order-layout ${highlightRenewalSummary ? 'highlight-focus' : ''}`}
          >
            <div className="order-main">
              <div className="order-heading">
                <span className="section-kicker">STEP 03 // INSTANT RENEWAL SUMMARY</span>
                <h2>پیش‌فاکتور تمدید بدون قطعی</h2>
                <p>تاریخ جدید انقضا، تخفیف‌های وفاداری و جزییات نهایی لایسنس خود را مرور فرمایید.</p>
              </div>

              {/* Renewal Coupon Box */}
              <div className="coupon-box">
                <div className="coupon-heading">
                  <span className="coupon-icon">
                    <Percent className="w-5 h-5" />
                  </span>
                  <div>
                    <h3>کد تخفیف مازاد برای تمدید داری؟</h3>
                    <p>کد تخفیف‌های ویژه جشنواره یا هدیه کلوپ‌داران را وارد نمایید.</p>
                  </div>
                </div>

                <div className="coupon-input-row">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={renewalCoupon}
                      onChange={(e) => setRenewalCoupon(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') applyRenewalCoupon();
                      }}
                      placeholder="کد تخفیف مازاد (مثال: LOYAL10)"
                      className="pr-9"
                      aria-label="کد تخفیف تمدید"
                    />
                  </div>
                  <button type="button" onClick={applyRenewalCoupon} className="coupon-apply-btn">
                    اعمال کد
                  </button>
                </div>

                {renewalCouponMessage && (
                  <p
                    className={`coupon-status-msg ${
                      appliedRenewalCoupon ? 'coupon-success' : 'coupon-error'
                    }`}
                    role="status"
                  >
                    {renewalCouponMessage}
                  </p>
                )}

                <div className="coupon-hints-row">
                  <span>کدهای تست تمدید:</span>
                  <button 
                    type="button" 
                    onClick={() => { setRenewalCoupon('LOYAL10'); }} 
                    className="coupon-pill-copy"
                  >
                    LOYAL10 (۱۰٪ مازاد)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setRenewalCoupon('DIGI10'); }} 
                    className="coupon-pill-copy"
                  >
                    DIGI10 (۱۰٪)
                  </button>
                </div>
              </div>

              {/* Renewal Summary Chassis */}
              <div className="order-summary" onMouseMove={handleMouseMove}>
                <span className="pricing-top-beam" aria-hidden="true" />
                <span className="pricing-corner-bracket bracket-tl" aria-hidden="true" />
                <span className="pricing-corner-bracket bracket-br" aria-hidden="true" />

                <div className="summary-top">
                  <div>
                    <span className="section-kicker">LICENSE EXTENSION INVOICE</span>
                    <h3>فاکتور تمدید رسمی لایسنس</h3>
                  </div>
                  <span className="summary-lock">
                    <Radio className="w-3.5 h-3.5 ml-1 text-emerald-400 animate-pulse" />
                    اتصال مستقیم ابری به رله
                  </span>
                </div>

                {/* Expiry Extension Preview */}
                <div className="renewal-extension-preview">
                  <div className="extension-step">
                    <span className="step-label">انقضای کنونی لایسنس:</span>
                    <strong className="step-val text-amber-300">
                      {verifiedLicense ? verifiedLicense.currentExpiryDate : 'فردا'}
                    </strong>
                  </div>
                  <div className="extension-arrow">
                    <ArrowLeft className="w-5 h-5 text-[#39ff78]" />
                  </div>
                  <div className="extension-step">
                    <span className="step-label">انقضای جدید پس از تمدید:</span>
                    <strong className="step-val text-[#39ff78]">
                      + {renewalPkg.addedDays + renewalPkg.bonusDays} روز اعتبار مازاد
                    </strong>
                  </div>
                </div>

                <div className="summary-plan-banner">
                  <div className="summary-plan-icon-pod">
                    <RefreshCw className="w-6 h-6 text-[#39ff78]" />
                  </div>
                  <div className="flex-1">
                    <strong>{renewalPkg.name}</strong>
                    <p>{renewalPkg.durationTitle} • بدون تغییر در تنظیمات سرور</p>
                  </div>
                  <span className="summary-plan-tag">{formatPrice(renewalPkg.discountedPrice)}</span>
                </div>

                <div className="summary-line">
                  <span>تعرفه پایه اشتراک</span>
                  <span>{formatPrice(renewalPkg.originalPrice)}</span>
                </div>

                {renewalPkg.originalPrice > renewalPkg.discountedPrice && (
                  <div className="summary-line discount-line">
                    <span>تخفیف وفاداری ({renewalPkg.loyaltyPercent}٪)</span>
                    <span className="text-emerald-400 font-bold">
                      − {formatPrice(renewalPkg.originalPrice - renewalPkg.discountedPrice)}
                    </span>
                  </div>
                )}

                {renewalExtraDiscount > 0 && (
                  <div className="summary-line discount-line">
                    <span>تخفیف کد معرف ({renewalCouponRate}٪)</span>
                    <span className="text-emerald-400 font-bold">
                      − {formatPrice(renewalExtraDiscount)}
                    </span>
                  </div>
                )}

                {renewalPkg.bonusDays > 0 && (
                  <div className="summary-line text-cyan-300 font-medium">
                    <span>اعتبار هدیه رایگان دیجی‌گیم</span>
                    <span>+ {renewalPkg.bonusDays} روز رایگان اضافی</span>
                  </div>
                )}

                <div className="summary-divider" />

                <div className="summary-total">
                  <div>
                    <span>مبلغ نهایی قابل پرداخت:</span>
                    <small className="block text-[11px] text-slate-400 mt-0.5">
                      تمدید آنی پس از پرداخت • بدون سوختن زمان فعلی
                    </small>
                  </div>
                  <strong className="summary-total-digits text-white font-black text-2xl">
                    {formatPrice(finalRenewalPrice)}
                  </strong>
                </div>

                <button
                  type="button"
                  className="checkout-button renewal-checkout-action group"
                  onClick={() => setRenewalSuccessModal(true)}
                >
                  <RefreshCw className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
                  <span>پرداخت و تمدید فوری لایسنس</span>
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1.5" />
                </button>

                <p className="checkout-note text-center">
                  ✓ اتصال خودکار به درگاه پرداخت شاپرک • اعمال تغییر تاریخ انقضا روی سرور کمتر از ۶۰ ثانیه
                </p>
              </div>
            </div>

            {/* Side Column: Renewal Guarantees */}
            <aside className="purchase-trust" onMouseMove={handleMouseMove}>
              <span className="pricing-top-beam" aria-hidden="true" />
              <div className="trust-card">
                <div className="trust-header">
                  <Server className="w-5 h-5 text-[#39ff78]" />
                  <h4>بدون ۱ ثانیه قطعی سیستم‌ها</h4>
                </div>
                <p>
                  فرآیند تمدید تماماً از طریق کلاد دیجی‌گیم انجام می‌شود. نیازی به ریستارت سرور، قطع کلاینت‌ها یا متوقف کردن بازی مشتریان در حال بازی نخواهد بود.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-header">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4>حفظ کامل اطلاعات و تنظیمات</h4>
                </div>
                <p>
                  اطلاعات حسابداری، مانده حساب مشتریان، نرخ ساعتی سیستم‌ها و سابقه فاکتورهای بوفه دست‌نخورده باقی می‌ماند و نیازی به پیکربندی مجدد نیست.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-header">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h4>به‌روزرسانی رایگان به نسخه ۲۰۲۶</h4>
                </div>
                <p>
                  با هر تمدید، دسترسی رایگان به آخرین پچ‌ها و فیچرهای جدید کلاینت ضدتقلب و پنل گزارشات آنلاین به شما اعطا خواهد شد.
                </p>
              </div>
            </aside>
          </section>

          {/* Section 4: Renewal FAQ */}
          <section className="faq-section">
            <div className="purchase-section-heading">
              <div>
                <span className="section-kicker">RENEWAL FREQUENTLY ASKED QUESTIONS</span>
                <h2>سوالات متداول درباره تمدید اشتراک</h2>
                <p>پاسخ سریع به دغدغه‌های مدیران کلوپ درباره تمدید لایسنس و جلوگیری از قطعی رله‌ها.</p>
              </div>
            </div>

            <div className="faq-grid">
              <details className="faq-box" open>
                <summary>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>اگر اشتراک من فردا تمام شود و من امروز تمدید کنم، ساعات باقیمانده می‌سوزد؟</span>
                  </div>
                  <ChevronDown className="w-4 h-4 faq-arrow" />
                </summary>
                <p>
                  خیر، مطلقاً هیچ مقداری از اعتبار شما نمی‌سوزد! سیستم هوشمند دیجی‌گیم مدت زمان تمدید جدید را دقیقاً به ثانیه و از انتهای آخرین لحظه اعتبار فعلی شما اضافه خواهد کرد.
                </p>
              </details>

              <details className="faq-box">
                <summary>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>آیا پس از پرداخت نیاز به وارد کردن مجدد کد لایسنس روی کلاینت‌ها هست؟</span>
                  </div>
                  <ChevronDown className="w-4 h-4 faq-arrow" />
                </summary>
                <p>
                  خیر. به محض پرداخت موفق در درگاه بانکی، سرور دیجی‌گیم به صورت ابری با سرور کلوپ شما سینک شده و تاریخ جدید انقضا در کسری از ثانیه روی پنل شما و تمام سیستم‌های متصل اعمال می‌شود.
                </p>
              </details>

              <details className="faq-box">
                <summary>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>اگر لایسنس من دیروز منقضی شده باشد آیا اطلاعات دخل پاک شده است؟</span>
                  </div>
                  <ChevronDown className="w-4 h-4 faq-arrow" />
                </summary>
                <p>
                  خیر، تمامی دیتابیس‌ها و اطلاعات مالی تا ۹۰ روز در دیتابیس امن سرور شما به صورت بایگانی ذخیره می‌ماند. با تمدید لایسنس، رله‌ها مجدداً بیدار شده و همه‌چیز دقیقاً به وضعیت عادی برمی‌گردد.
                </p>
              </details>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          COMMON SECTION: FAQ (FOR NEW PLANS)
          ========================================================================= */}
      {purchaseMode === 'new' && (
        <section className="faq-section">
          <div className="purchase-section-heading">
            <div>
              <span className="section-kicker">FREQUENTLY ASKED QUESTIONS</span>
              <h2>سوالات متداول شما</h2>
              <p>پاسخ به سوالاتی که همکاران ما پیش از خرید لایسنس دیجی‌گیم مطرح می‌کنند.</p>
            </div>
          </div>

          <div className="faq-grid">
            <details className="faq-box" open>
              <summary>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>آیا برای راه‌اندازی رله نیاز به سیم‌کشی جدید در سالن هست؟</span>
                </div>
                <ChevronDown className="w-4 h-4 faq-arrow" />
              </summary>
              <p>
                خیر، دستگاه رله دیجی‌گیم از طریق شبکه LAN داخلی یا Wi-Fi مستقیم به سرور شما متصل می‌شود. کافی است کابل برق تلویزیون‌ها یا کنسول‌ها از باکس رله رد شود و نیاز به هیچ‌گونه کابل‌کشی پرهزینه نخواهید داشت.
              </p>
            </details>

            <details className="faq-box">
              <summary>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>اگر در میانه دوره تعداد سیستم‌هایم را اضافه کنم چه می‌شود؟</span>
                </div>
                <ChevronDown className="w-4 h-4 faq-arrow" />
              </summary>
              <p>
                هیچ مانعی وجود ندارد! شما می‌توانید در هر زمان تعداد سیستم‌ها یا کنسول‌های خود را از داخل پنل مدیریت افزایش دهید. مازاد هزینه به صورت خودکار و فقط به نسبت روزهای باقی‌مانده از اشتراک شما محاسبه خواهد شد.
              </p>
            </details>
          </div>
        </section>
      )}

      {/* =========================================================================
          FLOATING WIDGET: RECENT PURCHASES & RENEWALS
          ========================================================================= */}
      {activityOpen ? (
        <aside className="recent-purchases" aria-label="آخرین خریدها و فعال‌سازی‌های زنده">
          <span className="pricing-top-beam" aria-hidden="true" />
          
          <div className="recent-header">
            <div className="recent-title-icon">
              <Activity className="w-4 h-4 text-[#39ff78] animate-pulse" />
            </div>
            <div className="recent-heading-text">
              <div className="flex items-center gap-1.5">
                <span className="live-dot" />
                <strong>فعال‌سازی‌های زنده دیجی‌گیم</strong>
              </div>
              <span>تراکنش‌های واقعی همکاران سراسر کشور</span>
            </div>
            <button
              type="button"
              className="recent-close"
              onClick={() => setActivityOpen(false)}
              aria-label="بستن پنجره آخرین خریدها"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="recent-list-container">
            {recentPurchasesData.map((purchase, index) => (
              <div className="recent-item" key={index}>
                <div className="recent-avatar">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="recent-info">
                  <strong>{purchase.name}</strong>
                  <span>{purchase.plan} • {purchase.time}</span>
                </div>
                <span className="recent-status">{purchase.price}</span>
              </div>
            ))}
          </div>

          <div className="recent-footer">
            <span className="live-dot" />
            <span>اتصال زنده به درگاه پرداخت هوشمند</span>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          className="recent-reopen"
          onClick={() => setActivityOpen(true)}
          aria-label="مشاهده آخرین خریدهای فعال"
        >
          <span className="live-dot" />
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>آخرین خریدها و تمدیدها ({recentPurchasesData.length})</span>
        </button>
      )}

      {/* =========================================================================
          MODAL 1: NEW PURCHASE CHECKOUT CONFIRMATION MODAL
          ========================================================================= */}
      {checkoutOpen && (
        <div
          className="checkout-overlay"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="pricing-top-beam" aria-hidden="true" />
            <span className="pricing-corner-bracket bracket-tl" aria-hidden="true" />
            <span className="pricing-corner-bracket bracket-br" aria-hidden="true" />

            <button
              type="button"
              className="modal-close"
              onClick={() => setCheckoutOpen(false)}
              aria-label="بستن پنجره"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="modal-symbol">
              <CheckCircle2 className="w-8 h-8 text-[#39ff78]" />
            </div>

            <span className="section-kicker">SECURE ORDER CHECKOUT</span>
            <h2 id="checkout-title">پیش‌نمایش رسمی فاکتور اشتراک</h2>
            <p className="modal-description">
              لطفاً جزییات اشتراک و مبلغ نهایی را تایید کنید تا به درگاه شاپرک متصل شوید.
            </p>

            <div className="modal-invoice-card">
              <div className="modal-plan">
                <span>پلن اشتراک انتخابی:</span>
                <strong>{plan.name} ({plan.duration})</strong>
              </div>

              <div className="modal-plan">
                <span>کد تخفیف:</span>
                <strong className={appliedCoupon ? 'text-emerald-400' : ''}>
                  {appliedCoupon ? `${appliedCoupon} (${discountRate}٪ تخفیف)` : 'بدون تخفیف'}
                </strong>
              </div>

              <div className="modal-divider" />

              <div className="modal-total">
                <span>مبلغ قابل پرداخت:</span>
                <strong className="text-emerald-400 text-lg font-black">{formatPrice(finalPrice)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="checkout-modal-pay-btn"
              onClick={() => {
                alert('درگاه پرداخت بانکی شاپرک به زودی متصل خواهد شد. سفارش شما در سیستم ثبت شد.');
                setCheckoutOpen(false);
              }}
            >
              <Lock className="w-4 h-4 ml-2" />
              <span>پرداخت امن و تحویل آنی لایسنس</span>
            </button>

            <p className="checkout-note text-center mt-3">
              🔒 پرداخت از طریق کلیه کارت‌های عضو شتاب با پروتکل امن شاپرک
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: RENEWAL SUCCESS / INVOICE MODAL
          ========================================================================= */}
      {renewalSuccessModal && (
        <div
          className="checkout-overlay"
          onClick={() => setRenewalSuccessModal(false)}
        >
          <div
            className="checkout-modal renewal-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="renewal-success-title"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="pricing-top-beam" aria-hidden="true" />
            <span className="pricing-corner-bracket bracket-tl" aria-hidden="true" />
            <span className="pricing-corner-bracket bracket-br" aria-hidden="true" />

            <button
              type="button"
              className="modal-close"
              onClick={() => setRenewalSuccessModal(false)}
              aria-label="بستن پنجره"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="modal-symbol renewal-symbol-glow">
              <CheckCircle2 className="w-10 h-10 text-[#39ff78]" />
            </div>

            <span className="section-kicker text-[#39ff78]">LICENSE RENEWED // ZERO DOWNTIME</span>
            <h2 id="renewal-success-title">تمدید لایسنس با موفقیت شبیه‌سازی شد!</h2>
            <p className="modal-description">
              اعتبار مجموعه شما بدون حتی ۱ ثانیه قطعی با موفقیت در شبکه دیجی‌گیم تمدید شد.
            </p>

            <div className="modal-invoice-card">
              <div className="modal-plan">
                <span>مجموعه:</span>
                <strong className="text-white">{verifiedLicense?.clubName || 'گیم‌سنتر تخصصی آرنا'}</strong>
              </div>

              <div className="modal-plan">
                <span>کد لایسنس:</span>
                <strong className="font-mono text-[#39ff78]">{verifiedLicense?.licenseKey || 'DG-9942-EXPIRING'}</strong>
              </div>

              <div className="modal-plan">
                <span>پلن تمدیدشده:</span>
                <strong>{renewalPkg.name}</strong>
              </div>

              <div className="modal-plan">
                <span>اعتبار اضافه شده:</span>
                <strong className="text-cyan-300">
                  + {renewalPkg.addedDays + renewalPkg.bonusDays} روز اعتبار جدید
                </strong>
              </div>

              <div className="modal-plan">
                <span>وضعیت رله‌های سالن:</span>
                <strong className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> ۱۰۰٪ آنلاین و بدون وقفه
                </strong>
              </div>

              <div className="modal-divider" />

              <div className="modal-total">
                <span>مبلغ پرداخت‌شده:</span>
                <strong className="text-[#39ff78] text-lg font-black">{formatPrice(finalRenewalPrice)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="checkout-modal-pay-btn"
              onClick={() => setRenewalSuccessModal(false)}
            >
              <Check className="w-4 h-4 ml-2" />
              <span>بازگشت به پرتال اشتراک</span>
            </button>

            <p className="checkout-note text-center mt-3">
              پیامک تایید تمدید و رسید مالی برای شماره همراه مدیر مجموعه ارسال گردید.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};
