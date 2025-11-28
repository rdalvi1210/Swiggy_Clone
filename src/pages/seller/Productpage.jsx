import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("");

  const seller = useSelector((state) => state.user.user);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    isVeg: false,
  });

  // -------------------------
  // FETCH PRODUCTS
  // -------------------------
  const fetchProducts = async () => {
    try {
      const res = await api.get(`/food-products/${seller.sellerTypeId}`);
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // DELETE PRODUCT
  // -------------------------
  const deleteProduct = async (index) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/food-products/${seller.sellerTypeId}/${index}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // -------------------------
  // OPEN EDIT MODAL
  // -------------------------
  const openEdit = (p, idx) => {
    setEditIndex(idx);
    setEditForm(p);
  };

  // -------------------------
  // SAVE EDIT
  // -------------------------
  const saveEdit = async () => {
    try {
      await api.put(
        `/food-products/${seller.sellerTypeId}/${editIndex}`,
        editForm
      );
      toast.success("Updated successfully");
      setEditIndex(null);
      fetchProducts();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = filter
    ? products.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      )
    : products;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>

        <button
          onClick={() => (window.location.hash = "#add-product")}
          className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-4 py-2 rounded-md shadow-sm font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md p-2 shadow-sm"
          placeholder="Search products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* PRODUCT LIST */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProducts.map((p, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all flex gap-4 border border-gray-100"
            >
              {/* IMAGE */}
              <img
                src={p.image || "/no-image.png"}
                alt={p.name}
                className="w-24 h-24 object-cover rounded-md border"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500">{p.category}</p>
                <p className="text-orange-600 font-bold mt-1">₹{p.price}</p>

                {p.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {p.description}
                  </p>
                )}

                <span className="text-xs mt-1 block">
                  {p.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => openEdit(p, index)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(index)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================
             EDIT MODAL
      ======================================================== */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-xl shadow-lg p-6 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

            {/* FORM */}
            <div className="space-y-3">
              <input
                className="border p-2 rounded w-full"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />

              <input
                className="border p-2 rounded w-full"
                placeholder="Price"
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
              />

              <input
                className="border p-2 rounded w-full"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
              />

              <input
                className="border p-2 rounded w-full"
                placeholder="Image URL"
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
              />

              <textarea
                className="border p-2 rounded w-full"
                placeholder="Description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.isVeg}
                  onChange={(e) =>
                    setEditForm({ ...editForm, isVeg: e.target.checked })
                  }
                />
                Veg?
              </label>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditIndex(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
