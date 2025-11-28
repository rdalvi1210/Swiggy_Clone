import {
  BadgePercent,
  ChevronDown,
  HelpCircle,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../redux/userSlice";
import api from "../utils/axiosInstance";

export default function PagesNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const currentUser = useSelector((state) => state.user.user);

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

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-[1000]">
      <div className="max-w-[1250px] mx-auto px-4 h-[80px] flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn-1.webcatalog.io/catalog/swiggy-dineout/swiggy-dineout-icon-unplated.png?v=1762133116199"
              alt="logo"
              className="w-12 h-12"
            />
          </Link>

          {/* LOCATION */}
          <div
            className="hidden md:flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <MapPin size={20} className="text-orange-500" />
            <span className="font-semibold text-gray-900 border-b border-gray-900 pb-[2px]">
              Other
            </span>
            <ChevronDown size={20} className="text-black ml-1" />

            {showDropdown && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-xl rounded-md min-w-[180px] py-2">
                {["Mumbai", "Delhi", "Bangalore", "Pune"].map((city) => (
                  <div
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* RIGHT SECTION */}
        <div
          className={`md:flex items-center gap-10 transition-all duration-300 ${
            showMobileMenu
              ? "fixed right-0 top-[80px] w-[260px] h-[calc(100vh-80px)] bg-white shadow-xl p-6 flex flex-col"
              : "hidden md:flex"
          }`}
        >
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <BadgePercent size={20} className="text-gray-600" />
            <span className="font-medium text-gray-800">Corporate</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <Search size={20} className="text-gray-600" />
            <span className="font-medium text-gray-800">Search</span>
          </div>

          <div className="relative flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <BadgePercent size={20} className="text-gray-600" />
            <span className="font-medium text-gray-800">Offers</span>
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-[1px] rounded-md">
              NEW
            </span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <HelpCircle size={20} className="text-gray-600" />
            <span className="font-medium text-gray-800">Help</span>
          </div>

          {/* USER SECTION  */}
          <div className="relative" ref={userMenuRef}>
            {currentUser ? (
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
                onClick={() => setOpenUserMenu(!openUserMenu)}
              >
                <User size={20} className="text-gray-600" />
                <span className="font-semibold">{currentUser.name}</span>

                {/* 🔥 USER DROPDOWN ICON ADDED */}
                <ChevronDown
                  size={18}
                  strokeWidth={2.5}
                  className={`text-gray-700 transition-transform duration-200 ${
                    openUserMenu ? "rotate-180" : "rotate-0"
                  }`}
                />

                {/* MENU */}
                {openUserMenu && (
                  <div className="absolute right-0 top-10 bg-white border shadow-lg rounded-md p-2 w-[120px] text-sm">
                    <div
                      onClick={handleLogout}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-orange-500"
              >
                <User size={20} className="text-gray-600" />
                <span className="font-medium">Sign In</span>
              </Link>
            )}
          </div>

          {/* CART */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 relative">
            <ShoppingBag size={22} className="text-gray-600" />
            <span className="font-medium">Cart</span>
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[11px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
