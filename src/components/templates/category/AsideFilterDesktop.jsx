import React from "react";
import { FiFilter, FiSliders } from "react-icons/fi";
import FilterBox from "./FilterBox";

function AsideFilterDesktop({
  price,
  setPrice,
  category,
  filtersProduct,
  dispatch,
}) {
  return (
    <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white px-5 shadow-sm dark:border-slate-700/70 dark:bg-[#18233a] lg:block">
      <div className="flex items-center justify-between border-b border-slate-200 py-5 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <FiFilter className="text-violet-500" />

          <h2 className="font-extrabold text-slate-800 dark:text-white">
            فیلترها
          </h2>
        </div>

        {filtersProduct.filterValues && (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "delete_filters" });
            }}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
          >
            حذف همه
          </button>
        )}
      </div>

      <div className="border-b border-slate-200 py-5 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <FiSliders className="text-violet-500" />

          <span className="font-bold text-slate-800 dark:text-white">
            محدوده قیمت
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <input
            type="number"
            value={price.min}
            placeholder="حداقل"
            onChange={(event) => {
              setPrice({
                max: price.max,
                min: event.target.value,
              });

              dispatch({
                type: "min_price",
                Minprice: event.target.value,
              });
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <input
            type="number"
            placeholder="حداکثر"
            value={price.max}
            onChange={(event) => {
              setPrice({
                min: price.min,
                max: event.target.value,
              });

              dispatch({
                type: "max_price",
                Maxprice: event.target.value,
              });
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {category?.filters &&
        category.filters.map((filter) => (
          <FilterBox
            key={filter._id}
            filter={filter}
            filterValues={filtersProduct?.filterValues}
            onChange={dispatch}
          />
        ))}
    </aside>
  );
}

export default AsideFilterDesktop;
