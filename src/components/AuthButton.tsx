import React from "react";
import "./AuthButton.css";

interface AuthButtonProps {
  onClick?: () => void;
}

export default function AuthButton({ onClick }: AuthButtonProps) {
  return (
    <button
      type="button"
      className="auth-button"
      onClick={onClick}
      aria-label="ورود یا عضویت به دیجی‌گیم"
    >
      <span className="auth-button__shine" />

      <span className="auth-button__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 17l5-5-5-5M15 12H3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="auth-button__text">
        <span className="auth-button__title">
          ورود / عضویت
        </span>
        <span className="auth-button__subtitle">
          وارد دنیای گیمرها شو
        </span>
      </span>

      <span className="auth-button__arrow">↗</span>
    </button>
  );
}
