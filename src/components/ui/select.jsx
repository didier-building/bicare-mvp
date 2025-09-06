import React, { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext(null);

function collectItems(children, out) {
  React.Children.forEach(children, (child) => {
    if (!child) return;
    if (child.type && child.type.__isSelectItem) {
      out.push({ value: child.props.value, label: child.props.children });
    } else if (child.props?.children) {
      collectItems(child.props.children, out);
    }
  });
}

export function Select({ value, defaultValue, onValueChange, children, className = "", ...props }) {
  const [val, setVal] = useState(value ?? defaultValue ?? "");
  useEffect(() => { if (value !== undefined) setVal(value); }, [value]);
  const set = (v) => { if (value === undefined) setVal(v); onValueChange && onValueChange(v); };
  const items = []; collectItems(children, items);
  return (
    <Ctx.Provider value={{ value: val, setValue: set, items }}>
      <div className={className} {...props}>
        <select value={val} onChange={(e) => set(e.target.value)} className="border rounded-md px-3 py-2 w-full">
          {items.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className="hidden">{children}</div>
      </div>
    </Ctx.Provider>
  );
}

export function SelectTrigger({ children, ...props }) { return <div {...props}>{children}</div>; }
export function SelectValue({ placeholder }) {
  const ctx = useContext(Ctx) || {};
  const current = ctx.items?.find((o) => o.value === ctx.value);
  return <span>{current ? current.label : (placeholder || "")}</span>;
}
export function SelectContent({ children, ...props }) { return <div {...props}>{children}</div>; }

export function SelectItem({ value, children, ...props }) {
  function Marker(){ return null; }
  Marker.__isSelectItem = true;
  return <Marker value={value} {...props}>{children}</Marker>;
}
SelectItem.__isSelectItem = true;
