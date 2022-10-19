import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import CoocDrawer from "./CoocDrawer";
import CoocProfile from "./CoocProfile";
import CoocLogo from "./CoocLogo";
import CoocHeader from "./CoocHeader";
import NavItems from "./NavItems";
import CoocFooter from "./CoocFooter";
import { useAppContext } from "../contexts/AppContext";
import Logger from "../lib/Logger";

const logger = new Logger("Layout");

const Layout = ({ children }) => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;
  logger.debug("Layout", user);
  const router = useRouter();
  if (router.pathname.includes("test")) {
    return (
      <div className="flex h-screen flex-col">
        <Toaster
          containerStyle={{
            top: "40%",
          }}
          toastOptions={{ duration: 1000 }}
        />
        {children}
      </div>
    );
  }

  const renderNavItems = () => {
    if (router.pathname.includes("pteacher")) {
      return;
    } else if (router.pathname.includes("404")) {
      return;
    }
    // console.log("Layout renderNavItems user", user);
    if (!user) {
      return <p>User is null</p>;
    }
    const identity = user.Identity;
    // console.log("Layout user", user);
    if (user.Identity === null) {
      return <p>User.Identity is null</p>;
    }
    return (
      <div className="hidden border-l-2 border-r-2 md:block">
        <NavItems
          roles={identity.Roles}
          isCoocLogin={user.IsCoocLogin}
          permissionGroups={identity.PermissionGroups}
          schoolType={identity.SchoolType}
          schoolCode={identity.SchoolCode}
          studentNumber={identity.StudentNumber}
        />
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <Toaster
        containerStyle={{
          top: "40%",
        }}
        toastOptions={{ duration: 1000 }}
        id={"rootToast"}
      />
      <CoocHeader>
        <CoocDrawer />
        <CoocLogo url={"/"} />
        <CoocProfile />
      </CoocHeader>
      <div className="container mx-auto flex flex-auto">
        {renderNavItems()}
        <div className="grow">{children}</div>
      </div>
      <CoocFooter />
    </div>
  );
};

export default Layout;
