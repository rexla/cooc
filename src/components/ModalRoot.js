import React, { useEffect, useState, Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import TodayIcon from "@mui/icons-material/Today";

const ModalRoot = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  console.log("Modal");
  console.log(show);

  const handleCloseClick = (e) => {
    e.preventDefault();
    console.log(onClose);
    onClose(false);
  };

  const modalContent = show ? (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-500/50">
      <div className="h-96 w-96 rounded-sm bg-blue-500 p-5">
        {show.toString()}123
        <a className="flex justify-end" href="#" onClick={handleCloseClick}>
          x
        </a>
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};
export default ModalRoot;
