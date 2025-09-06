import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rangeForMonth } from "@/lib/utils";


export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);
const month = searchParams.get("month");
if (!month) return NextResponse.json({ error: "month required (yyyy-mm)" }, { status: 400 });
const { from, to } = rangeForMonth(month);


const data = await prisma.transaction.groupBy({
by: ["type"],
where: { spendDate: { gte: from, lte: to } },
_sum: { amount: true },
});


const income = Number(data.find(d => d.type === "INCOME")?._sum.amount || 0);
const expense = Number(data.find(d => d.type === "EXPENSE")?._sum.amount || 0);
const balance = income - expense;
return NextResponse.json({ month, income, expense, balance });
}