import { useState } from "react";
import { FiMessageCircle, FiPhone, FiSend, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import sendCommunicationService from "../services/communication/communication.service";
import { sendFormCommunicationSchema } from "../validators/communication";
import SectionTitle from "../components/common/SectionTitle";
import Map from "../components/templates/home/Map";
const Communication = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = sendFormCommunicationSchema.safeParse(formData);
    if (info.success) {
      toast.promise(sendCommunicationService(formData), {
        success: () => {
          setFormData({
            name: "",
            phone: "",
            subject: "",
            content: "",
          });
          return "با موفقیت ارسال شد";
        },
        loading: "در حال ارسال...",
      });
    } else {
      toast.error(info.error.issues[0].message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 transition-colors duration-300 dark:bg-[#0f172a] sm:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl text-white shadow-lg shadow-violet-600/20">
            <FiMessageCircle />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            ارتباط با ما
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            اگر سوال، پیشنهاد یا مشکلی دارید، پیام خود را برای ما ارسال کنید.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 transition-colors duration-300 dark:border-slate-700/60 dark:bg-[#18233a] dark:shadow-black/10 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  نام و نام خانوادگی
                </label>

                <div className="relative">
                  <FiUser className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 dark:text-slate-500" />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثلاً علی رضایی"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-[#111b30] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                  />
                </div>
              </div>

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
                    name="phone"
                    dir="ltr"
                    maxLength={11}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="09123456789"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-left text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-[#111b30] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                موضوع
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="موضوع پیام خود را وارد کنید"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-[#111b30] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                متن پیام
              </label>

              <textarea
                id="content"
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                placeholder="پیام خود را برای ما بنویسید..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-[#111b30] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
              />
            </div>

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              <FiSend className="text-lg" />
              <span>ارسال پیام</span>
            </button>
          </form>
        </div>
      </div>
      <div className="mt-24">
        <SectionTitle title="مراجعه حضوری" des="شعبه کویر لوت" />

        <div className="mx-auto mt-8 w-full max-w-7xl">
          <Map />
        </div>
      </div>
    </main>
  );
};

export default Communication;
