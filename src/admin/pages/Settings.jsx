
import { useState } from "react";
import {
  UserPlus,
  ShieldCheck,
  Trash2,
  Ban,
  CheckCircle,
  Key
} from "lucide-react";

export default function Settings() {
  /* ======================
     Create Admin
  ======================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  /* ======================
     Admin List (MOCK DATA)
  ======================= */
  const [admins, setAdmins] = useState([
    { id: 1, name: "Super Admin", email: "admin@gmi.org", role: "Admin", active: true },
    { id: 2, name: "Editor One", email: "editor@gmi.org", role: "Editor", active: true },
  ]);

  /* ======================
     Change Password
  ================ */
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const createAdmin = (e) => {
    e.preventDefault();

    const newAdmin = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: form.role,
      active: true,
    };

    setAdmins((prev) => [...prev, newAdmin]);
    alert("Admin created (frontend only)");

    setForm({ name: "", email: "", password: "", role: "Admin" });
  };

  const toggleAdminStatus = (id) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, active: !a.active } : a
      )
    );
  };

  const deleteAdmin = (id) => {
    if (window.confirm("Delete this admin?")) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match");
      return;
    }

    alert("Password change prepared (frontend only)");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <ShieldCheck className="text-blue-600" />
        Admin Settings
      </h1>

      {/* Create Admin */}
      <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow border dark:border-white/10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <UserPlus className="text-blue-600" /> Create New Admin
        </h2>

        <form onSubmit={createAdmin} className="grid md:grid-cols-2 gap-5">
          <input
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Full Name"
            required
            className="input"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
            placeholder="Email"
            required
            className="input"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleFormChange}
            placeholder="Temporary Password"
            required
            className="input"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleFormChange}
            className="input"
          >
            <option>Admin</option>
            <option>Editor</option>
          </select>

          <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold">
            Create Admin
          </button>
        </form>
      </section>

      {/*Admin List  */}
      <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow border dark:border-white/10">
        <h2 className="text-xl font-semibold mb-6">Admin Users</h2>

        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between p-4 rounded-xl border dark:border-white/10"
            >
              <div>
                <p className="font-semibold">{admin.name}</p>
                <p className="text-sm text-gray-500">{admin.email} • {admin.role}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAdminStatus(admin.id)}
                  className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1
                    ${admin.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"}`}
                >
                  {admin.active ? <CheckCircle size={14} /> : <Ban size={14} />}
                  {admin.active ? "Active" : "Disabled"}
                </button>

                <button
                  onClick={() => deleteAdmin(admin.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Change Password */}
      <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow border dark:border-white/10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Key className="text-blue-600" /> Change Password
        </h2>

        <form onSubmit={changePassword} className="space-y-4 max-w-md">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            required
            className="input"
          />

          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordChange}
            placeholder="New Password"
            required
            className="input"
          />

          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            placeholder="Confirm New Password"
            required
            className="input"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold w-full">
            Update Password
          </button>
        </form>
      </section>
    </div>
  );
}
