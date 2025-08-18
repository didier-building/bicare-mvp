import React from 'react'
export const Textarea=React.forwardRef(function Textarea({className='',...p},ref){
  return <textarea ref={ref} className={`min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`} {...p}/>
})
