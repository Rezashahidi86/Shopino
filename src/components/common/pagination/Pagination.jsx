import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router";

function Pagination({ currentPage, pagination,showNumberPage }) {
  const [search, setSearch] = useSearchParams();
  return (
    <>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => {
          setSearch({ page: currentPage - 1 });
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
      >
        <FiChevronRight size={17} />
      </button>
      <div className="flex items-center gap-1">
        {showNumberPage?.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => {
              setSearch({ page });
            }}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-bold transition-colors max-[700px]:h-8 max-[700px]:min-w-8 max-[700px]:px-1.5 ${
              currentPage == page
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "border border-slate-200 text-slate-600 hover:bg-violet-50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={currentPage === pagination?.totalPages}
        onClick={() => {
          setSearch({ page: currentPage + 1 });
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
      >
        <FiChevronLeft size={17} />
      </button>
    </>
  );
}

export default Pagination;
