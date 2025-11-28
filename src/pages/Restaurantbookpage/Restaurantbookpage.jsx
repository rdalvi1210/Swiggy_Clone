import "./index.css";

export default function RestaurantBookPage() {
  return (
    <>
      <div className="topBar-rb">
        <i className="fa-solid fa-arrow-left"></i>
        <h1 className="heading-rb">Sea Fire Salt</h1>

        <div className="switchContainer-rb">
          <a href="">Dineout</a>
          <a href="">Photos</a>
          <a href="">Menus</a>
        </div>
      </div>

      <div className="imagesContainer-rb">
        <img
          src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/4/26/e44f44cd-d867-4778-bab3-a792aea815a4_AF1QipPvyEIwrtL9WjuqUgxwWP195x9N6Egfv1FPqHzs680w680h510dd9ecec0399c47139166b854bef80e75.JPG"
          alt=""
        />

        <div className="imageCardContainer-rb">
          <div className="firstLine-rb">
            <i className="fa-solid fa-star"></i>
            <p>4.6 • 2K+ in Google • ₹1200 for two</p>
          </div>

          <div className="secondLine-rb">
            <p>Maharashtrian, North Indian</p>
          </div>

          <p className="locationLine-rb">
            <span style={{ color: "rgba(2,6,12,0.6)" }}>Location</span> Oracle
            Business Hub, Ground Floor, ...
          </p>

          <p className="openatclosedline-rb">
            <span style={{ color: "rgb(255, 82, 0)" }}>Closed</span> •{" "}
            <span style={{ color: "rgba(2, 6, 12, 0.6)" }}>
              OPENS AT 11:30AM
            </span>
          </p>

          <div className="lastLine-rb">
            <div className="book-table-rb">Book Table</div>
            <div>Call</div>
            <div>Direction</div>
          </div>
        </div>
      </div>

      <div id="screen-rb">
        <div className="leftSide-rb">
          <div className="offers-rb">
            <h2>Offers</h2>

            <div className="offerWrapper-rb">
              {Array.from({ length: 12 }).map((_, index) => (
                <a className="offerCard-rb" key={index}>
                  <div className="upperSide-rb">
                    <div style={{ width: "166px" }}>
                      <h3>Flat 16% off + Free Blended Malt</h3>
                      <p
                        style={{
                          marginTop: "7px",
                          fontWeight: "bold",
                          fontSize: "13px",
                          color: "rgba(2, 6, 12, 0.75)",
                        }}
                      >
                        @₹20/guest
                      </p>
                    </div>
                  </div>

                  <div className="downside-rb">
                    <div style={{ display: "flex" }}>
                      <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Pre-book offer
                      </p>

                      <div style={{ width: "50%" }}>
                        <img
                          style={{ width: "87.53px", height: "16px" }}
                          src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/dineout/one_exclusive_strip.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "rgba(2, 6, 12, 0.75)",
                      }}
                    >
                      with 1 month Swiggy ONE Lite at just ₹149 ₹1
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="offers-rb">
            <h2>Additional Offers</h2>

            <div className="offerWrapper-rb">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="inner-rb" key={index}>
                  <div className="creditacardImg-rb">
                    <img
                      src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MARKETING_BANNERS/IMAGES/OFFERS/2025/6/1/7252394d-3011-4adb-a188-9a65af839ed9_"
                      alt=""
                    />
                  </div>

                  <div>
                    <h2>Flat 10% Cashback</h2>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "rgba(2,6,12,0.45)",
                      }}
                    >
                      Flat 10% Cashback | Above ₹100
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div className="offers-rb">
            <h2>Food</h2>

            <div className="offerWrapper-rb">
              {Array.from({ length: 7 }).map((_, i) => (
                <div className="FoodImageContainer-rb" key={i}>
                  <img
                    src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/8/20/dbb66d4a-c22a-47d5-ae43-b8c28bfd555e_image8812229b3986640468eaa65562a6d334e.JPG"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="Cusinies-rb" style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "15px" }}>Cuisines</h3>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Maharashtrain, North Indian
            </p>
          </div>

          <hr />

          <div className="location-rb" style={{ marginBottom: "25px" }}>
            <h2>Location</h2>

            <div style={{ display: "flex" }}>
              <i className="fa-solid fa-location-dot"></i>

              <div>
                <p>
                  Oracle Business Hub, Ground Floor, Plot No A-179, Road No.
                  16/Z, Thane West Near Ashar 16, Thane 400604
                  <br />
                  5.8 km away
                </p>
                <a href="">View on Maps</a>
              </div>
            </div>
          </div>

          <div
            className="location-rb"
            style={{
              marginBottom: "25px",
              justifyContent: "start",
              gap: "12px",
            }}
          >
            <h2>Timings</h2>

            <div style={{ display: "flex" }}>
              <i className="fa-solid fa-clock"></i>

              <div>
                <p>OPEN TILL 12AM</p>
                <a href="">See all timings</a>
              </div>
            </div>
          </div>

          <hr />

          <div
            className="location-rb facilities-rb"
            style={{ marginBottom: "20px" }}
          >
            <h2>Facilities</h2>

            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "10px",
                padding: "0 15px",
              }}
            >
              <li>Alcohol Served</li>
              <li>Parking Available</li>
              <li>Swiggy Accepted</li>
            </ul>
          </div>

          <div className="bottomTab-rb">
            <div className="btn-rb">
              <button
                style={{ color: "rgb(255, 82, 0)", background: "#ffeee5" }}
              >
                Book Table
              </button>
            </div>

            <div className="btn-rb">
              <button style={{ background: "rgb(255, 82, 0)", color: "#fff" }}>
                Pay Bill Now
              </button>
            </div>
          </div>
        </div>

        <div className="rightSideContainer-rb">
          <div className="imageContainerScanner-rb">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/c/newqrcodeswiggyLatest.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
