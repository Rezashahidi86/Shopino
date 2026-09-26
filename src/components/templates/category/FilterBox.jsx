import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSliders } from "react-icons/fi";

function FilterBox({ filter, filterValues, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5 last:border-b-0 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <FiSliders className="text-violet-500" />
          <span className="font-bold text-slate-800 dark:text-white">
            {filter.name}
          </span>
        </div>

        {isOpen ? (
          <FiChevronUp className="text-slate-800 dark:text-white" />
        ) : (
          <FiChevronDown className="text-slate-800 dark:text-white" />
        )}
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {filter.type === "radio" && (
            <div className="space-y-3">
              {filter.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  <input
                    type="radio"
                    name={filter.slug}
                    value={option}
                    checked={
                      filterValues && Object.hasOwn(filterValues, filter.slug)
                        ? filterValues[filter.slug] === option
                          ? true
                          : false
                        : false
                    }
                    onChange={(event) =>
                      onChange({
                        type: "filter_value",
                        value: event.target.value,
                        key: filter.slug,
                      })
                    }
                    className="h-4 w-4 accent-violet-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {filter.type === "selectbox" && (
            <select
              value={
                filterValues && Object.hasOwn(filterValues, filter.slug)
                  ? filterValues[filter.slug]
                  : ""
              }
              onChange={(event) =>
                onChange({
                  type: "filter_value",
                  value: event.target.value,
                  key: filter.slug,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="">همه</option>

              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
