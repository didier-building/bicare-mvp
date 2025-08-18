import React from "react";
export function Avatar({ className = "", children, ...props }) {
  return <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 ${className}`} {...props}>{children}</div>;
}
export function AvatarFallback({ children }) { return <span>{children}</span>; }
