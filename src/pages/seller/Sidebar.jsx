import { ClipboardList, Package, Plus, Settings, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activePage,
  setActivePage,
}) {
  // 🔐 Get logged-in user from Redux
  const user = useSelector((state) => state.user?.user);
  console.log(user);
  const isAdmin = user?.role === "admin";

  const go = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // close sidebar on mobile
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-40
          h-full w-64 bg-white shadow-lg p-5
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* CLOSE ICON (MOBILE) */}
        <div className="lg:hidden flex justify-end mb-4">
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-6 text-orange-600">
          {isAdmin ? "Admin Dashboard" : "Seller Dashboard"}
        </h2>

        {/* MENU */}
        <div className="space-y-3">
          {/* ORDERS (COMMON) */}
          {!isAdmin ? (
            <button
              onClick={() => go("orders")}
              className={`flex items-center w-full p-3 rounded-lg ${
                activePage === "orders"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <ClipboardList className="mr-3 w-5 h-5" />
              Orders
            </button>
          ) : (
            ""
          )}

          {/* ALL PRODUCTS (COMMON) */}
          {!isAdmin ? (
            <button
              onClick={() => go("products")}
              className={`flex items-center w-full p-3 rounded-lg ${
                activePage === "products"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Package className="mr-3 w-5 h-5" />
              All Products
            </button>
          ) : (
            ""
          )}
          {/* SELLER ONLY */}
          {!isAdmin ? (
            <button
              onClick={() => go("add-product")}
              className={`flex items-center w-full p-3 rounded-lg ${
                activePage === "add-product"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Plus className="mr-3 w-5 h-5" />
              Add Product
            </button>
          ) : (
            ""
          )}

          {/* ADMIN ONLY */}
          {isAdmin ? (
            <>
              <button
                onClick={() => go("show-products")}
                className={`flex items-center w-full p-3 rounded-lg ${
                  activePage === "show-products"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Package className="mr-3 w-5 h-5" />
                Show Products
              </button>

              <button
                onClick={() => go("show-stores")}
                className={`flex items-center w-full p-3 rounded-lg ${
                  activePage === "show-stores"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Package className="mr-3 w-5 h-5" />
                Show Stores
              </button>

              <button
                onClick={() => go("show-sellers")}
                className={`flex items-center w-full p-3 rounded-lg ${
                  activePage === "show-sellers"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Package className="mr-3 w-5 h-5" />
                Show Sellers
              </button>
            </>
          ) : (
            ""
          )}

          {/* SETTINGS (COMMON) */}
          {!isAdmin ? (
            <button
              onClick={() => go("settings")}
              className={`flex items-center w-full p-3 rounded-lg ${
                activePage === "settings"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Settings className="mr-3 w-5 h-5" />
              Settings
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
