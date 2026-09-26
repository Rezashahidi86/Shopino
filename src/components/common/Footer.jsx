import { Link } from "react-router";
import {
  FiChevronLeft,
  FiGithub,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import getAllCategories from "../../services/category/category.service";

const Footer = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const fetchCategory = async () => {
      const responce = await getAllCategories();
      setCategories(responce.data.categories.slice(0, 4));
    };
    fetchCategory();
  });
  const quickLinks = [
    {
      title: "صفحه اصلی",
      to: "/",
    },
    {
      title: "محصولات",
      to: "/products",
    },
    {
      title: "سبد خرید",
      to: "/cart",
    },
    {
      title: "درباره ما",
      to: "/about-us",
    },
    {
      title: "ارتباط با ما",
      to: "/communication",
    },
  ];

  return (
    <footer
      dir="rtl"
      className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#0f172a]"
    >
      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200 dark:bg-violet-500 dark:shadow-violet-950/30">
                <FiShoppingBag className="text-xl" />
              </span>

              <span className="text-2xl font-extrabold text-slate-800 dark:text-white">
                Shop
                <span className="text-violet-600 dark:text-violet-400">
                  ino
                </span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Shopino یک فروشگاه آنلاین برای تجربه‌ای ساده، سریع و مطمئن در خرید
              محصولات متنوع است.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://t.me/RezaShahidi01"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-500 dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10 dark:hover:text-sky-400"
              >
                <FaTelegramPlane className="text-lg" />
              </a>

              <a
                href="https://github.com/Rezashahidi86"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <FiGithub className="text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              دسترسی سریع
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    <FiChevronLeft className="text-xs transition-transform group-hover:-translate-x-1" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              دسته‌بندی‌ها
            </h3>

            <ul className="mt-5 space-y-3">
              {categories &&
                categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/category/${category._id}?page=1`}
                      className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                    >
                      <FiChevronLeft className="text-xs transition-transform group-hover:-translate-x-1" />
                      {category.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              ارتباط با Shopino
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="tel:09135326786"
                className="flex items-start gap-3 text-sm text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FiPhone />
                </span>

                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    شماره تماس
                  </p>
                  <p className="mt-1" dir="ltr">
                    09135326786
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FiMapPin />
                </span>

                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    فروشگاه آنلاین
                  </p>
                  <p className="mt-1 leading-6">
                    خرید آنلاین، سریع و آسان از Shopino
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700/70 dark:bg-[#18233a]">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              خرید آسان
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              محصولات موردنظر خود را سریع پیدا و سفارش دهید.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700/70 dark:bg-[#18233a]">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              تجربه مطمئن
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              تلاش ما ارائه تجربه‌ای ساده و قابل اعتماد است.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700/70 dark:bg-[#18233a]">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              پشتیبانی
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              برای ارتباط و دریافت راهنمایی می‌توانید با ما در تماس باشید.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Shopino. تمامی حقوق محفوظ است.</p>

          <p className="flex items-center gap-1.5">
            ساخته شده با
            <FiHeart className="text-violet-500" />
            برای یک تجربه بهتر با شما
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
