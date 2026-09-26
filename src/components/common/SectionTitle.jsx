import React from "react";

function SectionTitle({ title, des }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

        <div className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h2>

            <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">{des}</p>
        </div>

        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default SectionTitle;
