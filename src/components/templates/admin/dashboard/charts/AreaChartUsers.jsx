import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AreaChartUsers() {
  const usersData = [
    { month: "فروردین", users: 420 },
    { month: "اردیبهشت", users: 580 },
    { month: "خرداد", users: 760 },
    { month: "تیر", users: 910 },
    { month: "مرداد", users: 1180 },
    { month: "شهریور", users: 1420 },
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
          رشد اعضای سایت
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          تعداد اعضای ثبت‌نام‌شده در ماه‌های اخیر
        </p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={usersData}>
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
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
              dataKey="users"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#usersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AreaChartUsers;
