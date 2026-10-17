import { PartnerGameClub, Installer, BlogArticle, TutorialVideo, StaffMember, GamerProfile } from '../types';

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  lifetimePrice: number;
  maxStations: string;
  features: string[];
  relayHardwareIncluded: boolean;
  popular?: boolean;
}

export const PRICING_PLANS: Plan[] = [
  {
    id: 'silver',
    name: 'پلن نقره‌ای (۱ ماهه)',
    tagline: 'مناسب کلوپ‌های بازی نوپا و تست اولیه سامانه',
    monthlyPrice: 890000,
    yearlyPrice: 8900000,
    lifetimePrice: 890000,
    maxStations: 'تا ۸ استیشن (کنسول یا PC)',
    features: [
      'محاسبه ثانیه‌ای و دقیق زمان بازی',
      'مدیریت پایه‌ای بوفه و فاکتور فروش',
      'سیستم ثبت نام مشتریان و تلفن همراه',
      'گزارش‌گیری روزانه دخل صندوق',
      'پشتیبانی آنلاین و ریموت دسکتاپ',
      'کارکرد آفلاین ۱۰۰٪ بدون نیاز به اینترنت'
    ],
    relayHardwareIncluded: false,
    popular: false
  },
  {
    id: 'gold',
    name: 'پلن طلایی (۶ ماهه - پرفروش)',
    tagline: 'انتخاب اول بیش از ۸۰٪ مدیران گیم‌نت‌های حرفه‌ای',
    badge: 'پیشنهاد ویژه VIP',
    monthlyPrice: 4500000,
    yearlyPrice: 15900000,
    lifetimePrice: 4500000,
    maxStations: 'تا ۲۴ استیشن بازی همزمان',
    features: [
      'تمامی امکانات پیشرفته مدیریت گیم‌نت',
      'اتصال مستقیم به سخت‌افزار رله هوشمند برق دیجی‌گیم',
      'قطع خودکار برق تلویزیون/کنسول سر ثانیه اتمام شارژ',
      'هشدار صوتی هوشمند ۱۰ دقیقه مانده به اتمام بازی',
      'رمز عبور اختصاصی مالک برای مشاهده دخل و صندوق',
      'پایش زنده پینگ و سرعت اینترنت کلاینت‌ها',
      'سفارش‌گیری بوفه با اسکن QR از روی گوشی گیمر',
      'سطوح و لول‌های گیمر (برنزی، نقره‌ای، طلایی، فاخر)',
      'سیستم حضور و غیاب، تاخیر و اضافه کاری پرسنل',
      'ماشین حساب سریع تسویه حساب و دنگی چند نفره',
      'دستگاه رله هوشمند ۸ کاناله همراه بسته هدیه',
      'پشتیبانی VIP اختصاصی تلفنی ۲۴/۷'
    ],
    relayHardwareIncluded: true,
    popular: true
  },
  {
    id: 'diamond',
    name: 'پلن الماس VIP (۱ ساله)',
    tagline: 'مخصوص گیم‌سنترهای بزرگ و سالن‌های ممتاز',
    badge: 'جامع‌ترین پکیج',
    monthlyPrice: 7900000,
    yearlyPrice: 28900000,
    lifetimePrice: 7900000,
    maxStations: 'نامحدود (کنسول، PC گیمینگ، VR)',
    features: [
      'تمامی امکانات پلن طلایی بدون محدودیت ایستگاه',
      'پشتیبانی از چندین شعبه با داشبورد یکپارچه ابری',
      'سفارشی‌سازی ظاهر نرم‌افزار با لوگو و برند گیم‌نت شما',
      'سیستم برگزاری تورنمنت حرفه‌ای (فیفا، FC و کانتر)',
      'سفارش‌گیری مستقیم بوفه از مانیتور گیمر بدون مراجعه',
      'اتصال به کارت‌خوان بانکی (POS) جهت تسویه اتوماتیک',
      '۲ عدد باکس رله هوشمند ۱۶ کاناله صنعتی با ۲ سال گارانتی',
      'نصب حضوری و آموزش پرسنل توسط کارشناس ارشد'
    ],
    relayHardwareIncluded: true,
    popular: false
  }
];

export const PARTNER_CLUBS: PartnerGameClub[] = [
  {
    id: 'c-1',
    name: 'مجموعه گیمینگ VIP پارادوکس',
    city: 'تهران',
    address: 'سعادت‌آباد، میدان کاج، مجتمع تجاری سرو، طبقه منفی ۱',
    consolesCount: 18,
    pcCount: 24,
    rating: 4.9,
    isVip: true,
    phone: '۰۲۱-۲۲۰۸۹۱۰۰',
    image: '/src/assets/images/vip_game_lounge_1791986035907.jpg'
  },
  {
    id: 'c-2',
    name: 'کلوپ بازی سایبر سنترال',
    city: 'اصفهان',
    address: 'خیابان مرداویج، کوچه رسالت، پلاک ۱۴',
    consolesCount: 14,
    pcCount: 16,
    rating: 4.8,
    isVip: true,
    phone: '۰۳۱-۳۶۶۴۱۲۰۹',
    image: '/src/assets/images/vip_game_lounge_1791986035907.jpg'
  },
  {
    id: 'c-3',
    name: 'گیم‌لند مدرن المپیک',
    city: 'مشهد',
    address: 'بلوار سجاد، خیابان بهار، نبش بهار ۹',
    consolesCount: 22,
    pcCount: 30,
    rating: 4.9,
    isVip: true,
    phone: '۰۵۱-۳۷۶۴۹۰۸۰',
    image: '/src/assets/images/vip_game_lounge_1791986035907.jpg'
  },
  {
    id: 'c-4',
    name: 'مجموعه گیمینگ نایت‌استار',
    city: 'شیراز',
    address: 'معالی‌آباد، روبروی پارک ملت، مجتمع آفتاب فارس',
    consolesCount: 12,
    pcCount: 18,
    rating: 4.7,
    isVip: false,
    phone: '۰۷۱-۳۶۳۴۱۱۲۲',
    image: '/src/assets/images/vip_game_lounge_1791986035907.jpg'
  },
  {
    id: 'c-5',
    name: 'کلوپ پرشین گیمرز',
    city: 'تبریز',
    address: 'ولیعصر، خیابان پروین اعتصامی، روبروی پارک',
    consolesCount: 10,
    pcCount: 14,
    rating: 4.8,
    isVip: false,
    phone: '۰۴۱-۳۳۳۱۸۸۹۰',
    image: '/src/assets/images/vip_game_lounge_1791986035907.jpg'
  },
  {
    id: 'c-6',
    name: 'گیم‌نت VIP آدرنالین',
    city: 'کرج',
    address: 'گوهردشت، فلکه اول، جنب پاساژ نیکامال',
    consolesCount: 16,
    pcCount: 20,
    rating: 4.9,
    isVip: true,
    phone: '۰۲۶-۳۴۴۸۱۲۸۰',
    image: '/src/assets/images/vip_game_lounge_1791986035907.jpg'
  }
];

export const INSTALLERS: Installer[] = [
  {
    id: 'inst-1',
    name: 'مهندس محمدرضا کاظمی',
    city: 'تهران و حومه (کرج، شهریار، پردیس)',
    experienceYears: 6,
    projectsCompleted: 88,
    phone: '۰۹۱۲۳۴۵۶۷۸۱',
    rating: 4.9,
    certifiedRelay: true,
    status: 'available'
  },
  {
    id: 'inst-2',
    name: 'مهندس علیرضا سلیمانی',
    city: 'اصفهان، کاشان و شاهین‌شهر',
    experienceYears: 5,
    projectsCompleted: 62,
    phone: '۰۹۱۳۴۵۶۷۸۹۲',
    rating: 5.0,
    certifiedRelay: true,
    status: 'available'
  },
  {
    id: 'inst-3',
    name: 'مهندس سعید رضایی',
    city: 'خراسان رضوی (مشهد، نیشابور، سبزوار)',
    experienceYears: 7,
    projectsCompleted: 95,
    phone: '۰۹۱۵۱۲۳۴۵۶۷',
    rating: 4.8,
    certifiedRelay: true,
    status: 'available'
  },
  {
    id: 'inst-4',
    name: 'مهندس نوید زارع',
    city: 'فارس (شیراز، مرودشت، جهرم)',
    experienceYears: 4,
    projectsCompleted: 48,
    phone: '۰۹۱۷۱۱۱۴۴۵۵',
    rating: 4.9,
    certifiedRelay: true,
    status: 'busy'
  },
  {
    id: 'inst-5',
    name: 'مهندس بابک رحیمی',
    city: 'آذربایجان شرقی و غربی (تبریز، ارومیه)',
    experienceYears: 5,
    projectsCompleted: 54,
    phone: '۰۹۱۴۲۲۲۳۳۴۴',
    rating: 4.8,
    certifiedRelay: true,
    status: 'available'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'b-1',
    title: 'چگونه درآمد بوفه گیم‌نت را با منوی آنلاین QR تا ۳۰۰٪ افزایش دهیم؟',
    summary: 'بررسی راهکارهای افزایش سفارش نوشابه، ردبول و اسنک از روی سیستم گیمر بدون نیاز به صدا زدن مکرر اپراتور صندوق.',
    category: 'افزایش درآمد',
    readTime: '۵ دقیقه',
    date: '۲۲ مهر ۱۴۰۵',
    views: 2450
  },
  {
    id: 'b-2',
    title: 'آموزش پیکربندی شبکه محلی (LAN) بدون پینگ و لگ برای مسابقات کانتر و کالاف',
    summary: 'تنظیمات روتر میکروتیک، سوییچ‌های گیگابیتی و تفکیک ترافیک استیشن‌های بازی از دانلود کلاینت‌ها.',
    category: 'شبکه و زیرساخت',
    readTime: '۸ دقیقه',
    date: '۱۵ مهر ۱۴۰۵',
    views: 3890
  },
  {
    id: 'b-3',
    title: 'چرا قطع خودکار برق با رله سخت‌افزاری حیاتی‌ترین بخش هر گیم‌نت VIP است؟',
    summary: 'مقایسه نشتی مالی ناشی از چند دقیقه بازی اضافه در سیستم‌های سنتی در برابر قطع میلی‌ثانیه‌ای با رله هوشمند دیجی‌گیم.',
    category: 'سخت‌افزار رله',
    readTime: '۶ دقیقه',
    date: '۰۸ مهر ۱۴۰۵',
    views: 4120
  },
  {
    id: 'b-4',
    title: 'راهنمای لول‌بندی و سطوح هیجان‌انگیز مشتریان (برنزی، نقره‌ای، طلایی و فاخر)',
    summary: 'چطور گیمیفیکیشن و کش‌بک باعث می‌شود مشتریان وفادار هفته‌ای ۴ روز در کلوپ شما وقت بگذرانند.',
    category: 'باشگاه مشتریان',
    readTime: '۷ دقیقه',
    date: '۰۱ مهر ۱۴۰۵',
    views: 1980
  }
];

export const TUTORIALS: TutorialVideo[] = [
  {
    id: 'tut-1',
    title: 'راهنمای گام‌به‌گام اتصال باکس رله هوشمند به تلویزیون‌های PS5 و مانیتورها',
    duration: '۱۲:۴۵',
    category: 'راه‌اندازی سخت‌افزار',
    level: 'مقدماتی',
    stepsCount: 5
  },
  {
    id: 'tut-2',
    title: 'آموزش تعریف تعرفه‌های شناور روز، شب و روزهای تعطیل در سرور دیجی‌گیم',
    duration: '۰۸:۲۰',
    category: 'حسابداری و مالی',
    level: 'مقدماتی',
    stepsCount: 4
  },
  {
    id: 'tut-3',
    title: 'آموزش قفل امنیتی کلاینت ویندوز و ساخت لانچر گرافیکی بازی‌های PC',
    duration: '۱۵:۱۰',
    category: 'کلاینت ویندوز',
    level: 'متوسط',
    stepsCount: 6
  },
  {
    id: 'tut-4',
    title: 'نحوه راه‌اندازی منوی سفارش بوفه با QR کد اختصاصی هر میز',
    duration: '۰۶:۵۰',
    category: 'بوفه و انبارداری',
    level: 'مقدماتی',
    stepsCount: 3
  },
  {
    id: 'tut-5',
    title: 'مدیریت شیفت پرسنل، لاگ‌های امنیتی ضدسرقت و پنهان‌سازی دخل با رمز مالک',
    duration: '۱۱:۱۵',
    category: 'امنیت و پرسنل',
    level: 'پیشرفته',
    stepsCount: 5
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf-1',
    name: 'علی باقری',
    role: 'اپراتور شیفت صبح (۸ الی ۱۶)',
    phone: '۰۹۱۲۸۸۸۹۹۰۰',
    clockInTime: '۰۸:۰۴',
    status: 'present',
    delayMinutes: 4,
    overtimeHours: 0.5,
    shiftHours: 8,
    hourlySalary: 45000
  },
  {
    id: 'stf-2',
    name: 'کامران محمدی',
    role: 'اپراتور شیفت عصر و شب (۱۶ الی ۲۴)',
    phone: '۰۹۳۵۷۷۷۶۶۵۵',
    clockInTime: '۱۶:۲۵',
    status: 'delayed',
    delayMinutes: 25,
    overtimeHours: 1.5,
    shiftHours: 8,
    hourlySalary: 55000
  },
  {
    id: 'stf-3',
    name: 'مهدی خسروی',
    role: 'مسئول بوفه و کافه گیم‌نت',
    phone: '۰۹۱۹۳۳۳۲۲۱۱',
    clockInTime: '۱۰:۰۰',
    status: 'present',
    delayMinutes: 0,
    overtimeHours: 0,
    shiftHours: 10,
    hourlySalary: 40000
  }
];

export const INITIAL_GAMERS: GamerProfile[] = [
  {
    id: 'g-1',
    name: 'کیان رادمنش',
    phone: '۰۹۱۲۱۱۱۴۴۵۵',
    tier: 'fakher',
    xp: 8450,
    balance: 480000,
    totalHoursPlayed: 142,
    discountPercentage: 20,
    avatar: '👑'
  },
  {
    id: 'g-2',
    name: 'امیرحسین صدر',
    phone: '۰۹۳۵۴۴۴۳۳۲۲',
    tier: 'gold',
    xp: 5200,
    balance: 210000,
    totalHoursPlayed: 88,
    discountPercentage: 15,
    avatar: '🥇'
  },
  {
    id: 'g-3',
    name: 'بردیا تهرانی',
    phone: '۰۹۱۸۹۹۹۷۷۶۶',
    tier: 'silver',
    xp: 2900,
    balance: 95000,
    totalHoursPlayed: 45,
    discountPercentage: 10,
    avatar: '🥈'
  },
  {
    id: 'g-4',
    name: 'سینا پاشا',
    phone: '۰۹۱۲۷۷۷۶۶۳۳',
    tier: 'bronze',
    xp: 850,
    balance: 30000,
    totalHoursPlayed: 14,
    discountPercentage: 5,
    avatar: '🥉'
  }
];

export const TIER_CONFIG = {
  bronze: {
    name: 'مشتری برنزی',
    color: 'from-amber-700 to-amber-900',
    border: 'border-amber-700/50',
    text: 'text-amber-500',
    badge: '🥉 برنزی (سطح ۱)',
    discount: '۵٪ تخفیف ساعت بازی',
    xpRequired: '۰ تا ۱,۵۰۰ امتیاز'
  },
  silver: {
    name: 'مشتری نقره‌ای',
    color: 'from-slate-400 to-slate-600',
    border: 'border-slate-400/50',
    text: 'text-slate-300',
    badge: '🥈 نقره‌ای (سطح ۲)',
    discount: '۱۰٪ تخفیف + رزرو بدون بیعانه',
    xpRequired: '۱,۵۰۰ تا ۴,۰۰۰ امتیاز'
  },
  gold: {
    name: 'مشتری طلایی',
    color: 'from-yellow-400 to-amber-600',
    border: 'border-yellow-400/60',
    text: 'text-yellow-400',
    badge: '🥇 طلایی (سطح ۳)',
    discount: '۱۵٪ تخفیف + یک ردبول رایگان در ماه',
    xpRequired: '۴,۰۰۰ تا ۷,۵۰۰ امتیاز'
  },
  fakher: {
    name: 'مشتری فاخر و VIP ویژه',
    color: 'from-emerald-400 via-teal-500 to-cyan-600',
    border: 'border-emerald-400',
    text: 'text-emerald-400',
    badge: '👑 فاخر VIP (الماس)',
    discount: '۲۰٪ تخفیف دائمی + اولویت رزرو اتاق اختصاصی + بوفه رایگان هفتگی',
    xpRequired: 'بیش از ۷,۵۰۰ امتیاز'
  }
};

export const TESTIMONIALS = [
  {
    name: 'مهندس آرش کریمی',
    club: 'مجموعه گیمینگ اکسیر (شعبه سعادت‌آباد تهران)',
    stations: '۳۶ استیشن (PS5 + PC)',
    quote: 'قبل از دیجی‌گیم ماهانه حداقل ۱۰ تا ۱۵ میلیون تومن به خاطر خطای پرسنل در یادداشت زمان و بازی بدون فاکتور هدر می‌رفت. با رله هوشمند دیجی‌گیم، تلویزیون دقیقا سر ثانیه خاموش میشه و درآمدمون ۳۵٪ رشد خالص داشت.',
    rating: 5,
    avatarColor: 'from-emerald-500 to-teal-700'
  },
  {
    name: 'امیررضا شایان',
    club: 'گیم‌نت VIP پارادوکس (اصفهان، مرداویج)',
    stations: '۲۲ سیستم گیمینگ + اتاق VR',
    quote: 'کلاینت ویندوز دیجی‌گیم عالیه؛ بچه‌ها دیگه نمیتونن دسترسی ویندوز رو دور بزنن یا بازی‌ها رو دستکاری کنن. از طرفی سیستم بوفه آنلاین باعث شد سفارش‌های چیپس و نوشابه و ردبول ۳ برابر بشه.',
    rating: 5,
    avatarColor: 'from-blue-600 to-indigo-800'
  },
  {
    name: 'حسین دادخواه',
    club: 'گیم‌کلوب سنترال (مشهد، بلوار سجاد)',
    stations: '۲۸ کنسول PS5 و Xbox',
    quote: 'پشتیبانی ۲۴ ساعته‌شون واقعا شوخی نیست؛ یکبار ساعت ۲ نصفه شب وسط تورنمنت با یک تیکت در کمتر از ۳ دقیقه برامون مشکل شبکه محلی رو رفع کردن. تا الان بیش از ۳ سال هست مشتری ثابتشونم.',
    rating: 5,
    avatarColor: 'from-emerald-600 to-cyan-700'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'آیا نرم‌افزار دیجی‌گیم در زمان قطع اینترنت کار می‌کند؟',
    answer: 'بله، معماری دیجی‌گیم کاملاً آفلاین-فرست (Offline-First) طراحی شده است. تمام دیتابیس، کنترل رله‌ها، محاسبه زمان‌ها و ثبت سفارشات در بستر شبکه محلی (LAN) گیم‌نت شما بدون وابستگی به اینترنت اجرا می‌شوند. در صورت وصل بودن اینترنت، نسخه پشتیبان به صورت رمزنگاری‌شده ابری ذخیره می‌شود.'
  },
  {
    question: 'رله هوشمند کنترل برق دیجی‌گیم چگونه کار می‌کند؟',
    answer: 'سخت‌افزار رله دیجی‌گیم یک باکس صنعتی استاندارد است که به تلویزیون‌ها یا مانیتورهای شما متصل می‌شود. به محض اینکه تایم بازی یک مشتری تمام شود یا اپراتور استیشن را متوقف کند، برق مانیتور در کسری از ثانیه قطع شده و امکان سوءاستفاده یا بازی اضافه بدون پرداخت وجود ندارد.'
  },
  {
    question: 'نصب و راه‌اندازی نرم‌افزار چقدر زمان می‌برد؟',
    answer: 'راه‌اندازی نرم‌افزار سرور و کلاینت‌ها معمولا کمتر از ۴۵ دقیقه طول می‌کشد. تیم پشتیبانی ما از طریق انی‌دسک (AnyDesk) به صورت کاملاً رایگان کلیه تنظیمات، تعریف استیشن‌ها، بازی‌ها و نرخ‌های ساعتی را برای شما انجام می‌دهد.'
  },
  {
    question: 'آیا می‌توانم برای ساعت‌های مختلف روز یا آخر هفته‌ها قیمت متفاوتی تعریف کنم؟',
    answer: 'بله، دیجی‌گیم دارای سیستم قیمت‌گذاری پیشرفته شناور (Happy Hour) است. می‌توانید برای صبح‌ها تخفیف، برای شب‌ها و پنج‌شنبه/جمعه‌ها تعرفه پیک، و برای مشتریان VIP تخفیف‌های درصدی اتوماتیک ثبت کنید.'
  },
  {
    question: 'شرایط گارانتی و ضمانت بازگشت وجه به چه صورت است؟',
    answer: 'دیجی‌گیم دارای ۱۴ روز ضمانت بی قید و شرط بازگشت وجه است. همچنین تمامی قطعات سخت‌افزاری رله‌های هوشمند تولید دیجی‌گیم دارای ۲۴ ماه گارانتی تعویض طلایی شرکتی هستند.'
  }
];

