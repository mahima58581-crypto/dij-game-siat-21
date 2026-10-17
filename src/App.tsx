import React, { useState } from 'react';
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
import BackToTop from './components/BackToTop';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>('gold');

  const handleOpenOrderModal = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    setOrderModalOpen(true);
  };

  const handleScrollToDemo = () => {
    const el = document.getElementById('special-features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#050a14] text-slate-100 flex flex-col font-['Vazirmatn',sans-serif] selection:bg-emerald-500 selection:text-slate-950 transition-colors">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenOrderModal={handleOpenOrderModal}
          onOpenAuthModal={() => setAuthModalOpen(true)}
        />

        {/* Main Public & Interactive Sections */}
        <main className="flex-1 space-y-16">
          {/* Hero Section based on reference image */}
          <HeroSection
            onOpenOrderModal={() => handleOpenOrderModal('gold')}
            onScrollToDemo={handleScrollToDemo}
          />

          {/* ویژگی‌های اپلیکیشن مدیریتی گیم‌نت */}
          <AppSpecialFeaturesSection />

          {/* Features Section (امکانات) */}
          <FeaturesSection onOpenOrderModal={() => handleOpenOrderModal('gold')} />

          {/* ROI Calculator (محاسبه سود) */}
          <RoiCalculator onOpenOrderModal={() => handleOpenOrderModal('gold')} />

          {/* Pricing Plans (تعرفه) */}
          <PricingSection onOpenOrderModal={handleOpenOrderModal} />

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
        <Footer onOpenOrderModal={() => handleOpenOrderModal('gold')} />

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
        />

        {/* Back To Top Floating Cyber Button */}
        <BackToTop />

      </div>
    </ThemeProvider>
  );
}
