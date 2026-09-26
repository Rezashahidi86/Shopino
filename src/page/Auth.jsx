import { FiArrowLeft, FiPhone, FiShield } from "react-icons/fi";
import Themetoggele from "./../components/common/Themetoggele";
import AppToaster from "../components/common/AppToaster";
import OtpPage from "./OtpPage";
import useAuth from "../lib/Hooks/useAuth";

const Auth = () => {
  const [
    phone,
    setPhone,
    otp,
    setOtp,
    activeStep2,
    inputsRef,
    setActiveStep2,
    handleSubmitPhone,
    handleChange,
    handleKeyDown,
    handleSubmitOtp,
  ] = useAuth();
  return (
    <>
      <AppToaster></AppToaster>
      <Themetoggele> </Themetoggele>
      {activeStep2 || (
        <main className="min-h-screen bg-slate-100 px-4 py-8 transition-colors duration-300 dark:bg-[#0f172a] sm:px-6">
          <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold text-white shadow-lg shadow-violet-600/20">
                  S
                </div>

                <h1 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
                  ورود به شاپینو
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 transition-colors duration-300 dark:border-slate-700/60 dark:bg-[#18233a] dark:shadow-black/10 sm:p-7">
                <form onSubmit={handleSubmitPhone} className="space-y-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      شماره موبایل
                    </label>

                    <div className="relative">
                      <FiPhone className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 dark:text-slate-500" />

                      <input
                        id="phone"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09123456789"
                        maxLength={11}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-left text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-[#111b30] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:bg-[#111b30]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-600"
                  >
                    <span>ادامه</span>
                    <FiArrowLeft className="text-lg" />
                  </button>
                </form>

                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-violet-50 p-4 dark:bg-violet-500/10">
                  <FiShield className="mt-0.5 shrink-0 text-lg text-violet-600 dark:text-violet-400" />

                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                    با ادامه، یک کد تأیید برای شماره موبایل شما ارسال خواهد شد.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-slate-400 dark:text-slate-500">
                ورود و ثبت‌نام در شاپینو با شماره موبایل انجام می‌شود.
              </p>
            </div>
          </div>
        </main>
      )}
      {activeStep2 && (
        <OtpPage
          phone={phone}
          setActiveStep2={setActiveStep2}
          otp={otp}
          setOtp={setOtp}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleSubmitOtp={handleSubmitOtp}
          inputsRef={inputsRef}
        ></OtpPage>
      )}
    </>
  );
};

export default Auth;
