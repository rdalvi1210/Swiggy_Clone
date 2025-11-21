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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instamart-buy" element={<InstamatBuypage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buyfood" element={<FoodPage />} />
          <Route path="/bookRestaurant" element={<RestaurantBookPage />} />
          <Route path="/selectRestaurant" element={<RestaurantSelectPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
      {/* <HomePage /> */}
    </>
  );
}

export default App;
