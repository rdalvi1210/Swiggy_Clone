import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../utils/axiosInstance";

export default function SettingsPage() {
  const seller = useSelector((s) => s.user.user);
  const storeId = seller?.sellerTypeId;

  const [form, setForm] = useState({
    storeName: "",
    address: "",
    cuisines: [],
    deliveryTime: "",
    openingTime: "",
    closingTime: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [cuisineInput, setCuisineInput] = useState("");

  const fetchStore = async () => {
    try {
      const res = await api.get(`/food-store/${storeId}`);
      const s = res.data.store;

      setForm({
        storeName: s.storeName || "",
        address: s.address || "",
        cuisines: s.cuisines || [],
        deliveryTime: s.deliveryTime || "",
        openingTime: s.openingTime || "",
        closingTime: s.closingTime || "",
        coverImage: s.coverImage || "",
      });
    } catch (err) {
      toast.error("Failed to load store");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) fetchStore();
  }, [storeId]);

  const change = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const save = async () => {
    try {
      await api.put(`/food-store/${storeId}`, form);
      toast.success("Store updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const revert = () => {
    fetchStore();
    toast.success("Reverted");
  };

  if (loading) return <p>Loading store info...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-2xl font-semibold mb-6">Store Settings</h2>

      {/* Store Name */}
      <input
        className="border p-3 rounded w-full mb-4"
        value={form.storeName}
        onChange={(e) => change("storeName", e.target.value)}
        placeholder="Store name"
      />

      {/* Address */}
      <textarea
        className="border p-3 rounded w-full mb-4"
        value={form.address}
        onChange={(e) => change("address", e.target.value)}
        rows={3}
        placeholder="Store address"
      />

      {/* Cuisines */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-medium">Cuisines</label>

        <div className="flex flex-wrap gap-2 mb-2">
          {form.cuisines.map((c) => (
            <span
              key={c}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {c}
              <button
                onClick={() =>
                  change(
                    "cuisines",
                    form.cuisines.filter((x) => x !== c)
                  )
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          className="border p-2 rounded w-full"
          value={cuisineInput}
          onChange={(e) => setCuisineInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (cuisineInput.trim()) {
                change("cuisines", [...form.cuisines, cuisineInput.trim()]);
                setCuisineInput("");
              }
            }
          }}
          placeholder="Type cuisine and press Enter"
        />
      </div>

      {/* Delivery Time */}
      <input
        className="border p-3 rounded w-full mb-4"
        value={form.deliveryTime}
        onChange={(e) => change("deliveryTime", e.target.value)}
        placeholder="30-40 min"
      />

      {/* Times */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="time"
          className="border p-3 rounded w-full"
          value={form.openingTime}
          onChange={(e) => change("openingTime", e.target.value)}
        />
        <input
          type="time"
          className="border p-3 rounded w-full"
          value={form.closingTime}
          onChange={(e) => change("closingTime", e.target.value)}
        />
      </div>

      {/* Image */}
      <input
        className="border p-3 rounded w-full mb-2"
        value={form.coverImage}
        onChange={(e) => change("coverImage", e.target.value)}
        placeholder="Cover image URL"
      />

      {form.coverImage && (
        <img
          src={form.coverImage}
          className="w-40 h-28 object-cover rounded border mb-4"
        />
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={save}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button onClick={revert} className="border px-4 py-2 rounded">
          Revert
        </button>
      </div>
    </div>
  );
}
