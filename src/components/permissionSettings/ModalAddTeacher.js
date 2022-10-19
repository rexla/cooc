import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import InputClose from "../InputClose";
import useRequest from "../../hooks/useRequest";
import LoadingSkeleton from "../LoadingSkeleton";
import ErrorMessage from "../ErrorMessage";
import { requestPermissionGroupsNonMember } from "../../lib/Api";
import Logger from "../../lib/Logger";
import { ButtonIconPlusCheck } from "../ButtonIcons";
import { v4 } from "uuid";
import { requestPermissonGroupAddMember } from "../../lib/Api";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

const logger = new Logger("ModalAddTeacher");

const TeacherFilter = () => {};

const AddTeacherContent = ({
  permissionGroupId,
  user,
  departmentCode,
  idNumber,
  setIdNumber,
}) => {
  const requestCallback = () =>
    requestPermissionGroupsNonMember(
      user?.Identity?.SchoolCode,
      permissionGroupId,
      departmentCode,
      logger
    );
  const [data, isLoading, errorMessage] = useRequest(requestCallback, []);
  logger.debug("render departmentCode, data", departmentCode, data);

  const [teacher, setTeacher] = useState({
    teacher: data,
    filtered: data,
  });

  logger.debug("render teacher", teacher);
  // https://stackoverflow.com/questions/58818727/react-usestate-not-setting-initial-value
  useEffect(() => {
    setTeacher((prev) => {
      return {
        ...prev,
        teacher: data,
        filtered: data,
      };
    });
  }, [data]);

  const searchFilter = (value) => {
    logger.debug("inputClose value", value);
    if (value === "") {
      setTeacher((prev) => {
        return {
          ...prev,
          filtered: data,
        };
      });
    } else {
      let filtered = data.filter((teacher) => {
        return teacher.Name.includes(value);
      });
      logger.debug("filtered", filtered);
      setTeacher((prev) => {
        return {
          ...prev,
          filtered,
        };
      });
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (errorMessage) {
    return <ErrorMessage title={"取得職員"} errorMessage={errorMessage} />;
  }
  logger.debug("renderContent", data);
  return (
    <div>
      <InputClose onChange={searchFilter} />
      <div className="m-5">
        {teacher.filtered.map((item) => (
          <ButtonIconPlusCheck
            key={v4()}
            name={item.Name}
            isChecked={idNumber === item.IdNumber}
            onClick={() => setIdNumber(item.IdNumber)}
          />
        ))}
      </div>
    </div>
  );
};

const ModalAddTeacher = ({
  isOpen,
  onClose,
  onClick,
  permissionGroupId,
  user,
  departmentCode,
  mutate,
}) => {
  // const { mutate } = useSWRConfig();
  const [idNumber, setIdNumber] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const permissonGroupAddMember = async () => {
    setIsSubmitLoading(true);
    try {
      const resData = await requestPermissonGroupAddMember(
        user.Identity.SchoolCode,
        permissionGroupId,
        departmentCode,
        idNumber,
        logger
      );
      setIsSubmitLoading(false);
      logger.debug("permissonGroupAddMember success", resData);
      toast.success("新增成功");
      // mutate("/act/api/permissionGroups");
      mutate();
    } catch (em) {
      setIsSubmitLoading(false);
      logger.debug("permissonGroupAddMember fail", em);
      toast.error(em);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>{"新增職員"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddTeacherContent
            permissionGroupId={permissionGroupId}
            user={user}
            departmentCode={departmentCode}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
          />
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <Button
            colorScheme="primary"
            isLoading={isSubmitLoading}
            onClick={() => {
              logger.debug("submit", idNumber);
              permissonGroupAddMember();
              onClose();
            }}
            width="120px"
          >
            {"儲存"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddTeacher;
