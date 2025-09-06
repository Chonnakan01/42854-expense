import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rangeForMonth } from "@/lib/utils";


export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);
const month = searchParams.get("month");
if (!month) return NextResponse.json({ error: "month required" }, { status: 400 });
const { from, to } = rangeForMonth(month);
const items = await prisma.transaction.findMany({
where: { spendDate: { gte: from, lte: to } },
orderBy: [{ spendDate: "asc" }, { id: "asc" }],
});
return NextResponse.json(items);
}