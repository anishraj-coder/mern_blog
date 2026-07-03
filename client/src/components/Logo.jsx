import React from 'react';

export default function Logo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer glowing hexagon border */}
      <polygon 
        points="12,2 22,7 22,17 12,22 2,17 2,7" 
        stroke="url(#logo-grad-2)" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
        className="opacity-70 dark:opacity-85" 
      />
      
      {/* Stylized Monogram "A" inside */}
      <path d="M12 5.5L5.5 17H8.5L12 9.5L15.5 17H18.5L12 5.5Z" fill="url(#logo-grad-1)" />
      
      {/* Horizontal Crossbar detailing */}
      <path d="M9.2 13.5H14.8" stroke="#080c14" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9.2 13.5H14.8" stroke="url(#logo-grad-3)" strokeWidth="1.2" strokeLinecap="round" />
      
      <defs>
        <linearGradient id="logo-grad-1" x1="5.5" y1="5.5" x2="18.5" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="0.5" stopColor="#ec4899" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="logo-grad-3" x1="9.2" y1="13.5" x2="14.8" y2="13.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}
