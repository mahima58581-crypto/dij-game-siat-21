import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Volume2, Wifi, Zap, Award, Calendar, QrCode, 
  Calculator, UserCheck, Clock, ShieldCheck, Play, Square, Coffee, 
  AlertTriangle, Check, RefreshCw, X, ChevronRight, Sparkles, Smartphone, Users
} from 'lucide-react';
import { soundManager } from '../utils/audioAlerts';
import { INITIAL_STAFF, INITIAL_GAMERS, TIER_CONFIG } from '../data/mockData';
import { GamerTier, Station, StaffMember } from '../types';

interface ManagementPanelProps {
  onClose?: () => void;
}

export const ManagementPanel: React.FC<ManagementPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'stations' | 'revenue' | 'network' | 'tiers' | 'reservations' | 'buffet-qr' | 'calculator' | 'staff'>('stations');

  // Revenue PIN Lock State
  const [isRevenueLocked, setIsRevenueLocked] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const OWNER_PIN = '1234';

  // Audio Alerts State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceAlertEnabled, setVoiceAlertEnabled] = useState<boolean>(true);
  const [lastAudioTrigger, setLastAudioTrigger] = useState<string>('');

  // Live Internet & Ping Monitor State
  const [ping, setPing] = useState<number>(12);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(182.4);
  const [uploadSpeed, setUploadSpeed] = useState<number>(44.8);
  const [packetLoss, setPacketLoss] = useState<number>(0.0);
  const [isRefreshingNet, setIsRefreshingNet] = useState<boolean>(false);

  // Stations State
  const [stations, setStations] = useState<Station[]>([
    {
      id: 'st-1',
      name: 'استیشن ۰۱ (PS5 Slim - ۴ نفره)',
      type: 'PS5',
      status: 'active',
      ratePerHour: 140000,
      secondsElapsed: 3000,
      allocatedSeconds: 3600, // 60 mins -> 10 mins left!
      customerName: 'کیان رادمنش',
      gamerTier: 'fakher',
      buffetOrders: [{ item: 'ردبول انرژی‌زا', price: 110000, count: 2 }]
    },
    {
      id: 'st-2',
      name: 'سیستم ۰۲ گیمینگ (RTX 4080)',
      type: 'PC',
      status: 'active',
      ratePerHour: 160000,
      secondsElapsed: 4200,
      allocatedSeconds: 5400,
      customerName: 'امیرحسین صدر',
      gamerTier: 'gold',
      buffetOrders: [{ item: 'چیپس پرینگلز', price: 85000, count: 1 }]
    },
    {
      id: 'st-3',
      name: 'استیشن ۰۳ (PS5 Pro - FC 25)',
      type: 'PS5',
      status: 'idle',
      ratePerHour: 150000,
      secondsElapsed: 0,
      customerName: 'آماده شروع',
      buffetOrders: []
    },
    {
      id: 'st-4',
      name: 'اتاق VIP واقعیت مجازی VR',
      type: 'VR',
      status: 'reserved',
      ratePerHour: 220000,
      secondsElapsed: 0,
      customerName: 'رزرو ساعت ۱۸:۳۰ (مهندس شایان)',
      buffetOrders: []
    }
  ]);

  // Staff State
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);

  // Gamers State
  const [gamers, setGamers] = useState(INITIAL_GAMERS);

  // Reservations State
  const [reservations, setReservations] = useState([
    { id: 'r-1', station: 'استیشن ۰۱ (PS5)', customer: 'آرش علوی', time: '۱۸:۰۰ الی ۲۰:۰۰', status: 'تایید شده', phone: '۰۹۱۲۷۷۷۶۶۵۵' },
    { id: 'r-2', station: 'اتاق VIP VR', customer: 'مهندس شایان', time: '۱۸:۳۰ الی ۱۹:۳۰', status: 'در انتظار مراجعه', phone: '۰۹۳۵۴۴۴۱۱۲۲' },
    { id: 'r-3', station: 'سیستم ۰۵ گیمینگ PC', customer: 'علیرضا اسدی', time: '۲۱:۰۰ الی ۲۳:۰۰', status: 'تایید شده', phone: '۰۹۱۹۲۲۲۳۳۴۴' }
  ]);
  const [newResStation, setNewResStation] = useState('استیشن ۰۳ (PS5 Pro)');
  const [newResCustomer, setNewResCustomer] = useState('');
  const [newResTime, setNewResTime] = useState('۱۹:۰۰ الی ۲۱:۰۰');
  const [newResPhone, setNewResPhone] = useState('');

  // Quick Calculator State
  const [calcMinutes, setCalcMinutes] = useState<number>(75);
  const [calcRatePerHour, setCalcRatePerHour] = useState<number>(140000);
  const [calcPlayerCount, setCalcPlayerCount] = useState<number>(2);
  const [calcTierDiscount, setCalcTierDiscount] = useState<number>(10);
  const [calcBuffetAmount, setCalcBuffetAmount] = useState<number>(90000);

  // Mobile QR Buffet Order State
  const [qrStationNum, setQrStationNum] = useState<string>('میز شماره ۱ (PS5)');
  const [qrOrderSuccess, setQrOrderSuccess] = useState<string | null>(null);

  // Network jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(11 + Math.floor(Math.random() * 4));
      setDownloadSpeed(Number((180 + Math.random() * 8).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Clock tick & 10-Minute warning trigger
  useEffect(() => {
    const timer = setInterval(() => {
      setStations(prev =>
        prev.map(st => {
          if (st.status === 'active') {
            const nextSecs = st.secondsElapsed + 1;
            // Check if station has target allocated time and reached exactly 10 mins (600s) left
            if (st.allocatedSeconds && (st.allocatedSeconds - nextSecs === 600)) {
              if (soundEnabled) {
                soundManager.play10MinuteWarning(voiceAlertEnabled);
                setLastAudioTrigger(`هشدار ۱۰ دقیقه مانده به اتمام وقت ${st.name} برای ${st.customerName}`);
              }
            }
            return { ...st, secondsElapsed: nextSecs };
          }
          return st;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [soundEnabled, voiceAlertEnabled]);

  const handleUnlockRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === OWNER_PIN) {
      setIsRevenueLocked(false);
      setPinError('');
      soundManager.playCashierSuccess();
    } else {
      setPinError('رمز ورود اشتباه است (رمز پیش‌فرض تستی: 1234)');
    }
  };

  const testAudioAlert = () => {
    soundManager.play10MinuteWarning(voiceAlertEnabled);
    setLastAudioTrigger('صدای تست ۱۰ دقیقه مانده به پایان بازی پخش شد.');
  };

  const handleAddReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResCustomer || !newResPhone) return;
    setReservations(prev => [
      ...prev,
      {
        id: `r-${Date.now()}`,
        station: newResStation,
        customer: newResCustomer,
        time: newResTime,
        status: 'تایید شده',
        phone: newResPhone
      }
    ]);
    setNewResCustomer('');
    setNewResPhone('');
    soundManager.playCashierSuccess();
  };

  const handleSimulateQrOrder = (item: string, price: number) => {
    setQrOrderSuccess(`سفارش «${item}» از طریق QR موبایل روی ${qrStationNum} ثبت و به صندوق ارسال شد!`);
    soundManager.playCashierSuccess();
    setTimeout(() => setQrOrderSuccess(null), 4000);
  };

  // Calculator computations
  const rawGamingCost = Math.round((calcMinutes / 60) * calcRatePerHour);
  const discountAmount = Math.round((rawGamingCost * calcTierDiscount) / 100);
  const totalCost = rawGamingCost - discountAmount + calcBuffetAmount;
  const costPerPlayer = Math.round(totalCost / Math.max(1, calcPlayerCount));

  return (
    <div className="bg-[#091122] border border-slate-700/80 rounded-3xl p-4 sm:p-8 shadow-2xl text-slate-100 relative">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 font-outfit text-xl">
            OS
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              سیستم‌عامل مدیریتی دیجی‌گیم (نسخه ۴.۹ VIP)
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                نسخه کامل
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              مدیریت رله، حریم دخل، افکت صدا، پینگ زنده، لول‌های گیمر، QR بوفه، ماشین حساب و پرسنل
            </p>
          </div>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-3">
          {/* Quick Sound Alert Test */}
          <button
            onClick={testAudioAlert}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-3 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer"
            title="تست پخش صدای اخطار ۱۰ دقیقه به پایان وقت"
          >
            <Volume2 className="w-4 h-4" />
            <span>تست افکت صدا</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="بستن پنل"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Audio alert notification bar */}
      {lastAudioTrigger && (
        <div className="mt-4 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{lastAudioTrigger}</span>
          </div>
          <button onClick={() => setLastAudioTrigger('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-slate-800 text-xs font-bold no-scrollbar">
        <button
          onClick={() => setActiveTab('stations')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'stations' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>ایستگاه‌های بازی و رله</span>
        </button>

        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'revenue' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          {isRevenueLocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>صندوق و حریم درآمد {isRevenueLocked ? '(قفل با رمز)' : '(باز)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('network')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'network' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Wifi className="w-3.5 h-3.5" />
          <span>پایش لحظه‌ای پینگ و اینترنت ({ping}ms)</span>
        </button>

        <button
          onClick={() => setActiveTab('tiers')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'tiers' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>سطوح گیمر (برنزی تا فاخر)</span>
        </button>

        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'reservations' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>رزرو آنلاین استیشن</span>
        </button>

        <button
          onClick={() => setActiveTab('buffet-qr')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'buffet-qr' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>بوفه هوشمند با اسکن QR</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'calculator' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>ماشین حساب سریع دنگی</span>
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'staff' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>پرسنل، تاخیر و حضور/غیاب</span>
        </button>
      </div>

      {/* Tab 1: Stations & Relay Management */}
      {activeTab === 'stations' && (
        <div className="py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stations.map(st => {
              const isRunning = st.status === 'active';
              const remainingSecs = st.allocatedSeconds ? Math.max(0, st.allocatedSeconds - st.secondsElapsed) : null;
              const isNearEnd = remainingSecs !== null && remainingSecs <= 600 && remainingSecs > 0;

              return (
                <div
                  key={st.id}
                  className={`bg-[#0d1830] border rounded-2xl p-4 space-y-3 transition-all ${
                    isNearEnd 
                      ? 'border-amber-500/80 shadow-lg shadow-amber-500/20 animate-pulse'
                      : isRunning
                      ? 'border-emerald-500/50 shadow-md shadow-emerald-500/10'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{st.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isRunning ? 'bg-emerald-500/20 text-emerald-400' : st.status === 'reserved' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isRunning ? 'در حال بازی' : st.status === 'reserved' ? 'رزرو شده' : 'خالی'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">
                    کاربر: <span className="font-semibold text-white">{st.customerName}</span>
                    {st.gamerTier && (
                      <span className="mr-1.5 text-[10px] text-emerald-400">
                        ({TIER_CONFIG[st.gamerTier].badge})
                      </span>
                    )}
                  </div>

                  {/* Countdown / Elapsed */}
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono tabular-nums">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{Math.floor(st.secondsElapsed / 60)} دقیقه بازی</span>
                    </div>
                    {remainingSecs !== null && (
                      <div className={`font-bold ${isNearEnd ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {Math.floor(remainingSecs / 60)}:{(remainingSecs % 60).toString().padStart(2, '0')} مانده
                      </div>
                    )}
                  </div>

                  {isNearEnd && (
                    <div className="text-[11px] text-amber-300 bg-amber-500/10 p-2 rounded-lg flex items-center gap-1.5 border border-amber-500/30">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>کمتر از ۱۰ دقیقه تا خاموشی خودکار رله!</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundManager.playRelayClick(isRunning);
                        setStations(prev =>
                          prev.map(s => s.id === st.id ? { ...s, status: isRunning ? 'idle' : 'active' } : s)
                        );
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isRunning ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                      }`}
                    >
                      {isRunning ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                      <span>{isRunning ? 'قطع رله برق' : 'شروع و وصل برق'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Revenue Protection with PIN Code Keypad */}
      {activeTab === 'revenue' && (
        <div className="py-6 max-w-2xl mx-auto">
          {isRevenueLocked ? (
            <div className="bg-[#0c1830] border border-amber-500/40 rounded-3xl p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">حریم خصوصی دخل و درآمد مالک گیم‌نت</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  اطلاعات مالی، سود خالص روزانه، و جمع فروش بوفه محافظت‌شده است. برای مشاهده، لطفاً رمز اختصاصی مدیریت را وارد کنید.
                </p>
              </div>

              {pinError && (
                <div className="p-2.5 bg-red-500/20 text-red-300 text-xs rounded-xl border border-red-500/40">
                  {pinError}
                </div>
              )}

              <form onSubmit={handleUnlockRevenue} className="space-y-4 max-w-xs mx-auto">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="رمز ۴ رقمی (تستی: 1234)"
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  className="w-full text-center text-2xl font-mono tracking-[0.5em] bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all cursor-pointer"
                >
                  بازگشایی و مشاهده دخل
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-[#0c1830] border border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Unlock className="w-4 h-4" />
                  <span>دخل امروز (محاسبه آنلاین شیفت جاری)</span>
                </div>
                <button
                  onClick={() => setIsRevenueLocked(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>قفل فوری دخل</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">کل درآمد کنسول‌ها و PC:</div>
                  <div className="font-outfit font-black text-2xl text-emerald-400 mt-1">
                    ۲,۸۴۰,۰۰۰ <span className="text-xs text-slate-300">تومان</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">فروش بوفه و کافه:</div>
                  <div className="font-outfit font-black text-2xl text-amber-400 mt-1">
                    ۱,۱۹۰,۰۰۰ <span className="text-xs text-slate-300">تومان</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">مجموع دخل نهایی روز:</div>
                  <div className="font-outfit font-black text-2xl text-white mt-1">
                    ۴,۰۳۰,۰۰۰ <span className="text-xs text-slate-300">تومان</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex justify-between">
                <span>واریزی کارتخوان (POS): ۳,۵۸۰,۰۰۰ تومان</span>
                <span>دریافتی نقد صندوق: ۴۵۰,۰۰۰ تومان</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Real-time Ping and Speed Monitor */}
      {activeTab === 'network' && (
        <div className="py-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl text-center space-y-1">
              <div className="text-xs text-slate-400">پینگ به سرور گیمینگ (تهران):</div>
              <div className="font-outfit font-black text-4xl text-emerald-400 tabular-nums">
                {ping} <span className="text-sm font-normal text-slate-400">ms</span>
              </div>
              <div className="text-[10px] text-emerald-300">بدون پکت لاس (ایده‌آل فیفا و کانتر)</div>
            </div>

            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl text-center space-y-1">
              <div className="text-xs text-slate-400">سرعت دانلود کلاینت‌ها:</div>
              <div className="font-outfit font-black text-4xl text-blue-400 tabular-nums">
                {downloadSpeed} <span className="text-sm font-normal text-slate-400">Mbps</span>
              </div>
              <div className="text-[10px] text-slate-400">پهنای باند فیبر نوری اختصاصی</div>
            </div>

            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl text-center space-y-1">
              <div className="text-xs text-slate-400">سرعت آپلود:</div>
              <div className="font-outfit font-black text-4xl text-purple-400 tabular-nums">
                {uploadSpeed} <span className="text-sm font-normal text-slate-400">Mbps</span>
              </div>
              <div className="text-[10px] text-slate-400">استیبل برای استریم و مسابقات</div>
            </div>

            <div className="bg-[#0c1830] border border-slate-800 p-5 rounded-2xl text-center space-y-1">
              <div className="text-xs text-slate-400">پکت لاس (Packet Loss):</div>
              <div className="font-outfit font-black text-4xl text-emerald-400 tabular-nums">
                {packetLoss}%
              </div>
              <div className="text-[10px] text-emerald-400">کیفیت خط: عالی (Grade A+)</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Gamer Tiers (مستویات: برنزی، نقره‌ای، طلایی، فاخر) */}
      {activeTab === 'tiers' && (
        <div className="py-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(TIER_CONFIG) as GamerTier[]).map(tierKey => {
              const cfg = TIER_CONFIG[tierKey];
              return (
                <div key={tierKey} className={`bg-[#0c1830] border ${cfg.border} rounded-2xl p-5 space-y-3 relative overflow-hidden`}>
                  <div className={`text-sm font-black ${cfg.text}`}>{cfg.badge}</div>
                  <div className="text-xs text-slate-300 font-bold">{cfg.discount}</div>
                  <div className="text-[11px] text-slate-400">{cfg.xpRequired}</div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#0c1830] border border-slate-800 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-white mb-3">اعضای فعال باشگاه گیمرهای کلوپ:</h4>
            <div className="space-y-2">
              {gamers.map(g => (
                <div key={g.id} className="flex items-center justify-between p-3 bg-slate-900/70 rounded-xl text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{g.avatar}</span>
                    <div>
                      <div className="font-bold text-white">{g.name}</div>
                      <div className="text-[11px] text-slate-400" dir="ltr">{g.phone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">{TIER_CONFIG[g.tier].badge}</div>
                    <div className="text-[11px] text-slate-400">{g.xp} امتیاز XP · {g.totalHoursPlayed} ساعت بازی</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Reservations */}
      {activeTab === 'reservations' && (
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-sm font-bold text-white">لیست نوبت‌های رزرو شده استیشن‌ها:</h4>
            <div className="space-y-2">
              {reservations.map(r => (
                <div key={r.id} className="bg-[#0c1830] border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{r.station} - {r.customer}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">زمان: {r.time} · تماس: {r.phone}</div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-1 rounded-md text-[11px] font-bold">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0c1830] border border-slate-800 p-5 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-white">ثبت رزرو جدید استیشن:</h4>
            <form onSubmit={handleAddReservation} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">انتخاب استیشن:</label>
                <select
                  value={newResStation}
                  onChange={e => setNewResStation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="استیشن ۰۱ (PS5 Slim)">استیشن ۰۱ (PS5 Slim)</option>
                  <option value="سیستم ۰۲ گیمینگ (PC)">سیستم ۰۲ گیمینگ (PC)</option>
                  <option value="استیشن ۰۳ (PS5 Pro)">استیشن ۰۳ (PS5 Pro)</option>
                  <option value="اتاق VIP واقعیت مجازی VR">اتاق VIP واقعیت مجازی VR</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">نام گیمر:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: پویا رحیمی"
                  value={newResCustomer}
                  onChange={e => setNewResCustomer(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">شماره تماس:</label>
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  value={newResPhone}
                  onChange={e => setNewResPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-right"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">بازه زمانی:</label>
                <input
                  type="text"
                  placeholder="۱۹:۰۰ الی ۲۱:۰۰"
                  value={newResTime}
                  onChange={e => setNewResTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl transition-all cursor-pointer"
              >
                ثبت رزرو استیشن
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 6: QR Buffet Ordering */}
      {activeTab === 'buffet-qr' && (
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-white text-slate-950 p-6 rounded-3xl text-center space-y-4 shadow-xl">
            <div className="text-xs font-bold font-outfit uppercase tracking-widest text-slate-600">
              SCAN TO ORDER BUFFET
            </div>
            <div className="w-48 h-48 mx-auto bg-slate-100 border-4 border-slate-950 rounded-2xl flex items-center justify-center p-2 relative">
              <QrCode className="w-36 h-36 text-slate-950" />
            </div>
            <div className="text-xs font-bold text-slate-800">
              {qrStationNum}
            </div>
            <p className="text-[11px] text-slate-500">
              گیمر بدون جابجایی از صندلی، دوربین گوشی خود را روی این بارکد گرفته و منو را مشاهده می‌کند.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>شبیه‌ساز سفارش از روی گوشی گیمر:</span>
            </h4>

            {qrOrderSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{qrOrderSuccess}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleSimulateQrOrder('ردبول اصل اتریشی', 110000)}
                className="bg-[#0c1830] hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 text-right space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-white text-xs">ردبول انرژی‌زا (اصل)</div>
                <div className="text-emerald-400 font-outfit text-xs">۱۱۰,۰۰۰ تومان</div>
                <div className="text-[10px] text-slate-400">سفارش مستقیم با ۱ کلیک ↗</div>
              </button>

              <button
                onClick={() => handleSimulateQrOrder('پیتزا اسلایسی پپرونی', 135000)}
                className="bg-[#0c1830] hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 text-right space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-white text-xs">پیتزا اسلایسی تنوری</div>
                <div className="text-emerald-400 font-outfit text-xs">۱۳۵,۰۰۰ تومان</div>
                <div className="text-[10px] text-slate-400">سفارش مستقیم با ۱ کلیک ↗</div>
              </button>

              <button
                onClick={() => handleSimulateQrOrder('چیپس پرینگلز اورجینال', 85000)}
                className="bg-[#0c1830] hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 text-right space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-white text-xs">چیپس پرینگلز</div>
                <div className="text-emerald-400 font-outfit text-xs">۸۵,۰۰۰ تومان</div>
                <div className="text-[10px] text-slate-400">سفارش مستقیم با ۱ کلیک ↗</div>
              </button>

              <button
                onClick={() => handleSimulateQrOrder('آیس لاته کارامل بوفه', 60000)}
                className="bg-[#0c1830] hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 text-right space-y-1 transition-all cursor-pointer"
              >
                <div className="font-bold text-white text-xs">آیس لاته اسپرسو</div>
                <div className="text-emerald-400 font-outfit text-xs">۶۰,۰۰۰ تومان</div>
                <div className="text-[10px] text-slate-400">سفارش مستقیم با ۱ کلیک ↗</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Fast & Exact Game Net Calculator */}
      {activeTab === 'calculator' && (
        <div className="py-6 max-w-3xl mx-auto space-y-6">
          <div className="bg-[#0c1830] border border-slate-800 p-6 rounded-3xl space-y-5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>ماشین حساب سریع تسویه حساب، دقایق و دنگی نفری:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">مدت زمان بازی (دقیقه):</label>
                <input
                  type="number"
                  value={calcMinutes}
                  onChange={e => setCalcMinutes(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">نرخ هر ساعت دستگاه (تومان):</label>
                <input
                  type="number"
                  value={calcRatePerHour}
                  onChange={e => setCalcRatePerHour(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">تعداد بازیکنان (تقسیم دنگی):</label>
                <select
                  value={calcPlayerCount}
                  onChange={e => setCalcPlayerCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value={1}>۱ نفر (تک نفره)</option>
                  <option value={2}>۲ نفر (دوبل)</option>
                  <option value={3}>۳ نفر</option>
                  <option value={4}>۴ نفر (تیمی فیفا)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">تخفیف لول گیمر (درصد):</label>
                <select
                  value={calcTierDiscount}
                  onChange={e => setCalcTierDiscount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value={0}>بدون تخفیف (عادی)</option>
                  <option value={5}>۵٪ (برنزی)</option>
                  <option value={10}>۱۰٪ (نقره‌ای)</option>
                  <option value={15}>۱۵٪ (طلایی)</option>
                  <option value={20}>۲۰٪ (فاخر VIP)</option>
                </select>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>هزینه پایه زمان ({calcMinutes} دقیقه):</span>
                <span>{rawGamingCost.toLocaleString('fa-IR')} تومان</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>تخفیف سطح گیمر ({calcTierDiscount}٪):</span>
                  <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>سفارشات بوفه:</span>
                <span>{calcBuffetAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-slate-800">
                <span>جمع کل فاکتور:</span>
                <span className="text-emerald-400 font-outfit">{totalCost.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between font-bold text-amber-400 bg-amber-400/10 p-3 rounded-xl border border-amber-400/20">
                <span>سهم هر نفر (تقسیم بر {calcPlayerCount} نفر):</span>
                <span className="font-outfit text-base">{costPerPlayer.toLocaleString('fa-IR')} تومان / نفری</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: Staff Shift & Attendance */}
      {activeTab === 'staff' && (
        <div className="py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">حضور و غیاب پرسنل، تاخیرها و اضافه کاری:</h4>
            <span className="text-xs text-slate-400">محاسبه خودکار حقوق و جرایم تاخیر</span>
          </div>

          <div className="space-y-3">
            {staff.map(s => (
              <div key={s.id} className="bg-[#0c1830] border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{s.name} ({s.role})</div>
                  <div className="text-[11px] text-slate-400 mt-1">تماس: {s.phone} · ساعت ورود: {s.clockInTime}</div>
                </div>

                <div className="flex items-center gap-3">
                  {s.delayMinutes > 0 ? (
                    <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2.5 py-1 rounded-lg font-bold">
                      {s.delayMinutes} دقیقه تاخیر
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-bold">
                      ورود به موقع
                    </span>
                  )}

                  <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2.5 py-1 rounded-lg font-bold">
                    {s.overtimeHours} ساعت اضافه کاری
                  </span>

                  <button
                    onClick={() => {
                      setStaff(prev =>
                        prev.map(item => item.id === s.id ? { ...item, status: 'present', delayMinutes: 0 } : item)
                      );
                      soundManager.playCashierSuccess();
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg border border-slate-700 cursor-pointer"
                  >
                    ثبت خروج شیفت
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
