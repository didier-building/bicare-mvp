import React from 'react'
export const Card=({className='',...p})=><div className={`bg-white border rounded-xl ${className}`} {...p}/>
export const CardHeader=({className='',...p})=><div className={`p-4 ${className}`} {...p}/>
export const CardContent=({className='',...p})=><div className={`p-4 ${className}`} {...p}/>
export const CardTitle=({className='',...p})=><h3 className={`text-lg font-semibold ${className}`} {...p}/>
export const CardDescription=({className='',...p})=><p className={`text-sm text-gray-600 ${className}`} {...p}/>
