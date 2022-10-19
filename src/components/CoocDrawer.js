import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import NavItems from "./NavItems";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AppContext";

const CoocDrawer = () => {
  const appContext = useAppContext();
  const [user, setUser] = appContext.userState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  let isInVisible =
    router.pathname.includes("pteacher") || router.pathname.includes("404");

  if (!user) {
    return null;
  }
  const identity = user.Identity;
  if (user.Identity === null) {
    return null;
  }

  return (
    <div className={`md:hidden ${isInVisible && "invisible"}`}>
      <Icon
        as={DehazeIcon}
        onClick={onOpen}
        className="cursor-pointer align-middle"
      />
      <Drawer isOpen={isOpen} placement="left" size={"xs"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <NavItems
              roles={identity.Roles}
              isCoocLogin={user.IsCoocLogin}
              permissionGroups={identity.PermissionGroups}
              schoolType={identity.SchoolType}
              onClick={onClose}
            />
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default CoocDrawer;
