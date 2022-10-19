import { useState, useEffect } from "react";
import { delay } from "../lib/delay";

const useRequest = (requestCallback, initData = []) => {
  const [data, setDate] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");

    const customRequestCallback = async () => {
      // await delay(10000);
      try {
        let resData = await requestCallback();
        console.log("customRequestCallback", resData);
        setDate(resData);
        setIsLoading(false);
      } catch (em) {
        setIsLoading(false);
        setErrorMessage(em);
      }
    };
    customRequestCallback();
    return () => {
      setIsLoading(false);
      setErrorMessage(false);
    };
  }, []);

  return [data, isLoading, errorMessage];
};
export default useRequest;
