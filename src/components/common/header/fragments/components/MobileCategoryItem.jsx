import { Link } from "react-router";
const MobileCategoryItem = ({ category }) => {
  return (
    <Link
      to={`/category/${category._id}?page=1`}
      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-400"
    >
      <span>{category.title}</span>
    </Link>
  );
};
export default MobileCategoryItem;
