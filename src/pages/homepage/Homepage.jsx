import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FoodsSection from "../../components/FoodsSection";
import FooterSection from "../../components/FooterSection";
import InstamartSection from "../../components/InstamartSection";
import Navbar from "../../components/Navbar";
import RestaurantSection from "../../components/RestaurantSection";
import { clearUser } from "../../redux/userSlice";
import api from "../../utils/axiosInstance";
import "./homepage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  // 🔍 SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const logoutUser = async () => {
    try {
      await api.get("/auth/logout", { withCredentials: true });
      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  // 🔍 DEBOUNCED SEARCH API
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(
          `/food-store/search?q=${encodeURIComponent(searchTerm)}`
        );
        setSearchResults(res.data.stores || []);
      } catch (err) {
        console.error("Search failed");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleRestaurantClick = (storeId) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/buyfood?storeId=${storeId}&category=`);
  };

  return (
    <>
      <div id="home-screen">
        {/* ================= MOBILE NAVBAR ================= */}
        <div id="mobileNavbar">
          <div className="leftSideNav">
            <i className="fa-solid fa-house"></i>
            <h3>Home</h3>
          </div>

          {currentUser ? (
            <div className="relative rightSideNav loggedInUser">
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <i className="fa-solid fa-circle-user"></i>
                <span>{currentUser.name}</span>
                <i
                  className={`fa-solid fa-chevron-down transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                ></i>
              </div>

              {open && (
                <div className="absolute top-10 right-0 bg-white text-black shadow-lg rounded-md w-32 border border-gray-200 z-[999] animate-fade">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Profile
                  </a>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="rightSideNav">
              <i className="fa-solid fa-circle-user"></i>
            </a>
          )}
        </div>

        {/* ================= MOBILE SEARCH ================= */}
        <div className="search mobilesearch relative">
          <input
            placeholder="Search for restaurant, item or more"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-[999] max-h-80 overflow-y-auto">
              {searchResults.map((store) => (
                <div
                  key={store.storeId}
                  onClick={() => handleRestaurantClick(store.storeId)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    src={store.coverImage || "/images/placeholder.png"}
                    alt={store.storeName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-sm">{store.storeName}</p>
                    <p className="text-xs text-gray-500">
                      {store.cuisines?.join(", ")} • {store.deliveryTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= MOBILE HERO ================= */}
        <div className="thirdMobileContainer">
          <h3>Order food & groceries. Discover best restaurants. Swiggy it!</h3>
          <div className="imageContainer">
            <img
              src="/images/ca322ced-2d4f-4a43-a8c6-b7e07de76bfa_DEmweb (1).png"
              alt=""
            />
          </div>
        </div>

        {/* ================= OFFER BANNER ================= */}
        <div className="fourthContainer">
          <img
            src="/images/678dd59e-6bb1-49e0-a061-66a8244c4af8_Upto609.png"
            alt=""
          />
        </div>

        {/* ================= TWO IMAGE CARDS ================= */}
        <div className="fifthContainer">
          <a href="#">
            <img
              src="/images/95b8cf64-c3f5-436c-bf9b-2ad531a417b2_latenight5.png"
              alt=""
            />
          </a>
          <a href="#">
            <img
              src="/images/a5208a79-457f-4a2f-8368-a386d47fa4f2_341 (1).png"
              alt=""
            />
          </a>
        </div>

        {/* ================= DESKTOP NAVBAR ================= */}
        <Navbar />

        {/* ================= DESKTOP HERO ================= */}
        <div id="secondContainer">
          <div className="main">
            <h1>
              Order food & groceries. Discover best restaurants. Swiggy it!
            </h1>

            <div className="searchBar">
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <input placeholder="Enter your delivery location" type="text" />
                <i className="dropdown fa-solid fa-circle-chevron-down"></i>
              </div>

              <div className="search relative">
                <input
                  placeholder="Search for restaurant, item or more"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass"></i>

                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-[999] max-h-80 overflow-y-auto">
                    {searchResults.map((store) => (
                      <div
                        key={store.storeId}
                        onClick={() => handleRestaurantClick(store.storeId)}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
                      >
                        <img
                          src={store.coverImage || "/images/placeholder.png"}
                          alt={store.storeName}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-sm">
                            {store.storeName}
                          </p>
                          <div className="flex justify-start border-2">
                            <p className="text-sm">{store.address}</p>
                            <p className="text-xs text-gray-500">
                              {store.cuisines?.join(", ")} •{" "}
                              {store.deliveryTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP IMAGE TRIO ================= */}
        <div id="thirdContainer">
          <div className="thirdMain">
            <div>
              <img
                src="/images/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="/images/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="/images/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* ================= FLOATING IMAGES ================= */}
        <div className="leftPart">
          <img className="leftImage" src="/images/Veggies_new.png" alt="" />
        </div>
        <div className="rightPart">
          <img className="rightImage" src="/images/Sushi_replace.png" alt="" />
        </div>
      </div>

      {/* ================= SCROLL SECTIONS ================= */}
      <FoodsSection />
      <InstamartSection />
      <RestaurantSection searchResults={searchResults} />

      {/* ================= APP BANNER ================= */}
      <div className="appDownloadBanner">
        <img src="/images/App_download_banner.png" alt="" />
      </div>

      {/* ================= FOOTER ================= */}
      <FooterSection />
    </>
  );
}
