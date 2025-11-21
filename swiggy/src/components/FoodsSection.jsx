function FoodsSection() {
  return (
    <>
      {" "}
      <div id="foodComponentScreen">
        <div className="foodScrollWrapper">
          {/* Repeat food items */}
          {[
            ["Pizza (1).png", "Shake.png"],
            ["Burger.png", "Pakoda.png"],
            ["Cake.png", "Salad.png"],
            ["Chinese.png", "Cutlet.png"],
            ["Rolls.png", "Pav Bhaji.png"],
            ["Biryani.png", "Noodles.png"],
            ["Shawarma.png", "Dhokla.png"],
            ["Momo.png", "Pure Veg.png"],
            ["Pasta.png", "Coffee.png"],
            ["South Indian.png", "Pastry.png"],
          ].map((pair, index) => (
            <div className="foodColumn" key={index}>
              <a href="/restaurantsselectpage" className="firstImageContainer">
                <img src={`/images/${pair[0]}`} alt="" />
              </a>

              <a href="/restaurantsselectpage" className="secondImageContainer">
                <img src={`/images/${pair[1]}`} alt="" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FoodsSection;
