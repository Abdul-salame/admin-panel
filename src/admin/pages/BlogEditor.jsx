
import { useState } from "react";
import { 
  FileText, 
  Image as ImageIcon, 
  Save, 
  PlusCircle, 
  X,
  User
} from "lucide-react";
import { createBlog } from "../../api/blogApi";

export default function BlogEditor() {
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    status: "Published",
    imageFile: null,
    imagePreview: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBlog((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    
    if (!blog.title || !blog.content || !blog.category || !blog.author || !blog.imageFile) {
      alert("Please fill in all required fields, including the featured image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Ensure all fields are appended as strings to satisfy Prisma/Multer requirements
      formData.append("title", String(blog.title).trim());
      formData.append("excerpt", String(blog.excerpt).trim());
      formData.append("content", String(blog.content).trim());
      formData.append("category", String(blog.category).trim()); // The critical fix
      formData.append("author", String(blog.author).trim()); 
      formData.append("status", String(blog.status));

      const slug = blog.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      formData.append("slug", slug);

      // Binary field
      formData.append("media", blog.imageFile);

      await createBlog(formData);
      alert("Blog created successfully!");
      
      // Reset form
      setBlog({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "",
        status: "Published",
        imageFile: null,
        imagePreview: "",
      });
    } catch (error) {
      console.error("API Error Details:", error.response?.data || error.message);
      // Detailed alert to catch Prisma errors
      const errorMsg = error.response?.data?.message || "Check network tab for Prisma details.";
      alert(`Failed to create blog: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <form onSubmit={submitBlog} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <input
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Blog Title *"
              className="w-full text-3xl font-bold border-none focus:ring-0 placeholder-gray-300 mb-4 bg-transparent"
              required
            />
            <hr className="mb-6" />
            
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Content *</label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              className="w-full min-h-[450px] border-none focus:ring-0 resize-none text-lg bg-transparent"
              required
            />
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 border-b pb-2">
              <Save size={18} className="text-blue-600" /> Post Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Author Name *</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    name="author"
                    value={blog.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className="w-full pl-10 rounded-lg border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Category *</label>
                <input
                  name="category"
                  value={blog.category}
                  onChange={handleChange}
                  placeholder="e.g. Technology"
                  className="w-full mt-1 rounded-lg border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                <select 
                  name="status" 
                  value={blog.status}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-lg border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-lg transition-all shadow-md active:transform active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? "Creating..." : <><PlusCircle size={20} /> Publish Blog</>}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 border-b pb-2">
              <ImageIcon size={18} className="text-blue-600" /> Featured Image *
            </h3>
            
            {blog.imagePreview ? (
              <div className="relative group rounded-lg overflow-hidden border">
                <img 
                  src={blog.imagePreview} 
                  className="w-full h-48 object-cover" 
                  alt="Preview" 
                />
                <button 
                  type="button"
                  onClick={() => setBlog(p => ({...p, imagePreview: "", imageFile: null}))}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <ImageIcon className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">Required for backend</p>
                </div>
                <input type="file" className="hidden" onChange={handleImageSelect} accept="image/*" required />
              </label>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 border-b pb-2">
              <FileText size={18} className="text-blue-600" /> Excerpt *
            </h3>
            <textarea
              name="excerpt"
              value={blog.excerpt}
              onChange={handleChange}
              rows="4"
              placeholder="Provide a short summary..."
              className="w-full rounded-lg border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}