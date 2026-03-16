import api from "./api";

export const createBlog = async (blogData) => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      status: blogData.status,
      category: blogData.category,
      image_url: blogData.image_url
    };

    const response = await api.post("/blog/blog", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (err) {
    console.error("Blog creation error:", err.response?.data || err.message);
    throw err;
  }
};