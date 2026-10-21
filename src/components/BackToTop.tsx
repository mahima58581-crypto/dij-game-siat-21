import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import "./BackToTop.css";
import { soundManager } from "../utils/audioAlerts";
import { useTheme } from "../context/ThemeContext";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const launchTimeoutRef = useRef<number | null>(null);
  const { mode } = useTheme();
  const isLight = mode === "light";

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll > 180) {
        setShow(true);
      } else {
        setShow(false);
      }

      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (currentScroll / docHeight) * 100));
        setScrollProgress(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (launchTimeoutRef.current) {
        window.clearTimeout(launchTimeoutRef.current);
      }
    };
  }, []);

  const handleLaunch = () => {
    if (isLaunching) return;

    setIsLaunching(true);

    try {
      soundManager.playRocketLaunch();
    } catch {
      // Audio fallback
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    launchTimeoutRef.current = window.setTimeout(() => {
      setIsLaunching(false);
    }, 900);
  };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`apex-elevator-wrapper ${show ? "is-visible" : ""} ${isLight ? "theme-light" : "theme-dark"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sleek Floating Glass Telemetry Pill */}
      <div className={`apex-tooltip ${isHovered && !isLaunching ? "show-tooltip" : ""}`}>
        <span className="tooltip-beacon" />
        <span className="tooltip-label">پرتاب به بالا</span>
        <span className="tooltip-percentage" dir="ltr">{Math.round(scrollProgress)}%</span>
      </div>

      <button
        id="backToTop"
        type="button"
        className={`apex-elevator-btn ${isLaunching ? "is-launching" : ""}`}
        onClick={handleLaunch}
        aria-label="پرتاب به بالای صفحه"
        title="بازگشت سریع به بالای صفحه"
      >
        {/* Hyperspace Shockwave Energy Rings */}
        {isLaunching && (
          <div className="launch-shockwave" aria-hidden="true">
            <span className="shockwave-ring ring-1" />
            <span className="shockwave-ring ring-2" />
          </div>
        )}

        {/* Precision Progress SVG Gauge */}
        <svg className="apex-gauge-svg" viewBox="0 0 68 68" aria-hidden="true">
          <defs>
            <linearGradient id="apexGaugeGradDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#39ff78" />
            </linearGradient>

            <linearGradient id="apexGaugeGradLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            className="gauge-track"
            cx="34"
            cy="34"
            r={radius}
          />

          {/* Dynamic Fill Progress with Neon Glow */}
          <circle
            className="gauge-fill"
            cx="34"
            cy="34"
            r={radius}
            style={{
              stroke: isLight ? "url(#apexGaugeGradLight)" : "url(#apexGaugeGradDark)",
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>

        {/* Ambient Radial Under-Glow */}
        <div className="apex-core-glow" aria-hidden="true" />

        {/* Specular Prism Refraction */}
        <span className="apex-specular-sheen" aria-hidden="true" />

        {/* Center Aerodynamic Arrow & Telemetry Pod */}
        <div className={`apex-center-pod ${isLaunching ? "pod-warp-exit" : ""}`}>
          <div className="apex-arrow-cluster">
            <ArrowUp className="w-5 h-5 apex-arrow-icon" />
            <span className="apex-trail-beam" aria-hidden="true" />
          </div>

          {/* Precision Percentage Display with Correct LTR Alignment */}
          <div className="apex-telemetry-badge" dir="ltr">
            <span className="badge-value">{Math.round(scrollProgress)}</span>
            <span className="badge-unit">%</span>
          </div>
        </div>
      </button>
    </div>
  );
}
