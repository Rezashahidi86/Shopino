import React from "react";
import { FiFilter, FiSliders, FiX } from "react-icons/fi";
import FilterBox from "./FilterBox";

function AsideFilterMobile({
  setMobileFilterOpen,
  price,
  setPrice,
  dispatch,
  category,
  filtersProduct,
  mobileFilterOpen,
}) {
  return (
    <div
      className={`fixed inset-0 z-[100]  ${
        mobileFilterOpen ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={() => setMobileFilterOpen(false)}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          mobileFilterOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`absolute top-0 right-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-[#18233a] ${
          mobileFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-[#18233a]">
          <div className="flex items-center gap-2">
            <FiFilter className="text-violet-500" />

            <h2 className="font-extrabold text-slate-800 dark:text-white">
              فیلترها
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(false)}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            <FiX />
          </button>
        </div>

        <div className="px-5">
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
                value={price.max}
                placeholder="حداکثر"
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

          {category?.filters?.map((filter) => (
            <FilterBox
              key={filter._id}
              filter={filter}
              filterValues={filtersProduct?.filterValues}
              onChange={dispatch}
            />
          ))}

          <button
            type="button"
            onClick={() => setMobileFilterOpen(false)}
            className="cursor-pointer my-5 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white hover:bg-violet-700"
          >
            نمایش محصولات
          </button>

          {filtersProduct.filterValues && (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "delete_filters" });
              }}
              className="mb-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              حذف همه فیلترها
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export default AsideFilterMobile;
