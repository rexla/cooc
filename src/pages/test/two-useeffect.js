import React, { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";

const FourResponsive = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log(cookieCutter.get("cooc_identity"));
    console.log(cookieCutter.get("cooc_identity_type"));
    console.log(cookieCutter.get("YoCookieName"));
    cookieCutter.set("YoCookieName", "some-value");
  }, [count]);

  return (
    <div className="">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default FourResponsive;
