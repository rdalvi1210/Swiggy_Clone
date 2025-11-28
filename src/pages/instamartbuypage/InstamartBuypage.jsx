import PagesNavbar from "../../components/PagesNavbar";
import "./index.css";

export default function App() {
  return (
    <>
      <PagesNavbar />
      <div className="mainContainer">
        <div className="firstContainer">
          <div className="leftArrow">
            <i className="fa-solid fa-arrow-left"></i>
          </div>

          <div className="right">
            <div className="leftContainer">
              <div className="imgContainer">
                <img
                  src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_76,w_76/NI_CATALOG/IMAGES/CIW/2025/5/14/a1493d81-f21e-415f-9875-f78383590fc2_9f3f0f68-4fbe-40f6-8f5d-5472a03469bd"
                  alt=""
                />
              </div>
              <div>
                <h4>Fresh Fruits</h4>
                <p>574 items</p>
              </div>
            </div>

            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="body">
          <div className="leftSide">
            <div className="cardwrapperleftSide">
              {Array.from({ length: 12 }).map((_, i) => (
                <div className="card" key={i}>
                  <div className="imgContainerleftSide">
                    <img
                      src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96/NI_CATALOG/IMAGES/CIW/2025/5/14/90498d4c-8802-46b1-9f43-b5c203ddb151_00d9a738-f2ba-4ac7-8848-af1202472764"
                      alt=""
                    />
                  </div>
                  <p>Fresh Fruits</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rightSide">
            <div className="cardWrapperRightSide">
              <h2>
                <span>1 items in Mangoes & Melons</span>
              </h2>

              <div className="cardsBuy">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div className="cardshopping" key={i}>
                    <div className="imageContainerShopping">
                      <img
                        src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/NI_CATALOG/IMAGES/CIW/2024/4/12/e260a351-2225-4185-ba11-d56e7090cd1d_freshfruits_UO1864VJOC_AL1.png"
                        alt=""
                      />
                    </div>

                    <p className="mins">5 MINS</p>

                    <h3>Banganapalli Mango (Aamba)</h3>

                    <p className="mins" style={{ color: "rgba(2,6,12,0.45)" }}>
                      Large, luscious, low fiber Indian delight
                    </p>

                    <hr style={{ marginTop: "5px" }} />

                    <p className="mins">3 Large (1300g - 1800g)</p>

                    <h5 style={{ marginTop: "3px" }}>
                      ₹164{" "}
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "rgba(2,6,12,0.3)",
                        }}
                      >
                        ₹260
                      </span>
                      <button className="addBtn">ADD</button>
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottomBar">
          <div className="firstbottomCard">
            <p style={{ textAlign: "center" }}>
              Hooray! FREE DELIVERY unlocked!
            </p>
          </div>

          <hr style={{ marginBottom: "10px" }} />

          <div className="cardbottom">
            <div className="second">
              <div className="leftcontent">
                <div className="imgbottomcnt">
                  <img
                    src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_80,w_72/NI_CATALOG/IMAGES/CIW/2025/4/16/fa51756e-c030-46ee-ad22-1567d8084918_65785_1.png"
                    alt=""
                  />
                </div>

                <div>
                  <h4>2 Items</h4>
                  <p>₹2083 saved, more coming up!</p>
                </div>
              </div>

              <div className="rightContent">
                <button className="gtc">Go to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
