import api from "../lib/axios.js";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [product_id, setProduct_id] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [selling_price, setSelling_price] = useState("");
  const [stock_in, setStock_in] = useState("");
  const [color, setColor] = useState("");
  const [purchased_at, setPurchased_at] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/electronics", {
        product_id: Number(product_id),
        name,
        type,
        brand,
        selling_price: Number(selling_price),
        stock_in: Number(stock_in),
        color,
        purchased_at
        
      });
      toast.success("Product created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating Product", error);
      toast.error("Failed to create Product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to Home{" "}
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                {" "}
                Create New Electronic{" "}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Product ID </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Product ID"
                    className="input input-borderd"
                    value={product_id}
                    onChange={(e) => setProduct_id(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Name </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Electronic Name"
                    className="input input-borderd"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Type </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type"
                    className="input input-borderd"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Brand </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Brand"
                    className="input input-borderd"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Selling Price </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Selling Price"
                    className="input input-borderd"
                    value={selling_price}
                    onChange={(e) => setSelling_price(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Stock In </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Stock "
                    className="input input-borderd"
                    value={stock_in}
                    onChange={(e) => setStock_in(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Color</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-base-200"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text"> Purchased At </span>
                  </label>
                  <input
                    type="date"
                    placeholder="Purchased At"
                    className="input input-borderd"
                    value={purchased_at}
                    onChange={(e) => setPurchased_at(e.target.value)}
                    required
                  />
                </div>

                <div className="card-action justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating ..." : "Create Electronic Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
