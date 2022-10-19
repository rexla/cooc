import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ActivityResult = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <div className="">
        <p>報名結果公告</p>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  );
};

ActivityResult.propTypes = {};

export default ActivityResult;
