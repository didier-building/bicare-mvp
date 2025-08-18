import React from "react";
export function Badge({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-teal-600 text-white",
    secondary: "bg-teal-50 text-teal-700",
    outline: "border border-gray-300 text-gray-700 bg-white",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`} {...props}>{children}</span>;
}
