import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // `<Router>` ko hata diya import se

// Component Imports
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboards Placeholders
import StudentDashboard from "../pages/student/Dashboard";
import TeacherDashboard from "../pages/teacher/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    // Yahan se parent <Router> wrapper hata diya h
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Dashboards */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;