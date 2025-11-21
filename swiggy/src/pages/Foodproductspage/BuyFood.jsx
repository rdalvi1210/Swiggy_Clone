import PagesNavbar from "../../components/PagesNavbar";

const MenuPage = () => {
  const css = `
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: "Gilroy";
    }

    #topContainer {
      width: 100%;
      background: linear-gradient(
        rgb(255, 255, 255) -6.71%,
        rgb(235, 235, 242) 56.19%,
        rgb(223, 223, 231) 106.56%
      );
      padding: 16px 16px 16px 16px;
      border-bottom-left-radius: 36px;
      border-bottom-right-radius: 36px;
    }
    #topContainer h1 {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .topBar {
      margin-bottom: 10px;
    }
    .topBar i {
      font-size: 20px;
    }

    .container {
      padding: 20px 15px;
      border-radius: 20px;
      border: 1px solid rgba(2, 6, 12, 0.15);
      background: white;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 8px 16px 0px;
    }
    .ratingStar {
      font-size: 15px;
      margin-right: 5px;
    }
    .container p span {
      font-weight: bold;
    }
    .container p {
      margin-bottom: 4px;
    }
    .bottomContainer {
      display: flex;
    }

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 10px;
      // margin-right: 10px;
    }
    .circle {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgb(196, 196, 196);
    }
    .line {
      width: 0.5px;
      height: 26px;
      background: rgb(196, 196, 196);
    }
    .right {
      /* margin-top: -3px; */
      display: flex;
      flex-direction: column;
      justify-content : start;
      gap: 4px;
      width : auto;
    }
    .firstP {
      font-weight: bold;
      text-align : left;
    }
    .firstP span {
      color: gray;
    }
    .timeP {
      font-weight: bold;
      text-align : left;
    }

    #screen-bf {
      padding: 15px;
    }

    .searchContainer {
      background-color: #e6e6e8;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    .search {
      width: 98%;
      padding: 6px 5px;
      margin: auto;
      border-radius: 12px;
      background-color: #e6e6e8;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .search input {
      width: 93%;
      padding: 8px;
      border: none;
      outline: none;
      border-radius: 12px;
      background-color: #e6e6e8;
    }

    .cardsContainer {
      margin-top: 25px;
    }

    .cards {
      padding : 15px;
      display: flex;
      gap : 10px;
      border-bottom: 1px solid gray;
      margin: 25px 0;
      padding-bottom: 25px;
    }

    .vegTag {
      border: 2px solid green;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-bottom: 5px;
    }

    .vegTag svg {
      width: 13px;
      height: 13px;
    }

    .leftside  {
      width : 95%;
    }

    .leftside h3 {
      color: rgba(2, 6, 12, 0.75);
      margin-bottom: 5px;
      font-size: 12px;
    }
    .linethrough {
      text-decoration: line-through;
      color: rgba(2, 6, 12, 0.45);
    }
    .leftside p {
      font-weight: bold;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .leftside h4 {
      font-weight: medium;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .cardStar {
      font-size: 12px;
      margin-right: 1px;
      color: rgba(2, 6, 12, 0.75);
    }
    .imageContainer {
      width: 156px;
      height: 144px;
      position: relative;
      display: block;
      text-decoration: none;
    }
    .imageContainer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      text-decoration: none;
    }
    .addBtn {
      /* width: 120px; */
      position: absolute;
      text-align: center;
      width: 120px;
      height: 40px;
      left: 18px;
      bottom: -15px;
      color: rgb(27, 166, 114);
      font-weight: 600;
      font-size: 18px;
      background: rgb(255, 255, 255);
      border: 1px solid rgba(2, 6, 12, 0.15);
      outline: none;
      border-radius: 8px;
      box-shadow: rgba(40, 44, 63, 0.08) 0px 3px 8px;
      cursor: pointer;
    }

    @media (min-width: 658px) {
      .cards {
        padding-bottom: 40px;
      }
    }

    @media (min-width: 1024px) {
      .leftside {
        width: 70%;
      }
      .leftside h3{
        font-size : 20px;
      }
      .leftside h4{
        font-size : 18px;
      }

      #topContainer {
        width: 50%;
        margin: auto;
      }
      #screen-bf {
        width: 50%;
        margin: auto;
      }
        .mainContainer{
        width: 100%;
        }
      .topBar {
        display: none;
      }
        .cards{
        padding : 20px;
        justify-content : space-between
        }
        .rightSide{
            width : 30%;
            height : 100%;
            display : flex;
            justify-content : end;
            align-items : center;
        }
    }
  `;

  return (
    <>
      <PagesNavbar />
      <style>{css}</style>
      <div id="topContainer">
        <div className="topBar">
          <i className="fa-solid fa-arrow-left"></i>
        </div>

        <h1>Wendy's Berger</h1>

        <div className="container">
          <p>
            <i className="fa-solid fa-star ratingStar"></i>
            <span>4.2 (4.8k+ ratings) ₹400 for two</span>
          </p>

          <a
            style={{
              color: "rgb(255, 82, 0)",
              fontWeight: "bold",
              fontSize: "15px",
              marginBottom: "10px",
              display: "block",
              paddingLeft: "5px",
            }}
            href=""
          >
            Burgers, American
          </a>

          <div className="bottomContainer">
            <div className="left">
              <div className="circle"></div>
              <div className="line"></div>
              <div className="circle"></div>
            </div>
            <div className="right">
              <p className="firstP">
                Outlet <span>Saki Naka</span>
              </p>
              <p className="timeP">35-40 mins</p>
            </div>
          </div>
        </div>
      </div>

      <div id="screen-bf">
        <div className="searchContainer">
          <div className="search">
            <input type="text" placeholder="Search Dishes" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <hr />

        <div className="mainContainer">
          <div className="heading" style={{ marginTop: "20px" }}>
            <h3 style={{ padding: "10px 0 0 10px" }}>
              Looking For "Pizza" (105)
            </h3>
          </div>
          <div className="cardsContainer">
            <div className="cards">
              <div className="leftside">
                <span className="vegTag">
                  <svg
                    aria-hidden="true"
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    className="sc-dNsVcS fDcVYp"
                  >
                    <g fill="none" fillRule="evenodd">
                      <circle cx="8" cy="8" r="8" fill="#007a48"></circle>
                      <circle cx="8" cy="8" r="3" fill="#fff"></circle>
                    </g>
                  </svg>
                </span>

                <h3>1+1 Non-Veg Cheesy Pizza Mania</h3>
                <h4 style={{ marginBottom: "10px" }}>
                  <span className="linethrough">₹299</span> ₹199
                </h4>

                <p>
                  <i className="fa-solid fa-star cardStar"></i>
                  <span
                    style={{
                      color: "rgba(2, 6, 12, 0.75)",
                      marginRight: "2px",
                    }}
                  >
                    4.5
                  </span>
                  <span>(25)</span>
                </p>
                <h4 style={{ color: "rgba(2, 6, 12, 0.6)" }}>
                  Calling Out all our Non-Veg Pizzas fanatics. Set your tables
                  with 2 Non-Veg Regular Pizzas for double treat and double fun!
                </h4>
              </div>
              <div className="rightSide">
                <a
                  href="../cartCheckoutpage/index.html"
                  className="imageContainer"
                >
                  <img
                    src="./images/1934a865-9467-49af-9c31-7da2bcf42659_06e64e96-ef92-4857-898f-698484ffbefe.jpeg"
                    alt=""
                  />
                  <button className="addBtn">ADD</button>
                  <p
                    style={{
                      color: "rgba(2, 6, 12, 0.6)",
                      textAlign: "center",
                      margin: "12px 0 1200px 0",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Customisable
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
