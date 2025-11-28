import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PagesNavbar from "../../components/PagesNavbar";
import api from "../../utils/axiosInstance";

const MenuPage = () => {
  const [params] = useSearchParams();
  const storeId = params.get("storeId");
  const category = params.get("category");

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  // 🔥 Search State Added
  const [search, setSearch] = useState("");

  const css = `
    * { padding: 0; margin: 0; box-sizing: border-box; font-family: "Gilroy"; }

    #topContainer {
      width: 100%;
      background: linear-gradient(
        rgb(255, 255, 255) -6.71%,
        rgb(235, 235, 242) 56.19%,
        rgb(223, 223, 231) 106.56%
      );
      padding: 16px;
      border-bottom-left-radius: 36px;
      border-bottom-right-radius: 36px;
    }
    #topContainer h1 { font-size: 30px; margin-bottom: 10px; }
    .topBar { margin-bottom: 10px; }
    .topBar i { font-size: 20px; }

    .container-menu {
      padding: 20px 15px;
      border-radius: 20px;
      border: 1px solid rgba(2, 6, 12, 0.15);
      background: white;
      box-shadow: rgba(0,0,0,0.04) 0px 8px 16px;

    }

    .ratingStar { font-size: 15px; margin-right: 5px; }
    .container-menu p span { font-weight: bold; }
    .container-menu p { margin-bottom: 4px; }

    .bottomContainer { display: flex; }

    .left {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      width: 10px;
    }
    .circle { width: 7px; height: 7px; border-radius: 50%; background: #c4c4c4; }
    .line { width: 0.5px; height: 26px; background: #c4c4c4; }

    .right { display: flex; align-items : start; flex-direction: column; gap: 5px; width: 50%;}
    .firstP { font-weight: bold; text-align: left; }
    .firstP span { color: gray; }
    .timeP { font-weight: bold; text-align: left; }

    #screen-bf { padding: 15px; }

    .searchContainer { background-color: #e6e6e8; border-radius: 12px; margin-bottom: 20px; }
    .search {
     padding: 6px 5px; margin: auto;
      border-radius: 12px; background: #e6e6e8;
      display: flex; justify-content: space-around; align-items: center;
    }
    .search input {
      padding: 8px;
      padding-left: 12px;
      padding-right: 12px;
      margin-right : 10px;
      border: none; outline: none;
      border-radius: 12px;
    }

    .cardsContainer { margin-top: 25px; }

    .cards {
      padding: 15px; display: flex; gap: 10px;
      border-bottom: 1px solid gray;
      margin: 25px 0; padding-bottom: 25px;
      width: 100%;
    }

    .vegTag {
      border: 2px solid green;
      border-radius: 5px;
      width: 20px; height: 20px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 5px;
    }

    .leftside { width: 95%; }
    .leftside h3 { color: rgba(2,6,12,0.75); margin-bottom: 5px; font-size: 12px; }
    .linethrough { text-decoration: line-through; color: rgba(2,6,12,0.45); }
    .leftside p { font-weight: bold; font-size: 13px; margin-bottom: 10px; }
    .leftside h4 { font-weight: medium; font-size: 12px; margin-bottom: 10px; }

    .cardStar { font-size: 12px; margin-right: 1px; color: rgba(2,6,12,0.75); }

    .imageContainer {
      width: 156px; height: 144px; position: relative; display: block;
    }

    .imageContainer img {
      width: 100%; height: 100%; object-fit: cover; border-radius: 12px;
    }

    .addBtn {
      position: absolute;
      width: 120px; height: 40px;
      left: 18px; bottom: -15px;
      background: white;
      color: rgb(27,166,114);
      border-radius: 8px;
      border: 1px solid rgba(2,6,12,0.15);
      font-size: 18px; font-weight: 600;
      cursor: pointer;
      box-shadow: rgba(40,44,63,0.08) 0px 3px 8px;
    }

    @media (min-width: 1024px) {
      .leftside { width: 70%; }
      .leftside h3 { font-size: 20px; }
      .leftside h4 { font-size: 18px; }
      #topContainer { width: 50%; margin: auto; margin-top : 5px; }
      #screen-bf { width: 80%; margin: auto; }
      .topBar { display: none; }
      .cards { justify-content: space-between; width: 100%; }
      .rightSide {
        width: 30%; display: flex;
        justify-content: end; align-items: center;
      }
        .search{
          width: 64%;
        }
        .search input{
      width: 95%;
        }

    }
  `;

  // Fetch menu data
  useEffect(() => {
    if (!storeId) return;

    api
      .get(
        `/food-products/restaurant-foods/${storeId}?category=${encodeURIComponent(
          category
        )}`
      )
      .then((res) => {
        setStore(res.data.store);
        setProducts(res.data.products);
      });
  }, [storeId, category]);

  // 🔥 FILTER PRODUCTS (search)
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PagesNavbar />
      <style>{css}</style>

      {/* TOP SECTION */}
      <div id="topContainer">
        <div className="topBar">
          <i className="fa-solid fa-arrow-left"></i>
        </div>

        <h1>{store ? store.storeName : "Loading..."}</h1>

        <div className="container-menu">
          <p>
            <i className="fa-solid fa-star ratingStar"></i>
            <span>
              {" "}
              {store ? store.rating : "4.2"} (4.8k+ ratings) ₹400 for two
            </span>
          </p>

          <p
            style={{
              color: "rgb(255, 82, 0)",
              fontWeight: "bold",
              fontSize: "15px",
              marginBottom: "10px",
              marginTop: "12px",
              display: "block",
              paddingLeft: "5px",
            }}
          >
            {category}
          </p>

          <div className="bottomContainer">
            <div className="left">
              <div className="circle"></div>
              <div className="line"></div>
              <div className="circle"></div>
            </div>
            <div className="right">
              <p className="firstP">
                Outlet <span>{store?.address || "Unknown"}</span>
              </p>
              <p className="timeP">
                {store?.deliveryTime ? `${store.deliveryTime}` : "30-40"}
                &nbsp;min
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOD SECTION */}
      <div id="screen-bf">
        <div className="searchContainer">
          <div className="search">
            {/* 🔥 Search Input Updated */}
            <input
              type="text"
              placeholder="Search Dishes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <hr style={{ width: "65%", margin: "auto" }} />

        <div className="mainContainer">
          <div className="heading" style={{ marginTop: "20px" }}>
            <h3 style={{ padding: "10px 0 0 10px" }}>
              Looking For "{category}" ({filteredProducts.length})
            </h3>
          </div>

          <div className="cardsContainer">
            {filteredProducts.map((p, i) => (
              <div className="cards" key={i}>
                <div className="leftside">
                  <span className="vegTag">
                    <svg viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="8" fill="#007a48" />
                      <circle cx="8" cy="8" r="3" fill="#fff" />
                    </svg>
                  </span>

                  <h3>{p.name}</h3>
                  <h4>
                    <span className="linethrough">₹{p.price + 100}</span> ₹
                    {p.price}
                  </h4>

                  <p>
                    <i className="fa-solid fa-star cardStar"></i>
                    <span
                      style={{
                        color: "rgba(2, 6, 12, 0.75)",
                        marginRight: "2px",
                      }}
                    >
                      4.5
                    </span>
                    <span>(20)</span>
                  </p>

                  <h4 style={{ color: "rgba(2, 6, 12, 0.6)" }}>
                    {p.description}
                  </h4>
                </div>

                <div className="rightSide">
                  <a className="imageContainer">
                    <img src={p.image} alt="" />
                    <button className="addBtn">ADD</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
