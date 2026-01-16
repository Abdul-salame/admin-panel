
import { useState } from "react";
import { FileText, Image as ImageIcon, Eye, Save, Type } from "lucide-react";

export default function BlogEditor() {
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    status: "Draft",
  });

  
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") setImageError(false); 
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const submitBlog = (e) => {
    e.preventDefault();
    console.log("SEND TO BACKEND:", blog);
    alert("Blog prepared for publishing ");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <header className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-blue-400 flex items-center gap-3">
            <FileText className="text-blue-500" /> Create Blog Post
          </h1>
          <p className="text-blue-800 mt-2 text-lg">Draft your next masterpiece.</p>
        </div>
        <div className="flex gap-3 items-center">
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
              blog.status === "Published"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {blog.status}
          </span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* FORM SECTION */}
        <form
          onSubmit={submitBlog}
          className="space-y-6 bg-white dark:bg-slate-500 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-400 transition-all"
        >
          {/* TITLE */}
          <div>
            <label htmlFor="title" className="text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Type size={16} /> Title
            </label>
            <input
              id="title"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Enter a catchy title..."
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-semibold transition dark:text-white"
              required
            />
          </div>

          {/* FEATURED IMAGE */}
          <div>
            <label htmlFor="image" className=" text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <ImageIcon size={16} /> Featured Image URL
            </label>
            <input
              id="image"
              name="image"
              value={blog.image}
              onChange={handleChange}
              placeholder="https://imagescom/..."
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition dark:text-white"
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
              Excerpt ({blog.excerpt.length}/160)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={blog.excerpt}
              onChange={handleChange}
              maxLength={160}
              placeholder="Brief summary for social media..."
              className="w-full p-4 h-28 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition dark:text-white"
            />
          </div>

          {/* MAIN CONTENT */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">Main Content</label>
            <textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              placeholder="Write your story here..."
              className="w-full p-4 h-64 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-serif text-lg transition dark:text-white"
            />
          </div>

          {/* STATUS & SAVE */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">Status</label>
              <select
                id="status"
                name="status"
                value={blog.status}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none transition dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <button 
              type="submit"
              className="flex-1 mt-4 md:mt-7 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Save size={20} /> Save Post
            </button>
          </div>
        </form>

        {/* PREVIEW SECTION */}
        <div className="sticky top-6 h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
            <Eye size={16} /> Live Preview
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition">
            <div className="h-56 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              {blog.image && !imageError ? (
                <img
                  src={blog.image}
                  alt="Preview"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <ImageIcon size={60} />
                  <span className="text-xs uppercase tracking-widest font-semibold">No Preview Image</span>
                </div>
              )}
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-3 dark:text-white transition break-words">
                {blog.title || "Your Blog Title"}
              </h2>
              <p className="text-slate-500 italic mb-5 transition break-words">
                {blog.excerpt || "Your excerpt will appear here..."}
              </p>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap transition break-words">
                {blog.content || "Start typing in the editor to see your content..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}