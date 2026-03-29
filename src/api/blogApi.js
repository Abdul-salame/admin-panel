
import api from "./api";


const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const createBlog = async (blogData) => {
  try {
    const response = await api.post("/blog", blogData, getAuthHeader());
    return response.data;
  } catch (err) {
    console.error("Blog creation error:", err.response?.data || err.message);
    throw err;
  }
};



export const getBlogById = async (id) => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blog/${id}`, blogData, getAuthHeader());
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blog/${id}`, getAuthHeader());
  return response.data;
};