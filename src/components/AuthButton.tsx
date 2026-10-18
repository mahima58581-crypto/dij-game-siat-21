import React from "react";
import "./AuthButton.css";

interface AuthButtonProps {
  onClick?: () => void;
}

export default function AuthButton({ onClick }: AuthButtonProps) {
  return (
    <button
      type="button"
      className="auth-button is-icon-only"
      onClick={onClick}
      aria-label="ورود یا عضویت به دیجی‌گیم"
      title="ورود / عضویت"
    >
      <span className="auth-button__shine" />

      <span className="auth-button__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5M15 12H3" />
        </svg>
      </span>
    </button>
  );
}
