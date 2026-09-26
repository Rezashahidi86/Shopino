import React from "react";
import { FiLayers } from "react-icons/fi";

function CategoryHeader({category}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/70 dark:bg-[#18233a] sm:p-8">
      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-500/10" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200/50 dark:bg-violet-500 dark:shadow-violet-950/30">
            <FiLayers   className="text-2xl" />
          </div>

          <div>
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
              دسته‌بندی محصولات
            </p>

            <h1 className="mt-1 text-2xl font-extrabold text-slate-800 dark:text-white sm:text-3xl">
              {category.title}
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-500 dark:text-slate-400">
          {category.description}
        </p>
      </div>
    </section>
  );
}

export default CategoryHeader;
