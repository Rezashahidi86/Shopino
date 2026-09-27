import CategoryHeader from "../components/templates/category/CategoryHeader";
import { FiFilter, FiGrid, FiSearch, FiX } from "react-icons/fi";
import ProductCard from "../components/templates/category/ProductCard";
import AsideFilterMobile from "../components/templates/category/AsideFilterMobile";
import AsideFilterDesktop from "../components/templates/category/AsideFilterDesktop";
import useCategory from "../lib/Hooks/useCategory";
import { useState } from "react";
import { useParams } from "react-router";

const Category = () => {
  const { idCategory } = useParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [
    category,
    search,
    products,
    filtersProduct,
    countPagination,
    searchProducts,
    searchParams,
    price,
    setPrice,
    dispatch,
    setSearch,
    setSelectFilter,
    showSearchProducts,
  ] = useCategory();
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 py-8 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        {idCategory &&
          (category ? (
            <CategoryHeader category={category} />
          ) : (
            <div className="mx-auto mt-8 w-full max-w-7xl px-4">
              <div className="h-[280px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}

        <div className="mt-6 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white"
          >
            <FiFilter />
            فیلترها
          </button>
        </div>

        <div
          className={
            category && "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]"
          }
        >
          {idCategory &&
            (category ? (
              <AsideFilterDesktop
                price={price}
                setPrice={setPrice}
                category={category}
                filtersProduct={filtersProduct}
                dispatch={dispatch}
              ></AsideFilterDesktop>
            ) : (
              <div className="mx-auto mt-8 w-full max-w-7xl px-4">
                <div className="h-[280px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}

          <section>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700/70 dark:bg-[#18233a]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      showSearchProducts(event.target.value);
                    }}
                    placeholder="جستجو در محصولات..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <FiGrid className="text-slate-400" />

                  <select
                    onChange={(event) => setSelectFilter(event.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="newest">جدیدترین</option>
                    <option value="oldest">قدیمی ترین</option>
                    <option value="cheapest">ارزان‌ترین</option>
                    <option value="expensive">گران‌ترین</option>
                    <option value="popular">محبوب‌ترین</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  نمایش{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    {products?.length}
                  </span>{" "}
                  محصول
                </p>

                {filtersProduct.filterValues && (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: "delete_filters" });
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400"
                  >
                    <FiX />
                    پاک کردن فیلترها
                  </button>
                )}
              </div>
            </div>

            {products ? (
              <div
                className={`mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4  ${category ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}
              >
                {searchProducts
                  ? searchProducts?.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  : products?.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div
                    key={index}
                    className="mx-auto mt-8 w-full max-w-7xl px-4"
                  >
                    <div className="h-[280px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-2">
              {countPagination &&
                Array.from({ length: countPagination }).map((_, index) => (
                  <button
                    disabled={
                      searchParams.get("page") == index + 1 ? true : false
                    }
                    key={index}
                    type="button"
                    className={
                      searchParams.get("page") == index + 1
                        ? "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500 transition dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-300"
                        : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-300"
                    }
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </section>
        </div>
      </div>

      {idCategory &&
        (category ? (
          <AsideFilterMobile
            setMobileFilterOpen={setMobileFilterOpen}
            price={price}
            setPrice={setPrice}
            dispatch={dispatch}
            category={category}
            filtersProduct={filtersProduct}
            mobileFilterOpen={mobileFilterOpen}
          ></AsideFilterMobile>
        ) : (
          <div
            className={`${mobileFilterOpen ? "visible" : "invisible"} mx-auto mt-8 w-full max-w-7xl px-4`}
          >
            <div className="h-[280px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
    </main>
  );
};

export default Category;
