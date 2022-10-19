import { createContext, useContext, useState, useMemo, useEffect } from "react";
import Logger from "../lib/Logger";
const AppContext = createContext();

const logger = new Logger("AppContext");

export function AppProvider({ children }) {
  /*
  
  {
    Identity: {
      PermissionGroups: [1, 2, 3],
      TeacherTitle: {
        Department: "",
        Title: "教師",
      },
      Type: "Teacher",
      IdNumber: "YC99068132",
      Name: "XXX",
      SchoolCode: "000002",
      SchoolName: "YYY學校",
      SchoolType: "高職",
      ClassNumber: null,
      ClassName: null,
      StudentNumber: null,
      Grade: null,
      SeatNumber: null,
      Roles: ["Teacher", "SchoolAdmin"],
    },
    IsCoocLogin: true,
    IsDefaultPassword: false,
    IsPasswordMailSent: false,
    PeriodNumber: 999,
  }
  
  */
  const initUser = {
    Identity: null,
    IsCoocLogin: false,
    IsDefaultPassword: false,
    IsPasswordMailSent: false,
    PeriodNumber: 0,
  };
  const [user, setUser] = useState(initUser);

  useEffect(() => {
    logger.debug("useEffect []");
    const coocUser = localStorage.getItem("cooc-user");
    let userJson = JSON.parse(coocUser);
    if (!userJson) {
      userJson = initUser;
    }
    setUser(userJson);
  }, []);

  useEffect(() => {
    logger.debug("useEffect [user]");
    localStorage.setItem("cooc-user", JSON.stringify(user));
    // console.log("useEffect localStorage", user);
  }, [user]);

  let userMemo = useMemo(() => [user, setUser], [user]);
  let sharedState = {
    userState: userMemo,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
