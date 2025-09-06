'use client';
import { useEffect, useState } from 'react';


export default function TransactionForm({ open, initial, onClose, onSaved }: { open: boolean; initial: any; onClose: () => void; onSaved: () => void }) {
    const isEdit = !!initial?.id;
    const [type, setType] = useState<string>('EXPENSE');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState<string>('0.00');
    const [spendDate, setSpendDate] = useState<string>(new Date().toISOString().slice(0, 10));


    useEffect(() => {
        if (open) {
            setType(initial?.type || 'EXPENSE');
            setTitle(initial?.title || '');
            setAmount(initial?.amount ? Number(initial.amount).toFixed(2) : '0.00');
            setSpendDate(initial?.spendDate ? new Date(initial.spendDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
        }
    }, [open, initial]);


    const submit = async () => {
        const payload = { type, title, amount: Number(amount), spendDate };
        const res = await fetch(isEdit ? `/api/transactions/${initial.id}` : '/api/transactions', {
            method: isEdit ? 'PATCH' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) onSaved();
    };


    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-4 space-y-3">
                <h2 className="text-lg font-semibold">{isEdit ? 'แก้ไขรายการ' : 'เพิ่มรายการ'}</h2>
                <div className="space-y-2">
                    <label className="block text-sm">ประเภท</label>
                    <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded-xl px-3 py-2">
                        <option value="INCOME">รายรับ</option>
                        <option value="EXPENSE">รายจ่าย</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm">ชื่อรายการ</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm">จำนวนเงิน (ทศนิยม 2 ตำแหน่ง)</label>
                    <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm">วันที่ใช้จ่าย</label>
                    <input type="date" value={spendDate} onChange={e => setSpendDate(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="px-3 py-2 rounded-xl border">ยกเลิก</button>
                    <button onClick={submit} className="px-3 py-2 rounded-xl bg-black text-white">บันทึก</button>
                </div>
            </div>
        </div>
    );
}