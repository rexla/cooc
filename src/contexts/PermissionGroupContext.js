import { createContext, useContext, useState, useMemo, useEffect } from "react";
import Logger from "../lib/Logger";
const PermissionGroupContext = createContext();

const logger = new Logger("PermissionGroupContext");

export function PermissionGroupProvider({ children }) {
  /*
  
[
    {
        "DepartmentCode": "A02",
        "Department": "教務處 ",
        "Enabled": false,
        "TeacherTitles": [
            {
                "Name": "劉旭智",
                "IdNumber": "N122122409",
                "IsFixed": true
            },
            {
                "Name": "王品方",
                "IdNumber": "N224158016",
                "IsFixed": true
            },
            {
                "Name": "陳禮君",
                "IdNumber": "F224762809",
                "IsFixed": true
            },
            {
                "Name": "王儷燕",
                "IdNumber": "S222767315",
                "IsFixed": true
            },
            {
                "Name": "陳政佑",
                "IdNumber": "N124209829",
                "IsFixed": true
            }
        ]
    }
]
  
  */
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [permissionGroupId, setPermissionGroupId] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

  const shareState = {
    permissionGroupState: [permissionGroups, setPermissionGroups],
    permissionGroupIdState: [permissionGroupId, setPermissionGroupId],
    schoolCodeState: [schoolCode, setSchoolCode],
    departmentCodeState: [departmentCode, setDepartmentCode],
  };

  return (
    <PermissionGroupContext.Provider value={shareState}>
      {children}
    </PermissionGroupContext.Provider>
  );
}

export function usePermissionGroupContext() {
  return useContext(PermissionGroupContext);
}
