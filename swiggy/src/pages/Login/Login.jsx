import axios from "axios";
import { useState } from "react";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        form,
        { withCredentials: true }
      );

      alert(res.data.message);

      // OPTIONAL redirect
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="main-login">
      <div id="login-screen">
        <div className="top">
          <div className="content">
            <h3>LOGIN</h3>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>or</span>
            <a href="/register">create an account</a>
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
          <label>EMAIL ID</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="***********"
            value={form.password}
            onChange={handleChange}
          />

          <button className="btn" type="submit">
            CONTINUE
          </button>

          <p className="disclaimer">
            By clicking, I accept the <a href="#">Terms & Conditions</a> &
            <a href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
