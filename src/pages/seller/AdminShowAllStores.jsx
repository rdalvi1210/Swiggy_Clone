"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  // ======================
  // LOAD STORES
  // ======================
  const loadStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/stores");
      setStores(res.data.stores || []);
    } catch {
      toast.error("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  // ======================
  // DELETE STORE
  // ======================
  const deleteStore = async (storeId) => {
    if (!confirm("Delete this store permanently?")) return;

    try {
      await api.delete(`/admin/stores/${storeId}`);
      toast.success("Store deleted");
      loadStores();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ======================
  // UPDATE STORE
  // ======================
  const updateStore = async () => {
    try {
      await api.put(`/admin/stores/${editing._id}`, editing);
      toast.success("Store updated");
      setEditing(null);
      loadStores();
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered = stores.filter(
    (s) =>
      s.storeName.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin · Food Stores
        </h1>

        <input
          placeholder="Search stores..."
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
                <th className="px-6 py-3 text-left">Store</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Cuisines</th>
                <th className="px-6 py-3">Delivery</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.coverImage}
                        alt={s.storeName}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                      {s.storeName}
                    </div>
                  </td>

                  <td className="px-6 py-4">{s.address}</td>

                  <td className="px-6 py-4">
                    {Array.isArray(s.cuisines)
                      ? s.cuisines.join(", ")
                      : s.cuisines}
                  </td>

                  <td className="px-6 py-4">{s.deliveryTime || "30-40"} min</td>

                  <td className="px-6 py-4">
                    {s.isActive === false ? (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        Inactive
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => setEditing(s)}
                      className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStore(s._id)}
                      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No stores found
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
          <div className="bg-white w-full max-w-lg rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Edit Store</h2>

            <img
              src={editing.coverImage}
              alt="Cover"
              className="w-full h-40 object-cover rounded-md border"
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Cover Image URL"
              value={editing.coverImage}
              onChange={(e) =>
                setEditing({ ...editing, coverImage: e.target.value })
              }
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Store Name"
              value={editing.storeName}
              onChange={(e) =>
                setEditing({ ...editing, storeName: e.target.value })
              }
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Address"
              value={editing.address}
              onChange={(e) =>
                setEditing({ ...editing, address: e.target.value })
              }
            />

            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Cuisines (comma separated)"
              value={
                Array.isArray(editing.cuisines)
                  ? editing.cuisines.join(", ")
                  : editing.cuisines
              }
              onChange={(e) =>
                setEditing({
                  ...editing,
                  cuisines: e.target.value.split(",").map((c) => c.trim()),
                })
              }
            />

            <div className="flex gap-4">
              <input
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Delivery Time"
                value={editing.deliveryTime || ""}
                onChange={(e) =>
                  setEditing({ ...editing, deliveryTime: e.target.value })
                }
              />

              <select
                value={editing.isActive !== false ? "active" : "inactive"}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    isActive: e.target.value === "active",
                  })
                }
                className="px-3 py-2 border rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateStore}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
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
