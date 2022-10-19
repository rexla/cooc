import React from "react";

const FiveFlexbox = () => {
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex h-32 items-center justify-between border-b border-cooc-primary">
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}>
          <span>01</span>
        </div>
        <div className=" flex h-full w-32 items-center justify-center bg-blue-600">
          <span style={{ display: "inline" }}>02</span>
        </div>
        <div>03</div>
      </div>
    </div>
  );
};

export default FiveFlexbox;
