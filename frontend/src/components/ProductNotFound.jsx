import React from "react";
import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx text-center">
      <div className="bg-primary/10 rounded -full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No Electronic Product records yet</h3>
      <p className="text-base-content/70"> 
        Ready to add a record? Add the first Electronic Product entry.
      </p>
      <Link to="/create" className="btn btn-primary">
        Add First Electronic
      </Link>
    </div>
  );
};

export default ProductNotFound;
