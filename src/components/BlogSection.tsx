import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/mockData';
import { BookOpen, Clock, Eye, ArrowUpLeft, X } from 'lucide-react';
import { BlogArticle } from '../types';

export const BlogSection: React.FC = () => {
  const [readingArticle, setReadingArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="blog" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>پایگاه دانش و مقالات اختصاصی</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          راهنماها و مقالات تخصصی رشد درآمد گیم‌نت
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          جدیدترین راهکارهای افزایش فروش بوفه، ستاپ شبکه بدون پینگ و گیمیفیکیشن برای جذب صدها پلیر وفادار.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_ARTICLES.map(article => (
          <div
            key={article.id}
            className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-4 group card-hover-lift"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-bold">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{article.readTime} مطالعه</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed text-justify">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-slate-500">
                <span>{article.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3 h-3" />
                  <span>{article.views.toLocaleString('fa-IR')} بازدید</span>
                </span>
              </div>

              <button
                onClick={() => setReadingArticle(article)}
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>مطالعه کامل مقاله</span>
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1830] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                {readingArticle.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {readingArticle.title}
              </h3>
              <div className="text-xs text-slate-400">تاریخ انتشار: {readingArticle.date} · زمان مطالعه: {readingArticle.readTime}</div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify border-t border-slate-800 pt-4">
              <p>
                مدیریت اصولی یک گیم‌نت مدرن دیگر شبیه به ده سال پیش نیست. امروزه هزینه‌های اجاره ملک تجاری، استهلاک دسته‌های PS5 و سیستم‌های خنک‌کننده پی‌سی گیمینگ به گونه‌ای است که حتی کوچکترین اتلاف وقت یا عدم ثبت سفارش می‌تواند تفاوت میان سودآوری و ضرر باشد.
              </p>
              <h4 className="font-bold text-white text-base">سه اصل اساسی برای افزایش بهره‌وری گیم‌نت:</h4>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong>حذف خطای انسانی صندوق:</strong> سپردن قطع برق به رله هوشمند به جای تذکر شفاهی پرسنل به بازیکن.</li>
                <li><strong>آسان‌سازی فرآیند سفارش بوفه:</strong> قرار دادن QR کد روی هر میز، بدون ایجاد حس خجالت یا مزاحمت برای بازی.</li>
                <li><strong>گیمیفیکیشن و لول‌بندی:</strong> ایجاد سطوح برنزی، نقره‌ای و فاخر با پاداش‌های محسوس که انگیزه رقابت و بازگشت ایجاد کند.</li>
              </ul>
            </div>

            <button
              onClick={() => setReadingArticle(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              بستن مقاله
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
