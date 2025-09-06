import "@/app/globals.css";
import { ReactNode } from "react";


// If you want to use environment variables, do it inside a function or server component.
// For static export, use a direct string:
export const metadata = { title: "Expense Tracker" };


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="th">
<body className="min-h-screen bg-gray-50 text-gray-900">
<div className="max-w-5xl mx-auto p-6">{children}</div>
</body>
</html>
);
}