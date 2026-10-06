import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { TbChevronRight, TbChevronLeft } from "react-icons/tb";

function AppSwiper() {
  return (
    <section className="mx-auto mt-6 w-full px-4 max-w-4xl">
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
        <Swiper
          loop
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 5000,
          }}
          navigation={{
            nextEl: ".slider-next",
            prevEl: ".slider-prev",
          }}
          className="shopino-slider"
        >
          <SwiperSlide>
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/static/-2147483648_-215831.jpg`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/static/-2147483648_-215834.jpg`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/static/-2147483648_-215838.jpg`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2">
          <button className="slider-next flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/70 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-indigo-600 hover:text-white dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:bg-indigo-500 dark:hover:text-white">
            <TbChevronRight size={22} />
          </button>
          <button className="slider-prev flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/70 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-indigo-600 hover:text-white dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:bg-indigo-500 dark:hover:text-white">
            <TbChevronLeft size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AppSwiper;
