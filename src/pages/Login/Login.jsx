import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import api from "../../utils/axiosInstance";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      // LOGIN API
      const res = await api.post("/auth/login", form, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Login successful");

      const accountType = res.data.accountType;

      // FETCH CURRENT USER
      const me = await api.get("/auth/me", {
        withCredentials: true,
      });

      dispatch(setUser(me.data.account));

      // REDIRECT BASED ON ROLE
      if (accountType === "user") {
        navigate("/");
      } else if (accountType === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="main-login">
      <div id="login-screen">
        <div className="top">
          <div className="content">
            <h3>LOGIN</h3>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>or</span>
            <Link to="/register">create an account</Link>
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
          <label>EMAIL ID</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="***********"
            value={form.password}
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

export default Login;
