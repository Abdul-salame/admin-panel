
import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function Admins() {
  const [admins, setAdmins] = useState([
    { name: "Super Admin", email: "admin@gmi.org", role: "Super Admin" }
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin"
  });

  const addAdmin = (e) => {
    e.preventDefault();
    setAdmins([...admins, form]);
    setForm({ name: "", email: "", role: "Admin" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Management</h1>

      {/* Add Admin */}
      <form
        onSubmit={addAdmin}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow mb-10 space-y-4 max-w-lg"
      >
        <div className="flex items-center gap-2 font-semibold">
          <UserPlus size={18} /> Add New Admin
        </div>

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="input"
        >
          <option>Admin</option>
          <option>Editor</option>
        </select>

        <button className="btn-primary w-full">Add Admin</button>
      </form>

      
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-4">{admin.name}</td>
                <td className="p-4">{admin.email}</td>
                <td className="p-4">{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
