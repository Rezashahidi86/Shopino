import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "https://shopino.iran.liara.run/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      toast.error("درخواست بیش از حد طول کشید");
    }

    if (error.code === "ERR_NETWORK") {
      toast.error("مشکلی در ارتباط با سرور وجود دارد");
    }

    switch (error.response?.status) {
      case 400:{
        toast.error("امکان این عملیات وجود ندارد")
      }
      case 401:
        break;

      case 403:
        toast.error("دسترسی غیرمجاز");
        break;

      case 500:
        console.log(error);
        toast.error("خطایی در سرور رخ داده است");
        break;

      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
