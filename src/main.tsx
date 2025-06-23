import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';
import Personales from './pages/Personales';
import Cargos from './pages/Cargos';
import Rubros from './pages/Rubros';
import { AuthProvider, type Role } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import RequireRole from './context/RequireRole';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="personales"
              element={
                <RequireRole roles={["Administrador", "Gerente/RRHH", "Asistente de RRHH"]}>
                  <Personales />
                </RequireRole>
              }
            />
            <Route
              path="cargos"
              element={
                <RequireRole roles={["Administrador", "Asistente de RRHH"]}>
                  <Cargos />
                </RequireRole>
              }
            />
            <Route
              path="rubros"
              element={
                <RequireRole roles={["Administrador"]}>
                  <Rubros />
                </RequireRole>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

