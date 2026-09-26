import api from "../api";

const sendPhoneNumber = (phone) => {
  return api.post("/auth/send", { phone });
};
const sendOtp = (phone, otp) => {
  return api.post("/auth/verify", { phone, otp, isSeller: false });
};

const getMe = () => {
  return api.get("/auth/me")
};
const logOutServic = () => {
  return api.post("/auth/logout")
};

export { sendPhoneNumber, sendOtp ,getMe,logOutServic};
