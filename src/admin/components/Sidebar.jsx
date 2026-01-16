
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Users,
  Newspaper,
  Mail,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gmi_admin_auth");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-blue-950 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 font-bold text-xl border-b border-white/10">
        GMI Admin
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        <Item to="/" icon={<LayoutDashboard size={18} />} text="Dashboard" />
        <Item to="/programs" icon={<Layers size={18} />} text="Programs" />
        <Item to="/partners" icon={<Users size={18} />} text="Partners" />
        <Item to="/news" icon={<Newspaper size={18} />} text="News Mentions" />
        <Item to="/messages" icon={<Mail size={18} />} text="Messages" />
         <Item to="/blog-editor" icon={<Mail size={18} />} text="Blog Editor" />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-xs border-t border-white/10 text-center">
        © 2026 GMI
      </div>
    </aside>
  );
}

const Item = ({ to, icon, text }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${isActive ? "bg-white text-primary" : "hover:bg-white/10"}`
    }
  >
    {icon}
    {text}
  </NavLink>
);
