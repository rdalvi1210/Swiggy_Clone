import { useState } from "react";

const PagesNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Left Section - Logo and Location */}
        <div className="left-section">
          {/* Logo */}
          <div className="logo-container">
            {/* <img src="/images/logo.png" alt="Swiggy Logo" className="logo" /> */}
            <svg class="VXJlj" viewBox="0 0 61 61" height="49" width="49">
              <g clip-path="url(#a)">
                <path
                  fill="#FF5200"
                  d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z"
                ></path>
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z"
                  clip-rule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.32.5h60v60h-60z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Location Dropdown - Desktop */}
          <div
            className="location-container desktop-only"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="location-text">Other</span>
            <img
              src="/images/chevron-down.png"
              alt="Dropdown"
              className="chevron-icon"
            />

            {showDropdown && (
              <div className="dropdown">
                <div className="dropdown-item">Mumbai</div>
                <div className="dropdown-item">Delhi</div>
                <div className="dropdown-item">Bangalore</div>
                <div className="dropdown-item">Pune</div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <div className={`hamburger ${showMobileMenu ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Right Section - Navigation Items */}
        <div
          className={`right-section ${showMobileMenu ? "mobile-active" : ""}`}
        >
          {/* Swiggy Corporate */}
          <div className="nav-item">
            {/* <img src="/images/briefcase.png" alt="Corporate" className="icon" /> */}
            <span class="QO_nN">
              <svg
                class="ppAwf"
                viewBox="0 0 20 20"
                height="20"
                width="20"
                fill="none"
              >
                <rect
                  x="2.46094"
                  y="7.98145"
                  width="15.0784"
                  height="10.7765"
                  rx="1.52523"
                  stroke="#02060C"
                  stroke-opacity="0.75"
                  fill="none"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                ></rect>
                <path
                  d="M6.17822 4.91866C6.17822 3.90782 6.99767 3.08838 8.0085 3.08838H11.9916C13.0024 3.08838 13.8219 3.90782 13.8219 4.91866V5.22965C13.8219 5.61625 13.5085 5.92965 13.1219 5.92965H6.87822C6.49162 5.92965 6.17822 5.61625 6.17822 5.22965V4.91866Z"
                  fill="#02060C"
                  fill-opacity="0.75"
                ></path>
              </svg>
            </span>
            <span className="nav-text">Swiggy Corporate</span>
          </div>

          {/* Search */}
          <div className="nav-item">
            {/* <img src="/images/search.png" alt="Search" className="icon" /> */}
            <svg
              class="ppAwf"
              viewBox="5 -1 12 25"
              height="17"
              width="17"
              fill="#686b78"
            >
              <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
            </svg>
            <span className="nav-text">Search</span>
          </div>

          {/* Offers */}
          <div className="nav-item">
            {/* <img src="/images/offers.png" alt="Offers" className="icon" /> */}
            <svg
              class="ppAwf"
              viewBox="0 0 32 32"
              height="19"
              width="19"
              fill="#686b78"
            >
              <path d="M14.2 2.864l-1.899 1.38c-0.612 0.447-1.35 0.687-2.11 0.687h-2.352c-0.386 0-0.727 0.248-0.845 0.613l-0.728 2.238c-0.235 0.721-0.691 1.348-1.302 1.79l-1.905 1.385c-0.311 0.226-0.442 0.626-0.323 0.991l0.728 2.241c0.232 0.719 0.232 1.492-0.001 2.211l-0.727 2.237c-0.119 0.366 0.011 0.767 0.323 0.994l1.906 1.384c0.61 0.445 1.064 1.070 1.3 1.79l0.728 2.24c0.118 0.365 0.459 0.613 0.844 0.613h2.352c0.759 0 1.497 0.24 2.107 0.685l1.9 1.381c0.313 0.227 0.736 0.227 1.048 0.001l1.9-1.38c0.613-0.447 1.349-0.687 2.11-0.687h2.352c0.384 0 0.726-0.248 0.845-0.615l0.727-2.235c0.233-0.719 0.688-1.346 1.302-1.794l1.904-1.383c0.311-0.226 0.442-0.627 0.323-0.993l-0.728-2.239c-0.232-0.718-0.232-1.49 0.001-2.213l0.727-2.238c0.119-0.364-0.012-0.765-0.324-0.992l-1.901-1.383c-0.614-0.445-1.070-1.074-1.302-1.793l-0.727-2.236c-0.119-0.366-0.461-0.614-0.845-0.614h-2.352c-0.76 0-1.497-0.239-2.107-0.685l-1.903-1.382c-0.313-0.227-0.736-0.226-1.047-0.001zM16.829 0.683l1.907 1.385c0.151 0.11 0.331 0.168 0.521 0.168h2.352c1.551 0 2.927 1 3.408 2.475l0.728 2.241c0.057 0.177 0.169 0.332 0.321 0.442l1.902 1.383c1.258 0.912 1.784 2.531 1.304 4.006l-0.726 2.234c-0.058 0.182-0.058 0.375-0.001 0.552l0.727 2.237c0.48 1.477-0.046 3.096-1.303 4.007l-1.9 1.38c-0.153 0.112-0.266 0.268-0.324 0.447l-0.727 2.237c-0.48 1.477-1.856 2.477-3.408 2.477h-2.352c-0.19 0-0.37 0.058-0.523 0.17l-1.904 1.383c-1.256 0.911-2.956 0.911-4.213-0.001l-1.903-1.384c-0.15-0.11-0.332-0.168-0.521-0.168h-2.352c-1.554 0-2.931-1.001-3.408-2.477l-0.726-2.234c-0.059-0.18-0.173-0.338-0.324-0.448l-1.902-1.381c-1.258-0.912-1.784-2.53-1.304-4.008l0.727-2.235c0.058-0.179 0.058-0.373 0.001-0.551l-0.727-2.236c-0.481-1.476 0.046-3.095 1.302-4.006l1.905-1.385c0.151-0.11 0.264-0.265 0.323-0.444l0.727-2.235c0.478-1.476 1.855-2.477 3.408-2.477h2.352c0.189 0 0.371-0.059 0.523-0.17l1.902-1.383c1.256-0.911 2.956-0.911 4.212 0zM18.967 23.002c-1.907 0-3.453-1.546-3.453-3.453s1.546-3.453 3.453-3.453c1.907 0 3.453 1.546 3.453 3.453s-1.546 3.453-3.453 3.453zM18.967 20.307c0.419 0 0.758-0.339 0.758-0.758s-0.339-0.758-0.758-0.758c-0.419 0-0.758 0.339-0.758 0.758s0.339 0.758 0.758 0.758zM10.545 14.549c-1.907 0-3.453-1.546-3.453-3.453s1.546-3.453 3.453-3.453c1.907 0 3.453 1.546 3.453 3.453s-1.546 3.453-3.453 3.453zM10.545 11.855c0.419 0 0.758-0.339 0.758-0.758s-0.339-0.758-0.758-0.758c-0.419 0-0.758 0.339-0.758 0.758s0.339 0.758 0.758 0.758zM17.78 7.882l2.331 1.352-7.591 13.090-2.331-1.352 7.591-13.090z"></path>
            </svg>
            <span className="nav-text">Offers</span>
            <span className="new-badge">NEW</span>
          </div>

          {/* Help */}
          <div className="nav-item">
            {/* <img src="/images/help.png" alt="Help" className="icon" /> */}
            <svg
              class="ppAwf"
              viewBox="6 -1 12 25"
              height="19"
              width="19"
              fill="#686b78"
            >
              <path d="M21.966903,13.2244898 C22.0156989,12.8231523 22.0408163,12.4145094 22.0408163,12 C22.0408163,11.8357822 22.036874,11.6724851 22.029079,11.5101984 L17.8574333,11.5102041 C17.8707569,11.6717062 17.877551,11.8350597 17.877551,12 C17.877551,12.4199029 17.8335181,12.8295214 17.749818,13.2244898 L21.966903,13.2244898 Z M21.5255943,15.1836735 L16.9414724,15.1836735 C15.8950289,16.8045422 14.0728218,17.877551 12,17.877551 C9.92717823,17.877551 8.1049711,16.8045422 7.05852762,15.1836735 L2.47440565,15.1836735 C3.80564362,19.168549 7.56739481,22.0408163 12,22.0408163 C16.4326052,22.0408163 20.1943564,19.168549 21.5255943,15.1836735 Z M21.7400381,9.55102041 C20.6468384,5.18931674 16.7006382,1.95918367 12,1.95918367 C7.2993618,1.95918367 3.3531616,5.18931674 2.25996187,9.55102041 L6.6553883,9.55102041 C7.58404845,7.5276442 9.62792376,6.12244898 12,6.12244898 C14.3720762,6.12244898 16.4159515,7.5276442 17.3446117,9.55102041 L21.7400381,9.55102041 Z M2.03309705,13.2244898 L6.25018203,13.2244898 C6.16648186,12.8295214 6.12244898,12.4199029 6.12244898,12 C6.12244898,11.8350597 6.1292431,11.6717062 6.14256675,11.5102041 L1.97092075,11.5102041 C1.96312595,11.6724851 1.95918367,11.8357822 1.95918367,12 C1.95918367,12.4145094 1.98430112,12.8231523 2.03309705,13.2244898 Z M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M12,15.9183673 C14.1640545,15.9183673 15.9183673,14.1640545 15.9183673,12 C15.9183673,9.83594547 14.1640545,8.08163265 12,8.08163265 C9.83594547,8.08163265 8.08163265,9.83594547 8.08163265,12 C8.08163265,14.1640545 9.83594547,15.9183673 12,15.9183673 Z"></path>
            </svg>
            <span className="nav-text">Help</span>
          </div>

          {/* Sign In */}
          <div className="nav-item">
            {/* <img src="/images/user.png" alt="User" className="icon" /> */}
            <svg
              class="ppAwf"
              viewBox="6 0 12 24"
              height="19"
              width="18"
              fill="#686b78"
            >
              <path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path>
            </svg>
            <span className="nav-text">Sign In</span>
          </div>

          {/* Cart */}
          <div className="nav-item">
            <div className="cart-container">
              {/* <img src="/images/cart.png" alt="Cart" className="icon" /> */}
              <svg
                class="ppAwf vZTPh"
                viewBox="-1 0 37 32"
                height="20"
                width="20"
                fill="#686b78"
              >
                <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
              </svg>
              <span className="cart-badge">0</span>
            </div>
            <span className="nav-text">Cart</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar {
          background-color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .location-container {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
          padding: 8px 12px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .location-container:hover {
          background-color: #f0f0f5;
        }

        .location-text {
          font-size: 16px;
          font-weight: 600;
          color: #3d4152;
          border-bottom: 2px solid #3d4152;
          padding-bottom: 2px;
        }

        .chevron-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          min-width: 200px;
          overflow: hidden;
          z-index: 100;
        }

        .dropdown-item {
          padding: 12px 16px;
          font-size: 14px;
          color: #3d4152;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .dropdown-item:hover {
          background-color: #f0f0f5;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .hamburger {
          width: 24px;
          height: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          width: 100%;
          height: 3px;
          background-color: #3d4152;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
        }

        .nav-item:hover .nav-text {
          color: #fc8019;
        }

        .icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .nav-text {
          font-size: 16px;
          font-weight: 500;
          color: #3d4152;
          white-space: nowrap;
        }

        .new-badge {
          background-color: #ffa700;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 3px;
          position: absolute;
          top: -8px;
          right: -20px;
        }

        .cart-container {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #fc8019;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .desktop-only {
          display: flex;
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .container {
            padding: 0 16px;
          }

          .left-section {
            gap: 20px;
          }

          .right-section {
            gap: 24px;
          }

          .nav-text {
            font-size: 14px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .container {
            height: 64px;
          }

          .logo {
            width: 40px;
            height: 40px;
          }

          .desktop-only {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .right-section {
            position: fixed;
            top: 64px;
            right: -100%;
            width: 280px;
            height: calc(100vh - 64px);
            background-color: #ffffff;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 20px;
            box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            overflow-y: auto;
          }

          .right-section.mobile-active {
            right: 0;
          }

          .nav-item {
            width: 100%;
            padding: 16px 0;
            border-bottom: 1px solid #f0f0f5;
            gap: 12px;
          }

          .nav-item:last-child {
            border-bottom: none;
          }

          .nav-text {
            font-size: 16px;
          }

          .icon {
            width: 24px;
            height: 24px;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .container {
            padding: 0 12px;
            height: 56px;
          }

          .logo {
            width: 36px;
            height: 36px;
          }

          .right-section {
            top: 56px;
            height: calc(100vh - 56px);
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

export default PagesNavbar;
