import React from "react";
import PropTypes from "prop-types";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

export const ButtonIconFixRemove = ({ name, idNumber, isFixed, onClick }) => {
  return (
    <button
      className={`${
        isFixed && "cursor-auto"
      } m-1 rounded-3xl border-[1px] border-cooc-text-gray hover:opacity-75 active:border-cooc-primary-dark active:opacity-100`}
      onClick={onClick}
      size="lg"
    >
      <div className="flex flex-row items-center py-1 px-2">
        <p className="text-md text-cooc-text-gray">{name}</p>
        {isFixed || (
          <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-cooc-text-gray bg-cooc-text-gray">
            <CloseIcon w={2} h={2} className={"text-white"} />
          </div>
        )}
      </div>
    </button>
  );
};

export const ButtonIconPlusCheck = ({ name, isChecked, onClick }) => {
  return (
    <button
      className="m-1 rounded-3xl border-[1px] border-cooc-text-gray hover:opacity-75 active:border-cooc-primary-dark active:opacity-100"
      onClick={() => {
        isChecked = !isChecked;
        onClick();
      }}
      size="sm"
    >
      <div className="flex flex-row items-center py-1 px-2">
        <p className="text-md text-cooc-text-gray">{name}</p>
        <div
          className={`ml-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
            isChecked
              ? "border-cooc-primary bg-cooc-primary"
              : "border-cooc-text-gray"
          } `}
        >
          {isChecked ? (
            <CheckIcon w={3} h={3} className={"text-white"} />
          ) : (
            <AddIcon w={3} h={3} className={"text-cooc-text-gray"} />
          )}
        </div>
      </div>
    </button>
  );
};
