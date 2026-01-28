
import api from "./api";
export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();

    // Append all required fields
    formData.append("title", blogData.title);
    formData.append("excerpt", blogData.excerpt);
    formData.append("content", blogData.content);
    formData.append("status", blogData.status);
    formData.append("category", blogData.category); 

    // Append image if provided
    if (blogData.imageFile) {
      formData.append("image", blogData.imageFile);
    }

    // Send POST request to backend
    const response = await api.post("/blog/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // important for file upload
      },
    });

    return response.data;
  } catch (err) {
    console.error("Blog creation error:", err.response?.data || err.message);
    throw err;
  }
};
