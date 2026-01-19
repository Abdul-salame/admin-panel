
import { useState } from "react";
import { FileText, Image as ImageIcon, Eye, Save, Type } from "lucide-react";

export default function BlogEditor() {
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageFile: null,
    imagePreview: "",
    status: "Draft",
  });

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

    const previewUrl = URL.createObjectURL(file);

    setBlog((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };

  const submitBlog = (e) => {
    e.preventDefault();

    console.log("BLOG DATA (frontend only):", blog);

    alert("Blog prepared for publishing");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <header className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-blue-400 flex items-center gap-3">
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
          className="space-y-6 bg-white dark:bg-slate-500 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-400"
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
              placeholder="Enter a catchy title..."
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
              required
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
              className="w-full p-3 rounded-xl border border-slate-300 bg-white dark:bg-slate-800 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG, or WEBP only
            </p>
          </div>

          {/* IMAGE PREVIEW */}
          {blog.imagePreview && (
            <div className="rounded-xl overflow-hidden border">
              <img
                src={blog.imagePreview}
                alt="Selected Preview"
                className="w-full h-56 object-cover"
              />
            </div>
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
              placeholder="Brief summary for social media..."
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

          {/* STATUS & SAVE */}
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <Save size={20} /> Save Post
            </button>
          </div>
        </form>

        {/* LIVE PREVIEW */}
        <div className="sticky top-6 h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
            <Eye size={16} /> Live Preview
          </h2>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">
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
