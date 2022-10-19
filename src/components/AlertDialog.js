import React from "react";
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const AlertNotify = ({
  title,
  content,
  buttonText,
  onClick,
  isOpen,
  onClose,
}) => {
  const cancelRef = React.useRef();

  return (
    <ChakraAlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader textAlign={"center"}>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text textAlign={"center"}>{content}</Text>
        </AlertDialogBody>
        <AlertDialogFooter justifyContent={"center"}>
          <Button colorScheme="primary" ref={cancelRef} onClick={onClose}>
            {buttonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ChakraAlertDialog>
  );
};

AlertNotify.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

AlertNotify.defaultProps = {
  title: "提示",
  content: "內容",
  buttonText: "確定",
};
export default AlertNotify;
