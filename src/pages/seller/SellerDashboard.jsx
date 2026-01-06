import { useState } from "react";
import { useSelector } from "react-redux";

import AddProductPage from "./Addproductpage";
import AdminShowAllSellers from "./AdminShowAllSellers";
import AdminShowAllStores from "./AdminShowAllStores";
import AdminShowProducts from "./AdminShowProducts";
import OrdersPage from "./Orderspage";
import ProductsPage from "./Productpage";
import Sidebar from "./Sidebar";
import SettingsPage from "./StoreInformationEdit";
import Navbar from "./Topbar";

export default function SellerDashboard() {
  const [activePage, setActivePage] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔐 Get logged-in user
  const user = useSelector((state) => state.user?.user);
  const isAdmin = user?.role === "admin";

  const renderPage = () => {
    switch (activePage) {
      // ✅ COMMON (SELLER + ADMIN)
      case "orders":
        return <OrdersPage />;

      case "products":
        return <ProductsPage />;

      case "settings":
        return <SettingsPage />;

      // ✅ SELLER ONLY
      case "add-product":
        return <AddProductPage />;

      // 🔐 ADMIN ONLY
      case "show-products":
        return <AdminShowProducts />;

      case "show-stores":
        return <AdminShowAllStores />;

      case "show-sellers":
        return <AdminShowAllSellers />;

      default:
        return isAdmin ? <AdminShowProducts /> : <OrdersPage />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-[260px]">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
