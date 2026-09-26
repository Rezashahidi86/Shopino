import React from "react";

const CommentCart = ({comment}) => {
  return (
    <div
      key={comment._id}
      className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-[#0f172a] sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            {(comment.user?.name || "کاربر").charAt(0)}
          </div>

          <div>
            <p className="font-bold text-gray-800 dark:text-white">
              {comment.user?.name || "کاربر"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= comment.rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-gray-700 dark:text-gray-300">
        {comment.content}
      </p>

      {comment.replies?.length > 0 && (
        <div className="mt-5 space-y-3 border-r-2 border-violet-200 pr-4 dark:border-violet-500/30">
          {comment.replies.map((reply) => (
            <div
              key={reply._id}
              className="rounded-xl bg-gray-50 p-4 dark:bg-[#18233a]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    {(reply.user?.name || "پاسخ").charAt(0)}
                  </div>

                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {reply.user?.name || "پاسخ"}
                  </p>
                </div>

                {reply.createdAt && (
                  <span className="text-xs text-gray-400">
                    {new Date(reply.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                )}
              </div>

              <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCart;
