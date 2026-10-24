import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AppSpecialFeaturesSection } from './components/AppSpecialFeaturesSection';
import { FeaturesSection } from './components/FeaturesSection';
import { RoiCalculator } from './components/RoiCalculator';
import { PricingSection } from './components/PricingSection';
import { DirectorySection } from './components/DirectorySection';
import { InstallersSection } from './components/InstallersSection';
import { BlogSection } from './components/BlogSection';
import { TutorialsSection } from './components/TutorialsSection';
import { DownloadsSection } from './components/DownloadsSection';
import { AboutAndStats } from './components/AboutAndStats';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { PurchasePage } from './components/PurchasePage';
import BackToTop from './components/BackToTop';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [purchaseInitialMode, setPurchaseInitialMode] = useState<'new' | 'renewal'>('new');
  const [showPurchasePage, setShowPurchasePage] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      return hash.includes('purchase') || hash.includes('renew');
    }
    return false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('digigame_user_auth') === 'true');
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>('gold');

  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('purchase') || hash.includes('renew')) {
        setPurchaseInitialMode(hash.includes('renew') ? 'renewal' : 'new');
        setShowPurchasePage(true);
      } else if (hash === '' || hash.startsWith('#features') || hash.startsWith('#pricing') || hash.startsWith('#about') || hash.startsWith('#faq') || hash.startsWith('#downloads') || hash.startsWith('#blog')) {
        setShowPurchasePage(false);
      }
    };

    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    handleHashSync();
    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  const handleOpenOrderModal = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    setOrderModalOpen(true);
  };

  const handleNavigateToPurchase = (modeOrPlanId: 'new' | 'renewal' | string = 'new') => {
    const mode = modeOrPlanId === 'renewal' ? 'renewal' : 'new';
    setPurchaseInitialMode(mode);
    window.location.hash = mode === 'renewal' ? 'purchase-renewal' : 'purchase';
    setShowPurchasePage(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleNavigateHome = () => {
    if (window.location.hash.includes('purchase') || window.location.hash.includes('renew')) {
      history.pushState(null, '', window.location.pathname);
    }
    setShowPurchasePage(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [showPurchasePage]);

  // Dynamic Browser Tab Title & Interactive Away Effect
  useEffect(() => {
    let welcomeTimeout: ReturnType<typeof setTimeout>;

    const getBaseTitle = () => {
      if (showPurchasePage) {
        return purchaseInitialMode === 'renewal'
          ? 'دیجی گیم | تمدید آنی لایسنس و اشتراک'
          : 'دیجی گیم | پرتال ثبت سفارش لایسنس VIP';
      }
      return 'دیجی گیم | سامانه هوشمند مدیریت گیم‌نت و کلوپ‌های VIP';
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'دیجی گیم | منتظر بازگشت شما هستیم';
      } else {
        document.title = 'دیجی گیم | خوش آمدید';
        clearTimeout(welcomeTimeout);
        welcomeTimeout = setTimeout(() => {
          document.title = getBaseTitle();
        }, 1800);
      }
    };

    document.title = getBaseTitle();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(welcomeTimeout);
    };
  }, [showPurchasePage, purchaseInitialMode]);

  const handleScrollToDemo = () => {
    const el = document.getElementById('special-features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    handleNavigateHome();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#050a14] text-slate-100 flex flex-col font-['Vazirmatn',sans-serif] selection:bg-emerald-500 selection:text-slate-950 transition-colors">
        
        {showPurchasePage ? (
          <>
            <Navbar
              onOpenOrderModal={handleOpenOrderModal}
              onOpenAuthModal={() => setAuthModalOpen(true)}
              onNavigateToPurchase={handleNavigateToPurchase}
              onNavigateToSection={navigateToSection}
              onNavigateHome={handleNavigateHome}
            />
            <main className="flex-1">
              <PurchasePage
                onBack={handleNavigateHome}
                onOpenAuth={() => setAuthModalOpen(true)}
                initialMode={purchaseInitialMode}
              />
            </main>
            <Footer 
              onOpenOrderModal={() => handleOpenOrderModal('gold')} 
              onNavigateToPurchase={handleNavigateToPurchase}
            />
          </>
        ) : (
          <>
            {/* Navigation Bar */}
            <Navbar
              onOpenOrderModal={handleOpenOrderModal}
              onOpenAuthModal={() => setAuthModalOpen(true)}
              onNavigateToPurchase={handleNavigateToPurchase}
              onNavigateToSection={navigateToSection}
              onNavigateHome={handleNavigateHome}
            />

            {/* Main Public & Interactive Sections */}
            <main className="flex-1 space-y-16">
          {/* Hero Section based on reference image */}
          <HeroSection
            onOpenOrderModal={() => handleOpenOrderModal('gold')}
            onScrollToDemo={handleScrollToDemo}
            onOpenAuthModal={() => setAuthModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />

          {/* ویژگی‌های اپلیکیشن مدیریتی گیم‌نت */}
          <AppSpecialFeaturesSection />

          {/* Features Section (امکانات) */}
          <FeaturesSection onOpenOrderModal={() => handleOpenOrderModal('gold')} />

          {/* ROI Calculator / Customer Price Estimator (محاسبه‌گر هزینه فعال‌سازی مشتری) */}
          <RoiCalculator 
            onOpenOrderModal={handleOpenOrderModal} 
            onNavigateToPurchase={handleNavigateToPurchase}
          />

          {/* Pricing Plans (تعرفه) */}
          <PricingSection 
            onOpenOrderModal={handleOpenOrderModal} 
            onNavigateToPurchase={handleNavigateToPurchase}
          />

          {/* Partner Game Clubs Directory (گیم‌نت‌ها) */}
          <DirectorySection />

          {/* Certified Installers Network (نصاب‌ها) */}
          <InstallersSection onRequestInstaller={() => handleOpenOrderModal('gold')} />

          {/* Blog & Articles (بلاگ و مقالات) */}
          <BlogSection />

          {/* Tutorials & Guides (آموزش) */}
          <TutorialsSection />

          {/* Download Center (دانلود) */}
          <DownloadsSection />

          {/* About Us & Warranty (درباره ما) */}
          <AboutAndStats />

          {/* Customer Reviews & Testimonials */}
          <TestimonialsSection />

          {/* Frequently Asked Questions */}
          <FaqSection />
        </main>

        {/* Footer */}
        <Footer 
          onOpenOrderModal={() => handleOpenOrderModal('gold')} 
          onNavigateToPurchase={handleNavigateToPurchase}
        />

        {/* Order & Demo Consultation Modal */}
        <OrderModal
          isOpen={orderModalOpen}
          selectedPlanId={selectedPlanId}
          onClose={() => setOrderModalOpen(false)}
        />

        {/* Auth (Login / Register) Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccessLogin={() => {
            setIsLoggedIn(true);
            localStorage.setItem('digigame_user_auth', 'true');
          }}
        />

        {/* Back To Top Floating Cyber Button */}
        <BackToTop />

          </>
        )}

      </div>
    </ThemeProvider>
  );
}
