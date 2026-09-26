import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const IMAGE_BASE_URL = "https://shopino.iran.liara.run/images/";
const PLACEHOLDER = "/assets/static/product-placeholder.png";

const ProductImageSwiper = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const productImages = images.length
    ? images.map((image) =>
        image.startsWith("http") ? image : `${IMAGE_BASE_URL}${image}`,
      )
    : [PLACEHOLDER];

  return (
    <div dir="ltr" className="w-full min-w-0">
      <Swiper
        style={{
          "--swiper-navigation-color": "#ffffff",
          "--swiper-pagination-color": "#ffffff",
        }}
        loop={productImages.length > 1}
        spaceBetween={8}
        navigation={productImages.length > 1}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[240px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 sm:h-[320px] md:h-[380px] lg:h-[440px]"
      >
        {productImages.map((image, index) => (
          <SwiperSlide
            key={`${image}-${index}`}
            className="flex items-center justify-center"
          >
            <img
              src={image}
              alt={`تصویر محصول ${index + 1}`}
              className="h-full w-full object-contain p-2 sm:p-4"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {productImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={productImages.length > 4}
          spaceBetween={6}
          slidesPerView={3}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="mt-2 h-16 w-full sm:mt-3 sm:h-20"
          breakpoints={{
            480: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {productImages.map((image, index) => (
            <SwiperSlide
              key={`thumb-${image}-${index}`}
              className="cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-100 transition-all [&.swiper-slide-thumb-active]:border-violet-500 [&.swiper-slide-thumb-active]:ring-2 [&.swiper-slide-thumb-active]:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800 sm:rounded-xl"
            >
              <img
                src={image}
                alt={`نمایش کوچک ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImageSwiper;
