import { useRef, useState } from "react";
import { toast } from "sonner";
import { sendOtp, sendPhoneNumber } from "./../../services/auth/auth.service";
import { useNavigate } from "react-router";
import { sendPhoneSchema } from "../../validators/auth";
const useAuth = () => {
  const [phone, setPhone] = useState("");
  const [activeStep2, setActiveStep2] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const handleSubmitPhone = async (e) => {
    e.preventDefault();
    const { success } = sendPhoneSchema.safeParse({ phone });
    if (success) {
      toast.promise(sendPhoneNumber(phone), {
        success: () => {
          setActiveStep2(true);
          return "کد تایید با موفقیت ارسال شد";
        },
        loading: "درحال ارسال کد تایید",
      });
    } else {
      toast.error("شماره تلفن نامعتبر است");
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) return toast.error("کد تایید چهار رقمی است");
    toast.promise(sendOtp(phone, code), {
      success: () => {
        setOtp(["", "", "", ""]);
        setPhone("");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
        return "با موفقیت وارد شدید";
      },
      loading: "درحال انجام عملیات",
    });
  };

  return [
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
  ];
};

export default useAuth;
