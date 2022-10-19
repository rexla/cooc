import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import { useAppContext } from "../../contexts/AppContext";

const CourseCreate = (props) => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("Your show: " + show);
  }, [show]);

  return (
    <div className="">
      <div
        className="flex cursor-pointer items-center justify-center bg-gray-200"
        onClick={() =>
          setUser((preUser) => {
            return {
              ...preUser,
              name: "莫里居",
            };
          })
        }
      >
        <p>{user.name}</p>
      </div>
      <p>課程設定與建立</p>
      <p>{count}</p>
      <button onClick={() => setCount((preCount) => preCount + 1)}>add</button>
      <button
        onClick={() =>
          setShow((prevShow) => {
            return !prevShow;
          })
        }
      >
        Toggle
      </button>
      <Modal show={show} onClose={setShow}>
        台北市國小測試學校
      </Modal>
    </div>
  );
};
// CourseCreate.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };
CourseCreate.propTypes = {};

export default CourseCreate;
