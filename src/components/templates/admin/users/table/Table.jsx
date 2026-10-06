import React from "react";
import THeaderRow from "./THeaderRow";
import HeaderCell from "./HeaderCell";
import { FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";

function Table({ users,  setSelectedUser }) {
  const maskCard = (card) => {
    if (!card) return null;

    return `${card.slice(0, 4)} **** **** ${card.slice(-4)}`;
  };
  return (
    <table className="w-full table-fixed text-right">
      <THeaderRow>
        <HeaderCell
          title={"کاربر"}
          className="px-5 py-4 text-xs font-black text-slate-500 dark:text-slate-400 max-[700px]:px-3 max-[700px]:py-3"
        ></HeaderCell>

        <HeaderCell
          title={"موبایل"}
          className="px-5 py-4 text-xs font-black text-slate-500 dark:text-slate-400 max-[700px]:px-3 max-[700px]:py-3"
        ></HeaderCell>

        <HeaderCell
          title={"کارت بانکی"}
          className="hidden px-5 py-4 text-xs font-black text-slate-500 dark:text-slate-400 md:table-cell max-[700px]:px-3 max-[700px]:py-3"
        ></HeaderCell>

        <HeaderCell
          title={"آدرس"}
          className="hidden px-5 py-4 text-xs font-black text-slate-500 dark:text-slate-400 lg:table-cell max-[700px]:px-3 max-[700px]:py-3"
        ></HeaderCell>

        <HeaderCell
          title={"اطلاعات بیشتر"}
          className="px-5 py-4 text-xs font-black text-slate-500 dark:text-slate-400 max-[700px]:px-3 max-[700px]:py-3"
        ></HeaderCell>
      </THeaderRow>
      <tbody>
        {users.map((user) => (
          <tr
            key={user._id}
            className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-700/40 dark:hover:bg-slate-800/40"
          >
            <td className="px-5 py-4 max-[700px]:px-3 max-[700px]:py-3">
              <div className="flex items-center gap-3 max-[700px]:gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400 max-[700px]:h-9 max-[700px]:w-9">
                  <FiUser size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-800 dark:text-white text-sm">
                    {user.name || "بدون نام"}
                  </p>

                  <p className="mt-1 max-w-[160px] truncate text-[11px] text-slate-400">
                    {user._id}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-5 py-4 max-[700px]:px-3 max-[700px]:py-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-[700px]:text-xs">
                {user.phone}
              </span>
            </td>

            <td className="hidden px-5 py-4 md:table-cell max-[700px]:px-3 max-[700px]:py-3">
              {user.cardNumber ? (
                <div className="flex items-center gap-2">
                  <FiCreditCard
                    size={16}
                    className="shrink-0 text-violet-500"
                  />

                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {maskCard(user.cardNumber)}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">ثبت نشده</span>
              )}
            </td>

            <td className="hidden px-5 py-4 lg:table-cell max-[700px]:px-3 max-[700px]:py-3">
              {user.addresses.length > 0 ? (
                <div className="flex items-center gap-2">
                  <FiMapPin size={16} className="shrink-0 text-emerald-500" />

                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {user.addresses.length} آدرس
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">ثبت نشده</span>
              )}
            </td>

            <td className="px-5 py-4 max-[700px]:px-3 max-[700px]:py-3">
              <button
                type="button"
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer whitespace-nowrap rounded-lg bg-violet-100 px-3 py-2 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20 max-[700px]:px-2.5 max-[700px]:py-1.5"
              >
                مشاهده
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
