import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Move } from 'lucide-react';
import './InteractiveDigiGameText.css';

interface LetterItem {
  id: string;
  char: string;
  accent: 'dot' | 'foot-left' | 'foot-right' | 'top-right' | 'top-left' | 'loop' | 'eye';
}

const INITIAL_LETTERS: LetterItem[] = [
  { id: 'd-1', char: 'd', accent: 'foot-left' },
  { id: 'i-1', char: 'i', accent: 'dot' },
  { id: 'g-1', char: 'g', accent: 'loop' },
  { id: 'i-2', char: 'i', accent: 'dot' },
  { id: 'g-2', char: 'g', accent: 'top-right' },
  { id: 'a-1', char: 'a', accent: 'foot-right' },
  { id: 'm-1', char: 'm', accent: 'foot-left' },
  { id: 'e-1', char: 'e', accent: 'eye' },
];

export const InteractiveDigiGameText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState<number>(0);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="digigame-interactive-wrapper" dir="ltr">
      {/* Background Cyber Ambient Elements */}
      <div className="digigame-interactive-glow" aria-hidden="true" />
      <div className="digigame-interactive-grid" aria-hidden="true" />

      {/* Top Header Controls Bar */}
      <div className="digigame-interactive-header" dir="rtl">
        <span className="digigame-interactive-hint">
          <Move className="w-3.5 h-3.5 text-[#39ff78] animate-pulse" />
          <span>حروف را با ماوس بگیرید و جابه‌جا کنید!</span>
        </span>

        <button
          type="button"
          onClick={handleReset}
          className="digigame-interactive-reset-btn"
          title="بازنشانی موقعیت حروف"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>مرتب‌سازی مجدد</span>
        </button>
      </div>

      {/* Playground Drag Container */}
      <div
        ref={containerRef}
        key={resetKey}
        className="digigame-letters-stage"
      >
        <div className="digigame-letters-row">
          {INITIAL_LETTERS.map((item, index) => {
            const isBeingDragged = draggedLetter === item.id;

            return (
              <motion.div
                key={`${item.id}-${resetKey}`}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 450, bounceDamping: 25 }}
                onDragStart={() => setDraggedLetter(item.id)}
                onDragEnd={() => setDraggedLetter(null)}
                whileHover={{
                  scale: 1.12,
                  y: -6,
                  rotate: index % 2 === 0 ? 3 : -3,
                  transition: { type: 'spring', stiffness: 500, damping: 20 },
                }}
                whileDrag={{
                  scale: 1.28,
                  rotate: index % 2 === 0 ? 8 : -8,
                  zIndex: 100,
                  transition: { duration: 0.1 },
                }}
                className={`digigame-letter-box ${isBeingDragged ? 'is-dragging' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`حرف ${item.char} قابل جابجایی`}
              >
                {/* Main Character */}
                <span className="digigame-char font-outfit">
                  {item.char}
                </span>

                {/* Cyber Green Geometric Accent Shape */}
                <span
                  className={`digigame-accent digigame-accent--${item.accent}`}
                  aria-hidden="true"
                />

                {/* Subtitle letter reflection glow */}
                <div className="digigame-letter-glow" aria-hidden="true" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
