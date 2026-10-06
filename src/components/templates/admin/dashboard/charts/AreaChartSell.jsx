import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function AreaChartSell() {
  const salesData = [
    { month: "فروردین", sales: 24 },
    { month: "اردیبهشت", sales: 38 },
    { month: "خرداد", sales: 31 },
    { month: "تیر", sales: 48 },
    { month: "مرداد", sales: 57 },
    { month: "شهریور", sales: 69 },
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-[#18233a]">
        <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-800 dark:text-white">
          {payload[0].value.toLocaleString("fa-IR")}
        </p>
      </div>
    );
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-[#18233a]">
      <div className="mb-6">
        <h2 className="font-black text-slate-800 dark:text-white">
          میزان فروش
        </h2>

        <p className="mt-1 text-xs text-slate-400">روند فروش در ماه‌های اخیر</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#94a3b8"
              opacity={0.15}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AreaChartSell;
