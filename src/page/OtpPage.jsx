import { FiArrowLeft, FiLock, FiPhone } from "react-icons/fi";
import useInterval from "../lib/Hooks/useInterval";

const OtpPage = ({
  phone,
  setActiveStep2,
  otp,
  setOtp,
  handleChange,
  handleKeyDown,
  handleSubmitOtp,
  inputsRef,
}) => {
  const [remainingTime, startInterval, formatter] = useInterval(120, true);
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 transition-colors duration-300 dark:bg-[#0f172a] sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold text-white shadow-lg shadow-violet-600/20">
              <FiLock />
            </div>

            <h1 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
              تأیید شماره موبایل
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              کد ۴ رقمی ارسال شده به شماره موبایل خود را وارد کنید
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 transition-colors duration-300 dark:border-slate-700/60 dark:bg-[#18233a] dark:shadow-black/10 sm:p-7">
            <div className="mb-6 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <FiPhone className="text-violet-600 dark:text-violet-400" />
              <span dir="ltr">{phone || "09123456789"}</span>
            </div>

            <form onSubmit={handleSubmitOtp} className="space-y-6">
              <div dir="ltr" className="flex justify-center gap-2 sm:gap-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputsRef.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-14 w-12 rounded-2xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-800 outline-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-[#111b30] dark:text-white dark:focus:border-violet-400 dark:focus:bg-[#111b30] sm:h-16 sm:w-14"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-600"
              >
                <span>تأیید و ورود</span>
                <FiArrowLeft className="text-lg" />
              </button>
            </form>

            <div className="mt-6 text-center">
              {startInterval ? (
                <span className="text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                  {formatter(remainingTime)}
                </span>
              ) : (
                <button
                  onClick={() => {
                    setOtp(["", "", "", ""]);
                    setActiveStep2(false);
                  }}
                  type="button"
                  className="text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  ارسال مجدد کد
                </button>
              )}
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400 dark:text-slate-500">
            کد تأیید را وارد کنید تا وارد حساب کاربری خود شوید.
          </p>
        </div>
      </div>
    </main>
  );
};

export default OtpPage;
