function FooterSection() {
  return (
    <>
      {" "}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo column1">
            <img src="/images/Group (1).svg" alt="" />
            <p>© 2025 Swiggy Limited</p>
          </div>

          <div className="footer-columns">
            <div className="column">
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Swiggy Corporate</li>
                <li>Careers</li>
                <li>Team</li>
                <li>Swiggy One</li>
                <li>Swiggy Instamart</li>
                <li>Swiggy Dineout</li>
                <li>Swiggy Genie</li>
                <li>Minis</li>
                <li>Pyng</li>
              </ul>
            </div>

            <div className="column thirdColumn">
              <div>
                <h4>Contact us</h4>
                <ul>
                  <li>Help & Support</li>
                  <li>Partner With Us</li>
                  <li>Ride With Us</li>
                </ul>
              </div>

              <div>
                <h4>Legal</h4>
                <ul>
                  <li>Terms & Conditions</li>
                  <li>Cookie Policy</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>

            <div className="column">
              <h4>Available in:</h4>
              <ul>
                <li>Bangalore</li>
                <li>Gurgaon</li>
                <li>Hyderabad</li>
                <li>Delhi</li>
                <li>Mumbai</li>
                <li>Pune</li>
              </ul>

              <select>
                <option>685 cities</option>
              </select>
            </div>

            <div className="column columnlast">
              <div>
                <h4>Life at Swiggy</h4>
                <ul>
                  <li>Explore With Swiggy</li>
                  <li>Swiggy News</li>
                  <li>Snackables</li>
                </ul>
              </div>

              <div>
                <h4>Social Links</h4>
                <div className="social-icons">
                  <i className="fab fa-linkedin"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-pinterest"></i>
                  <i className="fab fa-twitter"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ width: "90%", margin: "auto" }} />

        <div className="homePageBottom">
          <h2>For better Experience, download the swiggy app now</h2>

          <div className="rightstickerContainer">
            <div className="appleBanner">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
                alt=""
              />
            </div>

            <div className="playstoreBanner">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
                alt=""
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterSection;
