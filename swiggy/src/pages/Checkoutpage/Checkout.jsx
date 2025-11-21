import PagesNavbar from "../../components/PagesNavbar";
import "./Checkout.css";
export default function CheckoutPage() {
  return (
    <>
      <PagesNavbar />

      <div className="desktopContainer-co">
        <div className="desktopleftContainer-co">
          <div className="selectaddress-co">
            <h2>Select delivery address</h2>
            <p style={{ marginTop: "5px" }}>
              You have a saved address in this location
            </p>
          </div>

          <div className="boxes-co">
            <div className="home-co">
              <div className="iconchimney-co">
                <i className="fa-solid fa-house-chimney"></i>
              </div>

              <div className="info-co">
                <div className="homeInfo-co">
                  <h5>Home</h5>
                  <p>2 Ghosti duty d, Thane, Maharashtra, India</p>
                </div>

                <div className="btnHome-co">
                  <h5 style={{ marginBottom: "10px" }}>46 MINS</h5>
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
                  <p>Thane, Maharashtra, India</p>
                </div>

                <div className="btnLocation-co">
                  <button>ADD NEW</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="mainContainer-co">
          <div className="topBar-co">
            <div className="icon-co">
              <i className="fa-solid fa-arrow-left"></i>
            </div>

            <div className="imageTopBar-co">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/f58a1b772e5eeea45ff8ead3890703ed"
                alt=""
              />
            </div>

            <div className="content-co">
              <h4>Chelizza - India Ka Pizza</h4>
              <p>5 items | ETA 40-45 MINS</p>
            </div>
          </div>

          {/* ITEM LIST */}
          <div className="secondcard-co">
            {[1, 2, 3, 4].map((_, i) => (
              <div className="innercontent-co" key={i}>
                <div className="icon-co">
                  <div className="veg-icon-co"></div>
                  <p>Peri Peri Paneer pops</p>
                </div>

                <div className="btn-co">
                  <div className="quantity-box-co">
                    <button className="qty-btn-co">−</button>
                    <span className="qty-value-co">1</span>
                    <button className="qty-btn-co">+</button>
                  </div>
                </div>

                <div className="price-co">
                  <p>₹299</p>
                </div>
              </div>
            ))}

            <div className="bighr-co" style={{ marginBottom: "20px" }}></div>
          </div>

          {/* BILL */}
          <div className="billContainer-co">
            <div className="firstLine-co">
              <h4>Bill Details</h4>
            </div>

            <div className="secondline-co billflex-co">
              <p>Item Total</p>
              <p>₹793</p>
            </div>

            <div className="thirdLine-co billflex-co">
              <p>Delivery Fee | 5.0 kms</p>
              <p>₹793</p>
            </div>

            <div className="fourthLine-co billflex-co">
              <p
                style={{
                  color: "rgba(2, 6, 12, 0.5)",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                This fee fairly goes to our delivery partners for delivering
                your food
              </p>
            </div>

            <div className="hr-co"></div>

            <div className="fifthLine-co billflex-co">
              <p>Delivery Tip</p>
              <p>Add Tip</p>
            </div>

            <div className="sixthline-co billflex-co">
              <p>GST & Other Charges</p>
              <p>₹793</p>
            </div>

            <div className="hr-co"></div>

            <div className="seventhLine-co billflex-co">
              <p style={{ fontWeight: "bold" }}>To Pay</p>
              <p style={{ fontWeight: "bold" }}>₹793</p>
            </div>
          </div>

          <div
            className="bighr-co"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          ></div>

          {/* POLICY */}
          <div className="policy-co">
            <div className="iconreview-co">
              <i className="fa-solid fa-newspaper"></i>
            </div>

            <div className="policyInfo-co">
              <h4>
                Review your order and address details to avoid cancellations
              </h4>

              <p>
                <span style={{ fontWeight: "bold" }}>Note:</span> Please ensure
                your address and order details are correct. This order, if
                cancelled, is non refundable.
              </p>

              <a href="">Read policy</a>
            </div>
          </div>

          <div className="bighr-co" style={{ marginTop: "30px" }}></div>

          {/* BOTTOM TAB */}
          <div className="bottomTab-co">
            <div className="firstlineTab-co">
              <div className="line-co">
                <div className="homeIcon-co">
                  <i className="fa-solid fa-house"></i>
                </div>

                <div>
                  <h5>Deliver to Home</h5>
                  <p style={{ fontSize: "12px", marginBottom: "5px" }}>Kalwa</p>
                  <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                    35 - 45 MINS
                  </p>
                </div>
              </div>

              <div>
                <a href="">Change</a>
              </div>
            </div>

            <div className="secondLineTab-co">
              <div className="leftside-co">
                <p>₹82</p>
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
