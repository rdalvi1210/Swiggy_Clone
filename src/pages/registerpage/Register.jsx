import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/axiosInstance";
import "./index.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const res = await api.post("/auth/register", formData, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-main">
      <div id="register-screen">
        <div className="top">
          <div className="content">
            <h3>REGISTER</h3>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>or</span>
            <Link to="/login">login to your account</Link>
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

        <form id="mainContent" onSubmit={handleSubmit} autoComplete="off">
          <label>USERNAME</label>
          <input
            name="name"
            type="text"
            placeholder="username"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label>EMAIL ID</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

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
