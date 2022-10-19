import React, { useState, useEffect } from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppContext } from "../../contexts/AppContext";
import { authCookieJwt } from "../../hoc/AuthCookieJwt";
import useWindowWidth from "../../hooks/useWindowWidth";
import Logger from "../../lib/Logger";
import {
  requestPTeacherLogin,
  requestFakeLogin,
  requestGetLoginInfo,
} from "../../lib/Api";

const logger = new Logger("/test/fake-login");

const FakeLogin = ({ cookies }) => {
  const router = useRouter();
  const appContext = useAppContext();
  const [user, setUser, getUser] = appContext.userState;

  const width = useWindowWidth();

  const success = (resData) => {
    setUser(resData);
    localStorage.setItem("cooc-user", JSON.stringify(resData));
    router.push("/");
  };

  async function fakeLoginTiled(id) {
    try {
      let resData = await requestFakeLogin(id, logger);
      logger.debug("requestFakeLogin success", resData);
      success(resData);
    } catch (em) {
      logger.debug("requestFakeLogin fail", em);
      toast.error(em);
    }
  }
  async function realGetLoginInfo() {
    try {
      let resData = await requestGetLoginInfo(logger);
      logger.debug("requestGetLoginInfo success", resData);
      success(resData);
    } catch (em) {
      logger.debug("requestGetLoginInfo fail", em);
      toast.error(em);
    }
  }

  async function pteacherLogin() {
    try {
      let resData = await requestPTeacherLogin(
        "0928123666",
        "g1234567",
        logger
      );
      logger.debug("pteacherLogin success", resData);
      success(resData);
    } catch (em) {
      logger.debug("pteacherLogin fail", em);
      toast.error(em);
    }
  }

  return (
    <Stack margin={"30px"}>
      <Text>{`width: ${width}`}</Text>
      <Box marginBottom={"30px"}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>

      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />

      <Box>
        <Skeleton marginTop={"30px"}>
          <div>contents wrapped</div>
          <div>{"won't be visible"}</div>
        </Skeleton>
      </Box>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(0)}
      >
        fake 0 - Name:影斜疏 Type:Teacher subText:私立日間部學校(SchoolName)
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(1)}
      >
        fake 1 - Name:影斜疏 Type:Teacher subText:國小測試學校(SchoolName)
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(2)}
      >
        fake 2 - Name:影斜疏 Type:Parent subText:李◎㊣(StudentName)的家長
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(3)}
      >
        fake 3 - Name:影斜疏 Type:Parent subText:王大羽(StudentName)的家長
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(4)}
      >
        fake 4 - Name:陳阿雪 Type:Parent subText:王大明(StudentName)的家長
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(5)}
      >
        fake 5 - Name:王小明 Type:Student subText:仁愛國民小學(SchoolName)
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => fakeLoginTiled(6)}
      >
        fake 6 - Name:劉旭智 Type:Teacher subText:仁愛國民小學(SchoolName)
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => pteacherLogin()}
      >
        pteacherLogin - Name:陳曉東 Type:PartTimeTeacher subText:校外教師
      </Button>
      <Button
        type={"button"}
        colorScheme={"primary"}
        onClick={() => realGetLoginInfo()}
      >
        Real GetLoginInfo
      </Button>
    </Stack>
  );
};
export default FakeLogin;

// export async function getServerSideProps(context) {
//   const cookies = context.req.headers.cookie;

//   return {
//     props: {
//       cookies: cookies || null,
//     },
//   };
// }
// export const getServerSideProps = authCookieJwt((context) => {
//   // Your normal `getServerSideProps` code here
//   return { props: {} };
// });
