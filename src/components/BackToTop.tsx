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
    }, 800);
  };

  return (
    <div
      className={`btt-wrapper ${show ? "is-visible" : ""} ${isLight ? "theme-light" : "theme-dark"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Cyber Tooltip */}
      <div className={`btt-tooltip ${isHovered && !isLaunching ? "show-tooltip" : ""}`}>
        <span className="btt-tooltip-beacon" />
        <span className="btt-tooltip-text">پرتاب به بالا</span>
        <span className="btt-tooltip-pct" dir="ltr">{Math.round(scrollProgress)}%</span>
      </div>

      {/* Main Squircle Button (Matches ThemeToggle Style) */}
      <button
        id="backToTop"
        type="button"
        className={`btt-squircle-btn ${isLaunching ? "is-launching" : ""}`}
        onClick={handleLaunch}
        aria-label="پرتاب به بالای صفحه"
        title="بازگشت به بالای صفحه"
      >
        {/* Holographic Shine Sweep */}
        <span className="btt-btn-glow" aria-hidden="true" />

        {/* Live Status Beacon Dot (Matches ThemeToggle Top-Right Dot) */}
        <span className="btt-status-beacon" aria-hidden="true">
          <span />
        </span>

        {/* Inner Squircle Icon Pod */}
        <span className={`btt-icon-pod ${isLaunching ? "icon-warp-up" : ""}`}>
          <ArrowUp className="w-4 h-4 btt-arrow" />
        </span>

        {/* Bottom Micro Precision Scroll Progress Line */}
        <span className="btt-progress-track" aria-hidden="true">
          <span 
            className="btt-progress-bar"
            style={{ width: `${scrollProgress}%` }}
          />
        </span>
      </button>
    </div>
  );
}
