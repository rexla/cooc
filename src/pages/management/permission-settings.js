import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "../../hooks/useMediaQuery";
import DeviceSizes from "../../globals/DeviceSizes";
import InfoNeedBigger from "../../components/InfoNeedBigger";
import CoocTab from "../../components/CoocTab";
import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Logger from "../../lib/Logger";
import { useAppContext } from "../../contexts/AppContext";
import PermissionSettingTab from "../../components/permissionSettings/PermissionSettingTab";
const logger = new Logger("management/permission-settings");

const Title = () => {
  return (
    <Text fontSize="2xl" fontWeight={"bold"} className={"my-4 ml-6"}>
      權限設定
    </Text>
  );
};

const PermissionSettings = (props) => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;

  const isTablet = useMediaQuery(`(min-width: ${DeviceSizes.md})`);

  if (!isTablet) {
    return (
      <Flex flexDirection={"column"} h={"100%"}>
        <Title />
        <InfoNeedBigger />
      </Flex>
    );
  }

  logger.debug(`render`);

  return (
    <Flex flexDirection={"column"} h={"100%"}>
      <Title />

      <Tabs isLazy isManual align="start">
        <TabList className="mb-1 mt-3 ml-6" border={"0"}>
          <CoocTab>國小課外課程</CoocTab>
          <CoocTab>活動課程</CoocTab>
          <CoocTab>校內競賽</CoocTab>
        </TabList>
        <TabPanels>
          <TabPanel padding={"0"}>
            <PermissionSettingTab permissionGroupId={1} user={user} />
          </TabPanel>
          <TabPanel padding={"0"}>
            <PermissionSettingTab permissionGroupId={2} user={user} />
          </TabPanel>
          <TabPanel padding={"0"}>
            <PermissionSettingTab permissionGroupId={3} user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

PermissionSettings.propTypes = {};

export default PermissionSettings;
