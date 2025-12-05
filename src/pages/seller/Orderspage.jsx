import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../utils/axiosInstance";

export default function ordersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const seller = useSelector((state) => state.user.user); // seller token details

  // ---------------------------------------
  // FETCH ORDERS
  // ---------------------------------------
  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/getseller-orders", { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    preparing: "bg-indigo-100 text-indigo-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        🍱 Seller Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-lg transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Store: {order.storeId?.storeName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer: {order.userId?.name} ({order.userId?.email})
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold ${
                    statusColors[order.orderStatus]
                  }`}
                >
                  {order.orderStatus.toUpperCase().replace("_", " ")}
                </span>
              </div>

              {/* ITEMS */}
              <div className="bg-gray-50 p-3 rounded-lg my-3 space-y-3">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white p-2 rounded shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <img
                      src={item.image}
                      className="w-12 h-12 object-cover rounded-md"
                      alt={item.name}
                    />
                  </div>
                ))}
              </div>

              {/* ADDRESS + TOTAL */}
              <div className="flex justify-between items-start">
                <div className="text-sm text-gray-600 max-w-xs">
                  <p className="font-semibold text-gray-800">
                    Delivery Address:
                  </p>
                  <p>{order.address?.fullAddress}</p>
                  <p>{order.address?.pincode}</p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{order.orderTotal}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.paymentMethod.toUpperCase()} — {order.paymentStatus}
                  </p>
                </div>
              </div>

              {/* ORDER ACTION BUTTONS */}
              <div className="mt-4 flex gap-3">
                {order.orderStatus === "pending" && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Confirm Order
                  </button>
                )}
                {order.orderStatus === "confirmed" && (
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded">
                    Mark Preparing
                  </button>
                )}
                {order.orderStatus === "preparing" && (
                  <button className="px-4 py-2 bg-purple-600 text-white rounded">
                    Out for Delivery
                  </button>
                )}
                {order.orderStatus === "out_for_delivery" && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded">
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
