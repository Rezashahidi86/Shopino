import { Link } from "react-router";
import { FiArrowRight, FiHome, FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-100 px-4 py-12 dark:bg-[#0f172a]">
      <div className="w-full max-w-2xl text-center">
        <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl" />

          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-violet-200 bg-white shadow-xl dark:border-violet-500/20 dark:bg-[#18233a] sm:h-44 sm:w-44">
            <span className="text-6xl font-black tracking-tight text-violet-600 dark:text-violet-400 sm:text-7xl">
              404
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            صفحه موردنظر پیدا نشد!
          </h1>

          <p className="mx-auto max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد یا آدرس آن
            تغییر کرده است.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700 sm:w-auto"
          >
            <FiHome />
            بازگشت به صفحه اصلی
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-200 dark:hover:border-violet-500 dark:hover:text-violet-400 sm:w-auto"
          >
            <FiArrowRight />
            بازگشت به صفحه قبل
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <FiSearch />
          <span>آدرس واردشده را بررسی کنید</span>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
