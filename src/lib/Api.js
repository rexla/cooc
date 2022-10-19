import axios from "axios";
import { API_HOST } from "../globals/Constants";
import toast from "react-hot-toast";
import { Email } from "@mui/icons-material";

export const request = (
  url,
  config = { method: "get", logger: {} },
  params = {}
) => {
  let logger = config.logger;
  logger.debug(`request - ${url} - start`);
  console.log("params:", params);

  const axiosInstance = {
    url,
    timeout: 10000,
    data: params,
  };
  if (config.method === "get") {
    axiosInstance.params = params;
  } else {
    axiosInstance.data = params;
  }
  config.method && (axiosInstance.method = config.method);
  config.cancelToken && (axiosInstance.cancelToken = config.cancelToken);

  return axios(axiosInstance)
    .then((response) => {
      logger.debug(`request success - ${url}`);

      return response.data;
    })
    .catch((error) => {
      logger.debug(`request fail ${url} - `, error);
      window.eee = error;

      // 401 Unauthorized - 用戶不存在
      // 500 - Request failed with status code 500

      let errorMessage = error.response.data.Message;
      if (!errorMessage) {
        errorMessage = error.response.status;
      }
      // toast.error(errorMessage);
      // 保留 不確定要不要throw
      throw errorMessage;
    })
    .finally(() => {
      logger.debug(`request end ${url}`);
    });
};
/**
 *
 * @param {*} param0
 * @param {*} param1
 * @returns
 */
export const requestPTeacherLogin = async (phone, password, logger) => {
  const params = {
    PhoneNumber: phone,
    Password: password,
  };
  return request("/act/api/open/login", { logger, method: "post" }, params);
};

export const requestSetEmail = async (
  partTimeTeacherId,
  randomKey,
  email,
  logger
) => {
  const params = {
    PartTimeTeacherId: partTimeTeacherId,
    RandomKey: randomKey,
    Email: email,
  };
  return request(
    "/act/api/open/pteachers/setEmail",
    { logger, method: "put" },
    params
  );
};

export const requestSendEmail = async (phoneNumber, email, logger) => {
  const params = {
    PhoneNumber: phoneNumber,
    Email: email,
  };
  return request(
    "/act/api/open/pteachers/sendEmail",
    { logger, method: "put" },
    params
  );
};

export const requestPassword = async (
  partTimeTeacherId,
  randomKey,
  password,
  logger
) => {
  const params = {
    PartTimeTeacherId: partTimeTeacherId,
    RandomKey: randomKey,
    Password: password,
  };
  return request(
    "/act/api/open/pteachers/password",
    { logger, method: "put" },
    params
  );
};

export const requestFakeLogin = async (id, logger) => {
  return request(`/act/api/open/fakeLogin/${id}`, { logger, method: "get" });
};

export const requestGetLoginInfo = async (logger) => {
  return request("/act/api/login/getLoginInfo", { logger, method: "get" });
};

export const urlGetPermissionGroups = "/act/api/permissionGroups";
/**
 * 權限管理
 */
export const requestPermissionGroups = async (
  schoolCode,
  permissionGroup,
  logger
) => {
  const params = {
    SchoolCode: schoolCode,
    PermissionGroup: permissionGroup,
  };
  return request(urlGetPermissionGroups, { logger, method: "get" }, params);
};
/**
 * 權限管理 NonMember
 */
export const requestPermissionGroupsNonMember = async (
  schoolCode,
  permissionGroup,
  departmentCode,
  logger
) => {
  const params = {
    SchoolCode: schoolCode,
    PermissionGroup: permissionGroup,
    DepartmentCode: departmentCode,
  };
  return request(
    "/act/api/permissionGroups/nonMember/list",
    { logger, method: "get" },
    params
  );
};
/**
 * 權限管理 AddMember
 */
export const requestPermissonGroupAddMember = async (
  schoolCode,
  permissionGroup,
  departmentCode,
  idNumber,
  logger
) => {
  const params = {
    SchoolCode: schoolCode,
    PermissionGroup: permissionGroup,
    DepartmentCode: departmentCode,
    IdNumber: idNumber,
  };
  return request(
    "/act/api/permissionGroups/addMember",
    { logger, method: "put" },
    params
  );
};
/**
 * 權限管理 DelMember
 */
export const requestPermissonGroupDeleteMember = async (
  schoolCode,
  permissionGroup,
  departmentCode,
  idNumber,
  logger
) => {
  const params = {
    SchoolCode: schoolCode,
    PermissionGroup: permissionGroup,
    DepartmentCode: departmentCode,
    IdNumber: idNumber,
  };
  return request(
    "/act/api/permissionGroups/deleteMember",
    { logger, method: "put" },
    params
  );
};
/**
 * 權限管理 enable
 */
export const requestPermissonGroupEnable = async (
  schoolCode,
  permissionGroup,
  departmentCode,
  logger
) => {
  const params = {
    SchoolCode: schoolCode,
    PermissionGroup: permissionGroup,
    DepartmentCode: departmentCode,
  };
  return request(
    "/act/api/permissionGroups/enable",
    { logger, method: "put" },
    params
  );
};
/**
 * 權限管理 disable
 */
export const requestPermissonGroupDisable = async (
  schoolCode,
  permissionGroup,
  departmentCode,
  logger
) => {
  const params = {
    SchoolCode: schoolCode,
    PermissionGroup: permissionGroup,
    DepartmentCode: departmentCode,
  };
  return request(
    "/act/api/permissionGroups/disable",
    { logger, method: "put" },
    params
  );
};
