import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Dialog from "./Modal";
import AlertNotify from "./AlertDialog";
import { TriangleDownIcon } from "@chakra-ui/icons";
import Colors from "../globals/Colors";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import Logger from "../lib/Logger";
import { useAppContext } from "../contexts/AppContext";

const logger = new Logger("CoocProfile");

const CoocProfile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;
  const router = useRouter();

  let isInVisible =
    router.pathname.includes("pteacher") || router.pathname.includes("404");

  if (user.Identity === null) {
    isInVisible = true;
  }

  // console.log("coocProfile", user);
  /**
   * user.Identity.Type
   * const identityType = ["Student", "Parent", "Teacher", "PartTimeTeacher"]
   *
   */
  let isPTeacher = false;
  let identity = user.Identity;
  if (!identity) {
    return null;
  }
  const text = identity.Name;
  let subText = "";
  let identityType = identity.Type;
  if (identityType === "Student") {
    subText = identity.SchoolName;
  } else if (identityType === "Parent") {
    subText = identity.StudentName + "的家長";
  } else if (identityType === "Teacher") {
    subText = identity.SchoolName;
  } else if (identityType === "PartTimeTeacher") {
    subText = "校外教師";
    isPTeacher = true;
  }

  return (
    <Menu>
      <MenuButton disabled={isInVisible}>
        <div
          className={`flex items-center justify-center ${
            isInVisible && "invisible"
          }`}
        >
          <div className="h-[45px] w-[45px] rounded-full border-2 border-cooc-primary md:h-[60px] md:w-[60px]">
            <Image
              src="/images/cooc-profile.png"
              height={60}
              width={60}
              alt="Cooc Profile"
            />
          </div>
          <div className="ml-2 hidden md:block">
            <p className="text-left text-sm">{text}</p>
            <p className="text-sm">{subText}</p>
          </div>
          <div className="ml-2 hidden md:block">
            <TriangleDownIcon
              w={"14px"}
              h={"14px"}
              color={Colors.coocPrimary}
            />
          </div>
        </div>
      </MenuButton>
      <MenuList>
        {isPTeacher ? (
          <MenuItem
            onClick={() => {
              router.push("/pteacher/change-password");
            }}
          >
            變更密碼
          </MenuItem>
        ) : null}
        <MenuItem onClick={onOpen}>
          <LogoutIcon className="mr-1 rotate-180" />
          <Text>{isPTeacher ? "登出" : "返回酷課雲"}</Text>
        </MenuItem>
      </MenuList>
      <AlertNotify
        title="報名系統"
        content="確定要登出嗎？"
        buttonText="我要登出"
        isOpen={isOpen}
        onClose={() => {
          localStorage.removeItem("cooc-user");
          if (isPTeacher) {
            router.push("/pteacher/");
          } else {
            router.push("https://cooc.tp.edu.tw/");
          }
          onClose();
        }}
      />
    </Menu>
  );
};

CoocProfile.propTpyes = {
  onClick: PropTypes.func,
  username: PropTypes.string,
  isInVisible: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};
CoocProfile.defaultProps = {
  onClick: undefined,
  username: "莫里居",
  school: "台北市國小測試學校",
  isInVisible: false,
};

export default CoocProfile;
