import React from 'react'
export const Badge=({className='',variant='default',...p})=>{
  const st={default:'bg-gray-900 text-white',secondary:'bg-gray-100 text-gray-800',outline:'border border-gray-300 text-gray-700'}
  return <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${st[variant]} ${className}`} {...p}/>
}
