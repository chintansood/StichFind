import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  dark?: boolean;
  onToggle?: () => void;
  title?: string;
}

export const DarkToggleNav = ({ dark, onToggle, title }: Props) => {
  return (
    <nav className={`sticky top-0 z-50 border-b flex items-center justify-between px-4 sm:px-6 h-14 ${dark ? "bg-[#1e150a] border-[#3d2e1e]" : "bg-white border-gray-100"} shadow-sm`}>
      <span className={`font-semibold text-lg tracking-tight ${dark ? "text-[#fef3e2]" : "text-gray-900"}`} style={{ fontFamily: "'Lora',serif" }}>
        ✂ {title || "StitchFind"}
      </span>
      {onToggle && (
        <button
          onClick={onToggle}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${dark ? "bg-[#2c1e0f] text-[#fef3e2] border-[#3d2e1e] hover:bg-[#3d2e1e]" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      )}
    </nav>
  );
};