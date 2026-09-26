import React from "react";
import { FiCopy, FiMessageCircle } from "react-icons/fi";

function HeaderProduct({ product, copyUrl, copied }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        فروشگاه / محصولات / {product?.name}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={copyUrl}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-violet-500 hover:text-violet-600 dark:border-slate-700 dark:bg-[#18233a] dark:text-gray-200"
        >
          <FiCopy />
          {copied ? "با موفقیت کپی شد" : "کپی لینک"}
        </button>

        <button
          onClick={() =>
            document.querySelector("#comments").scrollIntoView({
              behavior: "smooth",
            })
          }
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          <FiMessageCircle />
          نظرات
          <span>({product?.commentCount})</span>
        </button>
      </div>
    </div>
  );
}

export default HeaderProduct;
