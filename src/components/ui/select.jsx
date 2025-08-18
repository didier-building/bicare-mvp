import React from 'react'
function items(children,acc=[]){React.Children.forEach(children,(ch)=>{if(!ch)return;if(ch.type&&ch.type.displayName==='SelectItem'){acc.push({value:ch.props.value,label:ch.props.children})}else if(ch.props&&ch.props.children){items(ch.props.children,acc)}});return acc}
export const Select=({value,defaultValue,onValueChange,children})=>{const it=items(children);const [val,setVal]=React.useState(defaultValue??(it[0]?.value??''));const cur=value!==undefined?value:val;const onCh=e=>{const v=e.target.value;if(value===undefined)setVal(v);onValueChange&&onValueChange(v)};return <select className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm" value={cur} onChange={onCh}>{it.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select>}
export const SelectTrigger=()=>null; export const SelectValue=()=>null; export const SelectContent=()=>null; export const SelectItem=({children})=><>{children}</>
SelectItem.displayName='SelectItem'
