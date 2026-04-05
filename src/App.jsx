
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Programs from "./admin/pages/Programs";
import Partners from "./admin/pages/Partners";
import News from "./admin/pages/News";
import Messages from "./admin/pages/Messages";
import BlogEditor from "./admin/pages/BlogEditor";
import Donations from "./admin/pages/Donations";
import Settings from "./admin/pages/Settings";
import Login from "./admin/pages/Login";
import ProtectedRoute from "./admin/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Using 'index' makes Dashboard show at /admin. 
              Adding 'dashboard' path makes it show at /admin/dashboard.
          */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="programs" element={<Programs />} />
          <Route path="partners" element={<Partners />} />
          <Route path="news" element={<News />} />
          <Route path="messages" element={<Messages />} />
          
          {/* Blog Editor Routes 
              - The 'key' ensures the component re-mounts when switching 
                between Create and Edit modes.
          */}
          <Route path="blog-editor" element={<BlogEditor key="create-blog" />} />
          <Route path="blog-editor/:id" element={<BlogEditor key="edit-blog" />} />
          
          <Route path="donations" element={<Donations />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all: Redirect unknown routes to login or dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}