import React from 'react'
export default function Button({className='',variant='default',size='md',...props}){
  const base='inline-flex items-center justify-center rounded-md border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const v={default:'bg-teal-600 text-white border-teal-700 hover:bg-teal-700',secondary:'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200',outline:'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50'}
  const s={sm:'h-8 px-3',md:'h-9 px-4',lg:'h-10 px-5'}
  return <button className={`${base} ${v[variant]} ${s[size]} ${className}`} {...props}/>
}
