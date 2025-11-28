import { Link } from "react-router-dom";

const FOOD_ITEMS = [
  ["Pizza (1).png", "Pizza"],
  ["Shake.png", "Shake"],
  ["Burger.png", "Burger"],
  ["Pakoda.png", "Pakoda"],
  ["Cake.png", "Cake"],
  ["Salad.png", "Salad"],
  ["Chinese.png", "Chinese"],
  ["Cutlet.png", "Cutlet"],
  ["Rolls.png", "Rolls"],
  ["Pav Bhaji.png", "Pav Bhaji"],
  ["Biryani.png", "Biryani"],
  ["Noodles.png", "Noodles"],
  ["Shawarma.png", "Shawarma"],
  ["Dhokla.png", "Dhokla"],
  ["Momo.png", "Momo"],
  ["Pure Veg.png", "Pure Veg"],
  ["Pasta.png", "Pasta"],
  ["Coffee.png", "Coffee"],
  ["South Indian.png", "South Indian"],
  ["Pastry.png", "Pastry"],
];

function FoodsSection() {
  return (
    <div id="foodComponentScreen">
      <div className="foodScrollWrapper">
        {Array.from({ length: FOOD_ITEMS.length / 2 }).map((_, idx) => {
          const item1 = FOOD_ITEMS[idx * 2];
          const item2 = FOOD_ITEMS[idx * 2 + 1];

          return (
            <div className="foodColumn" key={idx}>
              <Link
                to={`/selectRestaurant?category=${encodeURIComponent(
                  item1[1]
                )}`}
                className="firstImageContainer"
              >
                <img src={`/images/${item1[0]}`} alt={item1[1]} />
              </Link>

              <Link
                to={`/selectRestaurant?category=${encodeURIComponent(
                  item2[1]
                )}`}
                className="secondImageContainer"
              >
                <img src={`/images/${item2[0]}`} alt={item2[1]} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FoodsSection;
