import React from 'react'
export const Avatar=({className='',children,...p})=><div className={`inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-700 ${className}`} {...p}>{children}</div>
export const AvatarFallback=({className='',...p})=><span className={`text-xs font-medium ${className}`} {...p}/>
