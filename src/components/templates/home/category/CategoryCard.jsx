import { Link } from "react-router";
import { FiArrowLeft, FiLayers, FiSliders } from "react-icons/fi";
const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category._id}?page=1`}
      dir="rtl"
      className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-violet-50/60 to-fuchsia-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/40 dark:border-slate-700/70 dark:from-[#18233a] dark:via-[#1d263d] dark:to-[#25203d] dark:hover:shadow-violet-950/30"
    >
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-violet-200/40 blur-2xl dark:bg-violet-500/10" />
      <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-fuchsia-200/40 blur-2xl dark:bg-fuchsia-500/10" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-300/30 dark:bg-violet-500 dark:shadow-violet-950/30">
            <FiLayers className="text-2xl" />
          </div>

          <span className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-violet-600 backdrop-blur-sm dark:bg-slate-800/70 dark:text-violet-300">
            {category.subCategories?.length || 0} زیرمجموعه
          </span>
        </div>

        <h3 className="h-8 mt-5 text-xl font-extrabold text-slate-800 dark:text-white line-clamp-1">
          {category.title}
        </h3>

        <p className="h-12 mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {category.description}
        </p>

        {
          <div className="h-8 mt-4 flex flex-wrap gap-2">
            {category.filters?.length > 0 &&
              category.filters.slice(0, 3).map((filter) => (
                <span
                  key={filter._id}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300"
                >
                  <FiSliders className="text-violet-500" />
                  {filter.name}
                </span>
              ))}
          </div>
        }

        <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-700">
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
            مشاهده محصولات
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-transform duration-300 group-hover:-translate-x-1 dark:bg-violet-500/10 dark:text-violet-400">
            <FiArrowLeft />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
