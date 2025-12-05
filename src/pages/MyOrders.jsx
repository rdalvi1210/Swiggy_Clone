import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PagesNavbar from "../components/PagesNavbar";
import api from "../utils/axiosInstance";

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openBill, setOpenBill] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/order/my-orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Swiggy colors/palette
  const swiggyOrange = "bg-[#fc8019] text-white";
  const swiggyOrangeBtn =
    "bg-[#fc8019] hover:bg-[#ff944c] text-white shadow font-semibold";
  const borderColor = "border-[#fc8019]";

  const statusConfig = {
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-800",
      icon: "✔️",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-700",
      icon: "❌",
    },
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700",
      icon: "⌛",
    },
    processing: {
      label: "Processing",
      color: "bg-yellow-100 text-yellow-700",
      icon: "⌛",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-white">
        <div className="flex flex-col items-center gap-3">
          <span className="animate-spin text-5xl text-[#fc8019]">🍽️</span>
          <span className="text-gray-400 text-lg font-bold">Just a moment…</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <PagesNavbar />

        <div className="flex flex-col items-center justify-center h-[65vh] px-4 text-center bg-gradient-to-br from-orange-50 to-white">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6647/6647510.png"
            className="w-28 opacity-70 mb-4"
            alt="No orders"
          />
          <h2 className="text-3xl font-extrabold text-[#fc8019]">No Orders Yet!</h2>
          <p className="text-gray-500 text-base mt-1">
            Hungry? Let's get you started 🍛
          </p>

          <button
            onClick={() => navigate("/")}
            className={`mt-7 px-6 py-3 rounded-xl text-lg ${swiggyOrangeBtn}`}
          >
            Explore Restaurants
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <PagesNavbar />

      <div className="max-w-2xl md:max-w-4xl mx-auto px-2 md:px-6 py-5 mb-10">
        <h1 className="text-3xl font-extrabold mb-7 text-[#fc8019] tracking-tight">
          My Orders
        </h1>

        <div className="space-y-7">
          {orders.map((order) => {
            const firstItem = order.items[0];
            const statusObj =
              statusConfig[order.orderStatus] || statusConfig["pending"];
            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition p-5 flex flex-col gap-3 relative border-orange-100"
                style={{ borderLeft: "5px solid #fc8019" }}
              >
                {/* Status Badge */}
                <span
                  className={`absolute right-6 top-7 px-3 py-1 flex items-center gap-1 text-xs rounded-full font-bold ${statusObj.color} border`}
                >
                  {statusObj.icon} {statusObj.label}
                </span>
                {/* Store */}
                <div className="flex items-center gap-4">
                  <img
                    src={order.store.coverImage}
                    className="w-12 h-12 rounded-lg object-cover border shadow"
                    alt={order.store.storeName}
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{order.store.storeName}</h2>
                    <p className="text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                </div>
                {/* Items */}
                <div className="mt-2 flex flex-wrap gap-3 border-t pt-3">
                  {order.items.slice(0, 2).map((item, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center bg-orange-50 rounded-xl px-3 py-1 shadow-sm"
                    >
                      <img
                        src={item.image}
                        className="w-7 h-7 rounded object-cover mr-2 border"
                        alt={item.name}
                      />
                      <span className="font-bold text-gray-800">{item.name}</span>
                      <span className="ml-1 text-xs text-gray-500">×{item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <span className="text-xs text-gray-500 self-center">
                      +{order.items.length - 2} more
                    </span>
                  )}
                </div>
                {/* Amount & Button */}
                <div className="flex justify-between items-center mt-1 pt-2">
                  <span className="text-lg font-extrabold text-gray-700">
                    ₹{order.orderTotal}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setOpenBill(true);
                    }}
                    className={`px-5 py-2 rounded-lg text-sm ${swiggyOrangeBtn}`}
                  >
                    View Bill
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BILL MODAL - Swiggy style */}
      {openBill && selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-2 md:px-0">
          <div
            className={`bg-white rounded-2xl border-2 ${borderColor} w-full max-w-sm mx-auto shadow-2xl p-5 relative animate-slideUp`}
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpenBill(false)}
              className="absolute right-4 top-4 text-2xl font-extrabold text-gray-400 hover:text-[#fc8019]"
              aria-label="Close"
            >
              ×
            </button>
            {/* Heading */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={selectedOrder.store.coverImage}
                alt={selectedOrder.store.storeName}
                className="w-10 h-10 rounded-lg border object-cover"
              />
              <div>
                <div className="font-extrabold text-lg text-[#fc8019]">
                  {selectedOrder.store.storeName}
                </div>
                <div className="text-gray-400 text-xs font-medium">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            {/* Items list */}
            <div className="border-t border-dashed pt-3 mb-2">
              <div className="space-y-2 mb-3">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} <span className="text-xs text-gray-500">×{item.quantity}</span>
                    </span>
                    <span className="font-bold text-gray-800">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Bill breakdown */}
            <div className="border-t pt-3 mb-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subTotal ?? selectedOrder.orderTotal}</span>
              </div>
              {selectedOrder.deliveryFee != null && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{selectedOrder.deliveryFee}</span>
                </div>
              )}
              {selectedOrder.gst != null && (
                <div className="flex justify-between text-sm">
                  <span>GST</span>
                  <span>₹{selectedOrder.gst}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total Paid</span>
                <span>₹{selectedOrder.orderTotal}</span>
              </div>
            </div>
            {/* Payment & Address */}
            <div className="border-t pt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold">Payment:</span>
                <span className="capitalize text-gray-700">
                  {selectedOrder.paymentMethod}
                </span>
                {selectedOrder.paymentStatus === "paid" ? (
                  <span className="text-green-500 ml-1 font-extrabold">✔ Paid</span>
                ) : (
                  <span className="text-yellow-500 ml-1 font-extrabold">⌛ Pending</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-bold">Delivered to:</span> {selectedOrder.address.fullAddress}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(64px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp .22s cubic-bezier(.39,.12,.6,.86);
        }
      `}</style>
    </>
  );
}
