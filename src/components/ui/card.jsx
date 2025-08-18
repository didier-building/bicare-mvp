import React from "react";
export function Card({ className = "", ...p }) { return <div className={`bg-white border rounded-2xl ${className}`} {...p} />; }
export function CardHeader({ className = "", ...p }) { return <div className={`p-4 ${className}`} {...p} />; }
export function CardContent({ className = "", ...p }) { return <div className={`p-4 ${className}`} {...p} />; }
export function CardTitle({ className = "", ...p }) { return <h3 className={`font-semibold ${className}`} {...p} />; }
export function CardDescription({ className = "", ...p }) { return <p className={`text-sm text-gray-600 ${className}`} {...p} />; }
