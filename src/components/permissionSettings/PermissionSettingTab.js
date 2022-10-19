import React, { useEffect, useState, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Switch,
  TableContainer,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import { ButtonIconFixRemove, ButtonIconPlusCheck } from "../ButtonIcons";
import useRequest from "../../hooks/useRequest";
import LoadingSkeleton from "../LoadingSkeleton";
import ErrorMessage from "../ErrorMessage";
import { Icon } from "@chakra-ui/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { requestPermissionGroups } from "../../lib/Api";
import Logger from "../../lib/Logger";
import ModalAddTeacher from "./ModalAddTeacher";
import {
  requestPermissonGroupDeleteMember,
  requestPermissonGroupEnable,
  requestPermissonGroupDisable,
  urlGetPermissionGroups,
} from "../../lib/Api";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

const logger = new Logger("PermissionSettingTab");

const AddCircle = ({ onClick }) => {
  return (
    <Button variant="ghost" onClick={onClick}>
      <Icon as={AddCircleOutlineIcon} />
    </Button>
  );
};

const PermissionSettingTab = ({ permissionGroupId, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addCircleDepartmentcode, setAddCircleDepartmentCode] = useState("");
  // const { mutate } = useSWRConfig();

  const fetcher = async () =>
    await requestPermissionGroups(
      user?.Identity?.SchoolCode,
      permissionGroupId,
      logger
    );
  // const [data, isLoading, errorMessage] = useRequest(requestCallback, []);

  // const fetcher = async () =>
  //   await axios
  //     .get(urlGetPermissionGroups, {
  //       params: {
  //         SchoolCode: user?.Identity?.SchoolCode,
  //         PermissionGroup: permissionGroupId,
  //       },
  //     })
  //     .then((res) => {
  //       logger.debug("axios", res);
  //       return res.data;
  //     });
  const { data, error, mutate, isValidating } = useSWR(
    `${urlGetPermissionGroups}/${permissionGroupId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  logger.debug(`render ${permissionGroupId}`, data);

  // 畫面會閃
  // if (isValidating) {
  //   return <LoadingSkeleton />;
  // }
  // if (error) {
  //   return <ErrorMessage title={"權限管理"} errorMessage={error} />;
  // }

  if (!data) {
    return <LoadingSkeleton />;
  }
  if (error) {
    return <ErrorMessage title={"權限管理"} errorMessage={error} />;
  }

  const clickAddCircle = (departmentCode) => {
    logger.debug("clickAddCircle departmentCode", departmentCode);
    setAddCircleDepartmentCode(departmentCode);
    onOpen();
  };

  const requestDisable = async (departmentCode) => {
    try {
      const resData = await requestPermissonGroupDisable(
        user.Identity.SchoolCode,
        permissionGroupId,
        departmentCode,
        logger
      );
      logger.debug("requestPermissonGroupDisable success", resData);
      toast.success("更新成功");
      // mutate("/act/api/permissionGroups");
      mutate();
    } catch (em) {
      logger.debug("requestPermissonGroupDisable fail", em);
      toast.error(em);
    }
  };

  const requestEnable = async (departmentCode) => {
    try {
      const resData = await requestPermissonGroupEnable(
        user.Identity.SchoolCode,
        permissionGroupId,
        departmentCode,
        logger
      );
      logger.debug("requestPermissonGroupEnable success", resData);
      toast.success("更新成功");
      //mutate("/act/api/permissionGroups");
      mutate();
    } catch (em) {
      logger.debug("requestPermissonGroupEnable fail", em);
      toast.error(em);
    }
  };

  const switchOnChange = (e, departmentCode) => {
    logger.debug("switchOnChange", e.target.checked);
    if (e.target.checked) {
      requestEnable(departmentCode);
    } else {
      requestDisable(departmentCode);
    }
  };

  const permissonGroupDeleteMember = async (departmentCode, idNumber) => {
    try {
      const resData = await requestPermissonGroupDeleteMember(
        user.Identity.SchoolCode,
        permissionGroupId,
        departmentCode,
        idNumber,
        logger
      );
      logger.debug("permissonGroupAddMember success", resData);
      toast.success("刪除成功");
      mutate();
    } catch (em) {
      logger.debug("permissonGroupAddMember fail", em);
      toast.error(em);
    }
  };

  return (
    <TableContainer>
      <div className="my-8 ml-6">
        <p className="text-sm">*國小課外課程限主政處室（教務處、學務處）。</p>
        <p className="text-sm">
          *處室人員清單來自中介，無法刪除，並預設為可使用。手動新增人員可移除
        </p>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={"md"}>處室</Th>
            <Th fontSize={"md"}>處室權限狀態</Th>
            <Th fontSize={"md"}>授權成員</Th>
            <Th fontSize={"md"}>新增</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={v4()}>
              <Td>{item.Department}</Td>
              <Td>
                <Switch
                  size="md"
                  colorScheme="primary"
                  isChecked={item.Enabled}
                  onChange={(e) => {
                    switchOnChange(e, item.DepartmentCode);
                  }}
                />
              </Td>
              <Td>
                {item.TeacherTitles.sort((a, b) => {
                  return b.IsFixed - a.IsFixed;
                }).map((teacher) => (
                  <ButtonIconFixRemove
                    key={v4()}
                    name={teacher.Name}
                    idNumber={teacher.IdNumber}
                    isFixed={teacher.IsFixed}
                    onClick={() => {
                      permissonGroupDeleteMember(
                        item.DepartmentCode,
                        teacher.IdNumber
                      );
                    }}
                  />
                ))}
              </Td>
              <Td>
                <AddCircle
                  onClick={() => clickAddCircle(item.DepartmentCode)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isOpen && (
        <ModalAddTeacher
          isOpen={isOpen}
          onClose={onClose}
          permissionGroupId={permissionGroupId}
          user={user}
          departmentCode={addCircleDepartmentcode}
          mutate={mutate}
        />
      )}
    </TableContainer>
  );
};

export default PermissionSettingTab;
