
import api from "./api";

export const createBlog = async (blogData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/blog", blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Blog creation error:", err.response?.data || err.message);
    throw err;
  }
};