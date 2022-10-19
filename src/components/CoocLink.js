import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const CoocLink = ({ text, url }) => {
  return (
    <Link href={url}>
      <a className="items-center justify-center text-sm text-cooc-primary no-underline">
        {text}
      </a>
    </Link>
  );
};

CoocLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

CoocLink.defaultProps = {};
export default CoocLink;
