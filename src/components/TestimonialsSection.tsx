import React, { useState, useEffect } from 'react';
import { 
  Star, Quote, Building2, Sparkles, Plus, 
  CheckCircle2, Gamepad2, Monitor, 
  Crown, X, Send, ShieldCheck, TrendingUp, Users 
} from 'lucide-react';
import './TestimonialsSection.css';

interface TestimonialItem {
  id: string;
  name: string;
  club: string;
  city: string;
  stations: string;
  quote: string;
  rating: number;
  avatarColor: string;
  highlightText: string;
  category: 'vip' | 'ps5' | 'pc';
  isVip: boolean;
  memberSince: string;
  isUserSubmitted?: boolean;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'مهندس آرش کریمی',
    club: 'مجموعه گیمینگ اکسیر',
    city: 'تهران (سعادت‌آباد)',
    stations: '۳۶ استیشن (PS5 + PC گیمینگ)',
    quote: 'قبل از دیجی‌گیم ماهانه حداقل ۱۰ تا ۱۵ میلیون تومن به خاطر خطای پرسنل در یادداشت زمان و بازی بدون فاکتور هدر می‌رفت. با رله سخت‌افزاری هوشمند، تلویزیون دقیقا سر ثانیه خاموش میشه و درآمدمون ۳۵٪ رشد خالص داشته است.',
    rating: 5,
    avatarColor: 'from-emerald-500 to-teal-700',
    highlightText: '۳۵٪ رشد درآمد خالص',
    category: 'vip',
    isVip: true,
    memberSince: 'مشتری از سال ۱۴۰۱'
  },
  {
    id: 't-2',
    name: 'امیررضا شایان',
    club: 'گیم‌نت VIP پارادوکس',
    city: 'اصفهان (مرداویج)',
    stations: '۲۲ سیستم گیمینگ + استیج VR',
    quote: 'کلاینت ویندوز دیجی‌گیم فوق‌العاده است؛ گیمرها دیگر دسترسی به ویندوز یا دستکاری فایل‌های بازی ندارند. سیستم بوفه آنلاین با QR کد هم فروش ردبول و نوشیدنی‌های ما را ۳ برابر کرده است.',
    rating: 5,
    avatarColor: 'from-blue-600 to-indigo-800',
    highlightText: '۳ برابر شدن فروش بوفه',
    category: 'pc',
    isVip: true,
    memberSince: 'مشتری از سال ۱۴۰۲'
  },
  {
    id: 't-3',
    name: 'حسین دادخواه',
    club: 'گیم‌کلوب سنترال',
    city: 'مشهد (بلوار سجاد)',
    stations: '۲۸ کنسول PS5 و Xbox Series X',
    quote: 'پشتیبانی ۲۴ ساعته دیجی‌گیم بی‌نظیره؛ یکبار ساعت ۲ نصفه شب وسط تورنمنت بزرگ فیفا مشکلی در روتر پیش آمد و با یک تیکت در کمتر از ۳ دقیقه برطرف شد. امنیت و آرامش خاطری که میده بی‌قیمته.',
    rating: 5,
    avatarColor: 'from-emerald-600 to-cyan-700',
    highlightText: 'پشتیبانی زیر ۳ دقیقه',
    category: 'ps5',
    isVip: true,
    memberSince: 'مشتری از سال ۱۴۰۰'
  },
  {
    id: 't-5',
    name: 'مهندس وحید سالاری',
    club: 'کلوپ بازی آدرنالین VIP',
    city: 'تبریز (ولیعصر)',
    stations: '۱۸ کنسول PS5 + سیمولاتور رانندگی',
    quote: 'دستگاه‌های رله برق صنعتی بعد از ۲ سال حتی یکبار هم هنگ یا داغ نکرده‌اند. گارانتی ۲۴ ماهه و کنترل از راه دور دخل گیم‌نت وقتی سفر هستم بهترین امکانیه که یک مدیر می‌تونه بخواد.',
    rating: 5,
    avatarColor: 'from-amber-500 to-rose-700',
    highlightText: 'کنترل ریموت دخل و برق',
    category: 'vip',
    isVip: true,
    memberSince: 'مشتری از سال ۱۴۰۱'
  },
  {
    id: 't-6',
    name: 'نوید ابراهیمی',
    club: 'گیم‌لند خلیج فارس',
    city: 'رشت (گلسار)',
    stations: '۲۴ استیشن ترکیبی PS5 و PC',
    quote: 'نصب و تحویل اولیه در کمتر از ۴۰ دقیقه با AnyDesk انجام شد. آموزش‌ها و مستندات ویدئویی به پرسنل جدید هم کار ما رو خیلی راحت کرده؛ پرسنل بدون نیاز به آموزش طولانی کار با نرم‌افزار رو یاد گرفتن.',
    rating: 5,
    avatarColor: 'from-teal-600 to-emerald-800',
    highlightText: 'راه‌اندازی فوری ۴۰ دقیقه‌ای',
    category: 'ps5',
    isVip: false,
    memberSince: 'مشتری از سال ۱۴۰۳'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'vip' | 'ps5' | 'pc' | 'user'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formClub, setFormClub] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formStations, setFormStations] = useState('');
  const [formCategory, setFormCategory] = useState<'vip' | 'ps5' | 'pc'>('vip');
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formQuote, setFormQuote] = useState('');
  const [formHighlight, setFormHighlight] = useState('');

  // Load user saved reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('digigame_user_reviews');
      if (saved) {
        const parsed: TestimonialItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTestimonials([...parsed, ...INITIAL_TESTIMONIALS]);
        }
      }
    } catch {
      // ignore JSON errors
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setShowSuccessToast(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formClub.trim() || !formQuote.trim()) {
      alert('لطفاً نام، نام مجموعه و متن نظر را وارد فرمایید.');
      return;
    }

    const newReview: TestimonialItem = {
      id: `user-rev-${Date.now()}`,
      name: formName.trim(),
      club: formClub.trim(),
      city: formCity.trim() || 'سراسر ایران',
      stations: formStations.trim() || 'استیشن‌های گیمینگ',
      quote: formQuote.trim(),
      rating: formRating,
      avatarColor: 'from-emerald-500 to-cyan-600',
      highlightText: formHighlight.trim() || 'تجربه همکاری ثبت‌شده',
      category: formCategory,
      isVip: formCategory === 'vip',
      memberSince: 'تازه ثبت شده • تایید شده',
      isUserSubmitted: true
    };

    const updated = [newReview, ...testimonials];
    setTestimonials(updated);

    // Save to local storage
    try {
      const existingUserReviews = updated.filter(item => item.isUserSubmitted);
      localStorage.setItem('digigame_user_reviews', JSON.stringify(existingUserReviews));
    } catch {
      // ignore
    }

    // Reset Form
    setFormName('');
    setFormClub('');
    setFormCity('');
    setFormStations('');
    setFormQuote('');
    setFormHighlight('');
    setFormRating(5);
    setIsModalOpen(false);
    setShowSuccessToast(true);
    setActiveFilter('all');

    // Auto dismiss toast after 6s
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  // Filtered Testimonials
  const filteredTestimonials = testimonials.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'vip') return item.isVip || item.category === 'vip';
    if (activeFilter === 'ps5') return item.category === 'ps5';
    if (activeFilter === 'pc') return item.category === 'pc';
    if (activeFilter === 'user') return item.isUserSubmitted === true;
    return true;
  });

  return (
    <section id="testimonials" className="testimonials-cyber-wrapper py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background Ambient Glow & Grid */}
      <div className="testimonials-ambient-glow" aria-hidden="true" />
      <div className="testimonials-grid-bg" aria-hidden="true" />

      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 relative z-10">
        <div className="testimonials-chip-badge">
          <div className="testimonials-chip-icon">
            <Quote className="w-3.5 h-3.5 text-[#39ff78]" />
          </div>
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-emerald-400">
            AUTHENTIC GAMING CENTER REVIEWS // 2026
          </span>
          <span className="testimonials-chip-radar" aria-hidden="true" />
        </div>

        <h2 className="testimonials-section-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight section-glow-text">
          صدای مدیران و خریداران معتبر{' '}
          <span className="testimonials-title-gradient">دیجی‌گیم در سراسر ایران</span>
        </h2>

        <p className="testimonials-subtitle text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          ببینید همکاران شما در گیم‌نت‌ها و کلوپ‌های بزرگ کشور چطور با سیستم مدیریت و رله‌های صنعتی دیجی‌گیم، جلوی هدررفت زمان و نشتی مالی را گرفته و درآمد خالص خود را متحول کرده‌اند.
        </p>
      </div>

      {/* Success Notification Banner */}
      {showSuccessToast && (
        <div className="review-success-banner max-w-3xl mx-auto">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>نظر و تجربه شما با موفقیت ثبت شد و در کارت‌های زیر به نمایش درآمد! سپاس از همراهی شما با خانواده دیجی‌گیم.</span>
        </div>
      )}

      {/* Telemetry Stats & Action Bar */}
      <div className="testimonials-telemetry-bar">
        <div className="testimonials-stats-group">
          {/* Stat 1 */}
          <div className="testimonials-stat-item">
            <div className="testimonials-stat-icon-wrap">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="testimonials-stat-val">۴.۹ / ۵.۰</div>
              <div className="testimonials-stat-label">رضایت کامل مدیران</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="testimonials-stat-item">
            <div className="testimonials-stat-icon-wrap">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="testimonials-stat-val">+۴۵۰ گیم‌نت</div>
              <div className="testimonials-stat-label">مجموعه فعال در کشور</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="testimonials-stat-item">
            <div className="testimonials-stat-icon-wrap">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="testimonials-stat-val">+۳۸٪</div>
              <div className="testimonials-stat-label">افزایش متوسط سود خالص</div>
            </div>
          </div>
        </div>

        {/* Action Button: Submit Review */}
        <button
          type="button"
          onClick={handleOpenModal}
          className="submit-review-btn"
          aria-label="ثبت نظر یا تجربه کاری جدید"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت نظر و تجربه کاری شما</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="testimonials-filters-row">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`testimonial-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>همه نظرات ({testimonials.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('vip')}
          className={`testimonial-filter-pill ${activeFilter === 'vip' ? 'active' : ''}`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>کلوپ‌های VIP و بزرگ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('ps5')}
          className={`testimonial-filter-pill ${activeFilter === 'ps5' ? 'active' : ''}`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>کنسول‌های PS5 و Xbox</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('pc')}
          className={`testimonial-filter-pill ${activeFilter === 'pc' ? 'active' : ''}`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>مراکز سیستم‌های گیمینگ PC</span>
        </button>

        {testimonials.some(t => t.isUserSubmitted) && (
          <button
            type="button"
            onClick={() => setActiveFilter('user')}
            className={`testimonial-filter-pill ${activeFilter === 'user' ? 'active' : ''}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>نظرات ثبت‌شده شما ({testimonials.filter(t => t.isUserSubmitted).length})</span>
          </button>
        )}
      </div>

      {/* Testimonials Cards Grid */}
      <div className="testimonials-grid">
        {filteredTestimonials.map(t => (
          <div
            key={t.id}
            className={`testimonial-cyber-card ${t.isUserSubmitted ? 'is-user-created' : ''}`}
            onMouseMove={handleMouseMove}
          >
            {/* Top Laser Beam */}
            <span className="testimonial-top-beam" aria-hidden="true" />

            {/* Card Header */}
            <div className="testimonial-card-header">
              <div className="testimonial-author-group">
                <div className={`testimonial-avatar-pod bg-gradient-to-br ${t.avatarColor}`}>
                  {t.isVip ? (
                    <Crown className="w-4 h-4 text-amber-300" />
                  ) : (
                    <span>{t.name.split(' ')[0]?.slice(0, 2) || 'VIP'}</span>
                  )}
                </div>

                <div className="testimonial-author-info">
                  <div className="testimonial-author-name">
                    <span>{t.name}</span>
                    <span className="testimonial-verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      <span>تایید شده</span>
                    </span>
                  </div>

                  <div className="testimonial-club-line">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[170px]">{t.club}</span>
                  </div>

                </div>
              </div>

              {/* Star Rating Pod */}
              <div className="testimonial-rating-pod">
                <div className="testimonial-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-700 text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="testimonial-rating-num">{t.rating}.۰</span>
              </div>
            </div>

            {/* Card Body / Quote Text */}
            <div className="testimonial-quote-box">
              <Quote className="w-8 h-8 testimonial-quote-watermark" aria-hidden="true" />
              <p className="testimonial-quote-text">
                «{t.quote}»
              </p>
            </div>

            {/* Card Footer */}
            <div className="testimonial-card-footer justify-end">
              <span className="testimonial-date-tag">
                {t.memberSince}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ===================================================
          MODAL: SUBMIT REVIEW & FEEDBACK
          =================================================== */}
      {isModalOpen && (
        <div 
          className="review-modal-backdrop"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="review-modal-chassis"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Beam */}
            <span className="testimonial-top-beam" aria-hidden="true" />

            {/* Close Button */}
            <button
              type="button"
              className="review-modal-close-btn"
              onClick={handleCloseModal}
              aria-label="بستن پنجره"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="review-modal-header">
              <h3 className="review-modal-title">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>ثبت نظر و تجربه کاری شما در دیجی‌گیم</span>
              </h3>
              <p className="review-modal-desc">
                تجربه شما به عنوان مدیر یا فعال گیمینگ برای ما و صدها همکار دیگر در سراسر کشور ارزشمند است.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitReview} className="review-modal-form">
              {/* Name & Club Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group-cyber">
                  <label className="form-label-cyber">نام و نام خانوادگی / سمت *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: مهندس رضایی (مدیر مجموعه)"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="form-input-cyber"
                  />
                </div>

                <div className="form-group-cyber">
                  <label className="form-label-cyber">نام گیم‌نت یا مرکز بازی *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: کلوپ گیمینگ آرنا VIP"
                    value={formClub}
                    onChange={e => setFormClub(e.target.value)}
                    className="form-input-cyber"
                  />
                </div>
              </div>

              {/* City & Stations Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group-cyber">
                  <label className="form-label-cyber">شهر یا منطقه</label>
                  <input
                    type="text"
                    placeholder="مثلاً: تهران، سعادت‌آباد"
                    value={formCity}
                    onChange={e => setFormCity(e.target.value)}
                    className="form-input-cyber"
                  />
                </div>

                <div className="form-group-cyber">
                  <label className="form-label-cyber">تعداد استیشن‌ها و نوع تجهیزات</label>
                  <input
                    type="text"
                    placeholder="مثلاً: ۲۰ دستگاه PS5 + ۱۰ سیستم PC"
                    value={formStations}
                    onChange={e => setFormStations(e.target.value)}
                    className="form-input-cyber"
                  />
                </div>
              </div>

              {/* Category & Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="form-group-cyber">
                  <label className="form-label-cyber">دسته‌بندی مجموعه شما</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as 'vip' | 'ps5' | 'pc')}
                    className="form-select-cyber"
                  >
                    <option value="vip">کلوپ VIP و بزرگ (+۲۵ استیشن)</option>
                    <option value="ps5">مرکز تخصصی کنسول (PS5 / Xbox)</option>
                    <option value="pc">مرکز تخصصی سیستم و PC گیمینگ</option>
                  </select>
                </div>

                <div className="form-group-cyber">
                  <label className="form-label-cyber">امتیاز شما به دیجی‌گیم ({formRating} از ۵)</label>
                  <div className="star-picker-row">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        className="star-btn"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormRating(star)}
                        aria-label={`امتیاز ${star} ستاره`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (hoverRating || formRating) >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlight Tag */}
              <div className="form-group-cyber">
                <label className="form-label-cyber">مهم‌ترین مزیت دیجی‌گیم از نظر شما (کپسول برجسته)</label>
                <input
                  type="text"
                  placeholder="مثلاً: قطع دقیق برق با رله، جلوگیری کامل از بازی بدون فاکتور، پشتیبانی عالی"
                  value={formHighlight}
                  onChange={e => setFormHighlight(e.target.value)}
                  className="form-input-cyber"
                />
              </div>

              {/* Review Text */}
              <div className="form-group-cyber">
                <label className="form-label-cyber">متن نظر و تجربه کاری شما *</label>
                <textarea
                  required
                  placeholder="تجربه خود را از نحوه راه‌اندازی، رله سخت‌افزاری، درآمدزایی یا ارتباط با تیم دیجی‌گیم بنویسید..."
                  value={formQuote}
                  onChange={e => setFormQuote(e.target.value)}
                  className="form-textarea-cyber"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="review-submit-action-btn"
              >
                <Send className="w-4 h-4" />
                <span>ثبت و انتشار تجربه همکاری</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
