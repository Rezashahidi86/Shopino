import api from "../api";

const addToCartService = (form) => {
  return api.post("cart/add", {
    ...form,
    sellerId: "6a72184b32f47660ce6ed963",
  });
};

const getCart = async () => {
  const response = await api.get("/cart");
  return response.data.data.cart.items;
};
const removeCart = (formRemoveCart) => {
  return api.post("/cart/remove", formRemoveCart);
};
const updateCart = (formUpdataCart) => {
  return api.patch("/cart/update", formUpdataCart);
};

export { addToCartService, getCart, removeCart,updateCart };
