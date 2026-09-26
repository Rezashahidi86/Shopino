import React from "react";
import { FiSend, FiStar } from "react-icons/fi";

function AddComment({
  ratingHandler,
  formPostComment,
  setFormPostComment,
  postComment,
  refRating
}) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-100 p-5 dark:border-slate-700">
      <h3 className="font-bold text-gray-800 dark:text-white">ثبت نظر</h3>

      <div className="mt-4">
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          امتیاز شما
        </p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-xl text-yellow-500"
              onClick={() => ratingHandler(star)}
            >
              <FiStar
                className="fill-current"
                ref={(element) => {
                  refRating.current[star - 1] = element;
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={5}
        value={formPostComment.content}
        onChange={(event) =>
          setFormPostComment((prev) => {
            return { ...prev, content: event.target.value };
          })
        }
        placeholder="نظر خود را درباره این محصول بنویسید..."
        className="mt-5 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
      />

      <button
        onClick={postComment}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
      >
        <FiSend />
        ارسال نظر
      </button>
    </div>
  );
}

export default AddComment;
