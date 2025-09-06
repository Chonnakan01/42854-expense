'use client';
export default function SummaryCards({ income, expense, balance }:{ income:number; expense:number; balance:number }){
const fmt = (n:number)=> n.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
const Item = ({label, value}:{label:string; value:number}) => (
<div className="flex-1 bg-white rounded-2xl shadow p-4">
<div className="text-sm text-gray-500">{label}</div>
<div className="text-xl font-semibold">{fmt(value)}</div>
</div>
);
return (
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
<Item label="รายรับทั้งเดือน" value={income} />
<Item label="รายจ่ายทั้งเดือน" value={expense} />
<Item label="ยอดคงเหลือ" value={balance} />
</div>
);
}