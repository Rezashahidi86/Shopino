import { useEffect, useState } from "react";

import HeaderDesctop from "./fragments/HeaderDesctop";
import HeaderMobile from "./fragments/HeaderMobile";

import getAllCategories from "../../../services/category/category.service";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data.data.categories);
    };

    fetchCategories();
  }, []);
  return (
    <header className="w-full bg-slate-100 px-3 py-3 transition-colors duration-300 dark:bg-[#0f172a] sm:px-4 sm:py-5">
      <div className="relative mx-auto max-w-[1000px] rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700/60 dark:bg-[#18233a]">
        <HeaderDesctop
          categories={categories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <HeaderMobile
          categories={categories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </header>
  );
};

export default Header;
