import React from "react";
import { AccessAlarm } from "@mui/icons-material";

// https://tailwindcss.com/docs/responsive-design
// https://tailwindcss.com/docs/hover-focus-and-other-states

const FourResponsive = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        style={{ width: 100, height: 100 }}
        className="flex items-center justify-center bg-green-500 md:bg-red-500 lg:bg-blue-500"
      >
        <button
          className="bg-violet-500 h-20 w-20 rounded-full hover:bg-blue-600 active:bg-blue-700"
          onClick={() => console.log("click")}
        >
          <AccessAlarm />
        </button>
      </div>
    </div>
  );
};

export default FourResponsive;
