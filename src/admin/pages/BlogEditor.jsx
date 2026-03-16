
import { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Eye,
  Save,
  Type,
} from "lucide-react";
import { createBlog } from "../../api/blogApi";

export default function BlogEditor() {
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "Draft",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        status: blog.status,
        image_url: blog.image_url,
        slug: blog.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      };

      await createBlog(payload);

      alert("Blog created successfully!");

      setBlog({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        status: "Draft",
        image_url: "",
      });
    } catch (error) {
      console.error("Blog creation error:", error);
      alert("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
          <FileText className="text-blue-500" /> Create Blog Post
        </h1>
        <p className="text-blue-800 mt-2 text-lg">
          Draft your next masterpiece.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* FORM */}
        <form
          onSubmit={submitBlog}
          className="space-y-6 bg-white p-8 rounded-3xl shadow-lg border"
        >

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Type size={16}/> Title
            </label>
            <input
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
              placeholder="Enter a catchy title..."
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium mb-2">
              Category
            </label>
            <input
              name="category"
              value={blog.category}
              onChange={handleChange}
              placeholder="Technology, Education, News..."
              className="w-full p-4 rounded-xl border"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <ImageIcon size={16}/> Image URL
            </label>
            <input
              name="image_url"
              value={blog.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-4 rounded-xl border"
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={blog.excerpt}
              onChange={handleChange}
              className="w-full p-4 h-24 rounded-xl border"
              placeholder="Short summary of the blog..."
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              className="w-full p-4 h-64 rounded-xl border"
              placeholder="Write your blog here..."
            />
          </div>

          {/* STATUS */}
          <div>
            <select
              name="status"
              value={blog.status}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={20}/>
            {loading ? "Saving..." : "Save Post"}
          </button>

        </form>

        {/* LIVE PREVIEW */}
        <div className="sticky top-6 h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
            <Eye size={16}/> Live Preview
          </h2>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="h-56 bg-slate-100 flex items-center justify-center">
              {blog.image_url ? (
                <img
                  src={blog.image_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={60} className="text-slate-400"/>
              )}
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-3">
                {blog.title || "Your Blog Title"}
              </h2>

              <p className="italic text-gray-500 mb-4">
                {blog.excerpt || "Your excerpt will appear here"}
              </p>

              <div className="whitespace-pre-wrap text-slate-700">
                {blog.content || "Start typing to preview content"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}