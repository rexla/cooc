import React from "react";
import PropTypes from "prop-types";

const WelcomeHeader = ({ title }) => {
  return (
    <div className="md:60 flex h-40 items-center justify-center ">
      <p className="text-xl font-bold">{title}</p>
    </div>
  );
};
WelcomeHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
WelcomeHeader.defaultProps = {
  title: "歡迎進入酷課雲報名系統",
};
export default WelcomeHeader;
