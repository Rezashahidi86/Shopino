import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

const ProductCard = ({ product }) => {
            const seller = product.sellers?.[0];

            const image =
              product.images?.length > 0
                ? product.images[0]
                :`${import.meta.env.BASE_URL}assets/static/product-placeholder.png`;
            return (
                <Link
                  to={`/product/${product._id}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={image}
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
            );
};

export default ProductCard;
