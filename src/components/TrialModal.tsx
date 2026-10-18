import React, { useState } from 'react';
import { X, CheckCircle2, Download, ShieldCheck, Clock, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  softwareType: 'manager' | 'client';
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, softwareType }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const isManager = softwareType === 'manager';
  const title = isManager ? 'نرم‌افزار مدیریتی سرور گیم‌نت' : 'دمو کلاینت استیشن‌ها و کنسول‌ها';
  const fileName = isManager ? 'DigiGame_Manager_v3.4_Trial.exe' : 'DigiGame_Client_v3.4_Trial.exe';
  const licenseKey = isManager ? 'DG-MGR-5DAY-9842-VIP' : 'DG-CLI-5DAY-7731-VIP';

  const handleDownload = () => {
    setDownloadStarted(true);
    // Create a mock trial package download trigger
    const element = document.createElement('a');
    const file = new Blob([
      `DIGI GAME - 5-DAY FULL TRIAL LICENSE\n\n` +
      `Software: ${title}\n` +
      `License Key: ${licenseKey}\n` +
      `Duration: 5 Days (120 Hours)\n` +
      `Status: Activated\n\n` +
      `راهنمای نصب: فایل نصبی را اجرا نموده و هنگام درخواست لایسنس، کلید فوق را وارد فرمایید.\n` +
      `پشتیبانی فنی ۲۴ ساعته: ۰۲۱-۹۱۰۱۵۴۸۰\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = isManager ? 'DigiGame_Manager_License.txt' : 'DigiGame_Client_License.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1325] border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لایسنس ۵ روز تست رایگان فعال شد</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            دانلود و راه‌اندازی {title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            حساب کاربری شما تایید شد. لایسنس اختصاصی ۵ روزه بدون محدودیت امکانات برای گیم‌نت شما صادر گردید:
          </p>
        </div>

        {/* License & Validity Card */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>کلید فعال‌سازی موقت:</span>
            </span>
            <span className="font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[11px]">
              {licenseKey}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>مهلت تست رایگان:</span>
            </span>
            <span className="font-bold text-cyan-300">
              ۵ روز کامل (۱۲۰ ساعت)
            </span>
          </div>
        </div>

        {/* Download Action Box */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full cyber-action-btn cyber-action-btn--primary !h-[50px] text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
          >
            <span className="cyber-action-btn__shine" />
            <Download className="w-4 h-4" />
            <span>{downloadStarted ? 'دانلود مجدد فایل لایسنس و نصبی' : `دانلود ${fileName}`}</span>
          </button>

          {downloadStarted && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>دانلود آغاز شد! پس از اتمام، فایل را روی سیستم گیم‌نت خود اجرا کنید.</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>بدون نیاز به کارت بانکی یا تعهد مالی • پشتیبانی رایگان نصب</span>
          </div>
        </div>

      </div>
    </div>
  );
};
