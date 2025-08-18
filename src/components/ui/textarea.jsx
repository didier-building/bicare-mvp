import React from "react";
export function Textarea({ className = "", ...props }) {
  return <textarea className={`border rounded-md px-3 py-2 w-full min-h-[80px] focus:outline-none focus:ring-2 focus:ring-teal-400 ${className}`} {...props} />;
}
