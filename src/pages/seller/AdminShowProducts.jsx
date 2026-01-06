"use client";

import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  // ======================
  // LOAD PRODUCTS
  // ======================
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/products");
      setProducts(res.data.products || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ======================
  // DELETE PRODUCT
  // ======================
  const deleteProduct = async (storeId, productId) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/admin/products/${storeId}/${productId}`);
      toast.success("Product deleted");
      loadProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ======================
  // UPDATE PRODUCT
  // ======================
  const updateProduct = async () => {
    try {
      await api.put(
        `/admin/products/${editing.storeId}/${editing.productId}`,
        editing
      );
      toast.success("Product updated");
      setEditing(null);
      loadProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin · All Products
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-64 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <p className="p-6 text-center">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3">Store</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Veg</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.productId}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  {/* IMAGE */}
                  <td className="px-6 py-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {p.name}
                  </td>

                  <td className="px-6 py-4">{p.storeName}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">₹{p.price}</td>

                  <td className="px-6 py-4">{p.isVeg ? "🟢" : "🔴"}</td>

                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() =>
                        setEditing({ ...p, productId: p.productId })
                      }
                      className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p.storeId, p.productId)}
                      className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Edit Product</h2>

            {/* IMAGE PREVIEW */}
            <img
              src={editing.image}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md border"
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Image URL"
              value={editing.image}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Name"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              type="number"
              placeholder="Price"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: e.target.value })
              }
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Category"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.isVeg}
                onChange={(e) =>
                  setEditing({ ...editing, isVeg: e.target.checked })
                }
              />
              Veg Item
            </label>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
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
