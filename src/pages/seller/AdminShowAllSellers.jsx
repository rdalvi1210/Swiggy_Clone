"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";

export default function AdminSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ======================
  // LOAD SELLERS
  // ======================
  const loadSellers = async () => {
    try {
      setLoading(true);
        const res = await api.get("/admin/sellers");
        console.log(res)
      setSellers(res.data.sellers || []);
    } catch {
      toast.error("Failed to load sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  // ======================
  // DELETE SELLER
  // ======================
  const deleteSeller = async (sellerId) => {
    if (!window.confirm("Delete this seller permanently?")) return;

    try {
      await api.delete(`/admin/sellers/${sellerId}`);
      toast.success("Seller deleted");
      loadSellers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = sellers.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin · Sellers</h1>

        <input
          placeholder="Search seller..."
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
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">{s.ownerName || "—"}</td>
                  <td className="px-6 py-4">{s.email}</td>
                  <td className="px-6 py-4 capitalize">{s.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteSeller(s._id)}
                      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No sellers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
