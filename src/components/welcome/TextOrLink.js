import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const TextOrLink = ({ text, link }) => {
  return (
    <div>
      {link ? (
        <Link href={link}>
          <a className="flex items-center justify-between no-underline">
            <span className="cursor-pointer text-cooc-primary">{text}</span>
          </a>
        </Link>
      ) : (
        <p className="leading-6 ">{text}</p>
      )}
    </div>
  );
};
TextOrLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};
export default TextOrLink;
