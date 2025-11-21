import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/auth/getCurrentUser",
          {
            withCredentials: true,
          }
        );
        console.log(res.data.user);
        setCurrentUser(res.data.user);
      } catch (err) {
        setCurrentUser(null);
      }
    };

    fetchUser();
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

            {/* Show username or Sign in */}
            <li>
              {currentUser ? (
                <span style={{ fontWeight: 600 }}>{currentUser.name}</span>
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
