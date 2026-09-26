import z from "zod";

const sendFormCommunicationSchema = z.object({
  name: z.string().trim().min(3,{message:'نام خود را وارد کنید'}),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),
  subject: z.string()
    .trim()
    .min(8, { message: "عنوان شما باید حداقل 8 کاراکتر باشد" })
    .max(30, { message: "عنوان شما باید حداکثر 30 کاراکتر باشد" }),
  content: z
    .string()
    .trim()
    .max(200, { message: "متن شما باید حداکثر 200 کاراکتر باشد" }),
});


export  {sendFormCommunicationSchema}