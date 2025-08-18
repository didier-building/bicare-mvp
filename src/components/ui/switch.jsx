import React, { useEffect, useState } from "react";
export function Switch({ checked, defaultChecked, onCheckedChange, className = "", id, ...props }) {
  const [value, setValue] = useState(checked ?? defaultChecked ?? false);
  useEffect(() => { if (checked !== undefined) setValue(!!checked); }, [checked]);
  const onChange = (e) => {
    const v = e.target.checked;
    if (checked === undefined) setValue(v);
    onCheckedChange && onCheckedChange(v);
  };
  return <input id={id} type="checkbox" className={`h-4 w-8 accent-teal-600 ${className}`} checked={!!value} onChange={onChange} {...props} />;
}
