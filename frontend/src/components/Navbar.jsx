import React, { useState } from "react";
import { Link } from "react-router";
import { PlusIcon, SearchIcon, Filter, ShoppingCart } from "lucide-react";

const Navbar = ({ search, setSearch, types, setTypeFilter }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <header className="bg-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Electronic Inventory Management
          </h1>

          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-2 bg-white text-blue-900 px-3 py-2 rounded-lg hover:bg-gray-200"
            >
              <SearchIcon size={18} />
              Search
            </button>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 bg-white text-blue-900 px-3 py-2 rounded-lg hover:bg-gray-200"
              >
                <Filter size={18} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-44 bg-black border rounded-lg shadow-lg z-50">
                  {/* Reset option */}
                  <button
                    onClick={() => {
                      setTypeFilter("");
                      setShowFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-500"
                  >
                    All Types
                  </button>

                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTypeFilter(type);
                        setShowFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-500"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Create */}
            <Link
              to="/create"
              className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
            >
              <PlusIcon size={18} />
              New
            </Link>

            {/* Purchased report */}
            <Link
              to="/purchased"
              className="flex items-center gap-2 bg-indigo-500 text-white px-3 py-2 rounded-lg hover:bg-indigo-600"
            >
              <ShoppingCart size={18} />
              Purchased
            </Link>

            {/* Table */}
            <Link
              to="/function"
              className="flex items-center gap-2 bg-indigo-500 text-white px-3 py-2 rounded-lg hover:bg-indigo-600"
            >
              Total Value
            </Link>
          </div>
        </div>

        {showSearch && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search electronics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
