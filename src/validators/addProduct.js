import z from "zod";

const addProductSchema = z.object({
  name: z.string().trim().min(3, "حداقل 3 کاراکتر برای نام محصول انتخاب کنید"),
  description: z
    .string()
    .trim()
    .min(3, "حداقل 3 کاراکتر برای توضیحات محصول انتخاب کنید"),
  slug: z
    .string()
    .trim()
    .min(3, "حداقل 3 کاراکتر برای نام کوتاه محصول انتخاب کنید").regex(/[a-z0-9\-]+$/,"نام کوتاه باید از فرمت mesal-nemone پیروی کند با حروف انگلیسی"),
  subCategory: z.string().trim().min(3, "دسته بندی را وارد کنید"),
  images: z.array(),
  sellers: z
    .array(
      z.object({
        _id: z.string("حداقل یک فروشنده را انتخاب کنید").min(1,"فروشنده را انتخاب کنید"),
        price: z.string("قیمت را وارد کنید").min(1,"قیمت را وارد کنید"),
      }),
    )
    .min(1, "حداقل یک فروشنده انتخاب کنید"),
  customFields: z.array(z.any()),
  filterValues: z.object(),
});

export { addProductSchema };
