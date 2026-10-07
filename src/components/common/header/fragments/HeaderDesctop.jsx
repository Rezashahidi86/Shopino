import { Link, useLoaderData } from "react-router";
import {
  FiShoppingCart,
  FiUser,
  FiPhone,
  FiMessageCircle,
  FiGrid,
  FiMenu,
  FiX,
  FiShoppingBag,
} from "react-icons/fi";
import CategoryMegaMenu from "./components/CategoryMegaMenu";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
function HeaderDesctop({ isOpen, setIsOpen, categories }) {
  const {infoUser} = useContext(AuthContext);
  const isAdmin = infoUser?.roles.join("").includes("ADMIN");
  return (
    <div className="flex h-16 items-center justify-between px-3 sm:px-6">
      <nav className="hidden items-center lg:flex">
        <div className="group relative">
          <button
            type="button"
            className="h-12 flex items-center gap-2 border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:text-violet-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-violet-400"
          >
            <FiGrid className="text-lg" />
            <span>دسته‌بندی‌ها</span>
          </button>
          <div className="invisible absolute -right-6 z-50 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100">
            <CategoryMegaMenu categories={categories} />
          </div>
        </div>

        <Link
          to="/about-us"
          className="flex items-center gap-2 border-x border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:text-violet-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-violet-400"
        >
          <FiMessageCircle className="text-lg" />
          <span>درباره ما</span>
        </Link>

        <Link
          to="/communication"
          className="flex items-center gap-2 px-4 text-sm font-semibold text-slate-700 transition-colors hover:text-violet-600 dark:text-slate-200 dark:hover:text-violet-400"
        >
          <FiPhone className="text-lg" />
          <span>ارتباط با ما</span>
        </Link>
      </nav>

      <div className="flex items-center gap-2 lg:gap-3">
        <Link
          to="/cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-violet-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-violet-600"
        >
          <FiShoppingCart className="text-xl" />
        </Link>

        {infoUser ? (
          <p className="cursor-pointer hidden h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-all hover:bg-violet-700 lg:flex">
            <FiUser className="text-lg" />
            {isAdmin ? (
              <Link to={"/admin"}>پنل مدیریت</Link>
            ) : (
              <span>خوشامدید</span>
            )}
          </p>
        ) : (
          <Link
            to="/login"
            className="hidden h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-all hover:bg-violet-700 lg:flex"
          >
            <FiUser className="text-lg" />
            <span>ورود / ثبت نام</span>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-violet-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-violet-600 lg:hidden"
        >
          {isOpen ? (
            <FiX className="text-xl" />
          ) : (
            <FiMenu className="text-xl" />
          )}
        </button>
      </div>

      <Link
        to="/"
        className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
          <FiShoppingBag className="text-xl" />
        </span>

        <span className="text-xl font-extrabold text-slate-800 dark:text-white sm:text-2xl">
          Shop
          <span className="text-violet-600 dark:text-violet-400">ino</span>
        </span>
      </Link>
    </div>
  );
}

export default HeaderDesctop;
