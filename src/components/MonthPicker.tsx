'use client';
export default function MonthPicker({ value, onChange }:{ value:string; onChange:(v:string)=>void }){
return (
<input
type="month"
value={value}
onChange={(e)=>onChange(e.target.value)}
className="border rounded-2xl px-3 py-2 bg-white"
/>
);
}