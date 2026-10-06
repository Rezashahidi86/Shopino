import React from "react";
function THeaderRow({ children }) {
  return (
    <thead>
      <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/60 dark:bg-[#0f172a]">
        {children}
      </tr>
    </thead>
  );
}

export default THeaderRow;
