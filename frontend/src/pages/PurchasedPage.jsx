import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const PurchasedPage = () => {
  const [electronics, setElectronics] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/electronics")
      .then((res) => setElectronics(res.data))
      .catch((e) => {
        console.error(e);
        toast.error("Failed to load purchase report");
      })
      .finally(() => setLoading(false));
  }, []);

  const years = [
    ...new Set(
      electronics
        .map((item) => new Date(item?.purchased_at).getFullYear())
        .filter((y) => y && !Number.isNaN(y)),
    ),
  ].sort((a, b) => b - a);

  const filtered = yearFilter
    ? electronics.filter(
        (item) =>
          new Date(item?.purchased_at).getFullYear().toString() === yearFilter,
      )
    : electronics;

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
          <h1 className="text-xl font-semibold">Purchase Report</h1>

          <Link className="text-sm text-blue-600 dark:text-blue-400" to="/">
            Back to home
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="text-sm">Year:</label>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded border border-gray-300 dark:border-gray-700 px-2 py-1 bg-white dark:bg-gray-800"
          >
            <option value="">All</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Entries: {filtered.length}
          </span>
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
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-left">Stock</th>
                  <th className="py-2 text-left">Purchased</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No purchases
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const date = new Date(item?.purchased_at);

                    const dateText = isNaN(date.getTime())
                      ? "-"
                      : date.toLocaleDateString();

                    return (
                      <tr
                        key={item._id || item.product_id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-2">{item.product_id}</td>

                        <td className="py-2">{item.name}</td>

                        <td className="py-2">{item.type}</td>

                        <td className="py-2">{item.stock_in}</td>

                        <td className="py-2">{dateText}</td>
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

export default PurchasedPage;
