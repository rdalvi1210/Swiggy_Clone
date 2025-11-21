import axios from "axios";
import { useState } from "react";
import "./index.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        formData
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-main">
      <div id="register-screen">
        <div className="top">
          <div className="content">
            <h3>REGISTER</h3>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>or</span>
            <a href="/login">login to your account</a>
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

          <a href="/" className="leftArrow">
            <i className="fa-solid fa-arrow-left"></i>
          </a>
        </div>

        <form id="mainContent" onSubmit={handleSubmit}>
          <label>USERNAME</label>
          <input
            name="name"
            type="text"
            placeholder="username"
            value={formData.name}
            onChange={handleChange}
          />

          <label>EMAIL ID</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
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
