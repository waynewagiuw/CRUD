import { Routes, Route, Navigate } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/clients" replace />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="*" element={<Navigate to="/clients" replace />} />
    </Routes>
  );
}
