import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Redux
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Package,
  ShoppingCart,
} from "lucide-react";
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
                <>
                  {/* PROFILE BUTTON */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenMenu((prev) => !prev)}
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

                    {/* TOGGLE ARROW */}
                    {openMenu ? (
                      <ChevronUp
                        onClick={() => setOpenMenu((prev) => !prev)}
                        size={18}
                      />
                    ) : (
                      <ChevronDown
                        onClick={() => setOpenMenu((prev) => !prev)}
                        size={18}
                      />
                    )}
                  </div>

                  {/* DROPDOWN */}
                  {openMenu && (
                    <div
                      style={{
                        position: "absolute",
                        top: "35px",
                        right: 0,
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px 0",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        zIndex: 999,
                        minWidth: "170px",
                        fontSize: "14px",
                        color: "#111827",
                      }}
                    >
                      {/* My Orders */}
                      <div
                        onClick={() => {
                          navigate("/myorders");
                          setOpenMenu(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          borderRadius: "6px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Package size={16} /> My Orders
                      </div>

                      {/* My Cart */}
                      <div
                        onClick={() => {
                          navigate("/checkout");
                          setOpenMenu(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          borderRadius: "6px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <ShoppingCart size={16} /> My Cart
                      </div>

                      <hr style={{ margin: "6px 0", borderColor: "#e5e7eb" }} />

                      {/* Logout */}
                      <div
                        onClick={() => {
                          handleLogout();
                          setOpenMenu(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          borderRadius: "6px",
                          color: "#dc2626",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fee2e2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <LogOut size={16} /> Logout
                      </div>
                    </div>
                  )}
                </>
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
