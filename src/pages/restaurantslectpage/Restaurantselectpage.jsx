import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import PagesNavbar from "../../components/PagesNavbar";
import api from "../../utils/axiosInstance";
import "./style.css";

export default function PizzaPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const category = params.get("category") || "Pizza";

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get(
        `/food-products/search-restaurants?category=${encodeURIComponent(
          category
        )}`
      );

      setRestaurants(res.data.restaurants || []);
    } catch (err) {
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [category]);

  // ============================
  // CLICK RESTAURANT → GO TO MENU PAGE
  // ============================
  const openMenu = (store) => {
    navigate(`/buyfood?storeId=${store._id}&category=${category}`);
  };

  return (
    <div className="rs">
      <PagesNavbar />

      <div id="screen-rs">
        {/* Mobile design */}
        <div className="firstContainer-rs">
          <img
            src={`/images/${category}.png`}
            alt={category}
            onError={(e) => (e.target.src = "/images/default-food.jpg")}
          />
          <a href="/">
            <i className="fa-solid fa-arrow-left"></i>
          </a>
        </div>

        <div className="mainContainer-rs">
          <div className="topcontent-rs">
            <h3>{category}</h3>
            <p>Cheesilicious pizzas to make every day extraordinary.</p>
            </div>

          <div className="filterSortContainer-rs">
            <div className="filter-rs">
              <p>Filter</p>
              <img src="/images/filter-edit-svgrepo-com.svg" alt="" />
            </div>
            <div className="sortBy">
              <p>Sort By</p>
              <i className="fa-solid fa-sort-down"></i>
            </div>
          </div>

          <div className="body-rs">
            <h1 className="heading-rs">Restaurants to explore</h1>

            <div className="cardsContainer-rs">
              {loading ? (
                <p style={{ padding: "20px" }}>Loading...</p>
              ) : restaurants.length === 0 ? (
                <p style={{ padding: "20px" }}>No restaurants found.</p>
              ) : (
                restaurants.map((r) => (
                  <div
                    className="card"
                    key={r._id}
                    onClick={() => openMenu(r)}
                    style={{ cursor: "pointer" }} // clickable
                  >
                    <div className="img-rs">
                      <img
                        src={r.coverImage || "/images/default-food.jpg"}
                        alt={r.storeName}
                        onError={(e) =>
                          (e.target.src = "/images/default-food.jpg")
                        }
                      />
                    </div>

                    <div className="info-rs">
                      <h3>{r.storeName}</h3>

                      <p>
                        <i
                          className="fa-solid fa-star"
                          style={{ color: "#1a8f3d", marginRight: "3px" }}
                        ></i>
                        <span>
                          {r.rating || "4.1"} | {r.deliveryTime || "30–40 mins"}
                        </span>
                      </p>

                      <h4>{category}</h4>
                      <h4>{r.address}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
