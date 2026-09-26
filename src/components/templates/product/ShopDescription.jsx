import React from "react";
import { FiCheck, FiPackage, FiTruck } from "react-icons/fi";

function ShopDescription() {
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-5 dark:bg-[#18233a]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10">
          <FiTruck className="text-xl" />
        </div>

        <div>
          <p className="font-bold text-gray-800 dark:text-white">ارسال سریع</p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ارسال سفارش در سریع‌ترین زمان
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-white p-5 dark:bg-[#18233a]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10">
          <FiCheck className="text-xl" />
        </div>

        <div>
          <p className="font-bold text-gray-800 dark:text-white">تضمین اصالت</p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            تضمین کیفیت و اصالت کالا
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-white p-5 dark:bg-[#18233a]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10">
          <FiPackage className="text-xl" />
        </div>

        <div>
          <p className="font-bold text-gray-800 dark:text-white">
            بسته‌بندی ایمن
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            بسته‌بندی مناسب برای ارسال
          </p>
        </div>
      </div>
    </section>
  );
}

export default ShopDescription;
