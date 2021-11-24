import React from "react";

const Bookings = ({ result }) => {
  return (
    <div className="flex items-center w-full bg-red-900 pt-5 mt-4 rounded-md">
      <h1 className="text-white">{result.date}</h1>
    </div>
  );
};

export default Bookings;
