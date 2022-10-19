import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import NavItem from "./NavItem";
import Pages from "../globals/Pages";
import { v4 } from "uuid";
import Logger from "../lib/Logger";
import next from "next";

const logger = new Logger("NavItems");

const getPagesFilter = (props) => {
  /**
   *
   * Roles: ["Teacher", "Register", "RollCaller", "SchoolAdmin", "SuperUser"]
   * Type: Student, Parent, Teacher
   *
   * props: roles, isCoocLogin, permissionGroups, schoolType
   */
  const roles = props.roles;
  const schoolType = props.schoolType;
  const pagesFilter = {};
  /**
   * 報名 signup
   *  */
  if (roles.includes("Register")) {
    pagesFilter["signup"] = {
      title: Pages.signup.title,
      content: {},
    };
    if (schoolType === "國小") {
      pagesFilter["signup"].content["elementary"] =
        Pages.signup.content.elementary;
    }
    logger.debug("pagesFilter", pagesFilter);
    pagesFilter["signup"].content["activity"] = Pages.signup.content.activity;
    pagesFilter["signup"].content["competition"] =
      Pages.signup.content.competition;
  } else {
    if (roles.includes("Teacher")) {
      if (props.isCoocLogin) {
        pagesFilter["signup"] = {
          title: Pages.signup.title,
          content: {
            activity: Pages.signup.content.activity,
          },
        };
      }
    }
  }
  /**
   * 管理 management
   *  */
  if (roles.includes("Teacher")) {
    pagesFilter["management"] = {
      title: Pages.management.title,
      content: {},
    };
    const permissionGroups = props.permissionGroups;
    if (permissionGroups) {
      if (permissionGroups.includes(1) && schoolType === "國小") {
        pagesFilter["management"].content["elementary"] =
          Pages.management.content.elementary;
      }
      if (permissionGroups.includes(2)) {
        pagesFilter["management"].content["activity"] =
          Pages.management.content.activity;
      }
      if (permissionGroups.includes(3)) {
        pagesFilter["management"].content["competition"] =
          Pages.management.content.competition;
      }
    }
  }
  if (roles.includes("SchoolAdmin")) {
    pagesFilter["management"].content["permission"] =
      Pages.management.content.permission;
  }
  /**
   * 點名 roll-call
   *  */
  if (roles.includes("RollCaller")) {
    pagesFilter["roll-call"] = Pages["roll-call"];
  }
  return pagesFilter;
};

const divider = <div className="h-[1px] bg-gray-200"></div>;

const NavHeader = () => {
  return (
    <div className="ml-5 mb-2 flex h-[70px]  w-[255px] items-center">
      <div className="flex h-[63px] w-[200px] items-center border-b-[1px] border-cooc-primary">
        <div className="font-light">首頁</div>
        <div className="mr-1 h-[24px] w-[24px]">
          <Image
            src="/images/navbar/arrow-right.png"
            height={24}
            width={24}
            alt="arrow-right"
          />
        </div>
        <div className="font-light text-cooc-primary">報名系統</div>
      </div>
    </div>
  );
};

const NavItems = (props) => {
  logger.debug("NavItems user");

  const pagesFilter = getPagesFilter(props);
  const FirstPageImagePath = {
    signup: "/images/navbar/report-check.png",
    management: "/images/navbar/tools.png",
    "roll-call": "/images/navbar/report-arrow.png",
  };

  const renderThirdLayer = (secondObj) => {
    let secondPages = secondObj.pages;

    return secondPages.map((secondPage) => {
      return (
        <Link href={secondPage.url} key={v4()} passHref>
          <a onClick={props.onClick} className="text-black no-underline">
            <AccordionButton className="">
              <Flex
                flex="1"
                paddingLeft={"0"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Box
                  backgroundColor={"primary.500"}
                  width={"1px"}
                  height={"18px"}
                  marginLeft={"7px"}
                  marginRight={"20px"}
                />
                {secondPage.text}
              </Flex>
            </AccordionButton>
          </a>
        </Link>
      );
    });
  };

  const renderSecondLayer = (firstObj) => {
    return Object.entries(firstObj.content).map((secondLayer) => {
      let secondKey = secondLayer[0];
      let secondObj = secondLayer[1];
      let secondText = secondObj.text;
      let secondPages = secondObj.pages;

      if (secondObj.pages) {
        return (
          <AccordionItem border={0} key={v4()}>
            <h2>
              <AccordionButton paddingRight={0}>
                <Box flex="1" textAlign="left" paddingLeft={"4"}>
                  {secondText}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel paddingTop={0} paddingBottom={"12px"}>
              {renderThirdLayer(secondObj)}
            </AccordionPanel>
          </AccordionItem>
        );
      } else {
        return (
          <AccordionItem border={0} key={v4()} onClick={props.onClick}>
            <Link href={secondObj.url} passHref>
              <a onClick={props.onClick} className="text-black no-underline">
                <AccordionButton paddingRight={0}>
                  <Box flex="1" textAlign="left" paddingLeft={"4"}>
                    {secondText}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </a>
            </Link>
          </AccordionItem>
        );
      }
    });
  };

  return (
    <div className="w-[255px]  border-gray-200">
      <NavHeader />
      <Accordion marginTop={"5"}>
        {Object.entries(pagesFilter).map((firstLayer) => {
          let firstKey = firstLayer[0];
          let firstObj = firstLayer[1];
          let firstText = firstObj.title || firstObj.text;

          if (firstObj.content) {
            return (
              <AccordionItem key={v4()}>
                <h2>
                  <AccordionButton>
                    <Flex flex="1" flexDirection={"row"} alignItems={"center"}>
                      <div className="mr-2 h-[24px] w-[24px]">
                        <Image
                          src={FirstPageImagePath[firstKey]}
                          height={24}
                          width={24}
                          alt={"NavItem icon"}
                        />
                      </div>
                      {firstText}
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel paddingY={0}>
                  <Accordion>{renderSecondLayer(firstObj)}</Accordion>
                </AccordionPanel>
              </AccordionItem>
            );
          } else {
            return (
              <AccordionItem key={v4()}>
                <Link href={firstObj.url} passHref>
                  <a
                    onClick={props.onClick}
                    className="text-black no-underline"
                  >
                    <AccordionButton>
                      <Flex
                        flex="1"
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <div className="mr-1 h-[24px] w-[24px]">
                          <Image
                            src={FirstPageImagePath[firstKey]}
                            height={24}
                            width={24}
                            alt={"NavItem icon"}
                          />
                        </div>
                        {firstText}
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                  </a>
                </Link>
              </AccordionItem>
            );
          }
        })}
      </Accordion>
    </div>
  );
};
NavItems.propTpyes = {
  onClick: PropTypes.func,
};
NavItems.defaultProps = {
  onClick: undefined,
};
const arrayEquals = (a, b) => {
  // console.log("a", a);
  // console.log("b", b);
  if (b === null && a === null) {
    return true;
  }
  if (b === undefined && a === undefined) {
    return true;
  }

  return a.length === b.length && a.every((v, i) => v === b[i]);
};
const propsEqual = (prevProps, nextProps) => {
  // console.log("prevProps", prevProps);
  // console.log("nextProps", nextProps);

  const isEqual =
    arrayEquals(prevProps.roles, nextProps.roles) &&
    arrayEquals(prevProps.permissionGroups, nextProps.permissionGroups) &&
    prevProps.isCoocLogin === nextProps.isCoocLogin &&
    prevProps.schoolType === nextProps.schoolType &&
    prevProps.schoolCode === nextProps.schoolCode &&
    prevProps.studentNumber === nextProps.studentNumber;
  // console.log("isEqual", isEqual);
  return isEqual;
};
export default memo(NavItems, propsEqual);
