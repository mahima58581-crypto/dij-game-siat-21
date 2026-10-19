import React, { useState, useEffect, useRef } from "react";
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

    // Play cyber rocket launch warp sound
    try {
      soundManager.playRocketLaunch();
    } catch {
      // Audio fallback
    }

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Reset launching state after propulsion sequence completes
    launchTimeoutRef.current = window.setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  const radius = 27;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`back-to-top-container ${show ? "visible" : ""} ${isLight ? "theme-light" : "theme-dark"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cyber Floating Tooltip HUD */}
      <div className={`cyber-tooltip ${isHovered && !isLaunching ? "show-tooltip" : ""}`}>
        <span className="tooltip-indicator"></span>
        <span className="tooltip-text">پرتاب به بالا</span>
        <span className="tooltip-pct">{Math.round(scrollProgress)}%</span>
      </div>

      <button
        id="backToTop"
        type="button"
        className={`back-to-top-btn ${isLaunching ? "is-launching" : ""}`}
        onClick={handleLaunch}
        aria-label="پرتاب به بالای صفحه"
        title="پرتاب سریع به بالای صفحه"
      >
        {/* Hyperspace Shockwave Rings on Launch */}
        {isLaunching && (
          <div className="launch-shockwave" aria-hidden="true">
            <span className="shockwave-ring ring-1"></span>
            <span className="shockwave-ring ring-2"></span>
          </div>
        )}

        {/* Circular SVG Gauge with Neon Gradient */}
        <svg className="gauge-svg" viewBox="0 0 68 68" aria-hidden="true">
          <defs>
            {/* Dark Theme Gradient */}
            <linearGradient id="cyberGaugeGradDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#39ff88" />
            </linearGradient>

            {/* Light Theme High-Contrast Gradient */}
            <linearGradient id="cyberGaugeGradLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            className="gauge-track"
            cx="34"
            cy="34"
            r={radius}
          />

          {/* Dynamic Fill Progress with Glow */}
          <circle
            className="gauge-fill"
            cx="34"
            cy="34"
            r={radius}
            style={{
              stroke: isLight ? "url(#cyberGaugeGradLight)" : "url(#cyberGaugeGradDark)",
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>

        {/* Holographic Laser Sweep */}
        <span className="cyber-laser-sweep" aria-hidden="true" />

        {/* Ambient Core Aura */}
        <div className="core-ambient-aura" aria-hidden="true" />

        {/* HUD Tech Corner Brackets */}
        <span className="hud-corner hud-top-right" aria-hidden="true" />
        <span className="hud-corner hud-bottom-left" aria-hidden="true" />

        {/* Central Spacecraft & Propulsion Content */}
        <div className="craft-wrapper">
          <div className={`shuttle-cockpit ${isLaunching ? "shuttle-takeoff" : ""}`}>
            {/* Custom High-Tech Sci-Fi Rocket Shuttle */}
            <svg
              className="shuttle-svg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Main Rocket Body */}
              <path
                d="M12 2C9.5 5 8 9.5 8 15L10 17V20L12 18.5L14 20V17L16 15C16 9.5 14.5 5 12 2Z"
                fill={isLight ? "url(#cyberGaugeGradLight)" : "url(#cyberGaugeGradDark)"}
                stroke={isLight ? "#047857" : "#d8ffea"}
                strokeWidth={isLight ? "1" : "0.8"}
              />
              {/* Wings / Side Stabilizers */}
              <path
                d="M8 12.5L4 16.5L4.5 18L8 16V12.5Z"
                fill={isLight ? "#0284c7" : "#06b6d4"}
                opacity={isLight ? "0.95" : "0.85"}
              />
              <path
                d="M16 12.5L20 16.5L19.5 18L16 16V12.5Z"
                fill={isLight ? "#0284c7" : "#06b6d4"}
                opacity={isLight ? "0.95" : "0.85"}
              />
              {/* Cockpit Window */}
              <circle
                cx="12"
                cy="8.5"
                r="1.6"
                fill={isLight ? "#0f172a" : "#030712"}
                stroke={isLight ? "#34d399" : "#39ff88"}
                strokeWidth="0.8"
              />
              <circle cx="12.4" cy="8.1" r="0.5" fill="#ffffff" />
              {/* Energy Core Accent */}
              <path
                d="M11 12H13V15H11V12Z"
                fill={isLight ? "#34d399" : "#39ff88"}
                opacity="0.95"
              />
            </svg>

            {/* Dynamic Plasma Thruster Flames */}
            <div className="plasma-thruster" aria-hidden="true">
              <span className="flame-core"></span>
              <span className="flame-flare flame-left"></span>
              <span className="flame-flare flame-right"></span>
            </div>
          </div>

          {/* Real-time Percentage Indicator */}
          <div className="telemetry-box">
            <span className="telemetry-value">
              {Math.round(scrollProgress)}
              <span className="telemetry-unit">%</span>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
