import api from "../api";
const getAllUsers = async (form = { page: 1 }) => {
  const response = await api.get("/users", {
    params:form
  });
  return response.data.data
};

const banUser = (id)=>{
  return api.post(`/users/ban/${id}`,{userId:id})
}

export {getAllUsers,banUser}
