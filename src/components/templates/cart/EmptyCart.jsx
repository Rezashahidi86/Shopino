import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";

function EmptyCart() {
  return (
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

      <Link
        to={"/products"}
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
      >
        مشاهده محصولات
        <FiArrowLeft />
      </Link>
    </div>
  );
}

export default EmptyCart;
