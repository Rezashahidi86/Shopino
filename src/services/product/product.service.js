import api from "../api";

const getProductsService = (form = {}) => {
  const formJson = { ...form, filterValues: JSON.stringify(form.filterValues) };
  return api.get("/products", {
    params: formJson,
  });
};
const getProductService =async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data.product;
};
export { getProductsService,getProductService };
