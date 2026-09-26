import { z } from "zod";

const sendPhoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),
});

export { sendPhoneSchema };
