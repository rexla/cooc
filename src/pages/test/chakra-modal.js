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
  useDisclosure,
} from "@chakra-ui/react";
import Dialog from "../../components/Modal";

const ChakraModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Dialog
        title="報名系統"
        content="確定要登出嗎？"
        buttonText="我要登出"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
export default ChakraModal;
