import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./SellerRegister.css";

export default function SellerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    password: "",
    sellerType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sellerType) {
      toast.error("Please select seller type");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/seller-register",
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Registration successful");
      navigate("/seller/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-main">
      <div id="register-screen">
        <div className="top">
          <div className="content">
            <h3>SELLER REGISTER</h3>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>or</span>
            <Link to="/seller/login">login to your seller account</Link>
          </div>

          <div className="loginimageContainer">
            <img
              className="mobileImage"
              src="/images/create_account_graphics_2x_brdvrk.png"
              alt=""
            />
            <img
              className="desktopImage"
              src="/images/Image-login_btpq7r.png"
              alt=""
            />
          </div>

          <Link to="/" className="leftArrow">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>

        <form id="mainContent" onSubmit={handleSubmit}>
          <label>OWNER NAME</label>
          <input
            name="ownerName"
            type="text"
            placeholder="owner name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />

          <label>EMAIL ID</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>SELLER TYPE</label>
          <select
            name="sellerType"
            value={formData.sellerType}
            onChange={handleChange}
            required
          >
            <option value="">Select Seller Type</option>
            <option value="restaurant">Restaurant</option>
            <option value="food">Food Store</option>
            <option value="grocery">Grocery Store</option>
          </select>

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button className="btn" type="submit">
            CONTINUE
          </button>

          <p className="disclaimer">
            By clicking, I accept the <a href="#">Terms & Conditions</a> &{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
