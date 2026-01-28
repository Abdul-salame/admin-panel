

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
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

    //  Frontend validation
    if (!form.fullName || !form.email || !form.password) {
      setError("Full name, email, and password are required");
      return;
    }

    setLoading(true);

    try {
      //  SEND fullName to backend
      const res = await api.post("/auth/login", {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      const user = res.data.user;

      if (!user) {
        setError("Invalid server response: No user data found");
        return;
      }

      //  Role check
      if (user.role !== "SUPERADMIN") {
        setError("Unauthorized access: Super Admin only");
        return;
      }

      //  Save admin session
      localStorage.setItem(
        "gmi_admin",
        JSON.stringify({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        })
      );

      //  Save token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length) {
        setError(backendError.errors.map(e => e.message).join(", "));
      } else {
        setError(backendError?.message || "Invalid login credentials");
      }
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

          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Abdool"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="demo@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
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
