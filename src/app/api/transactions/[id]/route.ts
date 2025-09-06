import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";


const PatchSchema = z.object({
type: z.enum(["INCOME", "EXPENSE"]).optional(),
title: z.string().min(1).max(255).optional(),
amount: z.coerce.number().multipleOf(0.01).nonnegative().optional(),
spendDate: z.coerce.date().optional(),
});


export async function PATCH(_req: NextRequest, { params }: { params: { id: string } }) {
try {
const id = Number(params.id);
const body = await _req.json();
const parsed = PatchSchema.parse(body);
const updated = await prisma.transaction.update({ where: { id }, data: parsed });
return NextResponse.json(updated);
} catch (e: any) {
return NextResponse.json({ error: e.message }, { status: 400 });
}
}


export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
try {
const id = Number(params.id);
await prisma.transaction.delete({ where: { id } });
return NextResponse.json({ ok: true });
} catch (e: any) {
return NextResponse.json({ error: e.message }, { status: 400 });
}
}