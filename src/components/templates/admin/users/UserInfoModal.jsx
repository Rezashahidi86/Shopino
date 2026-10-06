import React from "react";
import { FiCreditCard, FiMapPin, FiTrash2, FiUser, FiX } from "react-icons/fi";

function UserInfoModal({ selectedUser, setSelectedUser, handleDelete }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm max-[700px]:p-2"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedUser(null);
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700/60 dark:bg-[#18233a] max-[700px]:max-h-[95vh] max-[700px]:rounded-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700/60 max-[700px]:px-3 max-[700px]:py-3">
          <div className="flex min-w-0 items-center gap-3 max-[700px]:gap-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400 max-[700px]:h-9 max-[700px]:w-9">
              <FiUser size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="font-black text-slate-800 dark:text-white max-[700px]:text-sm">
                اطلاعات کاربر
              </h2>

              <p className="mt-1 truncate text-xs text-slate-400 max-[700px]:text-[11px]">
                {selectedUser.name || "بدون نام"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedUser(null)}
            className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-100 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="space-y-4 p-5 max-[700px]:space-y-3 max-[700px]:p-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-[700px]:gap-2">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#0f172a] max-[700px]:p-3">
                <p className="text-xs font-bold text-slate-400">نام</p>

                <p className="mt-2 text-sm font-bold text-slate-800 dark:text-white max-[700px]:text-xs">
                  {selectedUser.name || "ثبت نشده"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#0f172a] max-[700px]:p-3">
                <p className="text-xs font-bold text-slate-400">شماره موبایل</p>

                <p className="mt-2 text-sm font-bold text-slate-800 dark:text-white max-[700px]:text-xs">
                  {selectedUser.phone}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#0f172a] max-[700px]:p-3">
                <p className="text-xs font-bold text-slate-400">نقش</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedUser.roles.map((role) => (
                    <span
                      key={role}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                        role === "ADMIN"
                          ? "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {role === "ADMIN"
                        ? "مدیر"
                        : role === "SELLER"
                          ? "فروشنده"
                          : "کاربر"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#0f172a] max-[700px]:p-3">
                <div className="flex items-center gap-2">
                  <FiCreditCard
                    size={17}
                    className="shrink-0 text-violet-500"
                  />

                  <p className="text-xs font-bold text-slate-400">کارت بانکی</p>
                </div>

                <p className="mt-2 break-all text-sm font-bold text-slate-800 dark:text-white max-[700px]:text-xs">
                  {selectedUser.cardNumber
                    ? selectedUser.cardNumber
                    : "ثبت نشده"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#0f172a] sm:col-span-2 max-[700px]:p-3">
                <div className="flex items-center gap-2">
                  <FiMapPin size={17} className="shrink-0 text-emerald-500" />

                  <p className="text-xs font-bold text-slate-400">آدرس‌ها</p>
                </div>

                {selectedUser.addresses.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {selectedUser.addresses.map((address, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-[#18233a]"
                      >
                        <p className="text-xs font-black text-violet-600 dark:text-violet-400">
                          {address.title}
                        </p>

                        <p className="mt-1 break-words text-sm leading-6 text-slate-600 dark:text-slate-300 max-[700px]:text-xs max-[700px]:leading-5">
                          {address.address}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-400 max-[700px]:text-xs">
                    آدرسی ثبت نشده است
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#0f172a] sm:col-span-2 max-[700px]:p-3">
                <p className="text-xs font-bold text-slate-400">شناسه کاربر</p>

                <p className="mt-2 break-all text-xs text-slate-600 dark:text-slate-300">
                  {selectedUser._id}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 p-5 dark:border-slate-700/60 max-[700px]:p-3">
          <div className="flex w-full items-center gap-2 py-2">
            <button
              type="button"
              onClick={() => handleDelete(selectedUser)}
              title="حذف کاربر"
              className="cursor-pointer flex h-9 flex-1 items-center justify-center rounded-lg bg-rose-100 text-rose-600 transition-all hover:bg-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
            >
              <FiTrash2 size={17} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedUser(null)}
            className="cursor-pointer w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-colors hover:bg-violet-700 max-[700px]:py-2.5 max-[700px]:text-xs"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfoModal;
