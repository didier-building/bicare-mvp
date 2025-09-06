import React from "react";

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-400",
    secondary: "bg-teal-50 text-teal-700 hover:bg-teal-100 focus:ring-teal-300",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
  };
  const sizes = { sm: "h-8 px-3 text-sm", md: "h-10 px-4", lg: "h-11 px-5 text-base" };
  return <button className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`} {...props}>{children}</button>;
}
