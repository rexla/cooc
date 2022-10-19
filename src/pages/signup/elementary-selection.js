import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../../contexts/AppContext";

const ElementarySelection = (props) => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;

  return (
    <div>
      <p>選課系統</p>
      <p>{user?.IsCoocLogin}</p>
    </div>
  );
};

ElementarySelection.propTypes = {};

export default ElementarySelection;
