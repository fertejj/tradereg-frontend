import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center gap-5 items-center mt-4">
      <span className="text-sm text-gray-400">Mostrando 1-5 de 5</span>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          disabled
        >
          &lt;
        </button>
        <button
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          disabled
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
