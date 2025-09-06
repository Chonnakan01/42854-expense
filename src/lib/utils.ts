import { startOfMonth, endOfMonth, parse } from "date-fns";


export function rangeForMonth(yyyymm: string) {
// yyyymm like "2025-08"
const d = parse(yyyymm + "-01", "yyyy-MM-dd", new Date());
return { from: startOfMonth(d), to: endOfMonth(d) };
}