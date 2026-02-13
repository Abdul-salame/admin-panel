
import { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Eye,
  Save,
  Type,
  Tag,
} from "lucide-react";
import { createBlog } from "../../api/blogApi";

export default function BlogEditor() {
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "", 
    imageFile: null,
    imagePreview: "",
    status: "Draft",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG, and WEBP images are allowed.");
      return;
    }

    setBlog((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

 const submitBlog = async (e) => {
  e.preventDefault();

  if (!blog.category) {
    alert("Please select a category");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("excerpt", blog.excerpt);
    formData.append("content", blog.content);
    formData.append("category", blog.category);
    formData.append("status", blog.status);

    if (blog.imageFile) {
      formData.append("media", blog.imageFile);
    }

    await createBlog(formData);

    alert(" Blog created successfully!");

    setBlog({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      imageFile: null,
      imagePreview: "",
      status: "Draft",
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    alert(" Failed to create blog.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <header className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
            <FileText className="text-blue-500" /> Create Blog Post
          </h1>
          <p className="text-blue-800 mt-2 text-lg">
            Draft your next masterpiece.
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            blog.status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {blog.status}
        </span>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* FORM */}
        <form
          onSubmit={submitBlog}
          className="space-y-6 bg-white p-8 rounded-3xl shadow-lg border"
        >
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Type size={16} /> Title
            </label>
            <input
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
              placeholder="Enter a catchy title..."
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Tag size={16} /> Category
            </label>
            <input
              name="category"
              value={blog.category}
              onChange={handleChange}
              required
              placeholder="e.g., Technology, Education, News"
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> Featured Image
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageSelect}
              className="w-full p-3 rounded-xl border text-sm"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {blog.imagePreview && (
            <img
              src={blog.imagePreview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl border"
            />
          )}

          {/* EXCERPT */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Excerpt ({blog.excerpt.length}/160)
            </label>
            <textarea
              name="excerpt"
              value={blog.excerpt}
              onChange={handleChange}
              maxLength={160}
              className="w-full p-4 h-28 rounded-xl border"
              placeholder="Short summary..."
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Main Content
            </label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              className="w-full p-4 h-64 rounded-xl border font-serif text-lg"
              placeholder="Write your story here..."
            />
          </div>

          {/* STATUS + SUBMIT */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="status"
              value={blog.status}
              onChange={handleChange}
              className="flex-1 p-4 rounded-xl border"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>

        {/* LIVE PREVIEW */}
        <div className="sticky top-6 h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
            <Eye size={16} /> Live Preview
          </h2>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="h-56 bg-slate-100 flex items-center justify-center">
              {blog.imagePreview ? (
                <img
                  src={blog.imagePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={60} className="text-slate-400" />
              )}
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-3">
                {blog.title || "Your Blog Title"}
              </h2>
              <p className="italic text-slate-500 mb-5">
                {blog.excerpt || "Your excerpt will appear here..."}
              </p>
              <div className="whitespace-pre-wrap text-slate-700">
                {blog.content ||
                  "Start typing in the editor to see your content..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
