function InstamartSection() {
  return (
    <>
      {/* INSTAMART SCROLL */}
      <div className="shopGroceriesContainer">
        <h3>Shop groceries on instamart</h3>

        <div className="cardsWrapper">
          {[
            "fresh vegetables.png",
            "fresh fruits.png",
            "bread.png",
            "rice.png",
            "masalas.png",
            "oils.png",
            "munchies.png",
            "sweettooth.png",
            "colddrinks.png",
            "biscuits.png",
            "instant.png",
            "meat.png",
            "cereals.png",
            "sauces.png",
            "tea.png",
            "cleaning.png",
            "pharma.png",
            "bathbody.png",
            "pan.png",
            "home.png",
            "office.png",
            "babycare.png",
            "petsupplies.png",
            "beauty.png",
          ].map((img, index) => (
            <div className="cardInstamart" key={index}>
              <div className="instamartImageContainer">
                <img src={`/instamartimages/${img}`} alt="txt" />
              </div>

              <p>{img.replace(".png", "").replace(/-/g, " ")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InstamartSection;
