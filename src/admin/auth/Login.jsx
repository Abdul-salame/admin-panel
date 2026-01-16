
import { useNavigate } from "react-router-dom";
import { login } from "./auth";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          GMI Admin Login
        </h1>

        <div className="space-y-4">
          <input
            required
            placeholder="Full Name"
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border px-4 py-3 rounded-lg"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
