import { useState } from "react";
import AddProductPage from "./Addproductpage";
import OrdersPage from "./Orderspage";
import ProductsPage from "./Productpage";
import SettingsPage from "./StoreInformationEdit"
import Sidebar from "./Sidebar";
import Navbar from "./Topbar";

export default function SellerDashboard() {
  const [activePage, setActivePage] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return <OrdersPage />;
      case "products":
        return <ProductsPage />;
      case "add-product":
        return <AddProductPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <OrdersPage />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* FIXED SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* MAIN CONTENT (SCROLLABLE) */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-[260px]">
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* PAGE SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
