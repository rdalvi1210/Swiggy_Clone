import { useEffect, useState } from "react";
import PagesNavbar from "../../components/PagesNavbar";
import api from "../../utils/axiosInstance";
import "./Checkout.css";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ============================================================
      FETCH CART
     ============================================================ */
  const loadCart = async () => {
    try {
      const res = await api.get("/cart/getcart");
      const items = res.data.cart || [];

      if (!items.length) {
        setCart([]);
        setStore(null);
        setLoading(false);
        return;
      }

      setCart(items);

      // Fetch store data using first item storeId
      const storeId = items[0].storeId;
      const storeRes = await api.get(`/food-store/${storeId}`);
      setStore(storeRes.data.store);

      setLoading(false);
    } catch (err) {
      console.log("CART LOAD ERROR", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  /* ============================================================
      UPDATE QUANTITY
     ============================================================ */
  const changeQty = async (productId, action) => {
    try {
      await api.post("/cart/update", { productId, action });
      loadCart();
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
      loadCart();
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

  if (loading)
    return <h2 style={{ padding: "40px", textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <PagesNavbar />

      <div className="desktopContainer-co">
        {/* LEFT SIDE — ADDRESS SECTION */}
        <div className="desktopleftContainer-co">
          <div className="selectaddress-co">
            <h2>Select delivery address</h2>
            <p>You have a saved address in this location</p>
          </div>

          <div className="boxes-co">
            <div className="home-co">
              <div className="iconchimney-co">
                <i className="fa-solid fa-house-chimney"></i>
              </div>

              <div className="info-co">
                <div className="homeInfo-co">
                  <h5>Home</h5>
                  <p>Thane, Maharashtra, India</p>
                </div>

                <div className="btnHome-co">
                  <h5>30 MINS</h5>
                  <button>DELIVER HERE</button>
                </div>
              </div>
            </div>

            <div className="home-co">
              <div className="iconchimney-co">
                <i className="fa-solid fa-location-dot"></i>
              </div>

              <div className="info-co">
                <div className="homeInfo-co">
                  <h5>Add New Address</h5>
                  <p>Thane, Maharashtra</p>
                </div>

                <div className="btnLocation-co">
                  <button>ADD NEW</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — CART SECTION */}
        <div className="mainContainer-co">
          {/* TOP BAR */}
          {store && (
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

          {/* CART ITEMS */}
          <div className="secondcard-co">
            {cart.map((item) => (
              <div className="innercontent-co" key={item.productId}>
                <div className="icon-co">
                  <div className="veg-icon-co"></div>
                  <p>{item.name}</p>
                </div>

                <div className="btn-co">
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
                      color: "red",
                      marginLeft: "12px",
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    Remove
                  </button>
                </div>

                <div className="price-co">
                  <p>₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="bighr-co" style={{ marginBottom: "20px" }}></div>
          </div>

          {/* BILL DETAILS */}
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
              <p>GST & Other Charges</p>
              <p>₹{gst}</p>
            </div>

            <div className="hr-co"></div>

            <div className="billflex-co">
              <p style={{ fontWeight: "bold" }}>To Pay</p>
              <p style={{ fontWeight: "bold" }}>₹{toPay}</p>
            </div>
          </div>

          {/* BOTTOM PAYMENT BAR */}
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
        </div>
      </div>
    </>
  );
}
