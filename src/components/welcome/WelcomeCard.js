import React from "react";
import ImageText from "./ImageText";
import TextOrLink from "./TextOrLink";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const WelcomeCard = ({ imagePath, title, list }) => {
  return (
    <div className="mx-5 mb-6 inline-block w-[280px] align-top md:mb-0">
      <ImageText imagePath={imagePath} title={title} />
      <div className="my-2 text-left">
        {list.map((item) => (
          <TextOrLink key={v4()} text={item.text} link={item.link} />
        ))}
      </div>
    </div>
  );
};
WelcomeCard.propTypes = {
  imagePath: PropTypes.string,
  title: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  link1: PropTypes.string,
  link2: PropTypes.string,
  link3: PropTypes.string,
};
export default WelcomeCard;
