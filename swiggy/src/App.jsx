import axios from "axios";
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

import SellerLogin from "./pages/seller/SellerLogin";
import ProtectedRoute from "./routes/ProtectedRoutes";
import SellerRegister from "./pages/seller/SellerRegister";

function App() {
  const dispatch = useDispatch();

  // Fetch logged-in user once App loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/auth/getCurrentUser",
          { withCredentials: true }
        );
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* HOME available only for role = user */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/instamart-buy" element={<InstamatBuypage />} />
        <Route path="/buyfood" element={<FoodPage />} />
        <Route path="/bookRestaurant" element={<RestaurantBookPage />} />
        <Route path="/selectRestaurant" element={<RestaurantSelectPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
