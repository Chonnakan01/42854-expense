import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { rangeForMonth } from "@/lib/utils";


const TxSchema = z.object({
type: z.enum(["INCOME", "EXPENSE"]),
title: z.string().min(1).max(255),
amount: z.coerce.number().multipleOf(0.01).nonnegative(),
spendDate: z.coerce.date(),
});


export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);
const month = searchParams.get("month"); // e.g. 2025-08
const where = month
? (() => {
const r = rangeForMonth(month);
return { spendDate: { gte: r.from, lte: r.to } };
})()
: {};
const data = await prisma.transaction.findMany({
where,
orderBy: { spendDate: "asc" },
});
return NextResponse.json(data);
}


export async function POST(req: NextRequest) {
try {
const body = await req.json();
const parsed = TxSchema.parse(body);
const created = await prisma.transaction.create({ data: parsed });
return NextResponse.json(created, { status: 201 });
} catch (e: any) {
return NextResponse.json({ error: e.message }, { status: 400 });
}
}