import React, { useState, useEffect } from "react";
import WelcomeCard from "../components/welcome/WelcomeCard";
import WelcomeHeader from "../components/welcome/WelcomeHeader";
import { v4 } from "uuid";
import Logger from "../lib/Logger";
import Pages from "../globals/Pages";
import { useAppContext } from "../contexts/AppContext";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { requestFakeLogin, requestGetLoginInfo } from "../lib/Api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const logger = new Logger("Welcome");

const cards = {
  elementary: {
    imagePath: "/images/welcome/elementary.png",
    title: "國小課外課程",
    list: [
      { text: "111現正報名項目：" },
      { text: "110學年度第一學期國小課外課程" },
      { text: "110學年度暑假國小課外課程" },
    ],
  },
  activity: {
    imagePath: "/images/welcome/activity.png",
    title: "活動課程",
    list: [
      { text: "公告中：8" },
      { text: "報名中：24" },
      { text: "已報名：4" },
    ],
  },
  competition: {
    imagePath: "/images/welcome/competition.png",
    title: "校內競賽",
    list: [
      { text: "公告中：2" },
      { text: "報名中：12" },
      { text: "已報名：1" },
    ],
  },
  management: {
    imagePath: "/images/welcome/management.png",
    title: "管理",
    list: [
      {
        text: "國小課外課程",
        link: Pages.management.content.elementary.pages[1].url,
      },
      {
        text: "活動課程",
        link: Pages.management.content.activity.pages[0].url,
      },
      {
        text: "校內競賽",
        link: Pages.management.content.competition.pages[0].url,
      },
      { text: "權限設定", link: Pages.management.content.permission.url },
    ],
  },
};

const getCardsFilter = (user) => {
  // console.log("getCardsFilter user", user);
  /**
   *
   * Roles: ["Teacher", "Register", "RollCaller", "SchoolAdmin", "SuperUser"]
   * Type: Student, Parent, Teacher
   */
  const identity = user.Identity;
  const roles = identity.Roles;
  const schoolType = identity.SchoolType;
  const cardsFilter = [];
  /**
   * elementary
   * (a)	國小課外課程：School type =國小，角色有student ，或student’parent，或RollCaller
   */
  if (roles.includes("Register") || roles.includes("RollCaller")) {
    if (schoolType === "國小") {
      cardsFilter.push(cards.elementary);
    }
  }
  /**
   * activity
   * (b)	活動課程：角色有Cooc login =T 的teacher，或student ，或student’parent
   */
  let isAddActivity = false;
  if (user.IsCoocLogin) {
    isAddActivity = true;
  } else {
    if (roles.includes("Register")) {
      isAddActivity = true;
    }
  }
  if (isAddActivity) {
    cardsFilter.push(cards.activity);
  }
  /**
   * competition
   * (c)	校內競賽：角色有student ，或student’parent
   */
  if (roles.includes("Register")) {
    cardsFilter.push(cards.competition);
  }
  /**
   * management
   * (d)	管理：角色是school admin顯示全部，
   *  或Teacher且Permission有
   *    1 顯示 國小課外課程
   *    2 顯示 活動課程
   *    3 顯示 競賽
   * */
  const partOfManagement = {
    imagePath: cards.management.imagePath,
    title: cards.management.title,
    list: [],
  };
  if (roles.includes("SchoolAdmin")) {
    if (schoolType !== "國小") {
      partOfManagement.list = [
        cards.management.list[1],
        cards.management.list[2],
        cards.management.list[3],
      ];
    } else {
      partOfManagement.list = cards.management.list;
    }
    cardsFilter.push(partOfManagement);
  } else if (roles.includes("Teacher")) {
    console.log("permissionGroup else");
    const permissionGroups = identity.PermissionGroups;
    permissionGroups.forEach((permissionGroup) => {
      if (permissionGroup === 1) {
        if (schoolType === "國小") {
          partOfManagement.list.push(
            cards.management.list[permissionGroup - 1]
          );
        }
      } else {
        partOfManagement.list.push(cards.management.list[permissionGroup - 1]);
      }
    });
    cardsFilter.push(partOfManagement);
  }

  // console.log("cardsFilter", cardsFilter);
  return cardsFilter;
};

const Welcome = () => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const errorManage = (em) => {
      let coocUser = localStorage.getItem("cooc-user");
      let userJson;
      if (coocUser) {
        userJson = JSON.parse(coocUser);
        // console.log("userJson", userJson);
        setUser(userJson);
      } else {
        logger.debug("coocUser is null too", em);
        toast.error(em);
        setIsError(true);
      }
    };
    // dev
    const fakeLogin = async () => {
      let id = 0;
      try {
        let resData = await requestFakeLogin(id, logger);
        logger.debug("requestFakeLogin success", resData);
        setUser(resData);
      } catch (em) {
        logger.debug("requestFakeLogin fail", em);
        errorManage(em);
      }
      setIsLoading(false);
    };
    // staging
    const getLoginInfo = async () => {
      try {
        let resData = await requestGetLoginInfo(logger);
        logger.debug("requestGetLoginInfo success", resData);
        setUser(resData);
      } catch (em) {
        logger.debug("requestGetLoginInfo fail", em);
        errorManage(em);
      }
      setIsLoading(false);
    };

    /**
     * 先判斷localStorage有沒有cooc-user
     * 沒有就fakeLogin | getLoginInfo
     *  成功就setUser
     *
     * 為什麼要加localStorage?  refresh browser AppContext user會消失
     */
    // let coocUser = localStorage.getItem("cooc-user");
    // logger.debug("coocUser", coocUser);
    // if (coocUser === null) {
    // logger.debug("coocUser === null", user);
    if (user.Identity === null) {
      // fakeLogin();
      getLoginInfo();
    } else {
      setIsLoading(false);
    }
    // } else {
    //   setUser(JSON.parse(coocUser));
    //   setIsLoading(false);
    // }

    return () => {
      // setUser({ Identity: null }); 一離開此page就會執行... 不可能要清掉啊!
      setIsLoading(false);
      setIsError(false);
    };
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    const errorMessage = "取得使用者資料錯誤";
    setTimeout(() => {
      // toast.error(errorMessage);
      router.replace("/pteacher/");
    }, 1000);

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{errorMessage}</AlertTitle>
        <AlertDescription>請返回酷客雲</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  const identity = user.Identity;
  if (!identity) {
    return null;
  }
  const cardsFilter = getCardsFilter(user);

  return (
    <div>
      <WelcomeHeader
        title={`歡迎進入酷課雲報名系統 - ${user?.Identity?.Name}`}
      />
      <div className="text-center">
        {cardsFilter.map((card) => (
          <WelcomeCard key={v4()} {...card} />
        ))}
      </div>
    </div>
  );
};
// Welcome.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };
export default Welcome;
