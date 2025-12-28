import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginPage from "@/modules/auth/LoginPage";
// Importamos las páginas nuevas
import DashboardPage from "@/modules/dashboard/DashboardPage";
import InventoryPage from "@/modules/inventory/InventoryPage";
import SalesPage from "@/modules/sales/SalesPage";
import AdminPage from "@/modules/admin/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Privadas (Dentro del Layout) */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Redirigir la raiz "/" al dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}