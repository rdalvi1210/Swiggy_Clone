import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();

  // ============================
  // FETCH USER ON APP LOAD
  // ============================
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
  }, [dispatch]);

  return (
    <Router>
      {/* TOASTER GLOBAL */}
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
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/instamart-buy" element={<InstamatBuypage />} />
        <Route path="/buyfood" element={<FoodPage />} />
        <Route path="/bookRestaurant" element={<RestaurantBookPage />} />
        <Route path="/selectRestaurant" element={<RestaurantSelectPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* SELLER DASHBOARD (Protected) */}
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
