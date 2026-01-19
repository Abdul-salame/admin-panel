
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Programs from "./admin/pages/Programs";
import Partners from "./admin/pages/Partners";
import News from "./admin/pages/News";
import Messages from "./admin/pages/Messages";
import BlogEditor from "./admin/pages/BlogEditor";
import Login from "./admin/pages/Login";
import ProtectedRoute from "./admin/ProtectedRoute";
import Settings from "./admin/pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="programs" element={<Programs />} />
          <Route path="partners" element={<Partners />} />
          <Route path="news" element={<News />} />
          <Route path="messages" element={<Messages />} />
          <Route path="blog-editor" element={<BlogEditor />} />

          
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
