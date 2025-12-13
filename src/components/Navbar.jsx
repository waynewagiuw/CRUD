import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onOpen, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // === FIX LOGIC DI SINI ===
  const isProducts = location.pathname === "/products";
  const currentTitle = isProducts ? "Products" : "Clients";
  const buttonLabel = isProducts ? "Add Product" : "Add Client";
  // ========================

  const handleSearch = (e) => onSearch?.(e.target.value);

  const changePage = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm p-4 flex items-center justify-between relative">
      <div
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="text-xl font-bold">{currentTitle}</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {menuOpen && (
        <div className="absolute left-4 top-16 bg-base-100 shadow-md rounded-lg w-32 z-50 border border-base-300">
          <div
            className="p-2 hover:bg-base-300 cursor-pointer"
            onClick={() => changePage("/clients")}
          >
            Clients
          </div>
          <div
            className="p-2 hover:bg-base-300 cursor-pointer"
            onClick={() => changePage("/products")}
          >
            Products
          </div>
        </div>
      )}

      <div className="flex-1 flex justify-center px-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-40 md:w-64"
          onChange={handleSearch}
        />
      </div>

      {/* === FIXED BUTTON === */}
      <button className="btn btn-primary" onClick={onOpen}>
        {buttonLabel}
      </button>
    </div>
  );
}
