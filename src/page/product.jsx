import { FiMessageCircle } from "react-icons/fi";
import SwiperApp from "../components/templates/product/SwiperApp";
import HeaderProduct from "../components/templates/product/HeaderProduct";
import ProductInfo from "../components/templates/product/ProductInfo";
import ShopDescription from "../components/templates/product/ShopDescription";
import ProductSpecifications from "../components/templates/product/ProductSpecifications";
import CommentCart from "../components/templates/product/CommentCart";
import AddComment from "../components/templates/product/AddComment";
import { useState } from "react";
import useProduct from "../lib/Hooks/useProduct";

const product = () => {
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [
    copied,
    seller,
    product,
    comments,
    formPostComment,
    formAddToCart,
    refRating,
    copyUrl,
    ratingHandler,
    postComment,
    addToCart,
    setseller,
    setFormAddToCart,
    setFormPostComment
  ] = useProduct();
  return (
    <>
      {seller && product ? (
        <main className="min-h-screen bg-gray-50 py-6 dark:bg-[#0f172a]">
          <div className="mx-auto max-w-7xl px-4">
            <HeaderProduct
              product={product}
              copyUrl={copyUrl}
              copied={copied}
            ></HeaderProduct>

            <section
              dir="rtl"
              className="w-full overflow-hidden rounded-3xl bg-white p-3 shadow-sm dark:bg-[#18233a] sm:p-4 md:p-6"
            >
              <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="min-w-0 w-full">
                  <SwiperApp images={product.images} />
                </div>
                <ProductInfo
                  product={product}
                  setIsSellerOpen={setIsSellerOpen}
                  isSellerOpen={isSellerOpen}
                  setseller={setseller}
                  setFormAddToCart={setFormAddToCart}
                  seller={seller}
                  addToCart={addToCart}
                  formAddToCart={formAddToCart}
                ></ProductInfo>
              </div>
            </section>

            <ShopDescription></ShopDescription>

            <ProductSpecifications product={product}></ProductSpecifications>

            <section className="mt-6 rounded-3xl bg-white p-5 dark:bg-[#18233a] md:p-7">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                توضیحات محصول
              </h2>

              <div className="mt-5 leading-9 text-gray-600 dark:text-gray-300">
                {product?.description}
              </div>
            </section>

            <section
              id="comments"
              className="mt-6 scroll-mt-24 rounded-3xl bg-white p-5 dark:bg-[#18233a] md:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    نظرات کاربران
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    نظر کاربران درباره این محصول
                  </p>
                </div>
              </div>

              {comments?.length ? (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {comments.slice(0, 9).map((comment) => (
                    <CommentCart comment={comment}></CommentCart>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-gray-50 py-12 text-center dark:bg-[#0f172a]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/10">
                    <FiMessageCircle className="text-2xl" />
                  </div>

                  <p className="mt-4 font-bold text-gray-800 dark:text-white">
                    هنوز نظری ثبت نشده است
                  </p>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    اولین نفری باشید که درباره این محصول نظر می‌دهد.
                  </p>
                </div>
              )}

              <AddComment
                ratingHandler={ratingHandler}
                formPostComment={formPostComment}
                setFormPostComment={setFormPostComment}
                postComment={postComment}
                refRating={refRating}
              ></AddComment>
            </section>
          </div>
        </main>
      ) : (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4">
          <div className="h-[500px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      )}
    </>
  );
};

export default product;
