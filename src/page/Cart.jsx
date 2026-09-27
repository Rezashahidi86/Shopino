import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import EmptyCart from "../components/templates/cart/emptyCart";
import CartCard from "../components/templates/cart/CartCard";
import useCart from "../lib/Hooks/useCart";

const Cart = () => {
  const [loading, items, removeFromCart, updateFromCart, submitCart] = useCart()
  return (
    <>
      {loading ? (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4">
          <div className="h-[280px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      ) : (
        items && (
          <main
            dir="rtl"
            className="min-h-screen bg-slate-100 px-3 py-6 dark:bg-[#0f172a] sm:px-4 sm:py-8"
          >
            <div className="mx-auto w-full max-w-[1100px]">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FiShoppingCart className="text-xl" />
                </div>

                <div>
                  <h1 className="text-xl font-black text-slate-800 dark:text-white sm:text-2xl">
                    سبد خرید
                  </h1>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {items.length > 0
                      ? `${items.length} محصول در سبد خرید`
                      : "سبد خرید شما خالی است"}
                  </p>
                </div>
              </div>

              {items.length === 0 ? (
                <EmptyCart></EmptyCart>
              ) : (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                  <section className="min-w-0 space-y-4">
                    {items.map((item) => (
                      <CartCard
                        item={item}
                        updateFromCart={updateFromCart}
                        removeFromCart={removeFromCart}
                      ></CartCard>
                    ))}
                  </section>

                  <aside className="h-fit lg:sticky lg:top-5">
                    <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-[#18233a] sm:p-6">
                      <h2 className="font-black text-slate-800 dark:text-white">
                        خلاصه سفارش
                      </h2>

                      <div className="mt-5 space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">
                            قیمت کالاها
                          </span>

                          <span className="font-bold text-slate-800 dark:text-white">
                            {items
                              .reduce(
                                (a, b) => a + b?.originalPrice * b.quantity,
                                0,
                              )
                              .toLocaleString("fa-IR")}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">
                            تخفیف
                          </span>

                          <span className="font-bold text-green-600">
                            {items
                              .reduce(
                                (a, b) =>
                                  a + (b?.originalPrice * b?.discount) / 100,
                                0,
                              )
                              .toLocaleString("fa-IR")}
                          </span>
                        </div>

                        <div className="border-t border-dashed border-slate-200 pt-4 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              مبلغ قابل پرداخت
                            </span>

                            <span className="font-black text-violet-600 dark:text-violet-400">
                              {items
                                .reduce(
                                  (a, b) => a + b?.discountedPrice * b.quantity,
                                  0,
                                )
                                .toLocaleString("fa-IR")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={submitCart}
                        type="button"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3.5 text-sm font-black text-white transition hover:bg-violet-700"
                      >
                        ادامه فرایند خرید
                        <FiArrowLeft />
                      </button>
                    </div>
                  </aside>
                </div>
              )}
            </div>
          </main>
        )
      )}
    </>
  );
};

export default Cart;
