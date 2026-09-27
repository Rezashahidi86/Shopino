import React from "react";
import { FiTrash2, FiTruck } from "react-icons/fi";

function CartCard({ item ,removeFromCart,updateFromCart}) {
  const IMAGE_BASE_URL = "https://shopino.iran.liara.run/images/";
  return (
    <article
      key={item._id}
      className="rounded-3xl bg-white p-4 shadow-sm dark:bg-[#18233a] sm:p-5"
    >
      <div className="flex gap-4">
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#0f172a] sm:h-36 sm:w-36">
          <img
            src={
              item.product.images.length
                ? `${IMAGE_BASE_URL}${item.product.images?.[0]}`
                : `${import.meta.env.BASE_URL}assets/static/product-placeholder.png`
            }
            alt={item.product.name}
            className="h-full w-full object-cover p-2"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-sm font-black leading-6 text-slate-800 dark:text-white sm:text-base">
                {item.product.name}
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                فروشنده:{" "}
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {item.seller?.name || "فروشنده"}
                </span>
              </p>
            </div>

            <button
              onClick={() =>
                removeFromCart({
                  productId: item.product._id,
                  sellerId: item.seller._id,
                })
              }
              type="button"
              className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
            >
              <FiTrash2 />
            </button>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-black text-violet-600 dark:text-violet-400 sm:text-lg">
                    {item.discountedPrice.toLocaleString("fa-IR")}
                  </span>

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    تومان
                  </span>
                </div>
              </div>

              <div className="flex h-10 items-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    updateFromCart({
                      productId: item.product._id,
                      sellerId: item.seller._id,
                      quantity: item.quantity - 1,
                    });
                  }}
                  type="button"
                  className="flex h-full w-10 items-center justify-center text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  −
                </button>

                <span className="flex h-full min-w-10 items-center justify-center border-x border-slate-200 px-2 text-sm font-black text-slate-800 dark:border-slate-700 dark:text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() => {
                    updateFromCart({
                      productId: item.product._id,
                      sellerId: item.seller._id,
                      quantity: item.quantity + 1,
                    });
                  }}
                  type="button"
                  className="flex h-full w-10 items-center justify-center text-violet-600 transition hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-500/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700/60 dark:text-slate-400">
        <FiTruck className="text-violet-500" />
        ارسال توسط {item.seller?.name || "فروشنده"}
      </div>
    </article>
  );
}

export default CartCard;
