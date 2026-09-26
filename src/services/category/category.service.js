import api from "../api";

const getAllCategories = async () => {
  const { data } = await api.get("/category", {
  });
  return data;
};

export default getAllCategories;
