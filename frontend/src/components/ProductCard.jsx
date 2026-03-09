
import { Link, useLocation } from "react-router";
import {
  
  IndianRupee,
  Package,
  Palette,
  Tag,
  BadgeCheck,
  Edit2,
  Trash2,
} from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ electronics, setElectronics }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/electronics/${electronics._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/electronics/${electronics._id}`);
      setElectronics((prev) => prev.filter((e) => e._id !== electronics._id));
      toast.success("Salary deleted successfully");
    } catch {
      toast.error("Failed to delete salary");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* CARD */}

      <Link
        to={`/electronics/${electronics._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${
          isActive ? "border-primary shadow-lg" : "border-base-300"
        } hover:border-primary hover:shadow-xl`}
      >
        <div className="hover-3d">
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <p className="badge badge-primary rounded-lg">
              {electronics.product_id}
            </p>
            <span className="badge badge-secondary rounded-lg">
              {formatData(new Date(electronics.purchased_at))}
            </span>
          </div>

          {/* electronic Info */}
          <div className="mt-4 space-y-2">
            {/* Name */}
            <div className="flex items-center gap-2 text-base-content/70">
              <Package className="size-4 text-primary" />
              <p className="text-sm line-clamp-1">{electronics.name}</p>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2 text-base-content/70">
              <BadgeCheck className="size-4 text-primary" />
              <p className="text-sm line-clamp-1">{electronics.brand}</p>
            </div>

            {/* Type */}
            <div className="flex items-center gap-2 text-base-content/70">
              <Tag className="size-4 text-primary" />
              <p className="text-sm line-clamp-1">{electronics.type} </p>
            </div>

            {/* Selling Price */}
            <div className="flex items-center gap-2 text-base-content/70">
              <IndianRupee className="size-4 text-primary" />
              <p className="text-sm line-clamp-1">{electronics.selling_price} </p>
            </div>
          

          {/* color  */}
            <div className="flex items-center gap-2 text-base-content/70">
              <Palette className="size-4 text-primary" />
              <p className="text-sm line-clamp-1">{electronics.color} </p>
            </div>
            </div>


          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xs text-base-content/60">
              {formatData(new Date(electronics.createdAt))}
            </span>

            {/* Action Icons */}
            <div className="flex items-center gap-4">
              {/* EDIT */}
              <div className="tooltip tooltip-warning" data-tip="Edit Product">
                <Edit2 className="size-4 text-warning hover:scale-110 transition" />
              </div>

              {/* DELETE */}
              <div className="tooltip tooltip-error" data-tip="Delete Product">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  className="text-error hover:scale-110 transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Electronic Product
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete
              <span className="font-semibold text-base-content">
                {" "}
                "{electronic.name}'s {formatData(new Date(electronics.purchased_at))}{" "}
                Record?"
              </span>
              <br /> This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error flex items-center gap-2 rounded-lg"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProductCard;
