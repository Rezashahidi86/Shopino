import React from "react";
import { FiCheck } from "react-icons/fi";

function SellerCart({ product, seller, setseller, setFormAddToCart }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {product?.sellers?.map((sellerItem) => {
        const isSelected = seller?._id === sellerItem?._id;

        return (
          <button
            onClick={() => {
              setseller(sellerItem);
              setFormAddToCart((prev) => {
                return {
                  ...prev,
                  sellerId: sellerItem._id,
                };
              });
            }}
            key={sellerItem?._id}
            type="button"
            className={`w-full rounded-2xl border p-4 text-right transition ${
              isSelected
                ? "border-violet-500 bg-violet-50 shadow-sm dark:border-violet-500 dark:bg-violet-500/10"
                : "border-gray-200 bg-white hover:border-violet-300 dark:border-slate-700 dark:bg-[#18233a] dark:hover:border-violet-500/50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className={`truncate text-sm font-bold ${
                    isSelected
                      ? "text-violet-700 dark:text-violet-400"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {sellerItem?.seller?.name || "فروشنده"}
                </p>

                {sellerItem?.seller?.contactDetails?.phone && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {sellerItem.seller.contactDetails.phone}
                  </p>
                )}
              </div>

              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-gray-300 text-transparent dark:border-slate-600"
                }`}
              >
                <FiCheck className="text-sm" />
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">قیمت</p>

                <p className="mt-1 text-sm font-black text-gray-900 dark:text-white">
                  {new Intl.NumberFormat("fa-IR").format(sellerItem?.price)}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    تومان
                  </span>
                </p>
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  موجودی
                </p>

                <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
                  {sellerItem?.stock?.toLocaleString("fa-IR")} عدد
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default SellerCart;
