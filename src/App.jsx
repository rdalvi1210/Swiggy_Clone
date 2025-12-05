import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import CheckoutPage from "./pages/Checkoutpage/Checkout";
import FoodPage from "./pages/Foodproductspage/BuyFood";
import HomePage from "./pages/homepage/Homepage";
import InstamatBuypage from "./pages/instamartbuypage/InstamartBuypage";
import Login from "./pages/Login/Login";
import Register from "./pages/registerpage/Register";
import RestaurantBookPage from "./pages/Restaurantbookpage/Restaurantbookpage";
import RestaurantSelectPage from "./pages/restaurantslectpage/Restaurantselectpage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./redux/userSlice";

import { Toaster } from "react-hot-toast";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerRegister from "./pages/seller/SellerRegister";
import ProtectedRoute from "./routes/ProtectedRoutes";

import api from "./utils/axiosInstance";

// import cart reducers
import MyOrdersPage from "./pages/MyOrders";
import PaymentPage from "./pages/Payment";
import { clearCart, setCart, startLoading } from "./redux/cartSlice";

function App() {
  const dispatch = useDispatch();

  // ============================================================
  // GLOBAL CART FETCH
  // ============================================================
  const loadCart = async () => {
    try {
      dispatch(startLoading());

      const res = await api.get("/cart/getcart");
      const items = res.data.cart || [];

      if (!items.length) {
        dispatch(clearCart());
        return;
      }

      const storeId = items[0].storeId;
      const storeRes = await api.get(`/food-store/${storeId}`);

      dispatch(
        setCart({
          items,
          store: storeRes.data.store,
        })
      );
    } catch (err) {
      console.log("CART LOAD ERROR", err);
      dispatch(clearCart());
    }
  };

  // ============================================================
  // FETCH USER + CART ON APP LOAD
  // ============================================================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        dispatch(setUser(res.data.account));
      } catch (err) {
        dispatch(clearUser());
      }
    };

    fetchUser();
    loadCart(); // 🔥 fetch cart once
  }, []);

  return (
    <Router>
      {/* ✔ RESTORED TOAST CUSTOM STYLING */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#282c3f",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "15px",
            fontWeight: 500,
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            style: { background: "#fc8019", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#282c3f" },
          },
          error: {
            style: { background: "#d9534f", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#282c3f" },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/instamart-buy" element={<InstamatBuypage />} />
        <Route path="/buyfood" element={<FoodPage />} />
        <Route path="/bookRestaurant" element={<RestaurantBookPage />} />
        <Route path="/selectRestaurant" element={<RestaurantSelectPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/myorders" element={<MyOrdersPage />} />

        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
