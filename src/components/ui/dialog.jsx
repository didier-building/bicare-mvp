import React, { createContext, useContext, useState } from "react";
const DialogCtx = createContext(null);

export function Dialog({ open, onOpenChange, children }) {
  const [internal, setInternal] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;
  const setOpen = (v) => { if (!isControlled) setInternal(v); onOpenChange && onOpenChange(v); };
  return <DialogCtx.Provider value={{ open: isOpen, setOpen }}>{children}</DialogCtx.Provider>;
}

export function DialogTrigger({ asChild, children, ...props }) {
  const ctx = useContext(DialogCtx);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (e) => { 
        children.props?.onClick?.(e); 
        ctx?.setOpen(true); 
      },
    });
  }
  return <button {...props} onClick={() => ctx?.setOpen(true)}>{children}</button>;
}

export function DialogContent({ children, className = "", ...props }) {
  const ctx = useContext(DialogCtx);
  if (!ctx?.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => ctx.setOpen(false)} />
      <div className={`relative z-10 bg-white rounded-xl shadow-xl max-w-lg w-[90%] ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className = "", ...p }) { return <div className={`p-4 border-b ${className}`} {...p} />; }
export function DialogFooter({ className = "", ...p }) { return <div className={`p-4 border-t flex gap-2 justify-end ${className}`} {...p} />; }
export function DialogTitle({ className = "", ...p }) { return <h3 className={`font-semibold text-lg ${className}`} {...p} />; }
export function DialogDescription({ className = "", ...p }) { return <p className={`text-sm text-gray-600 ${className}`} {...p} />; }
