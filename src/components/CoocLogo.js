import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

const CoocLogo = ({ url }) => {
  return (
    <Link href={url}>
      <a className="flex items-center no-underline">
        <div className="flex w-24 items-center md:w-32 lg:w-40">
          <Image
            src="/images/cooc-logo.png" // Route of the image file
            height={40} // Desired size with correct aspect ratio
            width={164} // Desired size with correct aspect ratio
            alt="臺北市政府教育局 Logo"
          />
        </div>
        <p className="ml-2 hidden text-xs font-light text-cooc-primary sm:block md:text-base md:font-normal lg:text-lg lg:font-medium">
          報名系統
        </p>
      </a>
    </Link>
  );
};
CoocLogo.propTpyes = {
  url: PropTypes.string.isRequired,
};
CoocLogo.defaultProps = {
  url: "/",
};
export default CoocLogo;
