function RestaurantSection() {
  return (
    <div>
      {" "}
      <div className="restaurantContainer">
        <h3>Discover the best restaurant on Dineout</h3>

        <div className="restaurantCardwrapper">
          {[...Array(12)].map((_, i) => (
            <a href="/restaurantbookpage" className="restaurantcards" key={i}>
              <div className="restaurantimageContainer">
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1693821753/3656683e814e996221b462534ccd6631.webp"
                  alt=""
                />

                <div className="imageinnerContent">
                  <h2>Cray Craft</h2>

                  <div className="restaurantrating">
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "white" }}
                    ></i>
                    <p>4.3</p>
                  </div>
                </div>
              </div>

              <div className="cardbottomInfoContainer">
                <div className="firstLine">
                  <p>Chinese - Asian</p>
                  <p>₹1400 for two</p>
                </div>

                <div className="firstLine" style={{ marginBottom: "10px" }}>
                  <p>Marol, Mumbai</p>
                  <p>4.3km</p>
                </div>

                <span className="bookingTag">Table Booking</span>

                <div className="firstTag">
                  <h5>Flat 15% off on prebooking</h5>
                  <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                    +2 more
                  </p>
                </div>

                <div className="secondTag">
                  <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Up to 10% off with bank offers
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantSection;
