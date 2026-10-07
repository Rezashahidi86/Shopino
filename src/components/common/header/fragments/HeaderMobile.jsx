import { Link } from "react-router";
import { FiUser, FiPhone, FiMessageCircle } from "react-icons/fi";
import MobileCategoryItem from "./components/MobileCategoryItem";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
function HeaderMobile({ isOpen, setIsOpen, categories }) {
  const { infoUser } = useContext(AuthContext);
  const isAdmin = infoUser?.roles.join("").includes("ADMIN");
  return (
    <div
      className={`overflow-hidden transition-all duration-300 lg:hidden ${
        isOpen ? "border-t border-slate-200 dark:border-slate-700" : "max-h-0"
      }`}
    >
      <nav className="flex flex-col gap-1 p-3">
        <Link
          to="/about-us"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-400"
        >
          <FiMessageCircle className="text-lg" />
          <span>درباره ما</span>
        </Link>

        <Link
          to="/communication"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-400"
        >
          <FiPhone className="text-lg" />
          <span>ارتباط با ما</span>
        </Link>
        <div className="grid grid-cols-2">
          {categories?.map((category) => (
            <MobileCategoryItem key={category._id} category={category} />
          ))}
        </div>
        {infoUser ? (
          <p className="cursor-pointer flex h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-all hover:bg-violet-700 lg:flex">
            <FiUser className="text-lg" />
            {isAdmin ? (
              <Link to={"/admin"}>پنل مدیریت</Link>
            ) : (
              <Link to={"/login"}>خوشامدید</Link>
            )}
          </p>
        ) : (
          <Link
            to="/login"
            className=" h-10 flex items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-all hover:bg-violet-700 lg:flex"
          >
            <FiUser className="text-lg" />
            <span>ورود / ثبت نام</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default HeaderMobile;
