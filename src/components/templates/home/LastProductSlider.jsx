import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";

import { getProductsService } from "../../../services/product/product.service";
import SectionTitle from "../../common/SectionTitle";
import { Link } from "react-router";

const LastProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responce = await getProductsService();
        const lastProducts = responce.data.data.products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setProducts(lastProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-7xl px-4">
        <div className="h-[380px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4">
      <SectionTitle
        title={" جدیدترین محصولات"}
        des={" آخرین محصولات اضافه شده به فروشگاه"}
      ></SectionTitle>
      <div className="relative">
        <Swiper
          loop
          modules={[Navigation]}
          navigation={{
            nextEl: ".products-next",
            prevEl: ".products-prev",
          }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className="products-swiper"
        >
          {products.map((product) => {
            const seller = product.sellers?.[0];

            const image =
              product.images?.length > 0
                ? product.images[0]
                : `${import.meta.env.BASE_URL}assets/static/product-placeholder.png`;

            return (
              <SwiperSlide key={product._id}>
                <Link
                  to={`/product/${product._id}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={`https://shopino.iran.liara.run/images/${image}`}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    {product.discount > 0 && (
                      <span className="absolute right-3 top-3 rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-400">
                        {product.discount}% تخفیف
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        {seller ? (
                          <>
                            <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                              {seller.price.toLocaleString("fa-IR")}
                            </span>

                            <span className="mr-1 text-xs text-slate-500">
                              تومان
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-red-600">ناموجود</span>
                        )}
                      </div>

                      <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white dark:bg-indigo-950 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white">
                        <FiShoppingCart size={18} />
                      </button>
                    </div>

                    {seller && (
                      <div className="mt-3 text-xs">
                        {seller.stock > 0 ? (
                          <span className="text-green-600 dark:text-green-400">
                            موجود در انبار
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            ناموجود
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="products-prev flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-500 dark:hover:text-white">
            <TbChevronRight size={20} />
          </button>

          <button className="products-next flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-500 dark:hover:text-white">
            <TbChevronLeft size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LastProductSlider;
