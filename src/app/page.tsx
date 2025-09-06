'use client';
import { useEffect, useMemo, useState } from 'react';
import MonthPicker from '@/components/MonthPicker';
import SummaryCards from '@/components/SummaryCards';
import TransactionsTable from '@/components/TransactionsTable';
import TransactionForm from '@/components/TransactionForm';


export default function Page() {
const [month, setMonth] = useState<string>(new Date().toISOString().slice(0,7));
const [items, setItems] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
const [editing, setEditing] = useState<any | null>(null);


const refresh = async (m = month) => {
setLoading(true);
const res = await fetch(`/api/transactions?month=${m}`);
const data = await res.json();
setItems(data);
setLoading(false);
};


const summary = useMemo(() => {
const income = items.filter(i=>i.type==='INCOME').reduce((a,b)=>a+Number(b.amount),0);
const expense = items.filter(i=>i.type==='EXPENSE').reduce((a,b)=>a+Number(b.amount),0);
return { income, expense, balance: income-expense };
}, [items]);


useEffect(()=>{ refresh(); }, [month]);


return (
<div className="space-y-6">
<h1 className="text-2xl font-semibold">ระบบบันทึกรายรับรายจ่ายประจำเดือน</h1>
<div className="flex items-center gap-3">
<MonthPicker value={month} onChange={(v)=>setMonth(v)} />
<button onClick={()=>refresh()} className="px-3 py-2 rounded-2xl bg-black text-white shadow">รีเฟรช</button>
<button onClick={()=>setEditing({})} className="px-3 py-2 rounded-2xl bg-white border shadow">+ เพิ่มรายการ</button>
</div>
<SummaryCards income={summary.income} expense={summary.expense} balance={summary.balance} />
<TransactionsTable
items={items}
loading={loading}
onEdit={(it)=>setEditing(it)}
onDelete={async(id)=>{ await fetch(`/api/transactions/${id}`, { method:'DELETE' }); refresh(); }}
/>
<TransactionForm
open={!!editing}
initial={editing}
onClose={()=>setEditing(null)}
onSaved={()=>{ setEditing(null); refresh(); }}
/>
</div>
);
}