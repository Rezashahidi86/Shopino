import api from "../api";

const getCommentsProduct = async (productId) => {
  const response = await api.get("./comments", {
    params: { productId },
  });
  return response.data.data.comments
};

const sendCommentForProduct = (form)=>{
  return api.post("comments",form)
}

export { getCommentsProduct ,sendCommentForProduct};
