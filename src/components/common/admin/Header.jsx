import { FiMenu } from "react-icons/fi";
import { Outlet, useLoaderData, useNavigate} from "react-router";

function Header({ setSidebarOpen }) {
  const infoUser = useLoaderData();
  const navigate = useNavigate()
  return (
    <div className="min-h-screen lg:pr-[280px]">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-700/60 dark:bg-[#18233a]/90">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-violet-500 dark:hover:text-violet-400 lg:hidden"
            >
              <FiMenu />
            </button>

            <div>
              <p className="text-xs font-medium text-slate-400">پنل مدیریت</p>

              <h1 className="mt-1 text-lg font-black text-slate-900 dark:text-white sm:text-xl">
                {infoUser?.name ? (
                  infoUser?.name
                ) : (
                  <button
                    type="button"
                    className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-violet-500 dark:hover:text-violet-400 sm:flex"
                  >
                    اسم خود را وارد کنید
                  </button>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() =>navigate("/")}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-violet-500 dark:hover:text-violet-400 sm:flex"
            >
              مشاهده فروشگاه
            </button>

            <div className="flex h-10 px-2 items-center justify-center rounded-xl bg-violet-600 font-black text-white shadow-lg shadow-violet-500/20">
              {infoUser?.phone}
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
