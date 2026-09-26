import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router";

const CategoryMegaMenu = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="absolute right-0 top-full z-50 mt-3 flex w-[800px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-[#18233a]">
      <div className="w-1/2 border-l border-slate-200 p-3 dark:border-slate-700">
        <div className="mb-2 px-3 py-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          دسته‌بندی‌ها
        </div>

        <div className="space-y-1">
          {categories?.map((category) => (
            <Link to={`category/${category._id}?page=1`}
              key={category._id}
              onMouseEnter={() => setActiveCategory(category)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                activeCategory?._id === category._id
                  ? "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <span>{category.title}</span>

              {category.subCategories?.length > 0 && (
                <FiChevronLeft className="text-base" />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="w-1/2 p-3">
        {activeCategory ? (
          <>
            <div className="mb-2 px-3 py-2 text-sm font-bold text-slate-500 dark:text-slate-400">
              {activeCategory.title}
            </div>

            <div className="space-y-1">
              {activeCategory.subCategories?.map((subCategory) => (
                <Link to={`/subCategory/${subCategory._id}`}
                  key={subCategory._id}
                  className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-400"
                >
                  {subCategory.title}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-40 items-center justify-center text-sm text-slate-400">
            یک دسته‌بندی را انتخاب کنید
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMegaMenu;
