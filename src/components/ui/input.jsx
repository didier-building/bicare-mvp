import React from 'react'
export const Input=React.forwardRef(function Input({className='',...p},ref){
  return <input ref={ref} className={`h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`} {...p}/>
})
