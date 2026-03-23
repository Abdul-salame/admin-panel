
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

export default function Login() {
  const navigate = useNavigate();

  // Updated to match backend docs: only email and password required
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Standard frontend validation
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      // Sending ONLY email and password as per the Swagger docs
      const res = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      // The backend returns "Login successful" on 200
      const user = res.data.user;
      const token = res.data.token;

      if (!token) {
        setError("Login failed: No token received from server");
        return;
      }

      // Save token for the api.js Authorization header
      localStorage.setItem("token", token);

      // Save user details if they exist in the response
      if (user) {
        localStorage.setItem("gmi_admin", JSON.stringify(user));
      }

      // Redirect to dashboard
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const backendError = err.response?.data;
      // Handle the 401 "Invalid credentials" error from docs
      setError(backendError?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium bg-red-50 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}