import React, { useContext } from "react";
import { FiChevronRight, FiLogOut, FiSettings, FiX } from "react-icons/fi";
import { NavLink } from "react-router";
import { AuthContext } from "../../../context/AuthProvider";

function Aside({ sidebarOpen, setSidebarOpen, menuItems }) {
  const { logOut } = useContext(AuthContext);
  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-screen w-[280px] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-slate-700/60 dark:bg-[#18233a] lg:translate-x-0 lg:shadow-none ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-700/60">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-lg font-black text-white shadow-lg shadow-violet-500/20">
            S
          </div>

          <div className="text-right">
            <p className="text-base font-black text-slate-900 dark:text-white">
              Shopino
            </p>

            <p className="text-[11px] font-medium text-slate-400">پنل مدیریت</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white lg:hidden"
        >
          <FiX />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-[11px] font-bold text-slate-400">
          مدیریت فروشگاه
        </p>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                      : "text-slate-600 hover:bg-violet-50 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
                  }`
                }
              >
                <Icon className="shrink-0 text-[19px]" />

                <span className="flex-1">{item.title}</span>

                <FiChevronRight className="text-xs opacity-50" />
              </NavLink>
            );
          })}
        </nav>

        <div className="my-5 h-px bg-slate-100 dark:bg-slate-700/60" />

        <p className="mb-3 px-3 text-[11px] font-bold text-slate-400">سیستم</p>

        <nav className="space-y-1.5">
          <NavLink
            to="/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
              }`
            }
          >
            <FiSettings className="text-[19px]" />
            <span>تنظیمات</span>
          </NavLink>
        </nav>
      </div>

      <div className="shrink-0 border-t border-slate-100 p-4 dark:border-slate-700/60">
        <button
          type="button"
          onClick={logOut}
          className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
        >
          <FiLogOut />
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}

export default Aside;
