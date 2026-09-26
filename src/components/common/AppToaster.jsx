import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const AppToaster = () => {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Toaster
      theme={theme}
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "font-IRANSansX border border-slate-200 bg-white text-slate-800 shadow-lg dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-100",
          title: "font-semibold",
          description: "text-slate-500 dark:text-slate-400",
          success:
            "font-IRANSansX border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300",
          error:
            "font-IRANSansX border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300",
          warning:
            "font-IRANSansX border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
          info: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300",
        },
      }}
    />
  );
};

export default AppToaster;
