import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="Login" element={<LoginPage />} />
      <Route path="Register" element={<RegisterPage />} />
      {/* Here any different routes to "/login" or "/register" we can redirect to principal route "/auth/login" */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
