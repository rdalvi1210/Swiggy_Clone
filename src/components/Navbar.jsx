import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import api from "../utils/axiosInstance";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user from Redux
  const currentUser = useSelector((state) => state.user.user);

  // Logout
  const handleLogout = async () => {
    try {
      await api.get("/auth/logout", {
        withCredentials: true,
      });

      dispatch(clearUser());
      toast.success("Logged out successfully");

      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div id="navbar">
        <div className="logo">
          <img src="/images/Swiggy_logo_bml6he.png" alt="" />
        </div>

        <div className="navlinks">
          <ul>
            <li>
              <a href="#">Swiggy Corporate</a>
            </li>
            <li>
              <a href="#">Partner with us</a>
            </li>
            <li>
              <a href="#">
                Get the App
                <i className="fa-solid fa-arrow-up"></i>
              </a>
            </li>

            {/* USER SECTION */}
            <li style={{ position: "relative" }} ref={menuRef}>
              {currentUser ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                  </svg>

                  <span style={{ fontWeight: 600 }}>{currentUser.name}</span>

                  {openMenu && (
                    <div
                      style={{
                        position: "absolute",
                        top: "35px",
                        right: 0,
                        background: "white",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        padding: "10px 15px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                        zIndex: 999,
                        minWidth: "100px",
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      <span
                        onClick={handleLogout}
                        style={{
                          display: "block",
                          padding: "5px 0",
                          cursor: "pointer",
                        }}
                      >
                        Logout
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login">Sign in</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
