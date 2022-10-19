import React from "react";
import PropTypes from "prop-types";

const CoocHeader = (props) => {
  return (
    <div className="h-16 border-b md:h-20">
      <div className="ml-6 mr-6 flex h-full items-center justify-between">
        {props.children}
      </div>
    </div>
  );
};
CoocHeader.propTpyes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isInVisible: PropTypes.bool,
};
CoocHeader.defaultProps = {
  isInVisible: false,
};
export default CoocHeader;
