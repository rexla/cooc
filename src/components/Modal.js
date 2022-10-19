import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const Modal = ({ title, content, buttonText, onClick, isOpen, onClose }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign={"center"}>{content}</Text>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <Button colorScheme="primary" onClick={onClose}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
Modal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  title: "提示",
  content: "內容",
  buttonText: "確定",
};
export default Modal;
