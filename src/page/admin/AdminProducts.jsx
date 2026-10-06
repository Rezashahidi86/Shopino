import { useEffect, useState } from "react";
import usePagination from "../../lib/Hooks/usePagination";
import {
  FiPlus,
  FiX,
  FiTag,
  FiSave,
  FiEye,
  FiTrash2,
  FiPackage,
  FiUsers,
  FiBox,
  FiStar,
  FiMessageCircle,
  FiCalendar,
  FiRefreshCw,
  FiHash,
  FiSliders,
  FiSettings,
} from "react-icons/fi";
import {
  addProduct,
  getProductsForAdmin,
  removeProduct,
} from "../../services/product/product.service";
import getAllCategories from "../../services/category/category.service";
import { getSellersByKeyWord } from "../../services/sellers/sellers";
import AsyncSelect from "react-select/async";
import { addProductSchema } from "../../validators/addProduct";
import { toast } from "sonner";
import Pagination from "../../components/common/pagination/Pagination";
import { useSearchParams } from "react-router";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-violet-400 dark:focus:ring-violet-900";
const labelClass =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200";
const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: document.documentElement.classList.contains("dark")
      ? "#18233a"
      : "#ffffff",
    borderColor: state.isFocused
      ? "#8b5cf6"
      : document.documentElement.classList.contains("dark")
        ? "#334155"
        : "#e2e8f0",
    borderRadius: "12px",
    minHeight: "46px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(139, 92, 246, 0.15)" : "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#8b5cf6",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "4px 12px",
  }),

  input: (base) => ({
    ...base,
    color: document.documentElement.classList.contains("dark")
      ? "#f1f5f9"
      : "#0f172a",
  }),

  singleValue: (base) => ({
    ...base,
    color: document.documentElement.classList.contains("dark")
      ? "#f1f5f9"
      : "#0f172a",
    fontSize: "14px",
  }),

  placeholder: (base) => ({
    ...base,
    color: document.documentElement.classList.contains("dark")
      ? "#94a3b8"
      : "#94a3b8",
    fontSize: "14px",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: document.documentElement.classList.contains("dark")
      ? "#18233a"
      : "#ffffff",
    border: `1px solid ${document.documentElement.classList.contains("dark") ? "#334155" : "#e2e8f0"}`,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
    zIndex: 50,
  }),

  menuList: (base) => ({
    ...base,
    padding: "6px",
    maxHeight: "220px",
  }),

  option: (base, state) => ({
    ...base,
    fontSize: "14px",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "2px",
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "#7c3aed"
      : state.isFocused
        ? document.documentElement.classList.contains("dark")
          ? "#26344d"
          : "#f5f3ff"
        : "transparent",
    color: state.isSelected
      ? "#ffffff"
      : document.documentElement.classList.contains("dark")
        ? "#e2e8f0"
        : "#334155",
    "&:active": {
      backgroundColor: "#6d28d9",
      color: "#ffffff",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#8b5cf6" : "#94a3b8",
    padding: "8px",
    "&:hover": {
      color: "#8b5cf6",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    color: "#94a3b8",
    "&:hover": {
      color: "#ef4444",
    },
  }),

  noOptionsMessage: (base) => ({
    ...base,
    color: "#94a3b8",
    fontSize: "13px",
  }),
};

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const formatPrice = (price) => Number(price || 0).toLocaleString("fa-IR");

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("fa-IR") : "—";

  const totalStock =
    product.sellers?.reduce(
      (total, seller) => total + Number(seller.stock || 0),
      0,
    ) ?? 0;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-5"
    >
      <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl dark:bg-slate-950">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
              <FiPackage size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-bold text-slate-900 dark:text-white">
                جزئیات محصول
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                مشاهده اطلاعات کامل محصول
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-950/50 dark:hover:text-red-400"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="aspect-square bg-slate-100 dark:bg-slate-950">
                {product.images?.length > 0 ? (
                  <img
                    src={`https://shopino.iran.liara.run/images/${product.images[0]}`}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-400">
                    <FiPackage size={42} />
                    <span className="mt-3 text-sm">تصویری ثبت نشده</span>
                  </div>
                )}
              </div>

              {product.images?.length > 1 && (
                <div className="border-t border-slate-200 p-3 dark:border-slate-800">
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-950"
                      >
                        <img
                          src={`https://shopino.iran.liara.run/images/${image}`}
                          alt={`${product.name} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {product.name || "بدون نام"}
                    </h3>

                    <p className="mt-2 break-all font-mono text-xs text-slate-400">
                      {product._id}
                    </p>
                  </div>

                  {product.discount > 0 && (
                    <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:bg-red-950/50 dark:text-red-300">
                      {product.discount.toLocaleString("fa-IR")}٪ تخفیف
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    توضیحات
                  </p>

                  <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {product.description || "توضیحاتی ثبت نشده است."}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-slate-400">
                      <FiHash size={15} />
                      <span className="text-xs">کد کوتاه</span>
                    </div>

                    <p className="mt-2 font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {product.shortIdentifier || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-slate-400">
                      <FiTag size={15} />
                      <span className="text-xs">Slug</span>
                    </div>

                    <p className="mt-2 break-all text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {product.slug || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <FiUsers className="text-violet-500" size={19} />
                  <p className="mt-3 text-xs text-slate-400">فروشندگان</p>
                  <p className="mt-1 text-lg font-bold">
                    {product.sellers?.length || 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <FiBox className="text-emerald-500" size={19} />
                  <p className="mt-3 text-xs text-slate-400">موجودی</p>
                  <p className="mt-1 text-lg font-bold">
                    {totalStock.toLocaleString("fa-IR")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <FiStar className="text-amber-500" size={19} />
                  <p className="mt-3 text-xs text-slate-400">امتیاز</p>
                  <p className="mt-1 text-lg font-bold">
                    {Number(product.averageRating || 0).toLocaleString("fa-IR")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <FiMessageCircle className="text-blue-500" size={19} />
                  <p className="mt-3 text-xs text-slate-400">نظرات</p>
                  <p className="mt-1 text-lg font-bold">
                    {Number(product.commentCount || 0).toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                <FiUsers size={18} />
              </div>

              <div>
                <h3 className="font-bold">فروشندگان محصول</h3>
                <p className="mt-1 text-xs text-slate-400">
                  قیمت و موجودی هر فروشنده
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {product.sellers?.length ? (
                product.sellers.map((seller, index) => (
                  <div
                    key={seller._id || index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-slate-400">فروشنده</p>

                        <p className="mt-1 break-all text-xs font-semibold text-slate-700 dark:text-slate-200">
                          شاپینو
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">قیمت</p>

                        <p className="mt-1 font-semibold text-violet-600 dark:text-violet-400">
                          {formatPrice(seller.price)} تومان
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">موجودی</p>

                        <p
                          className={`mt-1 ${
                            Number(seller.stock) < 10
                              ? "text-red-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {Number(seller.stock || 0).toLocaleString("fa-IR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-slate-50 py-8 text-center text-sm text-slate-400 dark:bg-slate-950">
                  فروشنده‌ای برای این محصول ثبت نشده است.
                </div>
              )}
            </div>
          </section>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <FiSliders size={18} />
                </div>

                <div>
                  <h3 className="font-bold">فیلترها</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    مقادیر فیلترهای محصول
                  </p>
                </div>
              </div>

              {product.filterValues &&
              Object.keys(product.filterValues).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(product.filterValues).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-950"
                    >
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {key}
                      </span>

                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-slate-50 py-6 text-center text-sm text-slate-400 dark:bg-slate-950">
                  فیلتری ثبت نشده است.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <FiSettings size={18} />
                </div>

                <div>
                  <h3 className="font-bold">ویژگی‌های اختصاصی</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    ویژگی‌های سفارشی محصول
                  </p>
                </div>
              </div>

              {product.customFields &&
              Object.keys(product.customFields).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(product.customFields).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-950"
                    >
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {key}
                      </span>

                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-slate-50 py-6 text-center text-sm text-slate-400 dark:bg-slate-950">
                  ویژگی اختصاصی ثبت نشده است.
                </p>
              )}
            </section>
          </div>

          <section className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <FiCalendar size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">تاریخ ایجاد</p>
                <p className="mt-1 text-sm font-semibold">
                  {formatDate(product.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <FiRefreshCw size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">آخرین بروزرسانی</p>
                <p className="mt-1 text-sm font-semibold">
                  {formatDate(product.updatedAt)}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="flex shrink-0 justify-end border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
export default function ProductManagement() {
  const [currentPage, pagination, setPagination, showNumberPage] =
    usePagination();
  const [searchParams, SetSearchParams] = useSearchParams();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const fetchProducts = async (form = { page: currentPage }) => {
    const productsAndPagination = await getProductsForAdmin(form);
    setPagination(productsAndPagination.pagination);
    setProducts(productsAndPagination.products);
  };
  const fetchCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories?.data.categories);
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagesPath, setImagesPath] = useState([]);
  const initialForm = {
    name: "",
    description: "",
    slug: "",
    subCategory: "",
    images: [],
    sellers: [],
    customFields: [{ key: null, value: null }],
    filterValues: {},
  };
  const [form, setForm] = useState(initialForm);
  const selectedCategory =
    categories?.find((category) => category._id === form.subCategory) ||
    subCategories?.find((subategory) => subategory._id === form.subCategory);
  const [imagesUrl, setImagesUrl] = useState([]);
  const openModalAddProduct = () => {
    setForm(initialForm);
    setShowForm(true);
  };

  const handleAddProduct = () => {
    if (selectedCategory) {
      if (
        selectedCategory?.filters.length !==
        Object.keys(form.filterValues).length
      )
        return toast.error("فیلتر های مربوط به دسته بندی را پر کنید");
    }

    const validForm = addProductSchema.safeParse(form);
    if (validForm.success) {
      const formForServer = {
        ...form,
        images: imagesPath,
        customFields: form.customFields.reduce((a, b) => {
          if (b.key?.length && b.value?.length) {
            return { ...a, [b.key]: b.value };
          } else {
            return { ...a };
          }
        }, {}),
        sellers: form.sellers.map((seller) => ({
          id: seller._id,
          stock: seller.stock,
          price: seller.price,
        })),
      };
      const formData = new FormData();
      formData.append("name", formForServer.name);
      formData.append("slug", formForServer.slug);
      formData.append("description", formForServer.description);
      formData.append("subCategory", formForServer.subCategory);
      formData.append(
        "filterValues",
        JSON.stringify(formForServer.filterValues),
      );
      formData.append(
        "customFields",
        JSON.stringify(formForServer.customFields),
      );
      formData.append("sellers", JSON.stringify(formForServer.sellers));
      formForServer.images.forEach((image) => {
        formData.append("images", image);
      });
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      toast.promise(addProduct(formData), {
        success: () => {
          setShowForm(false);
          setForm(initialForm);
          fetchProducts();
          return "محصول با موفقیت اضافه شد";
        },
        loading: "درحال ایجاد کردن",
      });
    } else {
      toast.error(validForm.error.issues[0].message);
    }
  };

  const handleDeleteProduct = (id) => {
    toast.promise(removeProduct(id), {
      success: () => {
        fetchProducts();
        return "با موفقیت حذف شد";
      },
      loading: "در حال حذف محصول",
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);
  useEffect(() => {
    const urls = imagesPath.map((imagePath) => URL.createObjectURL(imagePath));

    setImagesUrl(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagesPath]);
  return (
    <>
      {products && categories ? (
        <div
          dir="rtl"
          className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            {!showForm ? (
              <>
                <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-xl font-bold">مدیریت محصولات</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      مشاهده و مدیریت محصولات فروشگاه
                    </p>
                  </div>
                  <button
                    onClick={openModalAddProduct}
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
                  >
                    <FiPlus size={18} /> افزودن محصول
                  </button>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] table-fixed text-right text-sm">
                      <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                        <tr>
                          <th className="w-[220px] px-5 py-4 font-semibold">
                            محصول
                          </th>

                          <th className="w-[300px] px-5 py-4 font-semibold">
                            شناسه
                          </th>

                          <th className="w-[170px] px-5 py-4 font-semibold">
                            قیمت
                          </th>

                          <th className="w-[130px] px-5 py-4 font-semibold">
                            موجودی
                          </th>

                          <th className="w-[260px] px-5 py-4 font-semibold">
                            عملیات
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {products.map((product) => {
                          const lowestPrice = product.sellers?.length
                            ? Math.min(
                                ...product.sellers.map(
                                  (seller) => seller.price,
                                ),
                              )
                            : 0;

                          const totalStock =
                            product.sellers?.reduce(
                              (total, seller) => total + seller.stock,
                              0,
                            ) ?? 0;

                          return (
                            <tr
                              key={product._id}
                              className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            >
                              <td className="px-5 py-4">
                                <div className="max-w-[190px]">
                                  <p
                                    title={product.name}
                                    className="truncate font-semibold text-slate-800 dark:text-white"
                                  >
                                    {product.name}
                                  </p>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <div className="space-y-1">
                                  <p className="truncate font-mono text-xs text-slate-600 dark:text-slate-300">
                                    {product._id}
                                  </p>

                                  <span className="text-xs text-slate-400">
                                    کد: {product.shortIdentifier || "—"}
                                  </span>
                                </div>
                              </td>

                              <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700 dark:text-slate-200">
                                {lowestPrice.toLocaleString("fa-IR")} تومان
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-medium ${
                                    totalStock < 10
                                      ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300"
                                      : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                                  }`}
                                >
                                  {totalStock.toLocaleString("fa-IR")}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedProduct(product)}
                                    className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                                  >
                                    <FiEye size={14} />
                                    مشاهده بیشتر
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteProduct(product._id)
                                    }
                                    className="flex items-center justify-center rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
                                    title="حذف محصول"
                                  >
                                    <FiTrash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 dark:border-slate-700/60 max-[700px]:gap-3 max-[700px]:px-3 max-[700px]:py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-[700px]:text-[11px]">
                    نمایش {currentPage * 10 - 9} تا {currentPage * 10} از{" "}
                    {pagination.totalProducts} محصول
                  </p>

                  <div className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-start">
                    <Pagination
                      pagination={pagination}
                      currentPage={currentPage}
                      showNumberPage={showNumberPage}
                    ></Pagination>
                  </div>
                </div>
                {selectedProduct && (
                  <ProductDetailsModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                  />
                )}
              </>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                  <div>
                    <h1 className="text-xl font-bold">افزودن محصول</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      اطلاعات محصول را وارد کنید
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-red-100 hover:text-red-500 dark:bg-slate-800"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <div className="space-y-6">
                  <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <h2 className="mb-5 text-lg font-bold">اطلاعات اصلی</h2>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>نام محصول</label>
                        <input
                          className={inputClass}
                          value={form.name}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                          placeholder="نام محصول"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>نام کوتاه محصول</label>
                        <input
                          className={inputClass}
                          value={form.slug}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              slug: event.target.value,
                            }))
                          }
                          placeholder="نام کوتاه محصول"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClass}>توضیحات</label>
                        <textarea
                          rows="4"
                          className={inputClass}
                          value={form.description}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              description: event.target.value,
                            }))
                          }
                          placeholder="توضیحات محصول..."
                        />
                      </div>
                    </div>
                  </section>
                  <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <h2 className="mb-5 text-lg font-bold">دسته‌بندی محصول</h2>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>دسته‌بندی</label>
                        <select
                          className={inputClass}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              subCategory: event.target.value,
                            }));
                            if (event.target.value.length) {
                              setSubCategories(
                                categories.find(
                                  (category) =>
                                    category._id === event.target.value,
                                ).subCategories,
                              );
                            } else {
                              setSubCategories(null);
                            }
                          }}
                        >
                          <option value="">انتخاب دسته‌بندی</option>
                          {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      {subCategories?.length ? (
                        <div>
                          <label className={labelClass}>زیردسته</label>
                          <select
                            className={inputClass}
                            onChange={(event) => {
                              setForm((prev) => ({
                                ...prev,
                                subCategory: event.target.value
                                  ? event.target.value
                                  : subCategories[0].parent,
                              }));
                            }}
                          >
                            <option value="">انتخاب زیردسته</option>
                            {subCategories?.map((subCategory) => (
                              <option
                                key={subCategory._id}
                                value={subCategory._id}
                              >
                                {subCategory.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </section>
                  <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold">فروشندگان</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          فروشنده، قیمت و تعداد محصول را مشخص کنید
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            sellers: [
                              ...prev.sellers,
                              { _id: null, price: null, stock: 0 },
                            ],
                          }));
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-4 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-200 dark:bg-violet-950"
                      >
                        <FiPlus /> افزودن فروشنده
                      </button>
                    </div>
                    <div className="space-y-4">
                      {form.sellers.map((seller, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm font-semibold">
                              فروشنده {index + 1}
                            </span>
                            {form.sellers.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setForm((prev) => ({
                                    ...prev,
                                    sellers: prev.sellers.filter(
                                      (_, sellerIndex) => sellerIndex !== index,
                                    ),
                                  }))
                                }
                                className="text-red-500"
                              >
                                <FiTrash2 />
                              </button>
                            )}
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <label className={labelClass}>فروشنده</label>
                              <AsyncSelect
                                defaultOptions
                                loadOptions={async (query) => {
                                  return await getSellersByKeyWord(query);
                                }}
                                value={
                                  form.sellers[index]._id
                                    ? {
                                        _id: form.sellers[index]._id,
                                        name: form.sellers[index].name,
                                      }
                                    : null
                                }
                                onChange={(infoSeller) => {
                                  setForm((prev) => ({
                                    ...prev,
                                    sellers: prev.sellers.map((seller, i) =>
                                      i === index
                                        ? {
                                            ...seller,
                                            _id: infoSeller?._id || "",
                                            name: infoSeller?.name || "",
                                          }
                                        : seller,
                                    ),
                                  }));
                                }}
                                styles={selectStyles}
                                placeholder="انتخاب فروشنده"
                                noOptionsMessage={() => "فروشنده‌ای یافت نشد"}
                                loadingMessage={() => "در حال جستجو..."}
                                isSearchable
                                isClearable
                                cacheOptions
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option._id}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>قیمت</label>
                              <input
                                type="number"
                                className={inputClass}
                                value={seller.price}
                                placeholder="مثلاً 45000000"
                                dir="ltr"
                                onChange={(event) => {
                                  const newSellers = [...form.sellers];
                                  newSellers[index].price = event.target.value;
                                  setForm((prev) => ({
                                    ...prev,
                                    sellers: newSellers,
                                  }));
                                }}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>تعداد</label>
                              <input
                                type="number"
                                className={inputClass}
                                value={seller.stock}
                                placeholder="مثلاً 20"
                                dir="ltr"
                                onChange={(event) => {
                                  const newSellers = [...form.sellers];
                                  newSellers[index].stock = event.target.value;
                                  setForm((prev) => ({
                                    ...prev,
                                    sellers: newSellers,
                                  }));
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  {selectedCategory?.filters?.length > 0 && (
                    <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                      <div className="mb-5">
                        <h2 className="text-lg font-bold"> فیلترهای محصول </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          فیلترهای مربوط به دسته‌بندی را تکمیل کنید
                        </p>
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        {selectedCategory.filters.map((filter) => (
                          <div key={filter._id}>
                            <label className={labelClass}>{filter.name}</label>
                            <select
                              className={inputClass}
                              onChange={(event) =>
                                setForm((prev) => ({
                                  ...prev,
                                  filterValues: {
                                    ...prev.filterValues,
                                    [filter.slug]: event.target.value,
                                  },
                                }))
                              }
                            >
                              <option value=""> انتخاب {filter.name} </option>
                              {filter.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold">فیلترهای اختصاصی</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          در صورت نیاز ویژگی‌های اختصاصی محصول را اضافه کنید
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            customFields: [
                              ...prev.customFields,
                              { key: "", value: "" },
                            ],
                          }))
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-200 dark:bg-slate-800"
                      >
                        <FiPlus /> افزودن ویژگی
                      </button>
                    </div>
                    <div className="space-y-3">
                      {form.customFields.map((customField, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-3 sm:flex-row"
                        >
                          <input
                            className={inputClass}
                            value={customField.key || ""}
                            placeholder="نام ویژگی؛ مثلاً رنگ"
                            onChange={(event) => {
                              const newCustomFields = [...form.customFields];
                              newCustomFields[index].key = event.target.value;
                              setForm((prev) => ({
                                ...prev,
                                customFields: newCustomFields,
                              }));
                            }}
                          />
                          <input
                            className={inputClass}
                            value={customField.value || ""}
                            placeholder="مقدار؛ مثلاً مشکی"
                            onChange={(event) => {
                              const newCustomFields = [...form.customFields];
                              newCustomFields[index].value = event.target.value;
                              setForm((prev) => ({
                                ...prev,
                                customFields: newCustomFields,
                              }));
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCustomFields = [...form.customFields];
                              newCustomFields.splice(index, 1);
                              setForm((prev) => ({
                                ...prev,
                                customFields: newCustomFields,
                              }));
                            }}
                            className="flex h-12 shrink-0 items-center justify-center rounded-xl bg-red-50 px-4 text-red-500 dark:bg-red-950"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                          تصاویر محصول
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          تصاویر محصول را از دستگاه خود انتخاب کنید
                        </p>
                      </div>

                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                        {imagesPath.length} / 10
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {imagesUrl.map((imageUrl, index) => (
                        <div
                          key={imageUrl}
                          className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950"
                        >
                          <img
                            src={imageUrl}
                            alt={`تصویر محصول ${index + 1}`}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 transition">
                            <button
                              type="button"
                              onClick={() => {
                                setImagesPath((prev) =>
                                  prev.filter(
                                    (_, imageIndex) => imageIndex !== index,
                                  ),
                                );
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {imagesPath.length < 10 && (
                        <label
                          htmlFor="product-images"
                          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-violet-400 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-violet-500 dark:hover:bg-violet-950/20"
                        >
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                            <FiPlus size={26} />
                          </div>

                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            افزودن تصویر
                          </span>

                          <span className="mt-1 text-xs text-slate-400">
                            JPG، PNG، WEBP
                          </span>

                          <input
                            id="product-images"
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={(event) => {
                              const newImagesPath = [
                                ...imagesPath,
                                ...event.target.files,
                              ].slice(0, 10);
                              setImagesPath(newImagesPath);

                              event.target.value = "";
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </section>
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                      }}
                      className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-medium dark:bg-slate-800"
                    >
                      انصراف
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
                      onClick={handleAddProduct}
                    >
                      <FiSave /> افزودن محصول
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4">
          <div className="h-[280px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      )}
    </>
  );
}
