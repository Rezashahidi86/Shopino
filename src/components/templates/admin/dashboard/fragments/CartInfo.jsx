import React from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

function CartInfo({ item }) {
  const Icon = item.icon;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-[#18233a]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {item.title}
          </p>

          <h3 className="mt-3 text-2xl font-black text-slate-800 dark:text-white">
            {item.value}
            {item.title === "فروش امروز" && (
              <span className="mr-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                تومان
              </span>
            )}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span
          className={`flex items-center gap-1 text-xs font-bold ${
            item.positive ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {item.positive ? <FiArrowUp size={13} /> : <FiArrowDown size={13} />}

          {item.change}
        </span>

        <span className="text-xs text-slate-400">نسبت به ماه قبل</span>
      </div>
    </div>
  );
}

export default CartInfo;
