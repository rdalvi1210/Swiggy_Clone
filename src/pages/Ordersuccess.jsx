import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import PagesNavbar from "../components/PagesNavbar";
import api from "../utils/axiosInstance";

export default function OrderSuccess() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/order/getorderbyid/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <PagesNavbar />
        <div className="text-center py-24 text-lg font-medium">
          Loading your order…
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <PagesNavbar />
        <div className="text-center py-24 text-red-500">Order not found</div>
      </>
    );
  }

  return (
    <>
      <PagesNavbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          {/* HEADER */}
          <div className="bg-green-50 px-6 py-5 border-b">
            <h1 className="text-2xl font-bold text-green-700">
              Order Confirmed
            </h1>
            <div className="flex flex-wrap gap-2 text-sm mt-1 text-gray-600">
              <span>
                Order ID: <b>{order._id}</b>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 capitalize">
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* STORE */}
          <div className="px-6 py-5 flex items-center gap-4 border-b">
            <img
              src={order.store.coverImage}
              alt={order.store.storeName}
              className="w-16 h-16 rounded-xl object-cover border"
            />
            <div>
              <p className="font-semibold text-lg">{order.store.storeName}</p>
              <p className="text-xs text-gray-500">
                Your food is being prepared
              </p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="px-6 py-5">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="px-6 py-5 border-t">
            <h2 className="font-semibold mb-1">Delivery Address</h2>
            <p className="text-sm font-medium">{order.address.label}</p>
            <p className="text-sm text-gray-600">{order.address.fullAddress}</p>
            <p className="text-sm text-gray-500">{order.address.pincode}</p>
          </div>

          {/* PAYMENT + TOTAL */}
          <div className="px-6 py-5 border-t bg-gray-50">
            <div className="flex justify-between text-sm mb-1">
              <span>Payment Method</span>
              <span className="font-medium">
                {order.paymentMethod.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span>Payment Status</span>
              <span className="font-medium text-green-600">
                {order.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total Paid</span>
              <span>₹{order.orderTotal}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="px-6 py-6 flex flex-col sm:flex-row gap-4">
            <Link
              to="/myorders"
              className="flex-1 text-center py-3 rounded-xl border font-medium hover:bg-gray-50 transition"
            >
              View My Orders
            </Link>

            <Link
              to="/"
              className="flex-1 text-center py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              Order More Food
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
