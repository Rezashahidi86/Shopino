import { FiGrid, FiTruck, FiShield, FiHeadphones } from "react-icons/fi";
import SectionTitle from "../../common/SectionTitle";

const features = [
  {
    icon: FiGrid,
    title: "تنوعی برای هر انتخاب",
    description:
      "مجموعه‌ای متنوع از محصولات را در دسته‌بندی‌های مختلف Shopino پیدا کنید.",
  },
  {
    icon: FiTruck,
    title: "ارسال سریع و مطمئن",
    description: "سفارش خود را با روندی سریع و مطمئن دریافت کنید.",
  },
  {
    icon: FiShield,
    title: "خریدی امن و مطمئن",
    description: "اطلاعات و فرآیند خرید شما با امنیت بالا مدیریت می‌شود.",
  },
  {
    icon: FiHeadphones,
    title: "همیشه همراه شما",
    description: "در صورت نیاز، تیم پشتیبانی Shopino برای راهنمایی کنار شماست.",
  },
];

const ShopinoFeatures = () => {
  return (
    <section dir="rtl" className="py-10 mx-auto mt-8 w-full max-w-7xl px-4">
      <SectionTitle title={"چرا شاپینو"}></SectionTitle>
      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 dark:border-slate-700/70 dark:bg-[#18233a] dark:hover:border-violet-500/30 dark:hover:shadow-violet-950/20"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/10 dark:text-violet-400 dark:group-hover:bg-violet-500 dark:group-hover:text-white">
              <Icon className="text-xl" />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-800 dark:text-white">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopinoFeatures;
