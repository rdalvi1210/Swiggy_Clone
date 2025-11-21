import PagesNavbar from "../../components/PagesNavbar";
import "./style.css";
export default function PizzaPage() {
  return (
    <div className="rs">
      <PagesNavbar />
      <div id="screen-rs">
        {/* Mobile design */}

        <div className="firstContainer-rs">
          <img
            src="./images/60f66049-cfcc-4f0b-891f-624938aac2bc_Pizza (6).jpg"
            alt=""
          />
          <a href="../homepage/index.html">
            <i className="fa-solid fa-arrow-left"></i>
          </a>
        </div>

        <div className="mainContainer-rs">
          <div className="topcontent-rs">
            <h3>Pizza</h3>
            <p>Cheesilicious pizzas to make every day extraordinary.</p>
          </div>

          <div className="filterSortContainer-rs">
            <div className="filter-rs">
              <p>Filter</p>
              <img src="/images/filter-edit-svgrepo-com.svg" alt="" />
            </div>
            <div className="sortBy">
              <p>Sort By</p>
              <i className="fa-solid fa-sort-down"></i>
            </div>
          </div>

          <div className="body-rs">
            <h1 className="heading-rs">Restaurants to explore</h1>
            <div className="cardsContainer-rs">
              <div className="card">
                <div className="img-rs">
                  <img
                    src="/images/97d9fd8b-6c30-4098-96fa-8dc3ec94b4c1_722372.jpg"
                    alt="asasd"
                  />
                </div>
                <div className="info-rs">
                  <h3>Pizza Hut</h3>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#1a8f3d", marginRight: "3px" }}
                    ></i>
                    <span>4.1 | 40-45 mins</span>
                  </p>
                  <h4>Pizzas</h4>
                  <h4>East Point Mall Snatackjjnas asdmaskd asjasd</h4>
                </div>
              </div>
              <div className="card">
                <div className="img-rs">
                  <img
                    src="/images/97d9fd8b-6c30-4098-96fa-8dc3ec94b4c1_722372.jpg"
                    alt="asasd"
                  />
                </div>
                <div className="info-rs">
                  <h3>Pizza Hut</h3>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#1a8f3d", marginRight: "3px" }}
                    ></i>
                    <span>4.1 | 40-45 mins</span>
                  </p>
                  <h4>Pizzas</h4>
                  <h4>East Point Mall Snatackjjnas asdmaskd asjasd</h4>
                </div>
              </div>
              <div className="card">
                <div className="img-rs">
                  <img
                    src="/images/97d9fd8b-6c30-4098-96fa-8dc3ec94b4c1_722372.jpg"
                    alt="asasd"
                  />
                </div>
                <div className="info-rs">
                  <h3>Pizza Hut</h3>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#1a8f3d", marginRight: "3px" }}
                    ></i>
                    <span>4.1 | 40-45 mins</span>
                  </p>
                  <h4>Pizzas</h4>
                  <h4>East Point Mall Snatackjjnas asdmaskd asjasd</h4>
                </div>
              </div>
              <div className="card">
                <div className="img-rs">
                  <img
                    src="/images/97d9fd8b-6c30-4098-96fa-8dc3ec94b4c1_722372.jpg"
                    alt="asasd"
                  />
                </div>
                <div className="info-rs">
                  <h3>Pizza Hut</h3>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#1a8f3d", marginRight: "3px" }}
                    ></i>
                    <span>4.1 | 40-45 mins</span>
                  </p>
                  <h4>Pizzas</h4>
                  <h4>East Point Mall Snatackjjnas asdmaskd asjasd</h4>
                </div>
              </div>
              <div className="card">
                <div className="img-rs">
                  <img
                    src="/images/97d9fd8b-6c30-4098-96fa-8dc3ec94b4c1_722372.jpg"
                    alt="asasd"
                  />
                </div>
                <div className="info-rs">
                  <h3>Pizza Hut</h3>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#1a8f3d", marginRight: "3px" }}
                    ></i>
                    <span>4.1 | 40-45 mins</span>
                  </p>
                  <h4>Pizzas</h4>
                  <h4>East Point Mall Snatackjjnas asdmaskd asjasd</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
