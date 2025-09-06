'use client';
export default function TransactionsTable({ items, loading, onEdit, onDelete }:{ items:any[]; loading:boolean; onEdit:(it:any)=>void; onDelete:(id:number)=>void }){
const fmt = (n:number)=> n.toLocaleString('th-TH', { minimumFractionDigits:2, maximumFractionDigits:2 });
return (
<div className="bg-white rounded-2xl shadow overflow-hidden">
<table className="w-full text-sm">
<thead className="bg-gray-100">
<tr>
<th className="p-2 text-left">วันที่ใช้จ่าย</th>
<th className="p-2 text-left">ประเภท</th>
<th className="p-2 text-left">ชื่อรายการ</th>
<th className="p-2 text-right">จำนวนเงิน</th>
<th className="p-2"></th>
</tr>
</thead>
<tbody>
{loading && (
<tr><td colSpan={5} className="p-4 text-center">กำลังโหลด...</td></tr>
)}
{!loading && items.length===0 && (
<tr><td colSpan={5} className="p-4 text-center">ไม่มีข้อมูลในเดือนนี้</td></tr>
)}
{!loading && items.map(it=> (
<tr key={it.id} className="border-t">
<td className="p-2">{new Date(it.spendDate).toISOString().slice(0,10)}</td>
<td className="p-2">{it.type==='INCOME' ? 'รายรับ' : 'รายจ่าย'}</td>
<td className="p-2">{it.title}</td>
<td className="p-2 text-right">{fmt(Number(it.amount))}</td>
<td className="p-2 text-right space-x-2">
<button onClick={()=>onEdit(it)} className="px-3 py-1 rounded-xl border">แก้ไข</button>
<button onClick={()=>onDelete(it.id)} className="px-3 py-1 rounded-xl border bg-red-600 text-white">ลบ</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
}