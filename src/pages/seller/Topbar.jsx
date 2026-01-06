import axios from "axios";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/userSlice";

export default function Navbar({ setSidebarOpen }) {
  const account = useSelector((s) => s.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/auth/logout", {
        withCredentials: true,
      });

      dispatch(clearUser());
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Try again.");
      console.error("LOGOUT_ERROR:", err);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-20">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon */}
        <Menu
          className="w-6 h-6 cursor-pointer lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />

        {/* Welcome Text */}
        <h1 className="text-lg font-semibold text-gray-700 truncate max-w-[200px]">
          Welcome,{" "}
          <span className="text-orange-600 font-bold">
            {account?.name || "User"}
          </span>
        </h1>
            {account?.role === "seller" ? "Seller_id" : "Admin_id"} : {account?._id || "id"}
      </div>

      {/* RIGHT */}
      <button
        onClick={logout}
        className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
