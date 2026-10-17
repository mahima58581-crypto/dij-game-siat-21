import React from "react";
import "./DemoOrderButton.css";

interface DemoOrderButtonProps {
  onClick?: () => void;
}

export default function DemoOrderButton({ onClick }: DemoOrderButtonProps) {
  return (
    <button
      type="button"
      className="demo-order-button"
      onClick={onClick}
      aria-label="دریافت دمو و خرید دیجی‌گیم"
    >
      <span className="demo-order-button__shine" />

      <span className="demo-order-button__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </span>

      <span className="demo-order-button__text">
        <span className="demo-order-button__title">
          دریافت دمو و خرید
        </span>
        <span className="demo-order-button__subtitle">
          مشاوره و تست رایگان
        </span>
      </span>

      <span className="demo-order-button__arrow">↗</span>
    </button>
  );
}
