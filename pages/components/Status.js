import React from "react";

const Status = ({ currentStatus }) => {
  return (
    <div>
      <h1>Hello From satus</h1>
      {currentStatus ? "True" : "false"}
    </div>
  );
};

export default Status;
