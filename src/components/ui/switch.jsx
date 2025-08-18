import React from 'react'
export const Switch=({checked,defaultChecked,onCheckedChange,id})=>{
  const [on,setOn]=React.useState(!!defaultChecked); const val=checked!==undefined?checked:on
  const toggle=()=>{const nx=!val; if(checked===undefined)setOn(nx); onCheckedChange&&onCheckedChange(nx)}
  return <button id={id} type="button" onClick={toggle} className={`h-6 w-11 rounded-full border ${val?'bg-teal-600 border-teal-700':'bg-gray-200 border-gray-300'} relative transition-colors`}>
    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transform transition-transform ${val?'translate-x-5':''}`}></span>
  </button>
}
