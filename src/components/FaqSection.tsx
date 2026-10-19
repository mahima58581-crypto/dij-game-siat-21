import React, { useState } from 'react';
import { 
  HelpCircle, ChevronDown, Search, X, 
  WifiOff, Zap, Clock, ShieldCheck, Lock, 
  Coffee, Sparkles, PhoneCall, Headphones, Layers 
} from 'lucide-react';
import './FaqSection.css';

interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  category: 'relay' | 'client' | 'accounting' | 'warranty';
  icon: React.ComponentType<{ className?: string }>;
  highlightText: string;
}

const EXTENDED_FAQS: FaqItemData[] = [
  {
    id: 'faq-1',
    question: 'آیا نرم‌افزار دیجی‌گیم در زمان قطع اینترنت به کار خود ادامه می‌دهد؟',
    answer: 'بله، معماری هسته دیجی‌گیم کاملاً آفلاین-فرست (Offline-First) طراحی شده است. کلیه فرایندهای پایگاه داده محلی، صدور فاکتور، محاسبه دقیق زمان‌ها و کنترل قطع و وصل رله‌ها در بستر شبکه محلی (LAN) گیم‌نت بدون کوچک‌ترین وابستگی به اینترنت کار می‌کنند. در صورت برقراری مجدد اینترنت، نسخه پشتیبان رمزنگاری‌شده ابری به صورت خودکار با سرور مرکزی همگام‌سازی می‌شود.',
    category: 'relay',
    icon: WifiOff,
    highlightText: '۱۰۰٪ آفلاین بر بستر شبکه محلی LAN'
  },
  {
    id: 'faq-2',
    question: 'رله سخت‌افزاری هوشمند دیجی‌گیم چگونه کار می‌کند و آیا به تلویزیون یا کنسول آسیب می‌زند؟',
    answer: 'باکس رله صنعتی دیجی‌گیم مجهز به اپتوکوپلرهای نوری ضد نوسان ولتاژ (Zero-Crossing) است. به محض اتمام زمان مجاز یا فرمان مدیر، رله جریان برق مانیتور یا تلویزیون را قطع می‌کند. مدار داخلی رله کاملاً ایزوله بوده و فاقد هرگونه اثر مخرب، شوک ولتاژ یا پارازیت است؛ به طوری که کنسول روشن باقی مانده تا بازی Save شود، اما نمایشگر خاموش می‌شود و امکان بازی رایگان از بین می‌رود.',
    category: 'relay',
    icon: Zap,
    highlightText: 'مدار نوری Zero-Crossing ضد نوسان'
  },
  {
    id: 'faq-3',
    question: 'فرایند نصب و راه‌اندازی نرم‌افزار سرور و کلاینت‌ها چقدر زمان می‌برد؟',
    answer: 'راه‌اندازی کامل نرم‌افزار سرور و کلاینت‌ها معمولاً کمتر از ۴۵ دقیقه زمان می‌برد. تیم پشتیبانی فنی دیجی‌گیم از طریق نرم‌افزار AnyDesk به شکل رایگان صفر تا صد راه‌اندازی، اتصال رله‌ها، معرفی استیشن‌ها، بازی‌ها و تعریف نرخ‌های ساعتی را انجام می‌دهد. همچنین برای مجموعه‌های بزرگ، اعزام نصاب رسمی حضوری در تمام استان‌ها فراهم است.',
    category: 'warranty',
    icon: Clock,
    highlightText: 'راه‌اندازی ۴۵ دقیقه‌ای با AnyDesk یا نصاب حضوری'
  },
  {
    id: 'faq-4',
    question: 'آیا امکان تعریف تعرفه‌های شناور روز، شب، آخر هفته و ساعات خلوتی (Happy Hour) وجود دارد؟',
    answer: 'بله، پیشرفته‌ترین موتور تعرفه‌گذاری گیمینگ در دیجی‌گیم تعبیه شده است. شما می‌توانید برای روزهای عادی، پنج‌شنبه‌ها، جمعه‌ها و ایام تعطیل، یا ساعات صبحگاهی نرخ‌های تخفیف‌دار تعریف کنید. همچنین برای اعضای باشگاه مشتریان بر اساس لول (برنزی، نقره‌ای، طلایی و فاخر) تخفیف‌های درصدی اتوماتیک اعمال می‌گردد.',
    category: 'accounting',
    icon: Layers,
    highlightText: 'تعرفه‌گذاری شناور هوشمند با تقویم تعطیلات'
  },
  {
    id: 'faq-5',
    question: 'کلاینت ویندوز چطور جلوی تقلب، بستن نرم‌افزار یا دستکاری سیستم توسط گیمرها را می‌گیرد؟',
    answer: 'کلاینت ویندوز دیجی‌گیم در لایه عمیق سیستم‌عامل (Kernel Watchdog) اجرا می‌شود. کلیدهای میانبر ویندوز (مانند Alt+Tab، Task Manager، Run، کلید ویندوز و دسترسی به درایوهای ذخیره‌سازی) کاملاً مسدود می‌شوند. هیچ گیمری قادر به دور زدن صفحه قفل یا متوقف کردن فرایند نیست و با پایان تایم، سیستم فوراً به حالت قفل برمی‌گردد.',
    category: 'client',
    icon: Lock,
    highlightText: 'قفل لایه کرنل بدون امکان بای‌پس یا دور زدن'
  },
  {
    id: 'faq-6',
    question: 'سیستم ثبت سفارش آنلاین بوفه و کافه با QR کد چگونه کار می‌کند؟',
    answer: 'روی هر استیشن و میز، یک استند شیک با کد QR اختصاصی قرار می‌گیرد. گیمر با اسکن کد توسط گوشی شخصی، بدون نیاز به نصب هیچ برنامه‌ای، منوی کافه و تنقلات با عکس و قیمت روز را مشاهده کرده و سفارش می‌دهد. سفارش فوراً روی مانیتور بوفه‌دار یا صندوق ظاهر شده و به فاکتور نهایی همان استیشن اضافه می‌گردد.',
    category: 'accounting',
    icon: Coffee,
    highlightText: 'سفارش مستقیم سر میز بدون معطلی و با QR اختصاصی'
  },
  {
    id: 'faq-7',
    question: 'شرایط گارانتی طلایی، پشتیبانی و ضمانت بازگشت وجه به چه صورت است؟',
    answer: 'دیجی‌گیم دارای ۱۴ روز ضمانت بی قید و شرط بازگشت وجه است؛ در صورتی که به هر دلیلی رضایت نداشتید، کل مبلغ لایسنس بازگردانده می‌شود. همچنین بردهای سخت‌افزاری رله صنعتی دارای ۲۴ ماه گارانتی تعویض بی چون و چرا و ۵ سال خدمات پس از فروش و تامین قطعات هستند.',
    category: 'warranty',
    icon: ShieldCheck,
    highlightText: '۱۴ روز ضمانت بازگشت وجه + ۲۴ ماه گارانتی تعویض طلایی'
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'relay' | 'client' | 'accounting' | 'warranty'>('all');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = EXTENDED_FAQS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="faq-cyber-wrapper py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-24">
      {/* Background Ambient Glow & Grid */}
      <div className="faq-ambient-glow" aria-hidden="true" />
      <div className="faq-grid-bg" aria-hidden="true" />

      {/* Header Chip Badge & Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 relative z-10">
        <div className="faq-chip-badge">
          <div className="faq-chip-icon">
            <HelpCircle className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            KNOWLEDGE BASE // 2026 CYBER FAQ
          </span>
          <span className="faq-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="faq-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          سوالات متداول خریداران و مدیران{' '}
          <span className="faq-title-gradient">نرم‌افزار دیجی‌گیم</span>
        </h2>

        <p className="faq-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          پاسخ‌های شفاف و مهندسی به متداول‌ترین ابهامات فنی، امنیتی، کارکرد رله سخت‌افزاری و ضمانت‌های رسمی اکوسیستم دیجی‌گیم.
        </p>
      </div>

      {/* Controls Bar: Search & Category Filters */}
      <div className="faq-controls-bar">
        {/* Live Search Input */}
        <div className="faq-search-wrapper">
          <Search className="w-4 h-4 faq-search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="جستجوی هوشمند در میان سوالات متداول (مثلاً: رله، آفلاین، کلاینت، گارانتی...)"
            className="faq-search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="faq-search-clear"
              aria-label="پاک کردن جستجو"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="faq-filters-row">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`faq-filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>همه پرسش‌ها ({EXTENDED_FAQS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('relay')}
            className={`faq-filter-pill ${selectedCategory === 'relay' ? 'active' : ''}`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>سخت‌افزار رله و قطع برق</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('client')}
            className={`faq-filter-pill ${selectedCategory === 'client' ? 'active' : ''}`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>کلاینت ویندوز و ضدتقلب</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('accounting')}
            className={`faq-filter-pill ${selectedCategory === 'accounting' ? 'active' : ''}`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>حسابداری، دخل و بوفه</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('warranty')}
            className={`faq-filter-pill ${selectedCategory === 'warranty' ? 'active' : ''}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>پشتیبانی و گارانتی طلایی</span>
          </button>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="faq-accordion-list">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(item => {
            const isOpen = openId === item.id;
            const ItemIcon = item.icon;

            return (
              <div
                key={item.id}
                className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                onMouseMove={handleMouseMove}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="faq-trigger-btn"
                  aria-expanded={isOpen}
                >
                  <div className="faq-trigger-content">
                    <div className="faq-topic-icon-wrap">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <span className="faq-question-text">{item.question}</span>
                  </div>

                  <div className="faq-chevron-pod">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-panel">
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                      <div className="faq-answer-highlight-badge">
                        <Sparkles className="w-3 h-3" />
                        <span>{item.highlightText}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            پرسشی متناسب با جستجوی شما یافت نشد. می‌توانید با پشتیبانی ۲۴ ساعته تماس حاصل فرمایید.
          </div>
        )}
      </div>

      {/* Bottom Support Callout Pod */}
      <div className="faq-callout-pod">
        <div className="faq-callout-text-group">
          <div className="faq-callout-icon-box">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="faq-callout-title">پرسش دیگری دارید یا نیاز به مشاوره فنی دارید؟</h4>
            <p className="faq-callout-desc">
              مهندسان فنی و پشتیبانی دیجی‌گیم به صورت ۲۴ ساعته آماده پاسخگویی و ارائه تست رایگان نرم‌افزار هستند.
            </p>
          </div>
        </div>

        <div className="faq-callout-actions">
          <a href="tel:02191004588" className="faq-phone-link">
            <PhoneCall className="w-4 h-4" />
            <span dir="ltr">۰۲۱-۹۱۰۰۴۵۸۸</span>
          </a>
        </div>
      </div>
    </section>
  );
};
