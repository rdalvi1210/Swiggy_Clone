import { ClipboardList, Package, Plus, Settings, X } from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activePage,
  setActivePage,
}) {
  const go = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // mobile close only
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

      {/* FIXED SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-40
          h-full w-64 bg-white shadow-lg p-5
          transform transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close icon — mobile only */}
        <div className="lg:hidden flex justify-end mb-4">
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <h2 className="text-xl font-bold mb-6 text-orange-600">
          Seller Dashboard
        </h2>

        <div className="space-y-4">
          {[
            { id: "orders", label: "Orders", icon: ClipboardList },
            { id: "products", label: "All Products", icon: Package },
            { id: "add-product", label: "Add Product", icon: Plus },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`flex items-center w-full p-3 rounded-lg ${
                activePage === item.id
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="mr-3 w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
