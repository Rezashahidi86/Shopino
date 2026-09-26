import { useEffect, useState } from "react";
import { FiArrowLeft, FiShoppingCart, FiTrash2, FiTruck } from "react-icons/fi";
import { getCart, removeCart, updateCart } from "../services/cart/cart";
import { toast } from "sonner";

const IMAGE_BASE_URL = "https://shopino.iran.liara.run/images/";

const Cart = () => {
  const [items, setItems] = useState(null);
  const fetchCart = async () => {
    setItems(await getCart());
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const removeFromCart = (formRemoveCart) => {
    toast.promise(removeCart(formRemoveCart), {
      success: () => {
        fetchCart();
        return "با موفقیت حذف شد";
      },
      loading: "درحال حذف کردن",
    });
  };
  const updateFromCart = (formUpdateCart) => {
    console.log(formUpdateCart.quantity);
    if (formUpdateCart.quantity <= 0) {
      formUpdateCart.quantity = 1;
    } else {
      toast.promise(updateCart(formUpdateCart), {
        success: () => {
          fetchCart();
          return "با موفقیت بروزرسانی شد";
        },
        loading: "درحال تغییر...",
      });
    }
  };
  const submitCart = () => {
    toast.info("درگاه پرداخت نیست همیجا وایسا😂")
  };

  return (
    <>
      {items && (
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
              <div className="rounded-3xl bg-white px-4 py-16 text-center shadow-sm dark:bg-[#18233a] sm:py-20">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FiShoppingCart className="text-3xl" />
                </div>

                <h2 className="mt-5 text-lg font-black text-slate-800 dark:text-white">
                  سبد خرید شما خالی است
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                  هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
                </p>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                  مشاهده محصولات
                  <FiArrowLeft />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                <section className="min-w-0 space-y-4">
                  {items.map((item) => (
                    <article
                      key={item._id}
                      className="rounded-3xl bg-white p-4 shadow-sm dark:bg-[#18233a] sm:p-5"
                    >
                      <div className="flex gap-4">
                        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#0f172a] sm:h-36 sm:w-36">
                          <img
                            src={`${IMAGE_BASE_URL}${item.product.images?.[0]}`}
                            alt={item.product.name}
                            className="h-full w-full object-contain p-2"
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
                                    {item.discountedPrice.toLocaleString(
                                      "fa-IR",
                                    )}
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
      )}
    </>
  );
};

export default Cart;
