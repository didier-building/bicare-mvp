import React from "react";

// Shared UI components
export const Section = ({ title, subtitle, right, children }) => (
  <div className="bg-white rounded-lg p-4 border">
    <div className="flex items-center justify-between mb-3">
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      {right && <div className="ml-3">{right}</div>}
    </div>
    {children}
  </div>
);

export const Pill = ({ children, className = "" }) => (
  <span className={`inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 ${className}`}>
    {children}
  </span>
);