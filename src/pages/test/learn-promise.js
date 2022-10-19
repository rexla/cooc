import React from "react";
import toast from "react-hot-toast";
import {
  Flex,
  Text,
  Stack,
  Box,
  VStack,
  HStack,
  Center,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Button,
} from "@chakra-ui/react";

const callbackProimse = (resolve, reject) => {
  setTimeout(() => {
    resolve({ status: "success", name: "Rex" });
  }, 1000);
};

const LearnPromise = () => {
  // const login = () => {

  // }
  // const delay = (ms) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       toast.success("Hello Rex");
  //       resolve("Star");
  //     }, ms);
  //   });
  // };
  const trigger = () => {
    console.log("===trigger start");
    const promise = new Promise(callbackProimse)
      .then((param) => {
        console.log("then: ", param);
      })
      .catch(() => {
        console.log("catch");
      })
      .finally(() => {
        console.log("finally");
      });
    //   console.log("=====start=======");
    //   setTimeout(() => {
    //     resolve({ status: "success", name: "rex" });
    //   }, 3000);
    // })
    //   .then((param) => {
    //     console.log("then: ", param);
    //   })
    //   .catch(() => {
    //     console.log("catch");
    //   })
    //   .finally(() => {
    //     console.log("finally");
    //   });
  };
  const ajax = () => {
    console.log("start ajax");
    let url = "https://jsonplaceholder.typicode.com/todos/xxx";

    // 定義 Http request
    let req = new XMLHttpRequest();

    // 定義方法
    req.open("GET", url);

    // 當請求完成，則進行函式的結果
    req.onload = function () {
      if (req.status == 200) {
        console.log("success");
        // 成功直接列出結果
        console.log(req.response);
      } else {
        console.log("fail");
        // 失敗的部分
      }
    };
    req.send();
  };
  const ajaxPromise = () => {
    return new Promise((resolve, reject) => {
      console.log("start ajax promise");
      let url = "https://jsonplaceholder.typicode.com/todos/1";

      // 定義 Http request
      let req = new XMLHttpRequest();

      // 定義方法
      req.open("GET", url);

      // 當請求完成，則進行函式的結果
      req.onload = function () {
        if (req.status == 200) {
          // console.log("success");
          // // 成功直接列出結果
          // console.log(req.response);
          resolve(req.response);
        } else {
          // console.log("fail");
          // 失敗的部分
          reject();
        }
      };
      req.send();
    });
  };
  // es6 promise
  const triggerPromise = () => {
    ajaxPromise()
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("fail");
      })
      .finally(() => {
        console.log("ajax proimse finally");
      });
  };
  // // try catch
  // const people = [
  //   { name: "Rex", age: 29 },
  //   { name: "Zest", age: 32 },
  // ];
  // const testTryCatch = () => {
  //   // console.log("people: ", people, typeof people);

  //   const jsonString = JSON.stringify(people);
  //   // console.log("people Json String: ", jsonString, typeof jsonString);

  //   jsonString = jsonString + "]";

  //   try {
  //     const jsonObject = JSON.parse(jsonString);
  //     console.log("people Object: ", jsonObject, typeof jsonObject);
  //     // throw new Error("fuck");
  //   } catch (e) {
  //     console.log("Exception: ", e);
  //   }
  // };
  // es7 async await
  const triggerAsync = async () => {
    try {
      let res = await ajaxPromise();
      console.log("success: ", res);
    } catch (e) {
      console.log("fail");
    }
    console.log("async finally");
  };

  return (
    <Flex>
      <Button onClick={triggerAsync}>call toast</Button>
    </Flex>
  );
};

export default LearnPromise;
