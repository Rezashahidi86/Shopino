import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarUsersOrders() {
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
  const ordersData = [
    { month: "فروردین", orders: 120 },
    { month: "اردیبهشت", orders: 185 },
    { month: "خرداد", orders: 240 },
    { month: "تیر", orders: 310 },
    { month: "مرداد", orders: 385 },
    { month: "شهریور", orders: 460 },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-[#18233a]">
      <div className="mb-6">
        <h2 className="font-black text-slate-800 dark:text-white">
          تعداد سفارش‌ها
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          مقایسه تعداد سفارش‌ها در ماه‌های اخیر
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ordersData}>
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

            <Bar
              dataKey="orders"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarUsersOrders;
