import React, { useState, useEffect } from "react";
import "./BackToTop.css";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll > 220) {
        setShow(true);
      } else {
        setShow(false);
      }

      if (totalScroll > 0) {
        const pct = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      id="backToTop"
      type="button"
      className={`back-to-top ${show ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="بازگشت به بالای صفحه (پرتاب سریع VIP)"
      title="پرتاب به بالای صفحه"
    >
      {/* Circular SVG Scroll Progress HUD */}
      <svg className="back-to-top__progress" viewBox="0 0 62 62" aria-hidden="true">
        <circle
          className="back-to-top__progress-track"
          cx="31"
          cy="31"
          r={radius}
        />
        <circle
          className="back-to-top__progress-fill"
          cx="31"
          cy="31"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>

      {/* Diagonal Cyber Holographic Shine */}
      <span className="back-to-top__shine" />

      {/* Center Gaming HUD Core */}
      <div className="back-to-top__content">
        <div className="back-to-top__rocket">
          <svg className="back-to-top__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3L4 11H8V20H16V11H20L12 3Z"
              fill="currentColor"
            />
          </svg>
          <span className="back-to-top__flame" />
        </div>

        <span className="back-to-top__percent">
          {Math.round(scrollProgress)}%
        </span>
      </div>

      {/* HUD Corner Tech Accents */}
      <span className="back-to-top__hud-tl" />
      <span className="back-to-top__hud-br" />
    </button>
  );
}
