import { useState } from "react";
import PagesNavbar from "../../components/PagesNavbar";
import api from "../../utils/axiosInstance";
import "./Checkout.css";

// REDUX
import { Trash2, MapPin, Edit3, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemLocal, updateItemQty } from "../../redux/cartSlice";
import { setUser } from "../../redux/userSlice";

// TOAST
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const store = useSelector((state) => state.cart.store);
  const user = useSelector((state) => state.user.user);

  // Address Selected for Checkout
  const [selectedAddress, setSelectedAddress] = useState(null);

  // MODAL STATES
  const [openModal, setOpenModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  /* ============================================================
      UPDATE QUANTITY
  ============================================================ */
  const changeQty = async (productId, actionType) => {
    try {
      const item = cart.find((i) => i.productId === productId);

      if (actionType === "dec" && item.quantity === 1) {
        await api.post("/cart/remove", { productId });
        dispatch(removeItemLocal(productId));
        return;
      }

      await api.post("/cart/update", { productId, action: actionType });
      dispatch(updateItemQty({ productId, actionType }));
    } catch (err) {
      console.log("UPDATE FAILED", err);
    }
  };

  /* ============================================================
      REMOVE ITEM
  ============================================================ */
  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", { productId });
      dispatch(removeItemLocal(productId));
    } catch (err) {
      console.log("REMOVE FAILED", err);
    }
  };

  /* ============================================================
      BILL CALCULATION
  ============================================================ */
  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = itemTotal > 300 ? 0 : 40;
  const gst = Math.round(itemTotal * 0.01);
  const toPay = itemTotal + deliveryFee + gst;

  /* ============================================================
      ADD / UPDATE SINGLE ADDRESS
  ============================================================ */
  const handleAddAddress = async () => {
    if (!pincode || !fullAddress) return toast.error("Please fill all fields");
    try {
      const res = await api.post("/auth/add-address", {
        pincode,
        fullAddress,
        label: "Home",
      });

      dispatch(setUser(res.data.user));
      toast.success("Address saved successfully");

      setOpenModal(false);
      setPincode("");
      setFullAddress("");
    } catch (err) {
      console.log("ADDRESS UPDATE FAILED", err);
      toast.error("Failed to save address");
    }
  };

  const openEditModal = () => {
    if (user?.addresses?.length > 0) {
      setPincode(user.addresses[0].pincode);
      setFullAddress(user.addresses[0].fullAddress);
    }
    setOpenModal(true);
  };

  return (
    <>
      <PagesNavbar />

      <div className="desktopContainer-co">
        {/* ================= LEFT SIDE — ADDRESS (HIDDEN ON MOBILE, USES NEW MOBILE SECTION BELOW) ================= */}
        <div className="desktopleftContainer-co hidden md:block">
          <div className="selectaddress-co">
            <h2>Select delivery address</h2>
            <p>You have a saved address in this location</p>
          </div>

          <div className="boxes-co">
            {user?.addresses?.length > 0 && (
              <div
                className="home-co"
                style={{
                  border: selectedAddress
                    ? "2px solid #fc8019"
                    : "1px solid #ddd",
                }}
              >
                <div className="iconchimney-co">
                  <i className="fa-solid fa-house-chimney"></i>
                </div>

                <div className="info-co">
                  <div className="homeInfo-co">
                    <h5>{user.addresses[0].label}</h5>
                    <p>{user.addresses[0].fullAddress}</p>
                  </div>

                  <div className="btnHome-co">
                    <h5>{user.addresses[0].pincode}</h5>
                    <button
                      className="my-4"
                      onClick={() => {
                        setSelectedAddress(user.addresses[0]);
                        toast.success("Address selected");
                      }}
                    >
                      {selectedAddress ? "SELECTED" : "DELIVER HERE"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              className="home-co"
              style={{ cursor: "pointer" }}
              onClick={openEditModal}
            >
              <div className="iconchimney-co">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="info-co">
                <div className="homeInfo-co">
                  <h5>
                    {user?.addresses?.length > 0
                      ? "Update Address"
                      : "Add New Address"}
                  </h5>
                  <p>Tap to manage</p>
                </div>
                <div className="btnLocation-co">
                  <button>
                    {user?.addresses?.length > 0 ? "UPDATE" : "ADD NEW"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE — CART & MOBILE ADDRESS ================= */}
        <div className="mainContainer-co w-full md:w-auto">
          {/* MOBILE ONLY ADDRESS SECTION */}
          <div className="block md:hidden bg-white p-4 mb-4 shadow-sm border-b">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">Delivery Address</h3>
              <button
                onClick={openEditModal}
                className="text-orange-500 text-sm font-semibold flex items-center gap-1"
              >
                {user?.addresses?.length > 0 ? (
                  <>
                    <Edit3 size={14} /> Edit
                  </>
                ) : (
                  <>
                    <Plus size={14} /> Add
                  </>
                )}
              </button>
            </div>

            {user?.addresses?.length > 0 ? (
              <div
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedAddress
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-100"
                }`}
                onClick={() => {
                  setSelectedAddress(user.addresses[0]);
                  toast.success("Delivery address set");
                }}
              >
                <div className="flex gap-3">
                  <MapPin
                    className={
                      selectedAddress ? "text-orange-500" : "text-gray-400"
                    }
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {user.addresses[0].label} ({user.addresses[0].pincode})
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {user.addresses[0].fullAddress}
                    </p>
                    {!selectedAddress && (
                      <p className="text-orange-500 text-[10px] mt-2 font-bold uppercase tracking-tight">
                        Tap to select this address
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="text-center py-4 border-2 border-dashed border-gray-200 rounded-lg"
                onClick={openEditModal}
              >
                <p className="text-gray-500 text-sm">
                  No address saved. Tap to add.
                </p>
              </div>
            )}
          </div>

          {store && cart.length > 0 && (
            <div className="topBar-co">
              <div className="icon-co" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className="imageTopBar-co">
                <img src={store.coverImage} alt="" />
              </div>
              <div className="content-co">
                <h4>{store.storeName}</h4>
                <p>
                  {cart.length} items | ETA {store.deliveryTime || "40 mins"}
                </p>
              </div>
            </div>
          )}

          {/* CART ITEMS */}
          <div className="secondcard-co">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center py-10 gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2037/2037450.png"
                  alt="Empty"
                  className="w-20 opacity-50"
                />
                <h3 className="font-bold">Your Cart is Empty</h3>
                <button
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg"
                  onClick={() => navigate("/")}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div className="innercontent-co" key={item.productId}>
                  <div className="icon-co flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 border flex items-center justify-center ${
                            item.isVeg ? "border-green-600" : "border-red-600"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? "bg-green-600" : "bg-red-600"
                            }`}
                          ></div>
                        </div>
                        <p className="text-sm font-medium">{item.name}</p>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ₹{item.price} each
                      </div>
                    </div>
                  </div>

                  <div className="btn-co flex items-center">
                    <div className="quantity-box-co">
                      <button
                        className="qty-btn-co"
                        onClick={() => changeQty(item.productId, "dec")}
                      >
                        −
                      </button>
                      <span className="qty-value-co">{item.quantity}</span>
                      <button
                        className="qty-btn-co"
                        onClick={() => changeQty(item.productId, "inc")}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ml-3"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 size={18} color="red" />
                    </button>
                  </div>

                  <div className="price-co font-bold">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))
            )}
            <div className="bighr-co mb-5"></div>
          </div>

          {/* BILL DETAILS */}
          {cart.length > 0 && (
            <div className="billContainer-co mb-20 md:mb-5">
              <h4>Bill Details</h4>
              <div className="billflex-co">
                <p>Item Total</p>
                <p>₹{itemTotal}</p>
              </div>
              <div className="billflex-co">
                <p>Delivery Fee</p>
                <p>₹{deliveryFee}</p>
              </div>
              <div className="billflex-co">
                <p>GST</p>
                <p>₹{gst}</p>
              </div>
              <div className="hr-co"></div>
              <div className="billflex-co font-bold">
                <p>To Pay</p>
                <p>₹{toPay}</p>
              </div>

              {/* DESKTOP PAYMENT BUTTON */}
              <div className="hidden md:block mt-5">
                <button
                  onClick={() =>
                    !selectedAddress
                      ? toast.error("Select address")
                      : navigate("/payment")
                  }
                  className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                    selectedAddress ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  Make Payment • ₹{toPay}
                </button>
              </div>
            </div>
          )}

          {/* MOBILE PAYMENT BAR */}
          {cart.length > 0 && (
            <div className="bottomTab-co">
              <div className="secondLineTab-co">
                <div className="leftside-co">
                  <p className="font-bold text-lg">₹{toPay}</p>
                  <p className="text-[10px] uppercase text-orange-500 font-bold">
                    View detailed bill
                  </p>
                </div>

                <div
                  className="rightside-co"
                  style={{ opacity: selectedAddress ? 1 : 0.6 }}
                  onClick={() => {
                    if (!selectedAddress) {
                      toast.error("Please select a delivery address above");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      return;
                    }
                    navigate("/payment");
                  }}
                >
                  <p>Make Payment</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================== ADDRESS MODAL ===================== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001] px-4">
          <div className="bg-white w-full max-w-[400px] p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-orange-500" />
              {user?.addresses?.length > 0 ? "Update Address" : "Add Address"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Pincode
                </label>
                <input
                  type="text"
                  placeholder="e.g. 400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Full Address
                </label>
                <textarea
                  placeholder="Flat/House No, Building, Street, Area"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
                  rows="3"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className="flex-1 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
