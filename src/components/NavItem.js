import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

const Item = (props) => {
  return (
    <div
      className="flex h-[48px] w-[255px] cursor-pointer items-center justify-between px-5 hover:bg-gray-100"
      onClick={props.onClick}
    >
      <div className="flex items-center">
        <div className="mr-1 h-[24px] w-[24px]">
          {props.imagePath && (
            <Image
              src={props.imagePath}
              height={24}
              width={24}
              alt={"NavItem icon"}
            />
          )}
        </div>
        <div
          className={`${
            props.isFontLight && "font-light"
          } cursor-pointer hover:text-cooc-primary`}
        >
          <p>{props.text}</p>
        </div>
      </div>
      {props.arrow && (
        <div className="h-[24px] w-[24px]">
          <Image
            src={
              props.arrow === "up"
                ? "/images/navbar/arrow-up.png"
                : "/images/navbar/arrow-down.png"
            }
            height={24}
            width={24}
            alt="arrow"
          />
        </div>
      )}
    </div>
  );
};
const ItemLink = React.forwardRef(
  ({ onClick, imagePath, isFontLight, text, arrow, href }, ref) => {
    return (
      <a
        className="flex h-[48px] w-[255px] cursor-pointer items-center justify-between px-5 no-underline hover:bg-gray-100"
        onClick={onClick}
        href={href}
        ref={ref}
      >
        <div className="flex items-center">
          <div className="mr-1 h-[24px] w-[24px]">
            {imagePath && (
              <Image
                src={imagePath}
                height={24}
                width={24}
                alt="image ItemLink"
              />
            )}
          </div>
          <div
            className={`${
              isFontLight && "font-light"
            } cursor-pointer hover:text-cooc-primary`}
          >
            <p>{text}</p>
          </div>
        </div>
        {arrow && (
          <div className="h-[24px] w-[24px]">
            <Image
              src={
                arrow === "up"
                  ? "/images/navbar/arrow-up.png"
                  : "/images/navbar/arrow-down.png"
              }
              height={24}
              width={24}
              alt="arrow"
            />
          </div>
        )}
      </a>
    );
  }
);
ItemLink.displayName = "ItemLink";

// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-functional-component
const ThirdItemLink = React.forwardRef(({ text, onClick, href }, ref) => {
  return (
    <a
      className="flex h-[48px] w-[255px] cursor-pointer items-center justify-center no-underline hover:bg-gray-100"
      onClick={onClick}
      href={href}
      ref={ref}
    >
      <div className="flex w-[135px] items-center ">
        <div className="mr-4 h-[18px] border-l-[1px] border-cooc-primary"></div>
        <div className="cursor-pointer font-light hover:text-cooc-primary">
          <p>{text}</p>
        </div>
      </div>
    </a>
  );
});
ThirdItemLink.displayName = "ThirdItemLink";

const NavItem = (props) => {
  if (props.isThird) {
    return (
      <Link href={props.url} passHref>
        <ThirdItemLink {...props} />
      </Link>
    );
  } else {
    if (props.url) {
      return (
        <Link href={props.url} passHref>
          <ItemLink {...props} />
        </Link>
      );
    }
  }
  return <Item {...props} />;
};

NavItem.propTypes = {
  onClick: PropTypes.func,
  arrow: PropTypes.oneOf(["up", "down"]),
  type: PropTypes.oneOf(["first", "second", "third"]),
};

NavItem.defaultProps = {
  onClick: undefined,
};
export default NavItem;
