import React from "react";
import { ShoppingCart } from "lucide-react";
import "./DemoOrderButton.css";

interface DemoOrderButtonProps {
  onClick?: () => void;
}

export default function DemoOrderButton({ onClick }: DemoOrderButtonProps) {
  return (
    <button
      type="button"
      className="demo-order-button is-icon-only"
      onClick={onClick}
      aria-label="دریافت دمو و خرید دیجی‌گیم"
      title="دریافت دمو و خرید"
    >
      <span className="demo-order-button__shine" />

      <span className="demo-order-button__icon">
        <ShoppingCart className="w-4 h-4" />
      </span>
    </button>
  );
}
