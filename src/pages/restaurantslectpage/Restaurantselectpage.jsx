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
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [vegOnly, setVegOnly] = useState(false); // New Veg Filter State

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/food-products/search-restaurants?category=${encodeURIComponent(
          category
        )}`
      );
      const data = res.data.restaurants || [];
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (err) {
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [category]);

  // Handle Filtering and Sorting Logic
  useEffect(() => {
    let result = [...restaurants];

    // 1. VEG FILTER LOGIC
    // Only show restaurants where EVERY product in productList is Veg
    if (vegOnly) {
      result = result.filter((r) => {
        if (!r.productList || r.productList.length === 0) return false;
        return r.productList.every((product) => product.isVeg === true);
      });
    }

    // 2. SEARCH FILTER
    if (searchTerm) {
      result = result.filter(
        (r) =>
          r.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. SORT LOGIC
    if (sortBy === "rating") {
      result.sort(
        (a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0)
      );
    } else if (sortBy === "delivery") {
      result.sort((a, b) => {
        const timeA = parseInt(String(a.deliveryTime).split("-")[0]) || 999;
        const timeB = parseInt(String(b.deliveryTime).split("-")[0]) || 999;
        return timeA - timeB;
      });
    }

    setFilteredRestaurants(result);
  }, [searchTerm, sortBy, vegOnly, restaurants]);

  const openMenu = (store) => {
    navigate(`/buyfood?storeId=${store._id}&category=${category}`);
  };

  return (
    <div className="rs">
      <PagesNavbar />

      <div id="screen-rs">
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
            <p>Explore the best {category.toLowerCase()} stores.</p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="filterSortContainer-rs">
            {/* Search Box */}
            <div
              className="filter-rs"
              style={{ display: "flex", alignItems: "center", flex: 1 }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  background: "transparent",
                }}
              />
            </div>

            {/* Veg Toggle Button */}
            <div
              onClick={() => setVegOnly(!vegOnly)}
              className="sortBy"
              style={{
                cursor: "pointer",
                backgroundColor: vegOnly ? "#e7f5ec" : "transparent",
                borderColor: vegOnly ? "#1a8f3d" : "#ccc",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "green",
                  }}
                ></div>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: vegOnly ? "#1a8f3d" : "#555",
                }}
              >
                Veg
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="sortBy" style={{ position: "relative" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  appearance: "none",
                  border: "none",
                  background: "transparent",
                  fontWeight: "bold",
                  outline: "none",
                }}
              >
                <option value="default">Sort By</option>
                <option value="rating">Rating</option>
                <option value="delivery">Fast Delivery</option>
              </select>
            </div>
          </div>

          <div className="body-rs">
            <h1 className="heading-rs">
              {vegOnly ? "Pure Veg Restaurants" : "Restaurants to explore"}
            </h1>

            <div className="cardsContainer-rs">
              {loading ? (
                <p style={{ padding: "20px" }}>Loading...</p>
              ) : filteredRestaurants.length === 0 ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <p>No restaurants found matching your filters.</p>
                  {vegOnly && (
                    <button
                      onClick={() => setVegOnly(false)}
                      style={{
                        color: "#d9534f",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Show all restaurants
                    </button>
                  )}
                </div>
              ) : (
                filteredRestaurants.map((r) => (
                  <div
                    className="card"
                    key={r._id}
                    onClick={() => openMenu(r)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="img-rs">
                      <img
                        src={r.coverImage || "/images/default-food.jpg"}
                        alt={r.storeName}
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
                          {r.rating || "4.1"} | {r.deliveryTime || "20-30"} mins
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
