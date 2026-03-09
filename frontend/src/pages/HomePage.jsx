import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard.jsx";
import ProductNotFound from "../components/ProductNotFound.jsx";

const HomePage = () => {
  const [electronics, setElectronics] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const res = await api.get("/electronics");
        setElectronics(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load records");
      } finally {
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  // 🔹 Get unique types from database
  const types = [...new Set(electronics.map((item) => item.type))];

  const filteredElectronics = electronics.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase()) ||
      item.product_id.toString().includes(search) ||
      item.color.toLowerCase().includes(search.toLowerCase());


    const matchesType = typeFilter === "" || item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        search={search}
        setSearch={setSearch}
        types={types}
        setTypeFilter={setTypeFilter}
      />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-gray-600 py-10">
            Loading records...
          </div>
        )}

        {!loading && filteredElectronics.length === 0 && <ProductNotFound />}

        {!loading && filteredElectronics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElectronics.map((electronics) => (
              <ProductCard
                key={electronics._id}
                electronics={electronics}
                setElectronics={setElectronics}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
