import React from "react";
import PropTypes from "prop-types";

const MyTemplate = () => {
  return <div>MyTemplate</div>;
};

MyTemplate.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MyTemplate.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined,
};
export default MyTemplate;
