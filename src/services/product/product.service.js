import api from "../api";

const getProductsService = (form = {}) => {
  const formJson = { ...form, filterValues: JSON.stringify(form.filterValues) };
  return api.get("/products", {
    params: formJson,
  });
};
const getProductService = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data.product;
};

const getProductsForAdmin = async (form) => {
  const response = await api.get("/products", {
    params: form,
  });
  return response.data.data;
};

const addProduct = (form) => {
  return api.post("/products", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const removeProduct = (idProduct) => {
  return api.delete(`/products/${idProduct}`);
};

export {
  getProductsService,
  getProductService,
  getProductsForAdmin,
  addProduct,
  removeProduct,
};
