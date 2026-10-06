import api from "../api";

const getSellersByKeyWord = async(query) => {
  const response = await api.get("/sellers/search", {
    params: { q: query },
  });
  return response.data.data.sellers
};


export {getSellersByKeyWord}