import { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiFilter,
  FiLayers,
  FiTag,
  FiSave,
  FiMoreVertical,
} from "react-icons/fi";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-violet-400 dark:focus:ring-violet-900";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200";

const categories = [
  {
    _id: "6aa6c0ebd455bc262666bd24",
    title: "ورزش و سفر",
    slug: "sport-entertainment",
    description:
      "برای دریافت مستقیم انرژی مثبت و داشتن روحیه قوی ورزش و سفر دو گزینه عالی هستند که اولی باید در برنامه روزانه و دومی در هر بازه زمانی که امکانش هست، گنجانده شوند.",
    icon: null,
    filters: [
      {
        name: "وضعیت کالا",
        description: "وضعیت محصول",
        slug: "condition",
        type: "radio",
        options: ["نو", "کهنه", "تعمیری"],
        required: true,
      },
      {
        name: "برند",
        description: "برند محصول",
        slug: "brand",
        type: "selectbox",
        options: ["Nike", "Adidas", "Puma"],
        required: false,
      },
    ],
    subCategories: [
      {
        _id: "6ab3884bd455bc2626928da3",
        title: "توپ والیبال",
        slug: "toop-valibal",
        description: "توضیح توپ والیبال",
        parent: "6aa6c0ebd455bc262666bd24",
        filters: [
          {
            name: "رنگ",
            slug: "color",
            description: "توضیح فیلتر رنگ توپ",
            type: "selectbox",
            options: ["سفید قرمز", "سبز سفید"],
            required: true,
          },
        ],
      },
      {
        _id: "6ab3884bd455bc2626928da4",
        title: "کفش ورزشی",
        slug: "sport-shoes",
        description: "انواع کفش ورزشی",
        parent: "6aa6c0ebd455bc262666bd24",
        filters: [
          {
            name: "سایز",
            slug: "size",
            description: "سایز کفش",
            type: "selectbox",
            options: ["40", "41", "42", "43"],
            required: true,
          },
        ],
      },
    ],
  },
  {
    _id: "6aac24dad455bc2626689335",
    title: "کالای دیجیتال",
    slug: "digital",
    description: "محصولات دیجیتال و لوازم الکترونیکی",
    icon: null,
    filters: [],
    subCategories: [
      {
        _id: "6ab37cebd455bc26269287b4",
        title: "لپ تاپ",
        slug: "laptop",
        description: "توضیح تستی لپ تاپ",
        parent: "6aac24dad455bc2626689335",
        filters: [],
      },
      {
        _id: "6ab37cebd455bc26269287b5",
        title: "موبایل",
        slug: "mobile",
        description: "انواع گوشی موبایل",
        parent: "6aac24dad455bc2626689335",
        filters: [
          {
            name: "رم",
            slug: "ram",
            description: "مقدار رم",
            type: "selectbox",
            options: ["4GB", "6GB", "8GB", "12GB"],
            required: true,
          },
        ],
      },
    ],
  },
  {
    _id: "6aac24dad455bc2626689336",
    title: "خانه و آشپزخانه",
    slug: "home-kitchen",
    description: "انواع لوازم خانه و آشپزخانه",
    icon: null,
    filters: [
      {
        name: "برند",
        slug: "brand",
        description: "برند محصول",
        type: "radio",
        options: ["Sony", "Toshiba", "LG", "Samsung"],
        required: false,
      },
    ],
    subCategories: [
      {
        _id: "6ab37cebd455bc26269287b6",
        title: "تلویزیون",
        slug: "tv",
        description: "انواع تلویزیون",
        parent: "6aac24dad455bc2626689336",
        filters: [],
      },
    ],
  },
];

const emptyFilter = {
  name: "",
  description: "",
  slug: "",
  type: "selectbox",
  options: [""],
  required: false,
};

const CategoryFilter = ({ filter, index, onChange, onRemove }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
            <FiFilter size={16} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              فیلتر {index + 1}
            </p>
            <p className="text-xs text-slate-400">
              تنظیمات فیلتر محصول
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 dark:bg-red-950/50"
        >
          <FiTrash2 size={15} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>نام فیلتر</label>
          <input
            className={inputClass}
            value={filter.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="مثلاً رنگ"
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            dir="ltr"
            className={inputClass}
            value={filter.slug}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="مثلاً color"
          />
        </div>

        <div>
          <label className={labelClass}>نوع فیلتر</label>

          <select
            className={inputClass}
            value={filter.type}
            onChange={(e) => onChange("type", e.target.value)}
          >
            <option value="selectbox">Selectbox</option>
            <option value="radio">Radio</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>اجباری بودن</label>

          <label className="flex h-[46px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900">
            <input
              type="checkbox"
              checked={filter.required}
              onChange={(e) => onChange("required", e.target.checked)}
              className="h-4 w-4 accent-violet-600"
            />

            <span className="text-sm">
              تکمیل این فیلتر اجباری باشد
            </span>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>توضیحات فیلتر</label>

          <input
            className={inputClass}
            value={filter.description}
            onChange={(e) =>
              onChange("description", e.target.value)
            }
            placeholder="توضیحی برای این فیلتر..."
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <label className={labelClass}>گزینه‌ها</label>

          <button
            type="button"
            onClick={() =>
              onChange("options", [...filter.options, ""])
            }
            className="flex items-center gap-1 text-xs font-medium text-violet-600"
          >
            <FiPlus />
            افزودن گزینه
          </button>
        </div>

        <div className="space-y-2">
          {filter.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="flex items-center gap-2"
            >
              <input
                className={inputClass}
                value={option}
                placeholder={`گزینه ${optionIndex + 1}`}
                onChange={(e) => {
                  const options = [...filter.options];
                  options[optionIndex] = e.target.value;
                  onChange("options", options);
                }}
              />

              {filter.options.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const options = filter.options.filter(
                      (_, i) => i !== optionIndex,
                    );

                    onChange("options", options);
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-950/50"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryForm = ({
  type,
  title,
  initialData,
  onClose,
}) => {
  const isSubCategory = type === "subcategory";

  const [form, setForm] = useState(
    initialData || {
      title: "",
      slug: "",
      parent: "",
      description: "",
      filters: [],
    },
  );

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addFilter = () => {
    setForm((prev) => ({
      ...prev,
      filters: [...prev.filters, { ...emptyFilter }],
    }));
  };

  const updateFilter = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      filters: prev.filters.map((filter, i) =>
        i === index
          ? {
              ...filter,
              [key]: value,
            }
          : filter,
      ),
    }));
  };

  const removeFilter = (index) => {
    setForm((prev) => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
        <div className="mb-5">
          <h2 className="text-lg font-bold">
            اطلاعات {isSubCategory ? "زیردسته" : "دسته‌بندی"}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            اطلاعات اصلی را وارد کنید
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              نام {isSubCategory ? "زیردسته" : "دسته‌بندی"}
            </label>

            <input
              className={inputClass}
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder={
                isSubCategory
                  ? "مثلاً لپ تاپ"
                  : "مثلاً کالای دیجیتال"
              }
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>

            <input
              dir="ltr"
              className={inputClass}
              value={form.slug}
              onChange={(e) =>
                updateField("slug", e.target.value)
              }
              placeholder="مثلاً laptop"
            />
          </div>

          {isSubCategory && (
            <div>
              <label className={labelClass}>دسته‌بندی والد</label>

              <select
                className={inputClass}
                value={form.parent}
                onChange={(e) =>
                  updateField("parent", e.target.value)
                }
              >
                <option value="">انتخاب دسته‌بندی والد</option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div
            className={
              isSubCategory ? "md:col-span-2" : "md:col-span-2"
            }
          >
            <label className={labelClass}>توضیحات</label>

            <textarea
              rows={5}
              className={inputClass}
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder="توضیحات دسته‌بندی..."
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">فیلترها</h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              فیلترهایی که محصولات این{" "}
              {isSubCategory ? "زیردسته" : "دسته‌بندی"} می‌توانند
              داشته باشند
            </p>
          </div>

          <button
            type="button"
            onClick={addFilter}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-4 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-200 dark:bg-violet-950 dark:text-violet-300"
          >
            <FiPlus />
            افزودن فیلتر
          </button>
        </div>

        {form.filters.length > 0 ? (
          <div className="space-y-4">
            {form.filters.map((filter, index) => (
              <CategoryFilter
                key={index}
                filter={filter}
                index={index}
                onChange={(key, value) =>
                  updateFilter(index, key, value)
                }
                onRemove={() => removeFilter(index)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 py-12 text-center dark:border-slate-700">
            <FiFilter
              size={30}
              className="mx-auto text-slate-300 dark:text-slate-600"
            />

            <p className="mt-3 text-sm font-medium text-slate-500">
              هنوز فیلتری اضافه نشده است
            </p>

            <p className="mt-1 text-xs text-slate-400">
              برای اضافه کردن فیلتر روی دکمه بالا کلیک کنید
            </p>
          </div>
        )}
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
        >
          انصراف
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          <FiSave size={17} />
          ذخیره
        </button>
      </div>
    </div>
  );
};

export default function CategoryAndSubCategory() {
  const [openCategory, setOpenCategory] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("category");
  const [formTitle, setFormTitle] = useState("");
  const [editingData, setEditingData] = useState(null);

  const openAddCategory = () => {
    setFormType("category");
    setFormTitle("افزودن دسته‌بندی");
    setEditingData(null);
    setShowForm(true);
  };

  const openAddSubCategory = (category) => {
    setFormType("subcategory");
    setFormTitle("افزودن زیردسته");
    setEditingData({
      title: "",
      slug: "",
      parent: category._id,
      description: "",
      filters: [],
    });
    setShowForm(true);
  };

  const openEditCategory = (category) => {
    setFormType("category");
    setFormTitle("ویرایش دسته‌بندی");
    setEditingData({
      title: category.title,
      slug: category.slug,
      description: category.description,
      filters: category.filters || [],
    });
    setShowForm(true);
  };

  const openEditSubCategory = (subCategory) => {
    setFormType("subcategory");
    setFormTitle("ویرایش زیردسته");
    setEditingData({
      title: subCategory.title,
      slug: subCategory.slug,
      parent: subCategory.parent,
      description: subCategory.description,
      filters: subCategory.filters || [],
    });
    setShowForm(true);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white md:p-6"
    >
      <div className="mx-auto max-w-7xl">
        {!showForm ? (
          <>
            <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold">
                  مدیریت دسته‌بندی‌ها
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  مدیریت دسته‌بندی‌ها، زیردسته‌ها و فیلترهای محصولات
                </p>
              </div>

              <button
                type="button"
                onClick={openAddCategory}
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
              >
                <FiPlus size={18} />
                افزودن دسته‌بندی
              </button>
            </div>

            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <FiSearch className="text-slate-400" />

              <input
                className="w-full bg-transparent py-2 text-sm outline-none"
                placeholder="جستجوی دسته‌بندی یا زیردسته..."
              />
            </div>

            <div className="space-y-5">
              {categories.map((category) => {
                const isOpen = openCategory === category._id;

                return (
                  <div
                    key={category._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                            <FiLayers size={22} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-lg font-bold">
                                {category.title}
                              </h2>

                              <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                {category.slug}
                              </span>
                            </div>

                            <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                              {category.description}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-600 dark:bg-violet-950/50 dark:text-violet-300">
                                <FiLayers size={13} />
                                {category.subCategories.length} زیردسته
                              </span>

                              <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                <FiFilter size={13} />
                                {category.filters.length} فیلتر
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openAddSubCategory(category)
                            }
                            className="flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2.5 text-xs font-medium text-violet-600 transition hover:bg-violet-100 dark:bg-violet-950/50 dark:text-violet-300"
                          >
                            <FiPlus size={14} />
                            افزودن زیردسته
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditCategory(category)
                            }
                            className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300"
                          >
                            <FiEdit2 size={14} />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            className="flex items-center justify-center rounded-xl bg-red-50 p-2.5 text-red-500 transition hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300"
                            title="حذف دسته‌بندی"
                          >
                            <FiTrash2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenCategory(
                                isOpen ? null : category._id,
                              )
                            }
                            className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {isOpen ? (
                              <FiChevronUp size={15} />
                            ) : (
                              <FiChevronDown size={15} />
                            )}

                            {isOpen ? "بستن" : "مشاهده زیردسته‌ها"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">
                              زیردسته‌ها
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                              زیردسته‌های مربوط به{" "}
                              {category.title}
                            </p>
                          </div>

                          <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                            {category.subCategories.length} مورد
                          </span>
                        </div>

                        {category.subCategories.length > 0 ? (
                          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {category.subCategories.map(
                              (subCategory) => (
                                <div
                                  key={subCategory._id}
                                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-900"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-start gap-3">
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                                        <FiTag size={17} />
                                      </div>

                                      <div className="min-w-0">
                                        <h4 className="truncate font-bold">
                                          {subCategory.title}
                                        </h4>

                                        <p className="mt-1 truncate font-mono text-[11px] text-slate-400">
                                          {subCategory.slug}
                                        </p>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                      <FiMoreVertical />
                                    </button>
                                  </div>

                                  <p className="mt-4 line-clamp-2 min-h-[48px] text-xs leading-6 text-slate-500 dark:text-slate-400">
                                    {subCategory.description ||
                                      "توضیحی ثبت نشده است."}
                                  </p>

                                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                                    <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                      <FiFilter size={12} />
                                      {subCategory.filters.length} فیلتر
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openEditSubCategory(
                                            subCategory,
                                          )
                                        }
                                        className="flex h-8 items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300"
                                      >
                                        <FiEdit2 size={13} />
                                        ویرایش
                                      </button>

                                      <button
                                        type="button"
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300"
                                      >
                                        <FiTrash2 size={13} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        ) : (
                          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white py-10 text-center dark:border-slate-800 dark:bg-slate-900">
                            <FiLayers
                              size={30}
                              className="mx-auto text-slate-300 dark:text-slate-600"
                            />

                            <p className="mt-3 text-sm text-slate-500">
                              این دسته‌بندی زیردسته‌ای ندارد
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <div>
                <h1 className="text-xl font-bold">
                  {formTitle}
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  اطلاعات را وارد یا ویرایش کنید
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-red-100 hover:text-red-500 dark:bg-slate-800"
              >
                <FiX size={20} />
              </button>
            </div>

            <CategoryForm
              type={formType}
              title={formTitle}
              initialData={editingData}
              onClose={() => setShowForm(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}