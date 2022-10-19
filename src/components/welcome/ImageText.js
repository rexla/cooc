import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const ImageText = ({ imagePath, title }) => {
  return (
    <div className={`relative h-[120px]`}>
      <Image src={imagePath} height={360} width={837} alt="ImageText" />
      <p className="absolute top-5 left-5 text-xl font-semibold text-white">
        {title}
      </p>
    </div>
  );
};
ImageText.propTypes = {
  imagePath: PropTypes.string,
  title: PropTypes.string,
};
export default ImageText;
