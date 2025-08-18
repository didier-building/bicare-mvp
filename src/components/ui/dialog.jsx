import React from 'react'
const C=React.createContext(null)
export const Dialog=({children})=>{const [open,setOpen]=React.useState(false); return <C.Provider value={{open,setOpen}}>{children}</C.Provider>}
export const DialogTrigger=({asChild,children})=>{const c=React.useContext(C);return React.cloneElement(children,{onClick:(e)=>{children.props.onClick&&children.props.onClick(e);c.setOpen(true)}})}
export const DialogContent=({className='',children})=>{const c=React.useContext(C); if(!c.open) return null; return (<div className="fixed inset-0 z-50"><div className="absolute inset-0 bg-black/40" onClick={()=>c.setOpen(false)}></div><div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[640px] rounded-xl bg-white border shadow ${className}`}>{children}</div></div>)}
export const DialogHeader=({className='',...p})=><div className={`p-4 pb-0 ${className}`} {...p}/>
export const DialogTitle=({className='',...p})=><h3 className={`text-lg font-semibold ${className}`} {...p}/>
export const DialogDescription=({className='',...p})=><p className={`text-sm text-gray-600 ${className}`} {...p}/>
export const DialogFooter=({className='',...p})=><div className={`p-4 flex gap-2 justify-end ${className}`} {...p}/>
