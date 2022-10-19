import React from "react";
import PropTypes from "prop-types";
import TodayIcon from "@mui/icons-material/Today";
import Colors from "../globals/Colors";

const CoocButton = ({ text, disabled, withIcon, color, type }) => {
  let primaryColor = "bg-cooc-primary";
  let textColor = "text-white";
  let activeColor = "bg-cooc-primary-dark";
  let diabledColor = "bg-cooc-border-secondary";
  let borderColor = "border-cooc-primary";
  let iconColor = "white";

  if (color === "orange") {
    primaryColor = "bg-cooc-sec-orange";
    activeColor = "bg-cooc-sec-orange-dark";
    borderColor = "border-cooc-sec-orange";
  }

  if (type === "outline") {
    primaryColor = "bg-white";
    if (color === "green") {
      textColor = "text-cooc-primary";
      iconColor = Colors.coocPrimary;
    } else {
      textColor = "text-cooc-sec-orange";
      iconColor = Colors.coocSecOrange;
    }
  } else if (type === "text") {
    primaryColor = "bg-white";

    borderColor = "border-white";

    if (color === "green") {
      textColor = "text-cooc-primary";
      iconColor = Colors.coocPrimary;
    } else {
      textColor = "text-cooc-sec-orange";
      iconColor = Colors.coocSecOrange;
    }
  }

  if (disabled) {
    borderColor = "bg-cooc-border-secondary";
    textColor = "text-cooc-text-gray";
    iconColor = Colors.coocTextGray;
    if (type === "outline") {
      diabledColor = "white";
    } else if (type === "text") {
      diabledColor = "white";
      borderColor = "border-white";
    }
  }

  return (
    <button
      disabled={disabled}
      // className="flex h-[48px] w-[168px] items-center justify-center rounded-lg bg-cooc-primary hover:opacity-75 active:bg-cooc-primary-dark active:opacity-100 disabled:bg-cooc-border-secondary disabled:opacity-100"
      className={`active:${activeColor} flex h-[48px] w-[168px] items-center justify-center rounded-lg ${primaryColor} border-2 ${borderColor} hover:opacity-75 active:opacity-100 disabled:${diabledColor} disabled:opacity-100`}
    >
      {withIcon && (
        <div className="mr-2 flex h-[24px] w-[24px] items-center ">
          <TodayIcon htmlColor={iconColor} fontSize={"small"} />
        </div>
      )}
      <p className={`${textColor}`}>{text}</p>
    </button>
  );
};

CoocButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  withIcon: PropTypes.bool,
  color: PropTypes.oneOf(["green", "orange"]),
  type: PropTypes.oneOf(["fill", "outline", "text"]),
};

CoocButton.defaultProps = {
  text: "CoocButton",
  disabled: false,
  withIcon: false,
  color: "green",
  type: "fill",
};
export default CoocButton;
