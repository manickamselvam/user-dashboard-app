import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../app/hooks";

const AuthPage = lazy(() => import("../features/auth/AuthPage"));
const UsersPage = lazy(() => import("../features/users/UsersPage"));

function AppRoutes() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Suspense fallback={<Spin tip="Loading..." />}>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all route for unmatched paths */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
