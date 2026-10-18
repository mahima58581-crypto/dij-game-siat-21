import React, { useMemo, useState } from 'react';
import { CheckCircle2, Sparkles, Percent, Calculator, ArrowUpLeft, ShieldCheck } from 'lucide-react';
import './PurchasePage.css';

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  icon: string;
  description: string;
  popular?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'یک‌ماهه',
    duration: '۳۰ روز اعتبار',
    price: 149000,
    icon: '◷',
    description: 'برای شروع و تست نرم‌افزار',
    features: [
      'دسترسی به پنل مدیریت',
      'مدیریت کاربران و سیستم‌ها',
      'گزارش‌گیری از عملکرد',
      'پشتیبانی نرم‌افزار',
    ],
  },
  {
    id: 'six-months',
    name: 'شش‌ماهه',
    duration: '۱۸۰ روز اعتبار',
    price: 699000,
    icon: '⚡',
    popular: true,
    description: 'انتخاب متعادل برای گیم‌نت‌ها',
    features: [
      'تمام امکانات پلن یک‌ماهه',
      'مدیریت بهتر فعالیت مجموعه',
      'گزارش‌های مدیریتی',
      'پشتیبانی نرم‌افزار',
    ],
  },
  {
    id: 'yearly',
    name: 'یک‌ساله',
    duration: '۳۶۵ روز اعتبار',
    price: 1199000,
    icon: '♛',
    description: 'برای استفاده بلندمدت',
    features: [
      'تمام امکانات پلن‌های دیگر',
      'یک سال دسترسی به نرم‌افزار',
      'گزارش‌های مدیریتی',
      'پشتیبانی نرم‌افزار',
    ],
  },
];

const demoPurchases = [
  { name: 'کاربر نمونه', plan: 'شش‌ماهه', time: 'نمونه نمایشی' },
  { name: 'گیمر نمونه', plan: 'یک‌ماهه', time: 'نمونه نمایشی' },
  { name: 'گیم‌نت نمونه', plan: 'یک‌ساله', time: 'نمونه نمایشی' },
];

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

interface PurchasePageProps {
  onBack?: () => void;
}

export const PurchasePage: React.FC<PurchasePageProps> = ({ onBack }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('six-months');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(true);

  const plan = plans.find((item) => item.id === selectedPlanId);

  const discountRate = useMemo(() => {
    if (appliedCoupon === 'DIGI10') return 10;
    if (appliedCoupon === 'DEMO20') return 20;
    return 0;
  }, [appliedCoupon]);

  const discount = Math.round((plan?.price ?? 0) * discountRate / 100);
  const finalPrice = (plan?.price ?? 0) - discount;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (code === 'DIGI10' || code === 'DEMO20') {
      setAppliedCoupon(code);
      setCouponMessage(
        `کد تخفیف با موفقیت اعمال شد؛ ${code === 'DIGI10' ? '۱۰' : '۲۰'}٪ تخفیف`
      );
    } else {
      setAppliedCoupon('');
      setCouponMessage('این کد تخفیف معتبر نیست.');
    }
  }

  function choosePlan(id: string) {
    setSelectedPlanId(id);
    setCoupon('');
    setAppliedCoupon('');
    setCouponMessage('');
  }

  function startCheckout() {
    setCheckoutOpen(true);
  }

  if (!plan) return null;

  return (
    <main className="purchase-page" dir="rtl">
      <div className="purchase-grid-bg" />

      <header className="purchase-hero">
        <div className="purchase-eyebrow">
          <span className="live-dot" />
          DIGI GAME / SUBSCRIPTION CENTER
        </div>

        <h1>
          قدرت مدیریت گیم‌نتت رو
          <span> چند برابر کن!</span>
        </h1>

        <p>
          پلن مناسب خودت رو انتخاب کن، اشتراکت رو تهیه کن
          و با خیال راحت مجموعه‌ات رو مدیریت کن.
        </p>

        <div className="purchase-benefits">
          <span>✦ مدیریت حرفه‌ای</span>
          <span>✦ انتخاب مدت اشتراک</span>
          <span>✦ پشتیبانی نرم‌افزار</span>
        </div>
      </header>

      <section className="pricing-section">
        <div className="purchase-section-heading">
          <div>
            <span className="section-kicker">CHOOSE YOUR PLAN</span>
            <h2>پلن خودت رو انتخاب کن</h2>
            <p>یک اشتراک متناسب با نیاز گیم‌نتت انتخاب کن.</p>
          </div>
          <span className="pricing-badge">سه پلن اشتراک</span>
        </div>

        <div className="pricing-grid">
          {plans.map((item, index) => (
            <article
              key={item.id}
              className={[
                'pricing-card',
                item.popular ? 'popular-plan' : '',
                selectedPlanId === item.id ? 'selected-plan' : '',
              ].join(' ')}
              style={{ '--card-index': index }}
            >
              {item.popular && (
                <div className="popular-ribbon">
                  <span>✦</span> پیشنهاد ویژه
                </div>
              )}

              <div className="plan-icon">{item.icon}</div>
              <h3>پلن {item.name}</h3>
              <p className="plan-description">{item.description}</p>

              <div className="plan-price">
                <strong>{formatPrice(item.price)}</strong>
                <span> / اشتراک</span>
              </div>

              <div className="plan-duration">
                <span>◷</span> {item.duration}
              </div>

              <div className="plan-divider" />

              <ul className="plan-features">
                {item.features.map((feature) => (
                  <li key={feature}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={
                  selectedPlanId === item.id
                    ? 'plan-button active-plan-button'
                    : 'plan-button'
                }
                onClick={() => choosePlan(item.id)}
              >
                {selectedPlanId === item.id
                  ? '✓ پلن انتخاب شده'
                  : 'انتخاب این پلن'}
                <span>←</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="order-layout">
        <div className="order-main">
          <div className="order-heading">
            <span className="section-kicker">YOUR ORDER</span>
            <h2>سفارش خودت رو نهایی کن</h2>
            <p>پلن انتخابی و کد تخفیفت رو بررسی کن.</p>
          </div>

          <div className="coupon-box">
            <div className="coupon-heading">
              <span className="coupon-icon">%</span>
              <div>
                <h3>کد تخفیف داری؟</h3>
                <p>کدت رو وارد کن و تخفیف بگیر.</p>
              </div>
            </div>

            <div className="coupon-input-row">
              <input
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') applyCoupon();
                }}
                placeholder="کد تخفیف را وارد کن"
                aria-label="کد تخفیف"
              />
              <button onClick={applyCoupon}>اعمال کد</button>
            </div>

            {couponMessage && (
              <p
                className={
                  appliedCoupon ? 'coupon-success' : 'coupon-error'
                }
                role="status"
              >
                {couponMessage}
              </p>
            )}

            <p className="coupon-hint">
              کدهای آزمایشی این نسخه: DIGI10 و DEMO20
            </p>
          </div>

          <div className="order-summary">
            <div className="summary-top">
              <div>
                <span className="section-kicker">ORDER SUMMARY</span>
                <h3>خلاصه سفارش</h3>
              </div>
              <span className="summary-lock">◇ امن و شفاف</span>
            </div>

            <div className="summary-plan">
              <div className="summary-plan-icon">◈</div>
              <div>
                <strong>اشتراک {plan.name} دی گی‌یم</strong>
                <p>{plan.duration}</p>
              </div>
              <strong>{formatPrice(plan.price)}</strong>
            </div>

            <div className="summary-line">
              <span>قیمت اشتراک</span>
              <span>{formatPrice(plan.price)}</span>
            </div>

            <div className="summary-line discount-line">
              <span>تخفیف {discountRate ? `(${discountRate}٪)` : ''}</span>
              <span>
                {discount ? `− ${formatPrice(discount)}` : '۰ تومان'}
              </span>
            </div>

            <div className="summary-total">
              <span>مبلغ نهایی</span>
              <strong>{formatPrice(finalPrice)}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={startCheckout}
            >
              ادامه و بررسی سفارش
              <span>←</span>
            </button>

            <p className="checkout-note">
              مبلغ نهایی بعد از تأیید سفارش نمایش داده می‌شود.
            </p>
          </div>
        </div>

        <aside className="purchase-trust">
          <div className="trust-symbol">✦</div>
          <h3>چرا دی گی‌یمه؟</h3>
          <p>
            تجربه مدیریت ساده‌تر، اطلاعات منظم‌تر و امکانات متناسب با
            نیاز گیم‌نت خودت.
          </p>

          <div className="trust-item">
            <span>✓</span>
            <div>
              <strong>شفافیت قیمت</strong>
              <small>مشاهده هزینه قبل از نهایی‌کردن سفارش</small>
            </div>
          </div>

          <div className="trust-item">
            <span>✓</span>
            <div>
              <strong>پلن متناسب با نیاز</strong>
              <small>انتخاب اشتراک با مدت اعتبار دلخواه</small>
            </div>
          </div>

          <div className="trust-item">
            <span>✓</span>
            <div>
              <strong>نسخه دمو</strong>
              <small>امکان معرفی نسخه آزمایشی قبل از خرید</small>
            </div>
          </div>

          <div className="demo-notice">
            <span>ⓘ</span>
            نسخه دمو با اشتراک پولی متفاوت است. شرایط هر پلن را
            قبل از خرید بررسی کن.
          </div>
        </aside>
      </section>

      <section className="purchase-faq">
        <span className="section-kicker">NEED HELP?</span>
        <h2>سؤالات متداول</h2>

        <details>
          <summary>کدام پلن برای گیم‌نت من مناسب است؟</summary>
          <p>
            اگر برای مدت کوتاه می‌خواهی شروع کنی، پلن یک‌ماهه مناسب است.
            برای انتخاب بلندمدت، پلن‌های شش‌ماهه و یک‌ساله را با توجه به
            امکانات و قیمت واقعی مقایسه کن.
          </p>
        </details>

        <details>
          <summary>آیا می‌توانم قبل از خرید نسخه دمو را ببینم؟</summary>
          <p>
            بله؛ لینک نسخه دمو را در این قسمت قرار بده تا مشتری قبل از
            خرید با محیط نرم‌افزار آشنا شود.
          </p>
        </details>

        <details>
          <summary>بعد از پرداخت، اشتراک چطور فعال می‌شود؟</summary>
          <p>
            در نسخه نهایی، پس از تأیید پرداخت در سمت سرور، اشتراک باید
            برای حساب مشتری فعال شود و رسید سفارش در اختیار او قرار بگیرد.
          </p>
        </details>
      </section>

      {activityOpen && (
        <aside className="recent-purchases" aria-label="آخرین خریدها">
          <div className="recent-header">
            <div className="recent-title-icon">↗</div>
            <div className="recent-heading-text">
              <strong>آخرین خریدها</strong>
              <span>پیش‌نمایش نمایشی</span>
            </div>
            <button
              className="recent-close"
              onClick={() => setActivityOpen(false)}
              aria-label="بستن پنجره آخرین خریدها"
            >
              ×
            </button>
          </div>

          <div className="recent-demo-warning">
            این موارد نمونه هستند، نه تراکنش‌های واقعی.
          </div>

          {demoPurchases.map((purchase, index) => (
            <div className="recent-item" key={index}>
              <div className="recent-avatar">
                {purchase.name.slice(0, 1)}
              </div>
              <div className="recent-info">
                <strong>{purchase.name}</strong>
                <span>اشتراک {purchase.plan}</span>
              </div>
              <span className="recent-status">دمو</span>
            </div>
          ))}

          <div className="recent-footer">
            <span className="live-dot" />
            داده‌های نمونه
          </div>
        </aside>
      )}

      {!activityOpen && (
        <button
          className="recent-reopen"
          onClick={() => setActivityOpen(true)}
        >
          ↗ آخرین خریدها
        </button>
      )}

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
            <button
              className="modal-close"
              onClick={() => setCheckoutOpen(false)}
              aria-label="بستن پنجره"
            >
              ×
            </button>

            <div className="modal-symbol">✓</div>
            <span className="section-kicker">ORDER PREVIEW</span>
            <h2 id="checkout-title">سفارش تو آماده بررسیه!</h2>
            <p className="modal-description">
              این فقط پیش‌نمایش سفارش است و هنوز پرداختی انجام نشده.
            </p>

            <div className="modal-plan">
              <span>پلن انتخابی</span>
              <strong>{plan.name}</strong>
            </div>
            <div className="modal-plan">
              <span>کد تخفیف</span>
              <strong>{appliedCoupon || 'بدون تخفیف'}</strong>
            </div>
            <div className="modal-total">
              <span>مبلغ قابل پرداخت</span>
              <strong>{formatPrice(finalPrice)}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() => setCheckoutOpen(false)}
            >
              بازگشت به صفحه خرید
            </button>
            <p className="checkout-note">
              برای پرداخت واقعی، اتصال بک‌اند و درگاه پرداخت لازم است.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};
