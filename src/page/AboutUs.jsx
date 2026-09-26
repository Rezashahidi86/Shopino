import { useState } from "react";
import { Link } from "react-router";
import {
  FiArrowLeft,
  FiChevronDown,
  FiHeadphones,
  FiHeart,
  FiLock,
  FiShoppingBag,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

const aboutItems = [
  {
    id: 1,
    icon: FiShoppingBag,
    title: "Shopino چیست؟",
    description:
      "Shopino یک فروشگاه آنلاین با هدف ایجاد تجربه‌ای ساده، سریع و قابل اعتماد برای خرید محصولات مختلف است. تلاش ما این است که کاربران بتوانند محصولات موردنظر خود را به‌راحتی پیدا کنند، اطلاعات آن‌ها را بررسی کنند و فرآیند خریدی روان داشته باشند.",
  },
  {
    id: 2,
    icon: FiTarget,
    title: "هدف ما چیست؟",
    description:
      "هدف Shopino ساخت تجربه‌ای متفاوت و ساده در خرید آنلاین است؛ تجربه‌ای که در آن پیدا کردن محصول، بررسی اطلاعات، ثبت سفارش و پیگیری خرید بدون پیچیدگی انجام شود.",
  },
  {
    id: 3,
    icon: FiUsers,
    title: "تجربه خرید در Shopino",
    description:
      "ما تلاش کرده‌ایم بخش‌های مختلف فروشگاه را به شکلی طراحی کنیم که کاربر در کمترین زمان به محصول موردنظر خود برسد. دسته‌بندی‌های منظم، جستجوی آسان و طراحی ساده از بخش‌هایی هستند که برای بهبود تجربه خرید در نظر گرفته شده‌اند.",
  },
  {
    id: 4,
    icon: FiLock,
    title: "امنیت و حریم خصوصی",
    description:
      "امنیت اطلاعات کاربران برای Shopino اهمیت زیادی دارد. اطلاعات کاربران باید با دقت مدیریت شود و فرآیندهای مرتبط با حساب کاربری و خرید با در نظر گرفتن اصول امنیتی انجام شوند.",
  },
  {
    id: 5,
    icon: FiHeart,
    title: "چرا Shopino؟",
    description:
      "Shopino با تمرکز بر سادگی، دسترسی آسان و تجربه کاربری شکل گرفته است. هدف ما این است که خرید آنلاین برای کاربران تا حد امکان ساده، سریع و لذت‌بخش باشد.",
  },
  {
    id: 6,
    icon: FiHeadphones,
    title: "ارتباط با ما",
    description:
      "اگر سؤال، پیشنهاد یا مشکلی دارید، می‌توانید از طریق صفحه ارتباط با ما پیام خود را ارسال کنید. همچنین می‌توانید از طریق راه‌های ارتباطی موجود در سایت با Shopino در تماس باشید.",
  },
];

const AboutUs = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-[#0f172a] sm:py-14"
    >
      <div className="mx-auto max-w-[900px]">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200 dark:bg-violet-500 dark:shadow-violet-950/30">
            <FiShoppingBag className="text-3xl" />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-slate-800 dark:text-white sm:text-4xl">
            درباره{" "}
            <span className="text-violet-600 dark:text-violet-400">
              Shopino
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            بیشتر با Shopino، هدف ما و تجربه‌ای که می‌خواهیم برای شما ایجاد
            کنیم آشنا شوید.
          </p>
        </div>

        <div className="space-y-3">
          {aboutItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 dark:bg-[#18233a] ${
                  isOpen
                    ? "border-violet-300 shadow-lg shadow-violet-100/60 dark:border-violet-500/40 dark:shadow-violet-950/20"
                    : "border-slate-200 dark:border-slate-700/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 text-right sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isOpen
                          ? "bg-violet-600 text-white dark:bg-violet-500"
                          : "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                      }`}
                    >
                      <Icon className="text-xl" />
                    </div>

                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 sm:text-base">
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 dark:bg-slate-800 dark:text-slate-400 ${
                      isOpen
                        ? "rotate-180 bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                        : ""
                    }`}
                  >
                    <FiChevronDown />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-slate-700/70 sm:px-20">
                      <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-200/40 dark:from-violet-700 dark:to-indigo-900 dark:shadow-violet-950/30 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                سؤالی دارید؟
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-violet-100">
                اگر نیاز به راهنمایی دارید یا پیشنهادی برای بهتر شدن Shopino
                دارید، خوشحال می‌شویم با ما در ارتباط باشید.
              </p>
            </div>

            <Link
              to="/communication"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition-all hover:-translate-y-0.5 hover:bg-violet-50"
            >
              ارتباط با ما
              <FiArrowLeft />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
