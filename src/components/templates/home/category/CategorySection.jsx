import { useEffect, useState } from "react";
import getAllCategories from "../../../../services/category/category.service";
import CategoryCard from "./CategoryCard";
import SectionTitle from "../../../common/SectionTitle";

const CategorySection = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const fetchCategory = async () => {
      const responce = await getAllCategories();
      setCategories(responce.data.categories.slice(0, 4));
    };
    fetchCategory();
  });
  return (
    <>
      {categories ? (
        <section dir="rtl" className="px-4 py-10">
          <div className="mx-auto mt-8 w-full max-w-7xl">
            <div className="flex items-end justify-between">
              <div>
                <SectionTitle title={"دسته بندی های محبوب"}></SectionTitle>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories?.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4">
          <div className="h-[380px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      )}
    </>
  );
};

export default CategorySection;
