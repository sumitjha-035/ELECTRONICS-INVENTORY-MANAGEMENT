import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const FunctionPage = () => {
  const [electronics, setElectronics] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/electronics")
      .then((res) => setElectronics(res.data))
      .catch((e) => {
        console.error(e);
        toast.error("Failed to load records");
      })
      .finally(() => setLoading(false));
  }, []);

  const brands = [...new Set(electronics.map((e) => e?.brand))].sort();

  const filtered = brandFilter
    ? electronics.filter((e) => e.brand === brandFilter)
    : electronics;

  const total = filtered.reduce(
    (sum, item) => sum + item.selling_price * item.stock_in,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar
        search=""
        setSearch={() => {}}
        types={[]}
        setTypeFilter={() => {}}
      />

      <div className="mx-auto max-w-6xl p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">Inventory</h2>

          <Link className="text-sm text-blue-600 dark:text-blue-400" to="/">
            Back to home
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="text-sm">Brand:</label>

          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded border border-gray-300 dark:border-gray-700 px-2 py-1 bg-white dark:bg-gray-800"
          >
            <option value="">All</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <div className="ml-auto text-sm font-medium">
            Total: ₹{total.toFixed(2)}
          </div>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-gray-800 dark:text-gray-200">
              <thead className="border-b border-gray-300 dark:border-gray-700">
                <tr>
                  <th className="py-2 text-left">ID</th>
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Brand</th>
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Stock</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No records
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const totalRow = item.selling_price * item.stock_in;

                    return (
                      <tr
                        key={item._id || item.product_id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-2">{item.product_id}</td>

                        <td className="py-2">{item.name}</td>

                        <td className="py-2">{item.brand}</td>

                        <td className="py-2">{item.type}</td>

                        <td className="py-2 text-right">
                          ₹{item.selling_price}
                        </td>

                        <td className="py-2 text-right">{item.stock_in}</td>

                        <td className="py-2 text-right">₹{totalRow}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionPage;
