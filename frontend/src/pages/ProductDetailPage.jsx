import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const ProductDetailPage = () => {
  const [electronics, setElectronics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const res = await api.get(`/electronics/${id}`);
        setElectronics(res.data);
      } catch (error) {
        console.error(":Error fetching electronic", error);
        toast.error("Failed to fetch the record");
      } finally {
        setLoading(false);
      }
    };
    fetchElectronics();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await api.delete(`/electronics/${id}`);
      toast.success("Record deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting record", error);
      toast.error("Failed to delete record");
    }
  };

  const handleSave = async () => {
    if (
      !electronics.product_id ||
      !electronics.name.trim() ||
      !electronics.brand.trim() ||
      !electronics.type.trim() ||
      !electronics.selling_price ||
      !electronics.stock_in == null ||
      !electronics.purchased_at ||
      !electronics.color.trim()
    ) {
      toast.error("Please provide all details");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/electronics/${id}`, {
        product_id: Number(electronics.product_id),
        name: electronics.name,
        brand: electronics.brand,
        type: electronics.type,
        selling_price: Number(electronics.selling_price),
        stock_in: Number(electronics.stock_in),
        color: electronics.color,
        purchased_at: electronics.purchased_at,
      });
      toast.success("Record updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating record", error);
      toast.error("Failed to update record");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animatie-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-21 mx-auto">
          {/*Header*/}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost rounded-lg">
              <ArrowLeftIcon className="h-5 w-5" /> Back to Records
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline rounded-lg"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Record
            </button>
          </div>

          {/*FORM CARD*/}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              {/* Product ID */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Product ID</span>
                </label>
                <input
                  type="number"
                  placeholder="Product ID"
                  className="input input-bordered"
                  value={electronics.product_id}
                  onChange={(e) =>
                    setElectronics({
                      ...electronics,
                      product_id: e.target.value,
                    })
                  }
                />
              </div>

              {/* NAME */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  value={electronics.name}
                  onChange={(e) =>
                    setElectronics({ ...electronics, name: e.target.value })
                  }
                />
              </div>

              {/* TYPE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">TYPE</span>
                </label>
                <input
                  type="text"
                  placeholder="TYPE"
                  className="input input-bordered"
                  value={electronics.type}
                  onChange={(e) =>
                    setElectronics({ ...electronics, type: e.target.value })
                  }
                />
              </div>

              {/* Brand */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">TYPE</span>
                </label>
                <input
                  type="text"
                  placeholder="BRAND"
                  className="input input-bordered"
                  value={electronics.brand}
                  onChange={(e) =>
                    setElectronics({ ...electronics, brand: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">SELLING PRICE</span>
                </label>
                <input
                  type="number"
                  placeholder="Selling Price"
                  className="input input-bordered"
                  value={electronics.selling_price}
                  onChange={(e) =>
                    setElectronics({
                      ...electronics,
                      selling_price: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text"> STOCK IN </span>
                </label>
                <input
                  text="number"
                  placeholder="stock_in"
                  className="input input-borderd"
                  value={electronics.stock_in}
                  onChange={(e) =>
                    setElectronics({ ...electronics, stock_in: e.target.value })
                  }
                />
              </div>

              {/* COLOUR */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">COLOR</span>
                </label>
                <input
                  type="text"
                  placeholder="COLOR"
                  className="input input-bordered"
                  value={electronics.color}
                  onChange={(e) =>
                    setElectronics({ ...electronics, color: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text"> Purchased At </span>
                </label>
                <input
                  type="date"
                  placeholder="Purchased_At"
                  className="input input-borderd"
                  value={
                    electronics.purchased_at
                      ? new Date(electronics.purchased_at)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setElectronics({
                      ...electronics,
                      purchased_at: e.target.value,
                    })
                  }
                />
              </div>

              {/*ACTION*/}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving ..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
