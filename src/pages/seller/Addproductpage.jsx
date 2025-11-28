import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../utils/axiosInstance";

const CATEGORIES = [
  "Pizza",
  "Burger",
  "Cake",
  "Chinese",
  "Rolls",
  "Biryani",
  "Shawarma",
  "Shake",
  "Pakoda",
  "Salad",
  "Cutlet",
  "Pav Bhaji",
  "Noodles",
  "Dhokla",
  "Momo",
  "Pasta",
  "South Indian",
  "Pure Veg",
  "Coffee",
  "Pastry",
];

export default function AddProductPage() {
  const seller = useSelector((state) => state.user.user);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    isVeg: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || !form.image) {
      toast.error("Name, price, category and image are required");
      return;
    }

    try {
      await api.post(`/food-products/${seller.sellerTypeId}`, form, {
        withCredentials: true,
      });

      toast.success("Product added successfully!");

      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        isVeg: false,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-xl bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-semibold text-sm">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="eg. Chicken Biryani"
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold text-sm">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="199"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="font-semibold text-sm">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="font-semibold text-sm">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-sm">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Short description (optional)"
          />
        </div>

        {/* Veg / Non-Veg */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVeg"
            checked={form.isVeg}
            onChange={handleChange}
          />
          <label className="text-sm">Is Veg?</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
