import React from "react";
import {
  FiCheck,
  FiChevronDown,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from "react-icons/fi";
import SellerCart from "./SellerCart";

function ProductInfo({
  product,
  setIsSellerOpen,
  isSellerOpen,
  setseller,
  setFormAddToCart,
  seller,
  addToCart,
  formAddToCart,
}) {
  return (
    <div className="min-w-0 w-full">
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-lg bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
            محصول
          </span>

          <span
            dir="rtl"
            className="max-w-full truncate text-xs text-gray-500 dark:text-gray-400"
          >
            کد محصول: {product?.shortIdentifier}
          </span>
        </div>

        <h1 className="mt-4 break-words text-xl font-bold leading-9 text-gray-900 dark:text-white sm:text-2xl md:text-3xl md:leading-10">
          {product?.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button className="text-sm text-gray-500 transition hover:text-violet-600 dark:text-gray-400">
            {product?.commentCount} نظر
          </button>
        </div>

        <p className="mt-5 break-words text-sm leading-7 text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-base sm:leading-8">
          {product?.description}
        </p>

        <div className="my-5 h-px bg-gray-100 dark:bg-slate-700 sm:my-6" />

        <div className="rounded-2xl bg-gray-50 p-4 dark:bg-[#0f172a]">
          <button
            type="button"
            onClick={() => setIsSellerOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 text-right"
          >
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">
                انتخاب فروشنده
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                فروشنده موردنظر خود را انتخاب کنید
              </p>
            </div>

            <FiChevronDown
              className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                isSellerOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isSellerOpen
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <SellerCart
                product={product}
                seller={seller}
                setseller={setseller}
                setFormAddToCart={setFormAddToCart}
              ></SellerCart>
              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      فروشنده انتخاب‌شده
                    </p>

                    <p className="mt-1 truncate font-bold text-gray-800 dark:text-white">
                      {seller?.seller?.name}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-lg bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                    ا نتخاب شده
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-100 p-4 dark:border-slate-700 sm:mt-5 sm:p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">قیمت</p>

          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="break-all text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              {new Intl.NumberFormat("fa-IR").format(seller?.price)}
            </span>

            <span className="mb-1 text-sm text-gray-500">تومان</span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />

            <span className="text-green-600 dark:text-green-400">
              موجود در انبار ({seller?.stock?.toLocaleString("fa-IR")})
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row">
          <div className="flex h-14 w-full shrink-0 items-center justify-between rounded-xl border border-gray-200 px-3 dark:border-slate-700 sm:w-36">
            <button
              onClick={() => {
                setFormAddToCart((prev) => {
                  return {
                    ...prev,
                    quantity:
                      seller.stock === formAddToCart.quantity
                        ? formAddToCart.quantity
                        : formAddToCart.quantity + 1,
                  };
                });
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition hover:bg-violet-600 hover:text-white dark:bg-slate-700 dark:text-white"
            >
              <FiPlus />
            </button>

            <span className="min-w-10 text-center font-bold dark:text-white">
              {formAddToCart.quantity}
            </span>

            <button
              onClick={() => {
                setFormAddToCart((prev) => {
                  return {
                    ...prev,
                    quantity:
                      formAddToCart.quantity === 1
                        ? 1
                        : formAddToCart.quantity - 1,
                  };
                });
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition hover:bg-violet-600 hover:text-white dark:bg-slate-700 dark:text-white"
            >
              <FiMinus />
            </button>
          </div>

          <button
            onClick={addToCart}
            className="flex min-w-0 h-14 w-full flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700 sm:gap-3 sm:text-base"
          >
            <FiShoppingCart className="shrink-0 text-xl" />
            <span className="truncate">افزودن به سبد خرید</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
