import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PagesNavbar from "../components/PagesNavbar";
import { clearCart } from "../redux/cartSlice";
import api from "../utils/axiosInstance";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((s) => s.cart.items);
  const store = useSelector((s) => s.cart.store);
  const user = useSelector((s) => s.user.user);
  const address = user?.addresses?.[0];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = itemTotal > 300 ? 0 : 40;
  const gst = Math.round(itemTotal * 0.01);
  const toPay = itemTotal + deliveryFee + gst;

  const openUPIModal = () => {
    if (!address) {
      toast.error("Please select a delivery address");
      return;
    }
    setError("");
    setUpiId("");
    setUpiModalOpen(true);
  };
  // ============================================
  // FAKE UPI PAYMENT
  // ============================================
  const handleFakeUPIPay = async () => {
    if (!upiId || !upiId.includes("@")) {
      setError("Enter a valid UPI ID (example: name@bank)");
      return;
    }
    if (!store?._id) {
      setError("Store is required to place an order");
      return;
    }
    setIsProcessing(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 1500));

      const payload = {
        address,
        items: cart,
        storeId: store._id,
        amount: toPay,
        paymentMethod: "upi",
        paymentStatus: "paid",
        paymentDetails: {
          upiId,
          gateway: "demo-upi",
          txnId: "DEMOUPI_" + Date.now(),
        },
      };

      const res = await api.post("/order/create", payload);

      dispatch(clearCart());
      toast.success("Payment successful");

      const orderId = res?.data?.orderId;
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      console.error("UPI Error:", err);
      setError("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ============================================
  // CASH ON DELIVERY
  // ============================================
  const handlePlaceOrderCOD = async () => {
    if (!address) {
      toast.error("Please select a delivery address");
      return;
    }
    if (!store?._id) {
      setError("Store is required to place an order");
      return;
    }
    try {
      setIsProcessing(true);

      const payload = {
        address,
        items: cart,
        storeId: store._id,
        amount: toPay,
        paymentMethod: "cod",
        paymentStatus: "pending",
      };

      const res = await api.post("/order/create", payload);

      dispatch(clearCart());
      toast.success("Order placed successfully");

      const orderId = res?.data?.orderId;
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      console.error("COD Error:", err);
      setError("Unable to place COD order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrderClick = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (paymentMethod === "cod") handlePlaceOrderCOD();
    if (paymentMethod === "upi") openUPIModal();
  };

  return (
    <>
      <PagesNavbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-white p-5 rounded-xl shadow border">
              <h2 className="text-lg font-semibold mb-2">Deliver To</h2>
              {address ? (
                <div>
                  <p className="font-semibold">{address.label || "Home"}</p>
                  <p className="text-gray-700 text-sm">{address.fullAddress}</p>
                  <p className="text-gray-500 text-sm">{address.pincode}</p>
                </div>
              ) : (
                <p className="text-gray-500">No address selected</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-5 rounded-xl shadow border">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

              {cart?.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between py-3 border-b last:border-none"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-5 rounded-xl shadow border">
              <h2 className="text-lg font-semibold mb-3">
                Choose Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-orange-500">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-orange-500">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <span className="font-medium">
                    UPI (Google Pay / PhonePe)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-white p-5 rounded-xl shadow border h-fit">
            <h2 className="text-lg font-semibold mb-3">Bill Details</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{gst}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-semibold text-lg">
                <span>To Pay</span>
                <span>₹{toPay}</span>
              </div>
            </div>

            <button
              disabled={!paymentMethod || isProcessing}
              onClick={handlePlaceOrderClick}
              className={`w-full mt-4 py-3 rounded-xl text-white text-lg font-semibold ${
                !paymentMethod || isProcessing ? "bg-gray-400" : "bg-orange-500"
              }`}
            >
              {isProcessing ? "Processing..." : `Place Order • ₹${toPay}`}
            </button>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        {/* UPI MODAL */}
        {upiModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center px-4 z-50">
            <div className="bg-white w-full md:w-[420px] p-6 rounded-t-2xl md:rounded-2xl shadow-xl animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pay via UPI</h3>
                <button
                  onClick={() => setUpiModalOpen(false)}
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Enter your UPI ID (Demo). Example: <b>ram@upi</b>
              </p>

              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourupi@bank"
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />

              <div className="text-sm text-gray-500 mb-4">
                Payable: <b>₹{toPay}</b>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setUpiModalOpen(false)}
                  className="flex-1 py-2 border rounded-lg"
                  disabled={isProcessing}
                >
                  Cancel
                </button>

                <button
                  onClick={handleFakeUPIPay}
                  disabled={isProcessing}
                  className={`flex-1 py-2 rounded-lg text-white ${
                    isProcessing ? "bg-gray-400" : "bg-green-600"
                  }`}
                >
                  {isProcessing ? "Paying..." : `Pay • ₹${toPay}`}
                </button>
              </div>

              {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
            </div>
          </div>
        )}

        {/* ANIMATION */}
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
          .animate-slide-up { animation: slideUp 0.25s ease-out; }
        `}</style>
      </div>
    </>
  );
}
