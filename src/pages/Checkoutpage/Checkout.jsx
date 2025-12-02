import { useState } from "react";
import PagesNavbar from "../../components/PagesNavbar";
import api from "../../utils/axiosInstance";
import "./Checkout.css";

// REDUX
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemLocal, updateItemQty } from "../../redux/cartSlice";
import { setUser } from "../../redux/userSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const store = useSelector((state) => state.cart.store);
  const user = useSelector((state) => state.user.user);

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
  const gst = Math.round(itemTotal * 0.05);
  const toPay = itemTotal + deliveryFee + gst;

  /* ============================================================
      ADD / UPDATE SINGLE ADDRESS
  ============================================================ */
  const handleAddAddress = async () => {
    try {
      const res = await api.post("/auth/add-address", {
        pincode,
        fullAddress,
        label: "Home",
      });

      dispatch(setUser(res.data.user)); // full user stored in redux

      setOpenModal(false);
      setPincode("");
      setFullAddress("");
    } catch (err) {
      console.log("ADDRESS UPDATE FAILED", err);
    }
  };

  return (
    <>
      <PagesNavbar />

      <div className="desktopContainer-co">
        {/* ================= LEFT SIDE — ADDRESS ================= */}
        <div className="desktopleftContainer-co">
          <div className="selectaddress-co">
            <h2>Select delivery address</h2>
            <p>You have a saved address in this location</p>
          </div>

          <div className="boxes-co">
            {/* SHOW SAVED ADDRESS IF EXISTS */}
            {user?.addresses?.length > 0 && (
              <div className="home-co">
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
                    <button className="my-4">DELIVER HERE</button>
                  </div>
                </div>
              </div>
            )}

            {/* ADD NEW ADDRESS BUTTON */}
            <div
              className="home-co"
              style={{ cursor: "pointer" }}
              onClick={() => {
                // pre-fill when updating
                if (user?.addresses?.length > 0) {
                  setPincode(user.addresses[0].pincode);
                  setFullAddress(user.addresses[0].fullAddress);
                }
                setOpenModal(true);
              }}
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
                  <p>Tap to add</p>
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

        {/* ================= RIGHT SIDE — CART ================= */}
        <div className="mainContainer-co">
          {store && cart.length > 0 && (
            <div className="topBar-co">
              <div className="icon-co">
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

          {/* CART LIST */}
          <div className="secondcard-co">
            {cart.length === 0 ? (
              <div
                style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  color: "#555",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2037/2037450.png"
                  alt="Empty Cart"
                  style={{
                    width: "80px",
                    opacity: 0.8,
                    marginBottom: "10px",
                  }}
                />

                <h3
                  style={{
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "6px",
                  }}
                >
                  Your Cart is Empty
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#777",
                    marginBottom: "15px",
                  }}
                >
                  Looks like you haven't added anything yet.
                </p>

                <button
                  style={{
                    backgroundColor: "#fc8019",
                    padding: "10px 20px",
                    color: "white",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                  onClick={() => window.history.back()}
                >
                  Browse Restaurants
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div className="innercontent-co" key={item.productId}>
                  {/* LEFT: thumbnail + name */}
                  <div
                    className="icon-co"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {/* product image */}
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/150?text=No+Image"
                        }
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                        }}
                      >
                        {/* veg icon (kept original small circle) */}
                        <div
                          className="veg-icon-co"
                          style={{
                            "--border-color": item.isVeg ? "green" : "red",
                            "--dot-color": item.isVeg ? "green" : "red",
                          }}
                        />

                        <p className="text-sm md:text-md" style={{ margin: 0 }}>
                          {item.name}
                        </p>
                      </div>
                      {/* small subtitle or price (optional) */}
                      <div
                        className="font-bold"
                        style={{ marginTop: 6, color: "#777", fontSize: 13 }}
                      >
                        ₹{item.price} each
                      </div>
                    </div>
                  </div>

                  {/* QTY + REMOVE */}
                  <div className="btn-co flex" style={{ alignItems: "center" }}>
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
                      onClick={() => removeItem(item.productId)}
                      style={{
                        marginLeft: "12px",
                        cursor: "pointer",
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      <Trash2 size={20} color="red" />
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="price-co font-bold">
                    <p>₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))
            )}

            <div className="bighr-co" style={{ marginBottom: "20px" }}></div>
          </div>

          {/* BILL SECTION */}
          {cart.length > 0 && (
            <div className="billContainer-co">
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

              <div className="billflex-co">
                <p style={{ fontWeight: "bold" }}>To Pay</p>
                <p style={{ fontWeight: "bold" }}>₹{toPay}</p>
              </div>
            </div>
          )}

          {/* PAYMENT BAR */}
          {cart.length > 0 && (
            <div className="bottomTab-co">
              <div className="secondLineTab-co">
                <div className="leftside-co">
                  <p>₹{toPay}</p>
                  <p>View Detailed bill</p>
                </div>

                <div className="rightside-co">
                  <p>Make Payment</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================== TAILWIND MODAL ===================== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white w-[90%] md:w-[400px] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {user?.addresses?.length > 0 ? "Update Address" : "Add Address"}
            </h2>

            <input
              type="text"
              placeholder="eg : 400001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <textarea
              placeholder="Area, nearby location, road"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              rows="3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
